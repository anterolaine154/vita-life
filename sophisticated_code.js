/** 
 * filename: sophisticated_code.js
 * 
 * Description: This code demonstrates a sophisticated and complex example in JavaScript. It is a simulation of a bank management system with multiple classes and complex functionalities.
 * It showcases various features like inheritance, polymorphism, data manipulation, and error handling.
 */

// Class to represent a Bank
class Bank {
  constructor(name) {
    this.name = name;
    this.customers = [];
    this.accounts = [];
    this.transactions = [];
  }

  // Add a new customer to the bank
  addCustomer(customer) {
    this.customers.push(customer);
  }

  // Add a new account for a customer at the bank
  addAccount(account) {
    this.accounts.push(account);
  }

  // Perform a transaction between two accounts in the bank
  performTransaction(sender, receiver, amount) {
    const senderAccount = this.accounts.find(account => account.owner === sender);
    const receiverAccount = this.accounts.find(account => account.owner === receiver);

    if (!senderAccount || !receiverAccount) {
      throw new Error('Invalid sender or receiver!');
    }

    if (senderAccount.checkBalance() < amount) {
      throw new Error('Insufficient balance for the transaction!');
    }

    senderAccount.withdraw(amount);
    receiverAccount.deposit(amount);

    const transaction = {
      sender: senderAccount.owner,
      receiver: receiverAccount.owner,
      amount: amount,
      date: new Date().toLocaleString()
    };

    this.transactions.push(transaction);
  }

  // Retrieve all transactions for a specific account
  getTransactions(accountOwner) {
    return this.transactions.filter(transaction => transaction.sender === accountOwner || transaction.receiver === accountOwner);
  }
}

// Base class for all types of accounts
class Account {
  constructor(owner, initialBalance) {
    this.owner = owner;
    this.balance = initialBalance;
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    this.balance -= amount;
  }

  checkBalance() {
    return this.balance;
  }
}

// Subclass for a Savings Account
class SavingsAccount extends Account {
  constructor(owner, initialBalance) {
    super(owner, initialBalance);
    this.interestRate = 0.05;
  }

  calculateInterest() {
    return this.balance * this.interestRate;
  }
}

// Subclass for a Checking Account
class CheckingAccount extends Account {
  constructor(owner, initialBalance) {
    super(owner, initialBalance);
    this.transactionFee = 2;
  }

  deductTransactionFee() {
    this.balance -= this.transactionFee;
  }
}

// Example usage of the Bank and Account classes
const myBank = new Bank("ABC Bank");

const customer1 = "John Doe";
const customer2 = "Jane Smith";

const savingsAccount1 = new SavingsAccount(customer1, 1000);
const checkingAccount1 = new CheckingAccount(customer1, 500);

const savingsAccount2 = new SavingsAccount(customer2, 2000);
const checkingAccount2 = new CheckingAccount(customer2, 1000);

myBank.addCustomer(customer1);
myBank.addCustomer(customer2);

myBank.addAccount(savingsAccount1);
myBank.addAccount(checkingAccount1);
myBank.addAccount(savingsAccount2);
myBank.addAccount(checkingAccount2);

myBank.performTransaction(customer1, customer2, 200);
myBank.performTransaction(customer2, customer1, 300);

console.log(myBank.getTransactions(customer1));

// Output:
// [
//  { sender: 'John Doe', receiver: 'Jane Smith', amount: 200, date: '12/15/2022, 14:30:45' },
//  { sender: 'Jane Smith', receiver: 'John Doe', amount: 300, date: '12/15/2022, 14:30:45' }
// ]