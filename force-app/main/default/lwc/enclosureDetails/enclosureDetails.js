import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

import NAME_FIELD from '@salesforce/schema/Enclosure__c.Name';
import LOCATION_FIELD from '@salesforce/schema/Enclosure__c.Location__c';
import SIZE_FIELD from '@salesforce/schema/Enclosure__c.Size__c';
import CAPACITY_FIELD from '@salesforce/schema/Enclosure__c.Capacity__c';
import ENVIRONMENT_TYPE_FIELD from '@salesforce/schema/Enclosure__c.Environment_Type__c';
import MAINTENANCE_STATUS_FIELD from '@salesforce/schema/Enclosure__c.Maintenance_Status__c';

const FIELDS = [
    NAME_FIELD,
    LOCATION_FIELD,
    SIZE_FIELD,
    CAPACITY_FIELD,
    ENVIRONMENT_TYPE_FIELD,
    MAINTENANCE_STATUS_FIELD
];

export default class EnclosureDetails extends NavigationMixin(LightningElement) {
    @api recordId;
    
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    enclosure;
    
    get name() {
        return getFieldValue(this.enclosure.data, NAME_FIELD);
    }
    
    get location() {
        return getFieldValue(this.enclosure.data, LOCATION_FIELD);
    }
    
    get size() {
        return getFieldValue(this.enclosure.data, SIZE_FIELD);
    }
    
    get capacity() {
        return getFieldValue(this.enclosure.data, CAPACITY_FIELD);
    }
    
    get environmentType() {
        return getFieldValue(this.enclosure.data, ENVIRONMENT_TYPE_FIELD);
    }
    
    get maintenanceStatus() {
        return getFieldValue(this.enclosure.data, MAINTENANCE_STATUS_FIELD);
    }
    
    get maintenanceStatusClass() {
        const status = this.maintenanceStatus;
        if (status === 'Operational') return 'slds-text-color_success';
        if (status === 'Needs Maintenance') return 'slds-text-color_warning';
        if (status === 'Under Maintenance') return 'slds-text-color_warning';
        if (status === 'Out of Service') return 'slds-text-color_error';
        return '';
    }
    
    get environmentIcon() {
        const env = this.environmentType;
        if (env === 'Desert') return 'utility:dayview';
        if (env === 'Tropical') return 'utility:world';
        if (env === 'Savanna') return 'utility:world';
        if (env === 'Arctic') return 'utility:frozen';
        if (env === 'Forest') return 'utility:tree';
        if (env === 'Aquatic') return 'utility:water';
        if (env === 'Mountain') return 'utility:location';
        return 'utility:world';
    }
    
    handleEdit() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Enclosure__c',
                actionName: 'edit'
            }
        });
    }
    
    handleNewAssignment() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Care_Assignment__c',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: `Enclosure__c=${this.recordId}`
            }
        });
    }
}