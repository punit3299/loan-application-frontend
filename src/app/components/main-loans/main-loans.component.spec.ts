import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLoansComponent } from './main-loans.component';

describe('MainLoansComponent', () => {
  let component: MainLoansComponent;
  let fixture: ComponentFixture<MainLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
