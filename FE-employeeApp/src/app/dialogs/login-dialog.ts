import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/user';
import { ReceiveUser } from '../models/receiveUser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, LoginService } from '../services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'login-dialog',
  templateUrl: './loginDialog.component.html',
})
export class LoginDialog {
  receivedUser: ReceiveUser;
  login = new User();
  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;
  error = '';
  token: string;
  decoded: any;
  decodedName: string;

  constructor(
    private dialogRef: MatDialogRef<LoginDialog>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onConfirm() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      this.error = 'Please enter your username and password.';
      return;
    } else {
      this.authenticationService
        .login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.router.navigate([this.returnUrl]);
            this.dialogRef.close();
          },
          (error) => {
            this.error = 'Your username or password is incorrect.';
            return;
          }
        );

      // If inserted data is not known in db thus not set in localStorage:
      if (!JSON.parse(localStorage.getItem('currentUser'))) {
        this.error = 'Your username or password is incorrect.';
        return;
      }
    }
  }
}
