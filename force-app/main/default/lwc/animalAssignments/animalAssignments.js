import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
import { NavigationMixin } from 'lightning/navigation';

export default class AnimalAssignments extends NavigationMixin(LightningElement) {
    @api recordId;
    assignments = [];
    isLoading = true;
    error;
    
    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Care_Assignments__r',
        fields: [
            'Care_Assignment__c.Id',
            'Care_Assignment__c.Name',
            'Care_Assignment__c.Caregiver__r.Name',
            'Care_Assignment__c.Enclosure__r.Name',
            'Care_Assignment__c.Start_Date__c',
            'Care_Assignment__c.End_Date__c'
        ]
    })
    wiredAssignments({ error, data }) {
        this.isLoading = true;
        if (data) {
            this.assignments = data.records.map(record => ({
                id: record.id,
                name: record.fields.Name.value,
                caregiverName: record.fields.Caregiver__r.value.fields.Name.value,
                enclosureName: record.fields.Enclosure__r.value.fields.Name.value,
                startDate: record.fields.Start_Date__c.value,
                endDate: record.fields.End_Date__c.value,
                isActive: !record.fields.End_Date__c.value || new Date(record.fields.End_Date__c.value) >= new Date()
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.assignments = [];
        }
        this.isLoading = false;
    }
    
    handleNewAssignment() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Care_Assignment__c',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: `Animal__c=${this.recordId}`
            }
        });
    }
    
    handleViewAssignment(event) {
        const assignmentId = event.currentTarget.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: assignmentId,
                actionName: 'view'
            }
        });
    }
    
    get hasAssignments() {
        return this.assignments.length > 0;
    }
    
    get activeAssignments() {
        return this.assignments.filter(assignment => assignment.isActive);
    }
    
    get hasActiveAssignments() {
        return this.activeAssignments.length > 0;
    }
}