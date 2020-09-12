import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public loading = false;
  cust: Customer;
  currentId: number;
  name: string;

  constructor(public customerService: CustomerService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.currentId = params['id'];
      this.customerService.id = this.currentId;
    })
  }

  ngOnInit() {

    if (localStorage.id == null) {
      this.router.navigate(['login']);
    }

    if(localStorage.id!=this.currentId){
      this.router.navigate(['error']);
    }

    this.loading=true;

    this.customerService.getUserById(this.currentId).subscribe(data => {
      this.cust = data;
      this.name = this.cust.fname;
      this.customerService.walletBalance = this.cust.walletAmt;
      this.customerService.loansTaken = this.cust.loansTaken;
      this.customerService.transCount = this.cust.transCount;

      this.loading=false;
    }, err => { 
      if (err.ok == false) {
        this.router.navigate(['error']);
      }
    })
  }

  showDashboard() {
    this.router.navigate(['main-home'], { relativeTo: this.route });
  }
  showEdit() {
    this.router.navigate(['main-edit'], { relativeTo: this.route });
  }
  showLoans() {
    this.router.navigate(['main-loans'], { relativeTo: this.route });
  }
  showTrans() {
    this.router.navigate(['main-trans'], { relativeTo: this.route });
  }
  addMoney() {
    this.router.navigate(['main-home/main-wallet'], { relativeTo: this.route });
  }

  logOut() {

    if (localStorage.key != null) {
      localStorage.removeItem("id");
      this.router.navigate(['/login']);
    }
  }

}
