import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class VolunteerDashboard extends NavigationMixin(LightningElement) {
    
    handleRegisterVolunteer() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Volunteer_Registration'
            }
        });
    }
    
    handleCreateService() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Volunteer_Service__c',
                actionName: 'new'
            }
        });
    }
    
    handleViewServices() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Volunteer_Service__c',
                actionName: 'list'
            }
        });
    }
    
    handleViewRequests() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Service_Request__c',
                actionName: 'list'
            }
        });
    }
}