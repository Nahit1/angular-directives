import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

export interface MovieList {
  id: number;
  name: string;
  rate: number;
  image: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  selectedFiles?: FileList;
  preview = '';

  form = this.fb.group({
    file: [null],
    name: [null],
    rate: [0],
  });
  maxSize: number = 5242880;
  movieList: MovieList[] = [
    {
      id: 1,
      name: 'Godfather',
      rate: 9.5,
      image:
        'https://www.canvasprintsaustralia.net.au/wp-content/uploads/2014/03/TheGodFather.jpeg',
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Dark Knight',
      rate: 9.1,
      image:
        'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      isFavorite: false,
    },
  ];

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {}

  addFavorites(id: number) {
    this.movieList = this.movieList.map((item) => {
      if (item.id === id) {
        item.isFavorite = !item.isFavorite;
      }

      return item;
    });
  }

  save() {
    const newMovie: MovieList = {
      id: new Date().getMilliseconds(),
      name: this.form.controls['name'].value ?? '',
      rate: this.form.controls['rate'].value ?? 0,
      image: this.preview,
      isFavorite: false,
    };
    console.log(newMovie);

    this.movieList.push(newMovie);
    this.form.reset();
  }

  setImage(event: any) {
    if (event) {
      this.preview = '';

      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.preview = e.target.result;
      };

      reader.readAsDataURL(event);
    }
  }
}
