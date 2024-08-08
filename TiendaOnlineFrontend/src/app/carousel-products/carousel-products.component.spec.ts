import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselProductsComponent } from './carousel-products.component';

describe('CarouselProductsComponent', () => {
  let component: CarouselProductsComponent;
  let fixture: ComponentFixture<CarouselProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselProductsComponent]
    });
    fixture = TestBed.createComponent(CarouselProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
