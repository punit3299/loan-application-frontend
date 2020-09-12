import * as core from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';

import { Loan } from '../models/loan.model';
import { Transaction } from '../models/transaction.model';


import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@core.Injectable({
  providedIn: 'root'
})
export class CustomerService {

  id: number;
  walletBalance: number;
  loansTaken: number;
  transCount: number;

  url:string="https://online-loan-application.herokuapp.com/";

  constructor(private http: HttpClient) { }

  // Add Customer
  addCustomer(cust: Customer) {
    return this.http.post(this.url+"/signup", cust).pipe(catchError(err => {
      return throwError('503 Service Temporarily Unavailable');
    }));
  }

  //Update Customer
  updateCustomer(cust: Customer) {
    return this.http.put(this.url+"updateCust", cust);
  }

  //Login Verification
  verifyLogin(loginData: Customer) {
    return this.http.post(this.url+"login", loginData).pipe(catchError(err => {
      return throwError('503 Service Temporarily Unavailable');
    }));
  }

  //Get Cusotmer details by Customer Id
  getUserById(id: number) {
    return this.http.get<Customer>(this.url+"main/" + id);
  }

  // Apply Loan
  applyLoan(loan: Loan) {
    return this.http.post(this.url+"loan", loan);
  }

  //Get Loans list by Customer Id
  getLoansById(id: number) {
    return this.http.get<Loan[]>(this.url+"getLoans/" + id);
  }

  //Add a transaction
  addTransaction(trans: Transaction) {
    return this.http.post<Transaction>(this.url+"addTrans", trans);
  }

  //Get transactions list by Customer Id
  getTransById(id: number) {
    return this.http.get<Transaction[]>(this.url+"getTrans/" + id);
  }

  //Loan Foreclosure
  forecloseAccount(loanId: number) {
    return this.http.post(this.url+"forecloseAcct/" + loanId, loanId);
  }

  //Send Mail
  contact(email:string){
    return this.http.post(this.url+"mail",email);
  }
}
