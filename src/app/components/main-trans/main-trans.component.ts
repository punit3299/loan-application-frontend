import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-trans',
  templateUrl: './main-trans.component.html',
  styleUrls: ['./main-trans.component.css']
})
export class MainTransComponent implements OnInit {

  transArray: Transaction[];
  constructor(private customerService: CustomerService, private router: Router) { }

  id:number=this.customerService.id;

  ngOnInit() {

    this.customerService.getTransById(this.id).subscribe(data => {
      this.transArray = data;
    })

  }

}
