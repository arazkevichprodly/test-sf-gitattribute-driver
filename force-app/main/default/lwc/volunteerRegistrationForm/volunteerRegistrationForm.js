import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { createRecord } from 'lightning/uiRecordApi';

import VOLUNTEER_APPLICATION_OBJECT from '@salesforce/schema/Volunteer_Application__c';
import STATUS_FIELD from '@salesforce/schema/Volunteer_Application__c.Status__c';
import APPLICANT_FIELD from '@salesforce/schema/Volunteer_Application__c.Applicant__c';
import SKILLS_FIELD from '@salesforce/schema/Volunteer_Application__c.Skills__c';
import EXPERIENCE_FIELD from '@salesforce/schema/Volunteer_Application__c.Experience__c';
import AVAILABILITY_FIELD from '@salesforce/schema/Volunteer_Application__c.Availability__c';

import getUserId from '@salesforce/user/Id';
import getContactId from '@salesforce/apex/UserContactController.getContactId';

export default class VolunteerRegistrationForm extends NavigationMixin(LightningElement) {
    @track application = {};
    @track error;
    @track availabilityOptions = [];
    userId = getUserId();
    contactId;
    
    @wire(getObjectInfo, { objectApiName: VOLUNTEER_APPLICATION_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: AVAILABILITY_FIELD })
    availabilityPicklistValues({ error, data }) {
        if (data) {
            this.availabilityOptions = data.values;
        } else if (error) {
            this.error = error;
        }
    }

    @wire(getContactId, { userId: '$userId' })
    wiredContactId({ error, data }) {
        if (data) {
            this.contactId = data;
            this.application.Applicant__c = this.contactId;
        } else if (error) {
            this.error = error;
        }
    }

    handleInputChange(event) {
        const field = event.target.name;
        const value = event.target.value;
        this.application[field] = value;
    }

    handleAvailabilityChange(event) {
        this.application.Availability__c = event.detail.value;
    }

    handleSubmit() {
        const fields = {};
        fields[APPLICANT_FIELD.fieldApiName] = this.application.Applicant__c;
        fields[SKILLS_FIELD.fieldApiName] = this.application.Skills__c;
        fields[EXPERIENCE_FIELD.fieldApiName] = this.application.Experience__c;
        fields[AVAILABILITY_FIELD.fieldApiName] = this.application.Availability__c;
        fields[STATUS_FIELD.fieldApiName] = 'Submitted';

        const recordInput = { apiName: VOLUNTEER_APPLICATION_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then(application => {
                this.showToast('Success', 'Volunteer Application submitted', 'success');
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: application.id,
                        objectApiName: 'Volunteer_Application__c',
                        actionName: 'view'
                    }
                });
            })
            .catch(error => {
                this.error = error;
                this.showToast('Error', 'Error submitting application', 'error');
            });
    }

    handleCancel() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Volunteer_Application__c',
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