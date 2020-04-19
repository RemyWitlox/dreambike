import { Component, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/user';
import { ReceiveUser } from '../models/receiveUser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, LoginService } from '../services';
import { first } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

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
    public dialogRef: MatDialogRef<LoginDialog>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loginService: LoginService
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

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('Form is empty');
      return;
    } else {
      this.authenticationService
        .login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.router.navigate([this.returnUrl]);
          },
          (error) => {
            this.error = error;
          }
        );

      this.loginService.getLogin().subscribe((data) => {
        this.receivedUser = data;
        console.log('receivedUser: ' + this.receivedUser);
        this.token = this.receivedUser.access_token + '/// jwt token';
        console.log('token: ' + this.token);
        this.decoded = jwt_decode(this.token);
        console.log('decoded: ' + this.decoded);
        this.decodedName = this.decoded['name'];
        console.log('decodedName: ' + this.decodedName);
      });
      this.dialogRef.close();
    }
  }
}
