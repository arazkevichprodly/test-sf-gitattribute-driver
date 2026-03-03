public with sharing class UserContactController {
    
    @AuraEnabled(cacheable=true)
    public static Id getContactId(Id userId) {
        User currentUser = [SELECT Id, ContactId FROM User WHERE Id = :userId LIMIT 1];
        return currentUser.ContactId;//asdf
    }
}