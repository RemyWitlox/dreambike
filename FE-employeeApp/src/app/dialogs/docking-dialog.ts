import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'docking-dialog',
  templateUrl: './dockingDialog.component.html',
})
export class DockingDialog {
  dockingForm: FormGroup;
  returnUrl: string;
  submitted = false;
  error = '';

  constructor(
    private dialogRef: MatDialogRef<DockingDialog>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentBackendUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.dockingForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.dockingForm.controls;
  }

  async onConfirm() {
    this.submitted = true;
    this.error = '';

    if (this.dockingForm.invalid) {
      this.error = 'Please enter your username and password.';
      return;
    } else {
      await this.authenticationService
        .loginBackend(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.router.navigate([this.returnUrl]);
            this.dialogRef.close();
          },
          (error) => {
            this.error = 'Your username or password is incorrect.';
          }
        );
    }
  }
}
