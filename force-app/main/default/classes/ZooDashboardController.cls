public with sharing class ZooDashboardController {
    @AuraEnabled
    public static Integer getCount(String objectName) {
        try {
            // Use a safer approach with a switch statement to avoid SOQL injection
            switch on objectName {
                when 'Animal__c' {
                    return [SELECT COUNT() FROM Animal__c];
                }
                when 'Caregiver__c' {
                    return [SELECT COUNT() FROM Caregiver__c];
                }
                when 'Enclosure__c' {
                    return [SELECT COUNT() FROM Enclosure__c];
                }
                when 'Care_Assignment__c' {
                    return [SELECT COUNT() FROM Care_Assignment__c];
                }
                when else {
                    return 0;
                }
            }
        } catch (Exception e) {
            // Return 0 if there's any error
            System.debug('Error in getCount: ' + e.getMessage());
            return 0;
        }
    }

    @AuraEnabled
    public static List<Animal__c> getRecentAnimals() {
        try {
            return [SELECT Id, Name
                    FROM Animal__c
                    ORDER BY CreatedDate DESC
                    LIMIT 5];
        } catch (Exception e) {
            System.debug('Error in getRecentAnimals: ' + e.getMessage());
            return new List<Animal__c>();
        }
    }

    @AuraEnabled
    public static List<Care_Assignment__c> getRecentAssignments() {
        try {
            return [SELECT Id, Name
                    FROM Care_Assignment__c
                    ORDER BY CreatedDate DESC
                    LIMIT 5];
        } catch (Exception e) {
            System.debug('Error in getRecentAssignments: ' + e.getMessage());
            return new List<Care_Assignment__c>();
        }
    }
}