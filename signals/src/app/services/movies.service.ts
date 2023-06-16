import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, Subject, tap} from 'rxjs';
import { Movie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  movies$: Subject<Movie[]> = new Subject<Movie[]>();

  private httpClient: HttpClient = inject(HttpClient);

  searchMovies(title: string, year: string): Observable<Movie[]> {
    return this.httpClient
      .get<any>(
        `https://www.omdbapi.com/?apikey=83513884&type=movie&s=${title}${
          year ? `&y=${year}` : ''
        }`
      )
      .pipe(map((data: any) => data.Search), tap((movies: Movie[])=> this.movies$.next(movies)));
  }
}
