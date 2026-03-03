import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

const FIELDS = [
    'Volunteer_Service__c.Name',
    'Volunteer_Service__c.Description__c',
    'Volunteer_Service__c.Status__c',
    'Volunteer_Service__c.Location__c',
    'Volunteer_Service__c.Volunteer__c',
    'Volunteer_Service__c.Skill__c'
];

export default class ServiceListingCard extends NavigationMixin(LightningElement) {
    @api recordId;
    service;
    error;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredService({ error, data }) {
        if (data) {
            this.service = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.service = undefined;
            this.showToast('Error', 'Error loading service details', 'error');
        }
    }

    get serviceName() {
        return this.service?.fields.Name.value;
    }

    get serviceDescription() {
        return this.service?.fields.Description__c.value;
    }

    get serviceStatus() {
        return this.service?.fields.Status__c.value;
    }

    get serviceLocation() {
        return this.service?.fields.Location__c.value;
    }

    get isAvailable() {
        return this.serviceStatus === 'Available';
    }

    handleRequestService() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Service_Request__c',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: `Skill_Needed__c=${this.service.fields.Skill__c.value}`
            }
        });
    }

    handleViewDetails() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Volunteer_Service__c',
                actionName: 'view'
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