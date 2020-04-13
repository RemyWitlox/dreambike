import { Component, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'login-dialog',
  templateUrl: './loginDialog.component.html',
})
export class LoginDialog {
  login = new User();
  loading = false;
  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;
  error = '';

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
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

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('Form is empty');
      return;
    } else {
      this.loading = true;
      this.authenticationService
        .login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.router.navigate([this.returnUrl]);
          },
          (error) => {
            this.error = error;
            this.loading = false;
          }
        );
      this.dialogRef.close();
    }
  }
}
