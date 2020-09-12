import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainComponent } from './components/main/main.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { MainEditComponent } from './components/main-edit/main-edit.component';
import { LoanCalculatorComponent } from './components/loan-calculator/loan-calculator.component';
import { MainLoansComponent } from './components/main-loans/main-loans.component';
import { MainTransComponent } from './components/main-trans/main-trans.component';
import { MainWalletComponent } from './components/main-wallet/main-wallet.component';
import { MainLoanApplyComponent } from './components/main-loan-apply/main-loan-apply.component';
import { ErrorComponent } from './components/error/error.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'loan-calculator', component: LoanCalculatorComponent },
  {
    path: 'main/:id', component: MainComponent, children: [
      {
        path: 'main-home', component: MainHomeComponent, children: [
          { path: 'main-wallet', component: MainWalletComponent },
          { path: '**', component: MainLoanApplyComponent },
        ] 
      }, 
      { path: 'main-edit', component: MainEditComponent },
      { path: 'main-loans', component: MainLoansComponent },
      { path: 'main-trans', component: MainTransComponent },
      {
        path: '**', component: MainHomeComponent, children: [
          { path: 'main-wallet', component: MainWalletComponent },
          { path: '**', component: MainLoanApplyComponent },
        ]
      }
    ]
  },
  { path: 'about', component: AboutComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
