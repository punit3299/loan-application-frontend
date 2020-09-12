import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Loan } from 'src/app/models/loan.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-main-loan-apply',
  templateUrl: './main-loan-apply.component.html',
  styleUrls: ['./main-loan-apply.component.css']
})
export class MainLoanApplyComponent implements OnInit {

  applyLoanForm: FormGroup;
  submitted: boolean = false;
  loan: Loan = new Loan();
  cust: Customer = new Customer();
  message: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private customerService: CustomerService) {

  }

  id: number = this.customerService.id;

  ngOnInit() {

    this.customerService.getUserById(this.id).subscribe(data => {
      this.cust = data;
    }, err => { }
    )

    this.applyLoanForm = this.formBuilder.group({
      loanAmt: ['', [Validators.required, Validators.min(5000)]],
      loanType: ['', [Validators.required, Validators.pattern("^Personal$|^Home$|^Car$|^Others$")]],
      duration: ['', [Validators.required, Validators.min(1), Validators.max(20)]]
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.applyLoanForm.controls; }

  // Apply Loan function
  applyLoan() {
    this.submitted = true;
    if (this.applyLoanForm.invalid) {
      return;
    }

    // Updating customer values
    this.customerService.loansTaken += 1;
    this.cust.loansTaken = this.customerService.loansTaken;
    this.customerService.updateCustomer(this.cust).subscribe();

    //updating loan values
    this.loan.loanAmt = this.applyLoanForm.controls.loanAmt.value;
    this.loan.loanAmt = this.applyLoanForm.controls.loanAmt.value;
    this.loan.loanType = this.applyLoanForm.controls.loanType.value;
    this.loan.duration = this.applyLoanForm.controls.duration.value * 12;
    this.loan.id = this.id;
    this.loan.monthlyEMI = this.setMonthlyEMI(this.loan.loanAmt, this.loan.duration, this.loan.loanType);

    //calling apply loan of service
    this.customerService.applyLoan(this.loan).subscribe(data => {
      this.message = "Loan Applied successfully ";
      setInterval(() => {
        this.message = "";
      }, 5000);

      this.applyLoanForm.reset();
    });
  }

  rate: any;

  setMonthlyEMI(loanAmt: any, duration: any, loanType: any) {

    if (loanType == "Car") {
      this.rate = 6.70;
    }
    else if (loanType == "Home") {
      this.rate = 3.74;
    }
    else if (loanType == "Personal") {
      this.rate = 8.96;
    }
    else {
      this.rate = 9.00;
    }

    let p = loanAmt;
    let r = (this.rate / (12 * 100));
    let t = duration * 12;
    let emi = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
    return emi;
  }

}
