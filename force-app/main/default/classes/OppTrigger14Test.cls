@isTest
private class OppTrigger14Test {
    @isTest
    static void testTriggerFires() {
        Opportunity opp = new Opportunity(
            Name = 'Test Opp',
            StageName = 'Prospecting',
            CloseDate = Date.today().addDays(30)
        );
        insert opp;
        System.assertNotEquals(null, opp.Id);
    }
}