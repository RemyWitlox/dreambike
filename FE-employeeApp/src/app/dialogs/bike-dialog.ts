import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Bike, BikeType, BikeDriver } from '../models';

@Component({
  selector: 'bike-dialog',
  templateUrl: './bikeDialog.component.html',
})
export class BikeDialog {
  bikeForm: FormGroup;
  returnUrl: string;
  submitted = false;
  intro = '';
  error = '';

  constructor(
    private dialogRef: MatDialogRef<BikeDialog>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Bike
  ) {}

  ngOnInit() {
    if (this.data) {
      this.intro = 'Change a Bike.';
      this.bikeForm = this.formBuilder.group({
        name: [this.data.name, Validators.required],
        type: [
          this.data.type,
          [Validators.required, Validators.min(0), Validators.max(999999)],
        ],
        driver: [
          this.data.driver,
          [Validators.required, Validators.min(1), Validators.max(999999)],
        ],
        size: [
          this.data.size,
          [
            Validators.required,
            Validators.maxLength(32),
            Validators.min(-90),
            Validators.max(90),
            Validators.pattern(/\-?\d*\.?\d{1,2}/),
          ],
        ],
        created: [
          this.data.created,
          [
            Validators.required,
            Validators.maxLength(32),
            Validators.min(-180),
            Validators.max(180),
            Validators.pattern(/\-?\d*\.?\d{1,2}/),
          ],
        ],
      });
    } else {
      this.intro = 'Add a Bike.';
      this.bikeForm = this.formBuilder.group({
        name: ['', Validators.required],
        type: [
          BikeType,
          [Validators.required, Validators.min(0), Validators.max(999999)],
        ],
        driver: [
          BikeDriver,
          [Validators.required, Validators.min(1), Validators.max(999999)],
        ],
        size: [
          null,
          [
            Validators.required,
            Validators.maxLength(32),
            Validators.min(-90),
            Validators.max(90),
            Validators.pattern(/\-?\d*\.?\d{1,2}/),
          ],
        ],
        created: [
          new Date(),
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
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.bikeForm.controls;
  }

  async onConfirm() {
    this.submitted = true;
    this.error = '';

    if (this.bikeForm.invalid) {
      this.error = 'Form is not complete.';
      return;
    } else {
      //TODO: send to backend
      this.dialogRef.close();
    }
  }
}
