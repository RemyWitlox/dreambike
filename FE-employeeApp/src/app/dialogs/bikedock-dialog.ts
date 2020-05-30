import { Component, Inject, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DockingService } from '../services/docking.service';
import { DockingStation, Bike } from '../models';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'bikedock-dialog',
  templateUrl: './bikedockDialog.component.html',
})
export class BikeDockDialog {
  public model: DockingStation;
  bikeDockForm: FormGroup;
  returnUrl: string;
  dockingStations: DockingStation[];
  submitted = false;
  intro = '';
  error = '';
  bike: Bike;

  constructor(
    private dialogRef: MatDialogRef<BikeDockDialog>,
    private formBuilder: FormBuilder,
    private dockingService: DockingService,
    private zone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: Bike
  ) {
    this.bike = data;
    this.zone.run(() => this.getDockingStations());
  }

  getDockingStations() {
    this.dockingService.getDockingStations().subscribe(
      (ds) => {
        this.dockingStations = ds;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    if (this.data) {
      this.intro = 'Change the Docking Station.';
      this.bikeDockForm = this.formBuilder.group({
        bike: [this.data, Validators.required],
        docking: ['', Validators.required],
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  public search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? []
          : this.dockingStations
              .filter(
                (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  public formatter = (ds: DockingStation) => ds.name;

  public selectedItem(location) {
    this.bikeDockForm.controls.docking.setValue(location);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.bikeDockForm.controls;
  }

  async onConfirm() {
    this.submitted = true;
    this.error = '';

    if (this.bikeDockForm.invalid) {
      this.error = 'Form is not complete.';
      return;
    } else if (this.bikeDockForm.get('docking').value == this.data.docking) {
      this.error =
        "Docking stations is not changed. Press 'cancel' if you would like to cancel.";
      //TODO: send to backend
      this.dialogRef.close();
    }
  }
}
