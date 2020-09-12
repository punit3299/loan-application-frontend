import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWalletComponent } from './main-wallet.component';

describe('MainWalletComponent', () => {
  let component: MainWalletComponent;
  let fixture: ComponentFixture<MainWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
