import { Routes } from '@angular/router';

export const routes: Routes = [{ path: '', redirectTo: 'movies', pathMatch: 'full' },{
  path: 'movies',
  loadComponent: () =>
    import('./containers/movies/movies.component').then(
      ({ MoviesComponent }) => MoviesComponent
    ),
},];
