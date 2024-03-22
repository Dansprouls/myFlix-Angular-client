import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { username: '', password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {}

  /**
   * on login token, user, and username will be stored in localstorage.
   * user will be redirected to the movie page
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.username);

        this.router.navigate(['movies']);
        this.dialogRef.close();
        console.log(data);
        this.snackBar.open('You are now logged in!', 'OK', {
          duration: 2000,
        });
      },
      (data) => {
        console.log(data);
        this.snackBar.open('Something went wrong, please try again', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
