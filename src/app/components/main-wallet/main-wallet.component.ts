import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Transaction } from 'src/app/models/transaction.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-wallet',
  templateUrl: './main-wallet.component.html',
  styleUrls: ['./main-wallet.component.css']
})
export class MainWalletComponent implements OnInit {

  addMoneyForm: FormGroup;
  submitted: boolean = false;
  addMessage: string;
  cust: Customer = new Customer();
  trans: Transaction = new Transaction();

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private router: Router) {
  }

  id: number = this.customerService.id;

  ngOnInit() {

    this.customerService.getUserById(this.id).subscribe(data => {
      this.cust = data;
    })

    this.addMoneyForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]]
    })
  }

  addMoney() {

    this.submitted = true;
    if (this.addMoneyForm.invalid) {
      return;
    }

    //updating customer values
    this.cust.walletAmt += parseInt(this.addMoneyForm.controls.amount.value);
    this.customerService.transCount += 1;
    this.cust.transCount = this.customerService.transCount;

    this.customerService.walletBalance = this.cust.walletAmt;

    //setting a new transaction obje
    this.trans.id = this.id;
    this.trans.transTime = new Date();
    this.trans.mssg = "₹ " + parseFloat(this.addMoneyForm.controls.amount.value).toFixed(2) + " has been CREDITED. Avl Bal : ₹ " + this.customerService.walletBalance.toFixed(2);

    
    this.customerService.addTransaction(this.trans).subscribe(data => {
      this.customerService.updateCustomer(this.cust).subscribe(data => {
        this.addMessage = "Money Added Successfully";
        setInterval(() => {
          this.addMessage = "";
        }, 5000);
        this.addMoneyForm.reset();
      });
    })
  }

}
