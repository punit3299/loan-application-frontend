import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTransComponent } from './main-trans.component';

describe('MainTransComponent', () => {
  let component: MainTransComponent;
  let fixture: ComponentFixture<MainTransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
