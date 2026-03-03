import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

import NAME_FIELD from '@salesforce/schema/Animal__c.Alpha_Name__c';
import SPECIES_FIELD from '@salesforce/schema/Animal__c.Species__c';
import AGE_FIELD from '@salesforce/schema/Animal__c.Age__c';
import HEALTH_STATUS_FIELD from '@salesforce/schema/Animal__c.Health_Status__c';
import DIET_FIELD from '@salesforce/schema/Animal__c.Diet__c';
import DESCRIPTION_FIELD from '@salesforce/schema/Animal__c.Description__c';

const FIELDS = [
    NAME_FIELD,
    SPECIES_FIELD,
    AGE_FIELD,
    HEALTH_STATUS_FIELD,
    DIET_FIELD,
    DESCRIPTION_FIELD
];

export default class AnimalCard extends NavigationMixin(LightningElement) {
    @api recordId;
    
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    animal;
    
    get name() {
        return getFieldValue(this.animal.data, NAME_FIELD);
    }
    
    get species() {
        return getFieldValue(this.animal.data, SPECIES_FIELD);
    }
    
    get age() {
        return getFieldValue(this.animal.data, AGE_FIELD);
    }
    
    get healthStatus() {
        return getFieldValue(this.animal.data, HEALTH_STATUS_FIELD);
    }
    
    get diet() {
        return getFieldValue(this.animal.data, DIET_FIELD);
    }
    
    get description() {
        return getFieldValue(this.animal.data, DESCRIPTION_FIELD);
    }
    
    get healthStatusClass() {
        const status = this.healthStatus;
        if (status === 'Excellent') return 'slds-text-color_success';
        if (status === 'Good') return 'slds-text-color_success';
        if (status === 'Fair') return 'slds-text-color_warning';
        if (status === 'Poor') return 'slds-text-color_error';
        if (status === 'Critical') return 'slds-text-color_destructive';
        return '';
    }
    
    handleViewDetails() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                actionName: 'view'
            }
        });
    }
    
    handleEdit() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Animal__c',
                actionName: 'edit'
            }
        });
    }
}