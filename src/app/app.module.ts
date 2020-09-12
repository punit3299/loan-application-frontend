import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { MainEditComponent } from './components/main-edit/main-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { LoanCalculatorComponent } from './components/loan-calculator/loan-calculator.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainLoansComponent } from './components/main-loans/main-loans.component';
import { MainTransComponent } from './components/main-trans/main-trans.component';
import { MainWalletComponent } from './components/main-wallet/main-wallet.component';
import { MainLoanApplyComponent } from './components/main-loan-apply/main-loan-apply.component';
import { CustomerService } from './services/customer.service';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import { AboutComponent } from './components/about/about.component';

import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    MainComponent,
    MainHomeComponent,
    MainEditComponent,
    LoanCalculatorComponent,
    NavbarComponent,
    MainLoansComponent,
    MainTransComponent,
    MainWalletComponent,
    MainLoanApplyComponent,
    FooterComponent,
    ErrorComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
