import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DockingService } from '../services/docking.service';

@Component({
  selector: 'delete-dialog',
  templateUrl: './deleteDialog.component.html',
})
export class DeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    public dockingService: DockingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(data) {
    if (data.name != '') {
      this.dockingService
        .deleteDockingStation(data.dockingId)
        .subscribe({ error: (e) => console.error(e) });
      console.log('Delete: ' + data.name);
      // TODO: send to backend.
    } else {
      return;
    }
    this.dialogRef.close();
  }
}
