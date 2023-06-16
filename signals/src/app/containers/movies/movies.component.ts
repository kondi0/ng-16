import {Component, computed, effect, inject, Input, signal, untracked} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { MovieComponent } from '../../components/movie/movie.component';

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
  @Input() set titleUrl(value: string) {
    this.title.set(value);
  }

  title = signal('');
  year = signal('');
  anotherSignal = signal(0);
  performedSearch = computed(
    () =>
      'Performed Search: ' + untracked(this.title) + ', Year: ' + this.year()
  );
  movies = signal([]);

  private moviesService: MoviesService = inject(MoviesService);

  constructor() {
    // effect(() => {
    //   this.moviesService.searchMovies(untracked(this.title), this.year()).subscribe();
    // });
  }

  async search() {
    const movies = await this.moviesService.searchMovies(
      this.title(),
      this.year()
    );
    this.movies.set(movies);
  }

  updateTitle() {
    this.movies.update((movies) => [{...movies[0], Title: 'New Title'}, ...movies.slice(1)]);
  }
}
