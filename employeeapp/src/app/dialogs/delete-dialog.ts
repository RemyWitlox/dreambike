import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DockingService } from '../services/docking.service';
import { BikeService } from '../services/bike.service';

@Component({
  selector: 'delete-dialog',
  templateUrl: './deleteDialog.component.html',
})
export class DeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    public dockingService: DockingService,
    public bikeService: BikeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(data) {
    if (data.name != '') {
      if (data.dockingId) {
        this.dockingService.deleteDockingStation(data.dockingId).subscribe(
          () => {
            this.dialogRef.close();
          },
          (error) => {
            console.error(error);
          }
        );
      } else if (data.bikeId) {
        this.bikeService.deleteBike(data.bikeId).subscribe(
          () => {
            this.dialogRef.close();
          },
          (error) => {
            console.error(error);
          }
        );
      }
      // TODO: send to backend.
    } else {
      console.log('ERROR');

      return;
    }
  }
}
