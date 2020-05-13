import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.dockingForm = this.formBuilder.group({
      name: ['', Validators.required],
      bikes: [
        null,
        [Validators.required, Validators.min(0), Validators.max(999999)],
      ],
      capacity: [
        null,
        [Validators.required, Validators.min(1), Validators.max(999999)],
      ],
      lat: [
        null,
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.min(-90),
          Validators.max(90),
          Validators.pattern(/\-?\d*\.?\d{1,2}/),
        ],
      ],
      lng: [
        null,
        [
          Validators.required,
          Validators.maxLength(32),
          Validators.min(-180),
          Validators.max(180),
          Validators.pattern(/\-?\d*\.?\d{1,2}/),
        ],
      ],
    });
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
      this.error = 'Form is not complete.';
      return;
    } else {
      console.log('do stuff');
    }
  }
}
