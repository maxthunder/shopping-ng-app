import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[zoom]'
})
export class ZoomDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.border('lime', 'solid', '5px');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.border();
  }

  @HostListener('wheel', ['$event']) onWheel(event: any) {
    event.preventDefault();
    if (event.deltaY > 0)
      this.changeSize(-15);
    else if (event.deltaY < 0)
      this.changeSize(15);
  }

  @HostListener('click', ['$event']) onClick(event: any) {
    event.preventDefault();
    this.resetSize();
  }

  private border(
    color: string = null,
    type: string = null,
    width: string = null
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'border-color', color);
    this.renderer.setStyle(this.el.nativeElement, 'border-style', type);
    this.renderer.setStyle(this.el.nativeElement, 'border-width', width);
  }

  private changeSize(sizechange: any) {
    let height: any = this.el.nativeElement.offsetHeight;
    let newHeight: any = height + sizechange;
    this.renderer.setStyle(this.el.nativeElement, 'height', newHeight + 'px');
  }

  private resetSize() {
    this.renderer.setStyle(this.el.nativeElement, 'height', '250px');
  }

}
