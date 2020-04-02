import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../dialogs/login-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}
  loggedIn = false;
  title = 'Dreambike';

  onLogout(): void {
    this.loggedIn = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialog, {
      panelClass: 'dialog',
      width: '350px',
      height: '300px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loggedIn = true;
      console.log('login is gesloten');
    });
  }
}
