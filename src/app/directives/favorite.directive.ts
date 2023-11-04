import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appFavorite]',
})
export class FavoriteDirective implements OnInit {
  @Input() isFavoriteVal: boolean | undefined;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    if (this.isFavoriteVal) {
      this.element.nativeElement.innerHTML = 'star';
    } else {
      this.element.nativeElement.innerHTML = 'star_border';
    }
  }

  @HostListener('click') handleAddFavorite() {
    if (this.isFavoriteVal)
      this.element.nativeElement.innerHTML = 'star_border';
    if (!this.isFavoriteVal) this.element.nativeElement.innerHTML = 'star';
  }
}
