import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

import NAME_FIELD from '@salesforce/schema/Caregiver__c.Name';
import EMPLOYEE_ID_FIELD from '@salesforce/schema/Caregiver__c.Employee_ID__c';
import SPECIALIZATION_FIELD from '@salesforce/schema/Caregiver__c.Specialization__c';
import HIRE_DATE_FIELD from '@salesforce/schema/Caregiver__c.Hire_Date__c';
import CONTACT_NUMBER_FIELD from '@salesforce/schema/Caregiver__c.Contact_Number__c';
import EMAIL_FIELD from '@salesforce/schema/Caregiver__c.Email__c';

const FIELDS = [
    NAME_FIELD,
    EMPLOYEE_ID_FIELD,
    SPECIALIZATION_FIELD,
    HIRE_DATE_FIELD,
    CONTACT_NUMBER_FIELD,
    EMAIL_FIELD
];

export default class CaregiverProfile extends NavigationMixin(LightningElement) {
    @api recordId;
    
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    caregiver;
    
    get name() {
        return getFieldValue(this.caregiver.data, NAME_FIELD);
    }
    
    get employeeId() {
        return getFieldValue(this.caregiver.data, EMPLOYEE_ID_FIELD);
    }
    
    get specialization() {
        return getFieldValue(this.caregiver.data, SPECIALIZATION_FIELD);
    }
    
    get hireDate() {
        return getFieldValue(this.caregiver.data, HIRE_DATE_FIELD);
    }
    
    get contactNumber() {
        return getFieldValue(this.caregiver.data, CONTACT_NUMBER_FIELD);
    }
    
    get email() {
        return getFieldValue(this.caregiver.data, EMAIL_FIELD);
    }
    
    get specializationIcon() {
        const spec = this.specialization;
        if (spec === 'Large Mammals') return 'utility:animal_and_nature';
        if (spec === 'Small Mammals') return 'utility:animal_and_nature';
        if (spec === 'Birds') return 'utility:animal_and_nature';
        if (spec === 'Reptiles') return 'utility:animal_and_nature';
        if (spec === 'Aquatic Animals') return 'utility:water';
        if (spec === 'Primates') return 'utility:animal_and_nature';
        return 'utility:animal_and_nature';
    }
    
    handleViewAssignments() {
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__CaregiverAssignments'
            },
            state: {
                c__recordId: this.recordId
            }
        });
    }
    
    handleEdit() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.recordId,
                objectApiName: 'Caregiver__c',
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
                defaultFieldValues: `Caregiver__c=${this.recordId}`
            }
        });
    }
}