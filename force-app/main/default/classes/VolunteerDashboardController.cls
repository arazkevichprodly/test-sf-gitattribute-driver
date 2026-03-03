public with sharing class VolunteerDashboardController {
    
    @AuraEnabled(cacheable=true)
    public static DashboardData getVolunteerDashboardData(Id contactId) {
        DashboardData data = new DashboardData();
        
        // Check if the contact is a volunteer
        List<Volunteer_Application__c> applications = [
            SELECT Id, Status__c 
            FROM Volunteer_Application__c 
            WHERE Applicant__c = :contactId 
            AND Status__c = 'Approved'
            LIMIT 1
        ];
        
        data.isVolunteer = !applications.isEmpty();
        
        // Get volunteer services
        List<Volunteer_Service__c> services = [
            SELECT Id, Name, Description__c, Status__c, Location__c, 
                   Skill__r.Name, Skill__r.Category__c
            FROM Volunteer_Service__c
            WHERE Volunteer__c = :contactId
            ORDER BY Name
        ];
        
        data.services = new List<ServiceData>();
        for (Volunteer_Service__c service : services) {
            ServiceData serviceData = new ServiceData();
            serviceData.id = service.Id;
            serviceData.name = service.Name;
            serviceData.description = service.Description__c;
            serviceData.status = service.Status__c;
            serviceData.location = service.Location__c;
            serviceData.skillName = service.Skill__r.Name;
            serviceData.skillCategory = service.Skill__r.Category__c;
            
            data.services.add(serviceData);
        }
        
        // Get assigned service requests
        List<Service_Request__c> requests = [
            SELECT Id, Name, Description__c, Status__c, Location__c, 
                   Requester__r.Name, Requested_Date__c,
                   Skill_Needed__r.Name
            FROM Service_Request__c
            WHERE Assigned_Volunteer__c = :contactId
            ORDER BY Requested_Date__c
        ];
        
        data.assignedRequests = new List<RequestData>();
        for (Service_Request__c request : requests) {
            RequestData requestData = new RequestData();
            requestData.id = request.Id;
            requestData.name = request.Name;
            requestData.description = request.Description__c;
            requestData.status = request.Status__c;
            requestData.location = request.Location__c;
            requestData.requesterName = request.Requester__r.Name;
            requestData.requestedDate = request.Requested_Date__c;
            requestData.skillName = request.Skill_Needed__r.Name;
            
            data.assignedRequests.add(requestData);
        }
        
        return data;
    }
    
    public class DashboardData {
        @AuraEnabled public Boolean isVolunteer;
        @AuraEnabled public List<ServiceData> services;
        @AuraEnabled public List<RequestData> assignedRequests;
    }
    
    public class ServiceData {
        @AuraEnabled public String id;
        @AuraEnabled public String name;
        @AuraEnabled public String description;
        @AuraEnabled public String status;
        @AuraEnabled public String location;
        @AuraEnabled public String skillName;
        @AuraEnabled public String skillCategory;
    }
    
    public class RequestData {
        @AuraEnabled public String id;
        @AuraEnabled public String name;
        @AuraEnabled public String description;
        @AuraEnabled public String status;
        @AuraEnabled public String location;
        @AuraEnabled public String requesterName;
        @AuraEnabled public Date requestedDate;
        @AuraEnabled public String skillName;
    }
}