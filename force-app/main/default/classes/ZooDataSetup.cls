/**
 * ZooDataSetup
 *
 * Utility class to create sample data for the Zoo Management package
 */
public class ZooDataSetup {
    public static void createSampleData() {
        // Create Enclosures
        List<Enclosure__c> enclosures = new List<Enclosure__c>{
            new Enclosure__c(
                Name = 'Lion Habitat',
                Location__c = 'East Wing',
                Size__c = 2500,
                Capacity__c = 5,
                Environment_Type__c = 'Savanna',
                Maintenance_Status__c = 'Operational'
            ),
            new Enclosure__c(
                Name = 'Penguin Pool',
                Location__c = 'North Wing',
                Size__c = 1800,
                Capacity__c = 15,
                Environment_Type__c = 'Arctic',
                Maintenance_Status__c = 'Operational'
            ),
            new Enclosure__c(
                Name = 'Elephant Grounds',
                Location__c = 'South Wing',
                Size__c = 5000,
                Capacity__c = 3,
                Environment_Type__c = 'Savanna',
                Maintenance_Status__c = 'Operational'
            ),
            new Enclosure__c(
                Name = 'Tropical House',
                Location__c = 'Central Area',
                Size__c = 3000,
                Capacity__c = 20,
                Environment_Type__c = 'Tropical',
                Maintenance_Status__c = 'Needs Maintenance'
            )
        };
        insert enclosures;

        // Create Caregivers
        List<Caregiver__c> caregivers = new List<Caregiver__c>{
            new Caregiver__c(
                Name = 'John Smith',
                Employee_ID__c = 'EMP001',
                Specialization__c = 'Large Mammals',
                Hire_Date__c = Date.newInstance(2018, 5, 15),
                Contact_Number__c = '555-123-4567',
                Email__c = 'john.smith@zoomanagement.example'
            ),
            new Caregiver__c(
                Name = 'Maria Rodriguez',
                Employee_ID__c = 'EMP002',
                Specialization__c = 'Birds',
                Hire_Date__c = Date.newInstance(2019, 3, 10),
                Contact_Number__c = '555-234-5678',
                Email__c = 'maria.rodriguez@zoomanagement.example'
            ),
            new Caregiver__c(
                Name = 'David Chen',
                Employee_ID__c = 'EMP003',
                Specialization__c = 'Reptiles',
                Hire_Date__c = Date.newInstance(2020, 7, 22),
                Contact_Number__c = '555-345-6789',
                Email__c = 'david.chen@zoomanagement.example'
            )
        };
        insert caregivers;

        // Create Animals
        List<Animal__c> animals = new List<Animal__c>{
            new Animal__c(
                Name = 'Simba',
                Species__c = 'Lion',
                Age__c = 5.5,
                Health_Status__c = 'Excellent',
                Diet__c = 'Carnivore',
                Description__c = 'Male lion with distinctive mane. Very social with handlers.'
            ),
            new Animal__c(
                Name = 'Pingu',
                Species__c = 'Penguin',
                Age__c = 3.2,
                Health_Status__c = 'Good',
                Diet__c = 'Carnivore',
                Description__c = 'Emperor penguin, slightly underweight but otherwise healthy.'
            ),
            new Animal__c(
                Name = 'Dumbo',
                Species__c = 'Elephant',
                Age__c = 12.7,
                Health_Status__c = 'Good',
                Diet__c = 'Herbivore',
                Description__c = 'Female African elephant. Gentle temperament, good with visitors.'
            ),
            new Animal__c(
                Name = 'Stripes',
                Species__c = 'Tiger',
                Age__c = 4.3,
                Health_Status__c = 'Fair',
                Diet__c = 'Carnivore',
                Description__c = 'Bengal tiger, recovering from minor injury to left paw.'
            ),
            new Animal__c(
                Name = 'Hopper',
                Species__c = 'Monkey',
                Age__c = 2.1,
                Health_Status__c = 'Excellent',
                Diet__c = 'Omnivore',
                Description__c = 'Capuchin monkey. Very active and playful.'
            )
        };
        insert animals;

        // Create Care Assignments
        List<Care_Assignment__c> assignments = new List<Care_Assignment__c>();

        // We'll add the assignments after the initial deployment
        // This is to avoid issues with field references during deployment

        // Example of how to create assignments after deployment:
        // assignments.add(new Care_Assignment__c(
        //     Animal__c = animals[0].Id,
        //     Caregiver__c = caregivers[0].Id,
        //     Start_Date__c = Date.today().addDays(-90),
        //     Notes__c = 'Primary caregiver for Simba'
        // ));

        // Uncomment and run this code after successful deployment
        // insert assignments;

        System.debug('Sample data created successfully!');
    }
}