({
    doInit : function(component, event, helper) {
        helper.getAnimalCount(component);
        helper.getCaregiverCount(component);
        helper.getEnclosureCount(component);
        helper.getAssignmentCount(component);
    },
    
    navigateToAnimals : function(component, event, helper) {
        helper.navigateToObjectHome(component, 'Animal__c');
    },
    
    navigateToCaregivers : function(component, event, helper) {
        helper.navigateToObjectHome(component, 'Caregiver__c');
    },
    
    navigateToEnclosures : function(component, event, helper) {
        helper.navigateToObjectHome(component, 'Enclosure__c');
    },
    
    navigateToAssignments : function(component, event, helper) {
        helper.navigateToObjectHome(component, 'Care_Assignment__c');
    },
    
    createNewAnimal : function(component, event, helper) {
        helper.createNewRecord(component, 'Animal__c');
    },
    
    createNewCaregiver : function(component, event, helper) {
        helper.createNewRecord(component, 'Caregiver__c');
    },
    
    createNewEnclosure : function(component, event, helper) {
        helper.createNewRecord(component, 'Enclosure__c');
    },
    
    createNewAssignment : function(component, event, helper) {
        helper.createNewRecord(component, 'Care_Assignment__c');
    }
})