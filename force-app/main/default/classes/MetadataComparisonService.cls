public with sharing class MetadataComparisonService {
    
    // Inner class to represent a metadata item
    public class MetadataItem {
        public String type { get; set; }
        public String fullName { get; set; }
        
        public MetadataItem(String type, String fullName) {
            this.type = type;
            this.fullName = fullName;
        }
    }
    
    // Inner class to represent a comparison result
    public class MetadataComparison {
        public String status { get; set; }
        public String type { get; set; }
        public String fullName { get; set; }
        
        public MetadataComparison(String status, String type, String fullName) {
            this.status = status;
            this.type = type;
            this.fullName = fullName;
        }
    }
    
    // Fetch the current metadata using Metadata API
    public List<MetadataItem> getListMetadata() {
    List<MetadataItem> metadataItems = new List<MetadataItem>();
    
    // Initialize the MetadataService
    MetadataService.MetadataPort service = new MetadataService.MetadataPort();
    service.SessionHeader = new MetadataService.SessionHeader_element();
    service.SessionHeader.sessionId = UserInfo.getSessionId();
    
    // Define the metadata types to retrieve
    List<String> metadataTypes = new List<String>{
        'ApexClass', 
        'CustomObject', 
        'CustomField', 
        'ApexTrigger', 
        'CustomLabel'
        // Add more types as needed
    };
    
    try {
        // Create a list of queries (batch up to 3 per call due to API limits)
        List<MetadataService.ListMetadataQuery> queries = new List<MetadataService.ListMetadataQuery>();
        Double ver = 63.0;
        for (String metadataType : metadataTypes) {
            MetadataService.ListMetadataQuery query = new MetadataService.ListMetadataQuery();
            query.type_x = metadataType;
            query.folder = null; // Set to null unless querying folder-based metadata
            queries.add(query);
            
            // Metadata API allows up to 3 queries per call
            if (queries.size() == 3 || metadataType == metadataTypes[metadataTypes.size() - 1]) {
                MetadataService.FileProperties[] fileProperties = service.listMetadata(
                    queries, 
                    ver // API version as Double
                );
                
                if (fileProperties != null) {
                    for (MetadataService.FileProperties file : fileProperties) {
                        metadataItems.add(new MetadataItem(
                            file.type_x, 
                            file.fullName
                        ));
                    }
                }
                queries.clear(); // Clear the list for the next batch
            }
        }
    } catch (Exception e) {
        System.debug('Error retrieving metadata: ' + e.getMessage());
        throw new MetadataServiceException('Failed to retrieve metadata: ' + e.getMessage());
    }
    
    return metadataItems;
}
    
    // Rest of the class remains unchanged (saveListMetadata, getSavedListMetadata, compareLists)
    // Including them here for completeness:
    
    private static final Integer MAX_CHUNK_SIZE = 32000;
    
    public void saveListMetadata(List<MetadataItem> metadata) {
        String jsonData = JSON.serialize(metadata);
        delete [SELECT Id FROM StoredMetadata__c];
        
        List<StoredMetadata__c> chunks = new List<StoredMetadata__c>();
        Integer chunkIndex = 0;
        
        for (Integer i = 0; i < jsonData.length(); i += MAX_CHUNK_SIZE) {
            Integer endIndex = Math.min(i + MAX_CHUNK_SIZE, jsonData.length());
            String chunk = jsonData.substring(i, endIndex);
            
            StoredMetadata__c record = new StoredMetadata__c(
                DataChunk__c = chunk,
                ChunkIndex__c = chunkIndex,
                MetadataDate__c = DateTime.now()
            );
            chunks.add(record);
            chunkIndex++;
        }
        
        insert chunks;
    }
    
    public List<MetadataItem> getSavedListMetadata() {
        List<StoredMetadata__c> chunks = [
            SELECT DataChunk__c, ChunkIndex__c 
            FROM StoredMetadata__c 
            ORDER BY ChunkIndex__c ASC
        ];
        
        if (chunks.isEmpty()) {
            return new List<MetadataItem>();
        }
        
        String jsonData = '';
        for (StoredMetadata__c chunk : chunks) {
            jsonData += chunk.DataChunk__c;
        }
        
        try {
            return (List<MetadataItem>) JSON.deserialize(jsonData, List<MetadataItem>.class);
        } catch (Exception e) {
            System.debug('Error deserializing metadata: ' + e.getMessage());
            return new List<MetadataItem>();
        }
    }
    
    public List<MetadataComparison> compareLists(List<MetadataItem> previous, List<MetadataItem> current) {
        List<MetadataComparison> changes = new List<MetadataComparison>();
        Map<String, MetadataItem> previousMap = new Map<String, MetadataItem>();
        Map<String, MetadataItem> currentMap = new Map<String, MetadataItem>();
        
        for (MetadataItem item : previous) {
            previousMap.put(item.type + '|' + item.fullName, item);
        }
        for (MetadataItem item : current) {
            currentMap.put(item.type + '|' + item.fullName, item);
        }
        
        for (String key : previousMap.keySet()) {
            if (currentMap.containsKey(key)) {
                changes.add(new MetadataComparison('Unchanged', 
                    previousMap.get(key).type, 
                    previousMap.get(key).fullName));
                currentMap.remove(key);
            } else {
                changes.add(new MetadataComparison('Removed', 
                    previousMap.get(key).type, 
                    previousMap.get(key).fullName));
            }
        }
        
        for (String key : currentMap.keySet()) {
            changes.add(new MetadataComparison('Added', 
                currentMap.get(key).type, 
                currentMap.get(key).fullName));
        }
        
        return changes;
    }
    
    // Custom exception class for better error handling
    public class MetadataServiceException extends Exception {}
}