import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  submitted: boolean = false;
  contactForm:FormGroup;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern("[A-Z][a-z]{2,14}")]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

  }

    // convenience getter for easy access to form fields
    get f() { return this.contactForm.controls; }
 
  contact() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    alert("Thanks for Contacting Us");
    this.contactForm.reset();
    this.customerService.contact(this.contactForm.controls.email.value).subscribe();
  }

}
