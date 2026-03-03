@isTest
private class ValidationTestClassTest {
    @isTest
    static void testGreet() {
        String result = ValidationTestClass.greet('World');
        System.assertEquals('Hello, World!', result);
    }
}