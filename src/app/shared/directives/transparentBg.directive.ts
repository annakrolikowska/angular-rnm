import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTransparentBg]',
})
export class TransparentBgDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'transparent';
  }
}
