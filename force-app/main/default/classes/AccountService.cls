public with sharing class AccountService {

    public static Account getAccountById(Id accountId) {
        return [SELECT Id, Name, Industry, Type FROM Account WHERE Id = :accountId LIMIT 1];
    }

    public static List<Account> getAccountsByIndustry(String industry) {
        return [SELECT Id, Name, Industry FROM Account WHERE Industry = :industry];
    }

    public static Account getAccountByName(String name) {
        return [SELECT Id, Name, Industry FROM Account WHERE Name = :name LIMIT 1];
    }

    public static void updateAccountRating(Id accountId, String rating) {
        Account acc = new Account(Id = accountId, Rating = rating);
        update acc;
    }
}
