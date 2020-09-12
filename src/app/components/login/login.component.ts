import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  id: any;
  errors;
  constructor(public customerService: CustomerService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    // Checking, If anyone is already LoggedIn
    if (localStorage.id != null) {
      this.id = localStorage.id;
      this.router.navigate(['main', this.id]);
    }

    //Login Form Vars
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  get f() { return this.loginForm.controls; }

  //Verifying Login Details
  verifyLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.customerService.verifyLogin(this.loginForm.value).subscribe(data => {
      this.id = data;

      if (this.id != 0) {
        localStorage.id = this.id;
        this.router.navigate(['main', this.id]);
      }
      else {
        this.invalidLogin = true;
      }
    },
      error => {
        this.errors = error;
      });
  }
  invalidLogin: boolean = false;
} 
