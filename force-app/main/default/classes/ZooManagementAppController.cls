/**
 * Controller for the Zoo Management App Visualforce page
 */
public with sharing class ZooManagementAppController {
    /**
     * Get the count of records for an object
     * @param objectName The API name of the object
     * @return The count of records
     */
    @RemoteAction
    public static Integer getCount(String objectName) {
        try {
            String query = 'SELECT COUNT() FROM ' + String.escapeSingleQuotes(objectName);
            return Database.countQuery(query);
        } catch (Exception e) {
            System.debug('Error getting count for ' + objectName + ': ' + e.getMessage());
            return 0;
        }
    }
    
    /**
     * Get a list of animals
     * @return A list of animals
     */
    @RemoteAction
    public static List<Animal__c> getAnimals() {
        try {
            return [SELECT Id, Name, Species__c, Age__c, Health_Status__c, Diet__c, Description__c 
                    FROM Animal__c 
                    ORDER BY Name 
                    LIMIT 100];
        } catch (Exception e) {
            System.debug('Error getting animals: ' + e.getMessage());
            return new List<Animal__c>();
        }
    }
    
    /**
     * Get a list of caregivers
     * @return A list of caregivers
     */
    @RemoteAction
    public static List<Caregiver__c> getCaregivers() {
        try {
            return [SELECT Id, Name, Employee_ID__c, Specialization__c, Hire_Date__c, Contact_Number__c, Email__c 
                    FROM Caregiver__c 
                    ORDER BY Name 
                    LIMIT 100];
        } catch (Exception e) {
            System.debug('Error getting caregivers: ' + e.getMessage());
            return new List<Caregiver__c>();
        }
    }
    
    /**
     * Get a list of enclosures
     * @return A list of enclosures
     */
    @RemoteAction
    public static List<Enclosure__c> getEnclosures() {
        try {
            return [SELECT Id, Name, Location__c, Size__c, Capacity__c, Environment_Type__c, Maintenance_Status__c 
                    FROM Enclosure__c 
                    ORDER BY Name 
                    LIMIT 100];
        } catch (Exception e) {
            System.debug('Error getting enclosures: ' + e.getMessage());
            return new List<Enclosure__c>();
        }
    }
    
    /**
     * Get a list of care assignments
     * @return A list of care assignments
     */
    @RemoteAction
    public static List<Care_Assignment__c> getCareAssignments() {
        try {
            return [SELECT Id, Name, Animal__c, Animal__r.Name, Caregiver__c, Caregiver__r.Name, 
                    Enclosure__c, Enclosure__r.Name, Start_Date__c, End_Date__c, Notes__c 
                    FROM Care_Assignment__c 
                    ORDER BY Name 
                    LIMIT 100];
        } catch (Exception e) {
            System.debug('Error getting care assignments: ' + e.getMessage());
            return new List<Care_Assignment__c>();
        }
    }
}