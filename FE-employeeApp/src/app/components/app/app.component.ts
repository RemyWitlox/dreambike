import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../../dialogs/login-dialog';
import { User, Role } from 'src/app/models';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Dreambike';
  currentUser: User;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isManagement() {
    return this.currentUser && this.currentUser.role === Role.Management;
  }

  onLogout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
    this.router.navigate(['/home']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialog, {
      panelClass: 'dialog',
      width: '350px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('login is gesloten');
      this.router.navigate(['/home']);
    });
  }
}
