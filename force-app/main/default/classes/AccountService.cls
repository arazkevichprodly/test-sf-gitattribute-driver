public with sharing class AccountService {

    public static Account getAccountById(Id accountId) {
        return [SELECT Id, Name, Industry, Type FROM Account WHERE Id = :accountId LIMIT 1];
    }

    public static List<Account> getAccountsByIndustry(String industry) {
        return [SELECT Id, Name, Industry FROM Account WHERE Industry = :industry];
    }

    public static void updateAccountRating(Id accountId) {
        Account acc = new Account(Id = accountId, Rating = 'Hot');
        update acc;
    }
}
