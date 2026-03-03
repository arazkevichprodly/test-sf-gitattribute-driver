({
    navigateToAnimals : function(component, event, helper) {
        var navEvent = $A.get("e.force:navigateToObjectHome");
        navEvent.setParams({
            "scope": "Animal__c"
        });
        navEvent.fire();
    },
    
    navigateToCaregivers : function(component, event, helper) {
        var navEvent = $A.get("e.force:navigateToObjectHome");
        navEvent.setParams({
            "scope": "Caregiver__c"
        });
        navEvent.fire();
    },
    
    navigateToEnclosures : function(component, event, helper) {
        var navEvent = $A.get("e.force:navigateToObjectHome");
        navEvent.setParams({
            "scope": "Enclosure__c"
        });
        navEvent.fire();
    },
    
    navigateToAssignments : function(component, event, helper) {
        var navEvent = $A.get("e.force:navigateToObjectHome");
        navEvent.setParams({
            "scope": "Care_Assignment__c"
        });
        navEvent.fire();
    },
    
    createNewAnimal : function(component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Animal__c"
        });
        createRecordEvent.fire();
    },
    
    createNewCaregiver : function(component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Caregiver__c"
        });
        createRecordEvent.fire();
    },
    
    createNewEnclosure : function(component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Enclosure__c"
        });
        createRecordEvent.fire();
    },
    
    createNewAssignment : function(component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Care_Assignment__c"
        });
        createRecordEvent.fire();
    }
})