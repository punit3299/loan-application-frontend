import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/app/models/loan.model';
import { CustomerService } from 'src/app/services/customer.service';
import { Transaction } from 'src/app/models/transaction.model';
import { Customer } from 'src/app/models/customer.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-main-loans',
  templateUrl: './main-loans.component.html',
  styleUrls: ['./main-loans.component.css']
})
export class MainLoansComponent implements OnInit {

  submitted: boolean = false;
  loanId: number;
  loanArray: Loan[];
  trans: Transaction = new Transaction();
  cust: Customer = new Customer();
  forecloseForm: FormGroup;
  forecloseAmt: any;
  message: string;
  dangerMessage: string;
  forecloseMessage: string;

  constructor(private customerService: CustomerService, private router: Router, private formBuilder: FormBuilder) {
  }

  id: number = this.customerService.id;

  ngOnInit() {

    //Get user by Customer Id
    this.customerService.getUserById(this.id).subscribe(data => {
      this.cust = data;
    })

    this.forecloseForm = this.formBuilder.group({
      amount: ['', [Validators.required]]
    })

    //Fetching loan list of customer
    this.customerService.getLoansById(this.id).subscribe(data => {
      this.loanArray = data;
    })
  }

  //Paying Monthly EMI function
  payEmi(loan: Loan) {

    if (this.customerService.walletBalance - loan.monthlyEMI < 0) {
      this.dangerMessage = "Not Enough amount in Wallet. Kindly Recharge your wallet.";
      setInterval(() => {
        this.dangerMessage = "";
      }, 5000);
      return;
    }

    //creating a new transaction 
    this.trans.id = this.id;
    this.trans.transTime = new Date();
    this.customerService.walletBalance -= loan.monthlyEMI;
    this.trans.mssg = "₹ " + parseFloat(loan.monthlyEMI).toFixed(2) + " has been DEBITED. Avl Bal : ₹ " + this.customerService.walletBalance.toFixed(2);

    this.customerService.addTransaction(this.trans).subscribe(data => {

      //setting loan object to update it
      if (loan.duration - 1 <= 0) {
        this.customerService.forecloseAccount(loan.loanId).subscribe();
      }
      else {
        loan.duration -= 1;
      }
      this.customerService.applyLoan(loan).subscribe(data => {

        //setting customer object to update it
        this.customerService.transCount += 1;
        this.cust.transCount = this.customerService.transCount;
        this.cust.walletAmt = this.customerService.walletBalance;

        this.customerService.updateCustomer(this.cust).subscribe(data => {
          this.message = "EMI Paid Successfully";
          setInterval(() => {
            this.message = "";
          }, 5000);
        })
      });
    }

    );

  }

//loan foreclosure function
  foreclose(loan: Loan) {
    this.forecloseAmt = loan.monthlyEMI * loan.duration;
    this.loanId = loan.loanId;
  }

  forecloseFormSubmit() {
    this.submitted = true;
    if (this.forecloseForm.invalid) {
      return;
    }

    if (this.customerService.walletBalance < this.forecloseForm.controls.amount.value) {
      this.forecloseMessage = "Not Enough amount in Wallet. Kindly Recharge your wallet.";
      setInterval(() => {
        this.forecloseMessage = "";
      }, 5000);
      this.forecloseForm.reset();
      return;
    }
    if (this.forecloseForm.controls.amount.value != this.forecloseAmt.toFixed(2)) {
      this.forecloseMessage = "Invalid Amount";
      setInterval(() => {
        this.forecloseMessage = "";
      }, 5000);
      this.forecloseForm.reset();
      return;
    }

    this.trans.id = this.id;
    this.trans.transTime = new Date();
    this.customerService.walletBalance -= this.forecloseAmt;
    this.trans.mssg = "₹ " + parseFloat(this.forecloseAmt).toFixed(2) + " has been DEBITED. Avl Bal : ₹ " + this.customerService.walletBalance.toFixed(2);

    this.customerService.addTransaction(this.trans).subscribe(data => {

      this.customerService.forecloseAccount(this.loanId).subscribe(data => {

        this.customerService.transCount += 1;
        this.cust.transCount = this.customerService.transCount
        this.cust.walletAmt = this.customerService.walletBalance;
        this.customerService.loansTaken -= 1;
        this.cust.loansTaken = this.customerService.loansTaken;

        this.customerService.updateCustomer(this.cust).subscribe(data => {
          alert('Loan Foreclosed Successfully');
          this.ngOnInit();
        });
      });
    });
  }

}