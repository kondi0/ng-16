import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import {map, Observable, of} from 'rxjs';
import { MovieComponent } from '../../components/movie/movie.component';
import {Movie} from "../../models/movie.interface";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MovieComponent,
  ],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  private moviesService: MoviesService = inject(MoviesService);

  title = '';
  year = '';

  movies$: Observable<Movie[]> = of([]);

  search() {
    this.movies$ = this.moviesService.searchMovies(this.title, this.year);
  }

}
