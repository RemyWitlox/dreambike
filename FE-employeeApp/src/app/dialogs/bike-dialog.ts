import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Bike, BikeType, BikeDriver } from '../models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'bike-dialog',
  templateUrl: './bikeDialog.component.html',
})
export class BikeDialog {
  types = BikeType;
  drivers = BikeDriver;
  keys = Object.keys;
  bikeForm: FormGroup;
  returnUrl: string;
  submitted = false;
  intro = '';
  error = '';

  constructor(
    private dialogRef: MatDialogRef<BikeDialog>,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: Bike
  ) {}

  ngOnInit() {
    this.bikeForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: [BikeType, Validators.required],
      driver: [BikeDriver, Validators.required],
      size: [null, Validators.required],
      created: ['', Validators.required],
    });
    this.intro = 'Add a Bike.';

    if (this.data?.bikeId) {
      this.intro = 'Change a Bike.';
      console.log(this.data.type);

      this.bikeForm.controls['name'].setValue(this.data.name, {
        onlySelf: true,
      });
      this.bikeForm.controls['type'].setValue(this.data.type, {
        onlySelf: true,
      });
      this.bikeForm.controls['driver'].setValue(this.data.driver, {
        onlySelf: true,
      });
      this.bikeForm.controls['size'].setValue(this.data.size, {
        onlySelf: true,
      });
      this.bikeForm.controls['created'].setValue(
        this.datePipe.transform(this.data.created, 'yyyy-MM-dd'),
        {
          onlySelf: true,
        }
      );
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
      console.log(this.bikeForm.value);
      //TODO: send to backend
      this.dialogRef.close();
    }
  }
}
