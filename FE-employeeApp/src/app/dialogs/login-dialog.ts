import { Component, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Login } from '../models/login';

@Component({
  selector: 'login-dialog',
  templateUrl: './loginDialog.component.html',
})
export class LoginDialog {
  login = new Login();
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    private loginService: LoginService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(loginForm) {
    if (loginForm.value.username != '' || loginForm.value.password != '') {
      console.log('Form not empty');
      this.loginService
        .login(this.login.password, this.login.username)
        .subscribe((data) => {});
    } else {
      console.log('Form is empty');
      return;
    }
    this.dialogRef.close();
  }
}
