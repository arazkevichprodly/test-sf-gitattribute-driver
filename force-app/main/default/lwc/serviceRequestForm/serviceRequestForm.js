import { LightningElement, api, wire, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { createRecord } from 'lightning/uiRecordApi';

import SERVICE_REQUEST_OBJECT from '@salesforce/schema/Service_Request__c';
import STATUS_FIELD from '@salesforce/schema/Service_Request__c.Status__c';
import REQUESTER_FIELD from '@salesforce/schema/Service_Request__c.Requester__c';
import SKILL_NEEDED_FIELD from '@salesforce/schema/Service_Request__c.Skill_Needed__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Service_Request__c.Description__c';
import LOCATION_FIELD from '@salesforce/schema/Service_Request__c.Location__c';
import REQUESTED_DATE_FIELD from '@salesforce/schema/Service_Request__c.Requested_Date__c';

import getUserId from '@salesforce/user/Id';
import getContactId from '@salesforce/apex/UserContactController.getContactId';

export default class ServiceRequestForm extends NavigationMixin(LightningElement) {
    @api skillId;
    @track serviceRequest = {};
    @track error;
    @track statusOptions = [];
    userId = getUserId();
    contactId;
    
    @wire(getObjectInfo, { objectApiName: SERVICE_REQUEST_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: STATUS_FIELD })
    statusPicklistValues({ error, data }) {
        if (data) {
            this.statusOptions = data.values;
            this.serviceRequest.Status__c = data.defaultValue;
        } else if (error) {
            this.error = error;
        }
    }

    @wire(getContactId, { userId: '$userId' })
    wiredContactId({ error, data }) {
        if (data) {
            this.contactId = data;
            this.serviceRequest.Requester__c = this.contactId;
        } else if (error) {
            this.error = error;
        }
    }

    connectedCallback() {
        if (this.skillId) {
            this.serviceRequest.Skill_Needed__c = this.skillId;
        }
        
        // Set default date to today
        const today = new Date();
        this.serviceRequest.Requested_Date__c = today.toISOString().split('T')[0];
    }

    handleInputChange(event) {
        const field = event.target.name;
        const value = event.target.value;
        this.serviceRequest[field] = value;
    }

    handleSubmit() {
        const fields = {};
        fields[REQUESTER_FIELD.fieldApiName] = this.serviceRequest.Requester__c;
        fields[SKILL_NEEDED_FIELD.fieldApiName] = this.serviceRequest.Skill_Needed__c;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.serviceRequest.Description__c;
        fields[LOCATION_FIELD.fieldApiName] = this.serviceRequest.Location__c;
        fields[STATUS_FIELD.fieldApiName] = this.serviceRequest.Status__c;
        fields[REQUESTED_DATE_FIELD.fieldApiName] = this.serviceRequest.Requested_Date__c;

        const recordInput = { apiName: SERVICE_REQUEST_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then(serviceRequest => {
                this.showToast('Success', 'Service Request created', 'success');
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: serviceRequest.id,
                        objectApiName: 'Service_Request__c',
                        actionName: 'view'
                    }
                });
            })
            .catch(error => {
                this.error = error;
                this.showToast('Error', 'Error creating service request', 'error');
            });
    }

    handleCancel() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Service_Request__c',
                actionName: 'home'
            }
        });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}