import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  submitted: boolean = false;
  registerForm: FormGroup;
  errors;
  id;

  constructor(private custService: CustomerService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    // Checking, If anyone is already LoggedIn
    if (localStorage.id != null) { 
      this.id = localStorage.id;
      this.router.navigate(['main', this.id]);
    }
    this.registerForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.pattern("[A-Z][a-z]{2,14}")]],
      lname: ['', [Validators.required, Validators.pattern("[A-Z][a-z]{2,14}")]],
      gender: ['', [Validators.required, Validators.pattern("^Male$|^Female$")]],
      phone: ['', [Validators.required, Validators.pattern("[6-9]{1}[0-9]{9}")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      salary: ['', [Validators.required, Validators.min(5000)]],
      adhaar: ['', [Validators.required, Validators.pattern("[0-9]{12}")]],
      pan: ['', [Validators.required, Validators.pattern]]
    });
  }

  get mustMatch() {
    if (this.registerForm.controls.password.value != this.registerForm.controls.confirmPassword.value) {
      return true;
    }
    else {
      return false;
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  verifySignup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }


    this.custService.addCustomer(this.registerForm.value).subscribe(data => {
      var r = confirm("Do you want to Confirm ?");
      if (r == true) {
        if (data != null) {
          alert(`${this.registerForm.controls.fname.value} record is added successfully !!!`);
          this.router.navigate(['login']);
        }
        else {
          this.invalidSignup = true;
          setInterval(() => {
            this.invalidSignup = false;
          }, 5000);
          this.registerForm.reset();
        }
      }
    },
      error => {
        this.errors = error;
      });

  }
  invalidSignup: boolean = false;
}
