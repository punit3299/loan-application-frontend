import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent implements OnInit {

  cust: Customer = new Customer();

  constructor(public customerService: CustomerService, private router: Router) { }

  id: number = this.customerService.id;

  ngOnInit() {
    this.customerService.getUserById(this.id).subscribe(data => {
      this.cust = data;
    }
    )
  }
}
