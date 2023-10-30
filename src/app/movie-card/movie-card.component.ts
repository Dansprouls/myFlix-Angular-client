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
      console.log(this.movies);
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

  addFavoriteMovie(_id: string): void {
    this.fetchApiData.addFavoriteMovie(_id).subscribe((Resp: any) => {
      this.snackBar.open('Added to Favorites List!', 'OK', {
        duration: 2000,
      });
    });
  }

  /*isFavorite(_id: string): boolean {
    return this.fetchApiData.isFavorite(_id);
  }*/

  deleteFavoriteMovie(_id: string): void {
    this.fetchApiData.deleteFavoriteMovie(_id).subscribe((Resp: any) => {
      this.snackBar.open('Removed from Favorites List.', 'OK', {
        duration: 2000,
      });
    });
  }
}
