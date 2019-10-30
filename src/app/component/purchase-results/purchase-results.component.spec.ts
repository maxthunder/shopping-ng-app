import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseResultsComponent } from './purchase-results.component';

describe('PurchaseResultsComponent', () => {
  let component: PurchaseResultsComponent;
  let fixture: ComponentFixture<PurchaseResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
