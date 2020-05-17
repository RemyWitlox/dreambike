import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DockingStation } from '../models';

@Component({
  selector: 'docking-dialog',
  templateUrl: './dockingDialog.component.html',
})
export class DockingDialog {
  dockingForm: FormGroup;
  returnUrl: string;
  submitted = false;
  intro = '';
  error = '';

  constructor(
    private dialogRef: MatDialogRef<DockingDialog>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DockingStation
  ) {}

  ngOnInit() {
    if (this.data) {
      this.intro = 'Change a Docking station.';
      this.dockingForm = this.formBuilder.group({
        name: [this.data.name, Validators.required],
        bikes: [
          this.data.bikes,
          [Validators.required, Validators.min(0), Validators.max(999999)],
        ],
        capacity: [
          this.data.capacity,
          [Validators.required, Validators.min(1), Validators.max(999999)],
        ],
        lat: [
          this.data.lat,
          [
            Validators.required,
            Validators.maxLength(32),
            Validators.min(-90),
            Validators.max(90),
            Validators.pattern(/\-?\d*\.?\d{1,2}/),
          ],
        ],
        lng: [
          this.data.lng,
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
      this.intro = 'Add a Docking station.';
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
      //TODO: send to backend
      this.dialogRef.close();
    }
  }
}
