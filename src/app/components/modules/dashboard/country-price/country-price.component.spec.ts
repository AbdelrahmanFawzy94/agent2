import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPriceComponent } from './country-price.component';

describe('CountryPriceComponent', () => {
  let component: CountryPriceComponent;
  let fixture: ComponentFixture<CountryPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
