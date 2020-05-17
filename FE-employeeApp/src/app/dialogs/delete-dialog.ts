import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'delete-dialog',
  templateUrl: './deleteDialog.component.html',
})
export class DeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(data) {
    if (data.name != '') {
      console.log('Delete: ' + data.name);
      // TODO: send to backend.
    } else {
      return;
    }
    this.dialogRef.close();
  }
}
