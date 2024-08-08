import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel-products',
  templateUrl: './carousel-products.component.html',
  styleUrls: ['./carousel-products.component.css']
})
export class CarouselProductsComponent implements AfterViewInit{

  @ViewChild('carousel') carouselRef!: ElementRef<HTMLDivElement>;

  private cellCount: number = 9;
  private selectedIndex: number = 0;

  ngAfterViewInit() {
    this.initCarousel();
  }

  private initCarousel() {
    this.updateCarouselRotation();
  }

  private updateCarouselRotation() {
    const carousel = this.carouselRef.nativeElement;
    const angle = (this.selectedIndex / this.cellCount) * -360;
    carousel.style.transform = `translateZ(-288px) rotateY(${angle}deg)`;
  }

  prev() {
    this.selectedIndex = (this.selectedIndex - 1 + this.cellCount) % this.cellCount;
    this.updateCarouselRotation();
  }

  next() {
    this.selectedIndex = (this.selectedIndex + 1) % this.cellCount;
    this.updateCarouselRotation();
  }
}
