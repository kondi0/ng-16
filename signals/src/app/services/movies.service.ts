import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, map, Observable, Subject, tap} from "rxjs";
import {Movie} from "../models/movie.interface";

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  omdapi = 'https://www.omdbapi.com/';
  omdapi_apikey = '83513884';

  movies$: Subject<Movie[]> = new Subject<Movie[]>();

  private httpClient: HttpClient = inject(HttpClient);

  searchMovies(title: string, year: string): Promise<Movie[]> {
    return firstValueFrom(this.httpClient.get<any>(`${this.getUrl()}s=${title}${year ? `&y=${year}` : ''}`).pipe(map((data: any) => data.Search), tap((movies: Movie[]) => this.movies$.next(movies))));
  }

  private getUrl(): string {
    return `${this.omdapi}?apikey=${this.omdapi_apikey}&type=movie&`;
  }
}
