public class TestArtem {
    
     /**
     * 11111ssdfPublic method that takes an ordered list of object API names
     * and deletes records in that sequence.
     *
     * @param objectApiNames A lisasdft of API names in the order they should be deleted.
     */
    public static void cleanupDataInOrder(List<String> objectApiNames) {
        for (String apiName : objectApiNames) {
            String soql = 'SELECT Id FROM ' + apiName + ' LIMIT 10000';
            deleteInChunks(soql);
        }
        System.debug('Deletion for all specified objects is complete (subject to constraints).');
    }

    /**
     * Helper method to repeatedly query and delete records in small chunks 
     * to avoid governor limits.
     *
     * @param queryString The SOQL query to retrieve record Ids (must include "Id" in SELECT).
     */
    private static void deleteInChunks(String queryString) {
        Boolean moreRecords = true;

        while (moreRecords) {
            List<SObject> recordsToDelete = Database.query(queryString);
            if (!recordsToDelete.isEmpty()) {
                try {
                    delete recordsToDelete;
                } catch (DmlException e) {
                    System.debug('Delete error: ' + e.getMessage());
                }
            }
            // If we got fewer than the LIMIT, it means no more remain in that batch.
            moreRecords = (recordsToDelete.size() == 10000);
        }
    }

}