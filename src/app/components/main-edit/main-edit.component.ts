import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-main-edit',
  templateUrl: './main-edit.component.html',
  styleUrls: ['./main-edit.component.css']
})
export class MainEditComponent implements OnInit {
  updateForm: FormGroup;
  submitted: boolean = false;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private router: Router) { }

  id: number = this.customerService.id;

  ngOnInit() {

    this.updateForm = this.formBuilder.group({
      fname: [{ value: '', disabled: true }],
      lname: [{ value: '', disabled: true }],
      gender: [{ value: '', disabled: true }],
      phone: ['', [Validators.required, Validators.pattern("[6-9]{1}[0-9]{9}")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      salary: ['', [Validators.required, Validators.min(5000)]],
      adhaar: [{ value: '', disabled: true }],
      pan: [{ value: '', disabled: true }],
      id: [''],
      loansTaken: [''], 
      transCount: [''],
      walletAmt: ['']
    }
      // ,
      //  {
      //   validator: this.MustMatch('password', 'confirmPassword')
      // }
    );


    this.customerService.getUserById(this.id).subscribe(data => {
      this.updateForm.setValue(data);
    })

  }

  // // custom validator to check that two fields match
  // MustMatch(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //     const control = formGroup.controls[controlName];
  //     const matchingControl = formGroup.controls[matchingControlName];

  //     if (matchingControl.errors && !matchingControl.errors.mustMatch) {
  //       // return if another validator has already found an error on the matchingControl
  //       return;
  //     }

  //     // set error on matchingControl if validation fails
  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ mustMatch: true });
  //     } else {
  //       matchingControl.setErrors(null);
  //     }
  //   }
  // }

  // convenience getter for easy access to form fields
  get f() { return this.updateForm.controls; }

  verifyUpdate() {
    this.customerService.updateCustomer(this.updateForm.getRawValue()).subscribe(data => {
      alert(`Record Updated Successfully !!!`);
    });
  }

} 
