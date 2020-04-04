import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'login-dialog',
  templateUrl: './loginDialog.component.html',
})
export class LoginDialog {
  matcher = new MyErrorStateMatcher();
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.pattern('[0-9a-zA-Z]*'),
      Validators.required,
    ]),
    password: new FormControl('', Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<LoginDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(loginForm) {
    if (loginForm.value.username != '' || loginForm.value.password != '') {
      console.log(loginForm);
    } else {
      return;
    }
    this.dialogRef.close();
  }
}
