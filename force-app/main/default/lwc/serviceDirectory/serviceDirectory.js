import { LightningElement, wire, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { NavigationMixin } from 'lightning/navigation';

import getAvailableServices from '@salesforce/apex/ServiceDirectoryController.getAvailableServices';
import SKILL_OBJECT from '@salesforce/schema/Skill__c';
import CATEGORY_FIELD from '@salesforce/schema/Skill__c.Category__c';

export default class ServiceDirectory extends NavigationMixin(LightningElement) {
    @track services = [];
    @track filteredServices = [];
    @track error;
    @track isLoading = true;
    @track categoryOptions = [];
    @track selectedCategory = '';
    @track searchTerm = '';

    @wire(getObjectInfo, { objectApiName: SKILL_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: CATEGORY_FIELD })
    categoryPicklistValues({ error, data }) {
        if (data) {
            this.categoryOptions = [{ label: 'All Categories', value: '' }];
            data.values.forEach(item => {
                this.categoryOptions.push({ label: item.label, value: item.value });
            });
        } else if (error) {
            this.error = error;
        }
    }

    @wire(getAvailableServices)
    wiredServices({ error, data }) {
        this.isLoading = true;
        if (data) {
            this.services = data;
            this.filteredServices = [...this.services];
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.services = [];
            this.filteredServices = [];
        }
        this.isLoading = false;
    }

    handleCategoryChange(event) {
        this.selectedCategory = event.detail.value;
        this.filterServices();
    }

    handleSearchChange(event) {
        this.searchTerm = event.target.value;
        this.filterServices();
    }

    filterServices() {
        this.filteredServices = this.services.filter(service => {
            const matchesCategory = !this.selectedCategory || service.skillCategory === this.selectedCategory;
            const matchesSearch = !this.searchTerm || 
                service.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(this.searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }

    handleViewService(event) {
        const serviceId = event.currentTarget.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: serviceId,
                objectApiName: 'Volunteer_Service__c',
                actionName: 'view'
            }
        });
    }

    handleRequestService(event) {
        const skillId = event.currentTarget.dataset.skillid;
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__ServiceRequestFormPage'
            },
            state: {
                skillId: skillId
            }
        });
    }

    get hasServices() {
        return this.filteredServices.length > 0;
    }
}