import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css']
})
export class LoanCalculatorComponent implements OnInit {

  loanAmt;
  interestRate;
  loanDuration;
  emi;

  constructor() { }
  
  ngOnInit() {

  }

  calculateLoan() {
    let principal = this.loanAmt;
    let duration = this.loanDuration;
    let rate = this.interestRate;

    this.emi = this.emi_calculator(principal, rate, duration).toFixed(2);
  }

  emi_calculator(p, r, t) {
    let emi;

    r = r / (12 * 100); // one month interest 
    t = t * 12; // one month period 
    emi = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1); //calculating monthly emi

    return (emi);
  }

}
