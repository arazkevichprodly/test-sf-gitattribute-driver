public with sharing class ServiceDirectoryController {
    
    @AuraEnabled(cacheable=true)
    public static List<ServiceWrapper> getAvailableServices() {
        List<ServiceWrapper> serviceWrappers = new List<ServiceWrapper>();
        
        List<Volunteer_Service__c> services = [
            SELECT Id, Name, Description__c, Status__c, Location__c, 
                   Volunteer__r.Name, Volunteer__r.Email, 
                   Skill__r.Id, Skill__r.Name, Skill__r.Category__c
            FROM Volunteer_Service__c
            WHERE Status__c = 'Available'
            ORDER BY Name
        ];
        
        for (Volunteer_Service__c service : services) {
            ServiceWrapper wrapper = new ServiceWrapper();
            wrapper.id = service.Id;
            wrapper.name = service.Name;
            wrapper.description = service.Description__c;
            wrapper.status = service.Status__c;
            wrapper.location = service.Location__c;
            wrapper.volunteerName = service.Volunteer__r.Name;
            wrapper.volunteerEmail = service.Volunteer__r.Email;
            wrapper.skillId = service.Skill__r.Id;
            wrapper.skillName = service.Skill__r.Name;
            wrapper.skillCategory = service.Skill__r.Category__c;
            
            serviceWrappers.add(wrapper);
        }
        
        return serviceWrappers;
    }
    //asdfPDRI__Folder__c
    public class ServiceWrapper {
        @AuraEnabled public String id;
        @AuraEnabled public String name;
        @AuraEnabled public String description;
        @AuraEnabled public String status;
        @AuraEnabled public String location;
        @AuraEnabled public String volunteerName;
        @AuraEnabled public String volunteerEmail;
        @AuraEnabled public String skillId;
        @AuraEnabled public String skillName;
        @AuraEnabled public String skillCategory;
    }
}