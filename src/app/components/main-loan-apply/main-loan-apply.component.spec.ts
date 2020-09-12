import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLoanApplyComponent } from './main-loan-apply.component';

describe('MainLoanApplyComponent', () => {
  let component: MainLoanApplyComponent;
  let fixture: ComponentFixture<MainLoanApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLoanApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLoanApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
