@isTest
public class TestNamedCredentials {
    
    @isTest
    static void test() {
        Http http = new Http();

		HttpRequest request = new HttpRequest();
		request.setEndpoint('callout:CallMeBack2/api/v1/connections');
		request.setMethod('GET');
		request.setHeader('Content-Type', 'application/json;  charset=utf-8');
		http.send(request);
    }

}