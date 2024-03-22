import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://star-wars-myflix-1632.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {}

  /**
   *  api call to user registration endpoint
   * @param userDetails
   * @returns a user that has been registered in the DB
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * direct users to the login page.
   * @param userDetails
   * @returns stores token and user data in local storage and logs in the user
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @returns all of the movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @param title
   * @returns one movie by title
   */
  getOneMovies(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @param directorName
   * @returns name of  Director
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @param genreName
   * @returns name of the genre
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @returns returns one user
   */
  getUser(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * list of favorite movies shown on profile page
   * @returns users favoriteMovies array
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http
      .get(apiUrl + 'users/' + user, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  /**
   * @param updatedUser
   * @returns takes the data the user wants to change and updates it for the user in the database
   */
  editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + username, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   *
   * @param movieID
   * @param username
   * @returns favoriteMovie array with newly added movie id
   */
  addFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this.http
      .post(apiUrl + 'users/' + username + '/movies/' + movieId, null, {
        headers,
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * @param movieID
   * @param username
   * @returns favoriteMovies array with movie id removed
   */
  deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http
      .delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  // addFavoriteMovie(movieId: string): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   const user = JSON.parse(localStorage.getItem('user') || '{}');

  //   user.favoriteMovies.push(movieId);
  //   localStorage.setItem('user', JSON.stringify(user));

  //   return this.http
  //     .post(apiUrl + 'users/' + user.username + '/movies/' + movieId, {
  //       headers: new HttpHeaders({
  //         Authorization: 'Bearer ' + token,
  //       }),
  //     })
  //     .pipe(map(this.extractResponseData), catchError(this.handleError));
  // }

  // deleteFavoriteMovie(movieId: string): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   const user = JSON.parse(localStorage.getItem('user') || '{}');

  //   const index = user.favoriteMovies.indexOf(movieId);
  //   if (index > -1) {
  //     user.favoriteMovies.splice(index, 1);
  //   }

  //   localStorage.setItem('user', JSON.stringify(user));

  //   return this.http
  //     .delete(apiUrl + 'users/' + user.username + '/movies/' + movieId, {
  //       headers: new HttpHeaders({
  //         Authorization: 'Bearer ' + token,
  //       }),
  //     })
  //     .pipe(map(this.extractResponseData), catchError(this.handleError));
  // }

  /**
   * @param movieID
   * @returns a boolean value that will check if the favorite movies array has any movieID
   */
  isFavorite(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return user.favoriteMovies.indexOf(movieId) >= 0;
  }

  /**
   * @returns user account is deleted from the database
   */
  deleteUser(): Observable<any> {
    const userid = localStorage.getItem('userid');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + userid, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
