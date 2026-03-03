({
    getAnimalCount : function(component) {
        try {
            var action = component.get("c.getCount");
            action.setParams({
                "objectName": "Animal__c"
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.animalCount", response.getReturnValue());
                } else {
                    console.error('Error getting animal count: ' + JSON.stringify(response.getError()));
                    component.set("v.animalCount", 0);
                }
            });
            $A.enqueueAction(action);
        } catch(e) {
            console.error('Exception in getAnimalCount: ' + e.message);
            component.set("v.animalCount", 0);
        }
    },

    getCaregiverCount : function(component) {
        try {
            var action = component.get("c.getCount");
            action.setParams({
                "objectName": "Caregiver__c"
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.caregiverCount", response.getReturnValue());
                } else {
                    console.error('Error getting caregiver count: ' + JSON.stringify(response.getError()));
                    component.set("v.caregiverCount", 0);
                }
            });
            $A.enqueueAction(action);
        } catch(e) {
            console.error('Exception in getCaregiverCount: ' + e.message);
            component.set("v.caregiverCount", 0);
        }
    },

    getEnclosureCount : function(component) {
        try {
            var action = component.get("c.getCount");
            action.setParams({
                "objectName": "Enclosure__c"
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.enclosureCount", response.getReturnValue());
                } else {
                    console.error('Error getting enclosure count: ' + JSON.stringify(response.getError()));
                    component.set("v.enclosureCount", 0);
                }
            });
            $A.enqueueAction(action);
        } catch(e) {
            console.error('Exception in getEnclosureCount: ' + e.message);
            component.set("v.enclosureCount", 0);
        }
    },

    getAssignmentCount : function(component) {
        try {
            var action = component.get("c.getCount");
            action.setParams({
                "objectName": "Care_Assignment__c"
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.assignmentCount", response.getReturnValue());
                } else {
                    console.error('Error getting assignment count: ' + JSON.stringify(response.getError()));
                    component.set("v.assignmentCount", 0);
                }
            });
            $A.enqueueAction(action);
        } catch(e) {
            console.error('Exception in getAssignmentCount: ' + e.message);
            component.set("v.assignmentCount", 0);
        }
    },

    navigateToObjectHome : function(component, objectApiName) {
        var navEvent = $A.get("e.force:navigateToObjectHome");
        navEvent.setParams({
            "scope": objectApiName
        });
        navEvent.fire();
    },

    createNewRecord : function(component, objectApiName) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": objectApiName
        });
        createRecordEvent.fire();
    }
})