import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  getGenre(name: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: name,
        content: description,
      },
    });
  }

  getDirector(name: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: name,
        content: description,
      },
    });
  }

  getMovieDetails(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        title: title,
        content: description,
      },
    });
  }

  /**
   *
   * @param {string} id
   * movies will be added/deleted to the users favorite movie array.
   * isFavorite is created to check if the movie has been added.
   */

  addFavoriteMovie(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((Resp: any) => {
      this.snackBar.open('Added to Favorites List!', 'OK', {
        duration: 2000,
      });
    });
  }

  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavorite(id);
  }

  deleteFavoriteMovie(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((Resp: any) => {
      this.snackBar.open('Removed from Favorites List.', 'OK', {
        duration: 2000,
      });
    });
  }
}
