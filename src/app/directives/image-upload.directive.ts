import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appImageUpload]',
})
export class ImageUploadDirective {
  maxSize: number = 5242880;
  @Output() selectedImage = new EventEmitter<File>();
  constructor() {}

  @HostListener('change', ['$event.target.files']) handleImageUpload(
    files: FileList
  ) {
    const file = files.item(0);
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only PNG, JPEG and GIF images are allowed.');
      return;
    }

    if (file.size > this.maxSize) {
      alert('File size exceeds limit. Maximum allowed size is 5MB.');
      return;
    }

    this.selectedImage.emit(file);
  }
}
