@RestResource(urlMapping='/agromtest/*')
global with sharing class MySimpleRest {
	
    @HttpGet
    global static String doGet() {
        Http http = new Http();

		HttpRequest request = new HttpRequest();
		request.setEndpoint('callout:CallMeBack3/dev-20/api/v1/connections');
		request.setMethod('GET');
		request.setHeader('Content-Type', 'application/json;  charset=utf-8');
 
		HttpResponse result = http.send(request);
        return result.getBody();
    }
}