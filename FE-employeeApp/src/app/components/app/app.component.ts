import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../../dialogs/login-dialog';
import { Role } from 'src/app/models';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services';
import { ReceiveUser } from 'src/app/models/receiveUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading = false;
  title = 'Dreambike';
  currentBackendUser: ReceiveUser;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentBackendUser.subscribe(
      (x) => (this.currentBackendUser = x)
    );
  }

  get isAdmin() {
    return (
      this.currentBackendUser && this.currentBackendUser.role[0] === Role.Admin
    );
  }

  get isManagement() {
    return (
      this.currentBackendUser &&
      this.currentBackendUser.role[0] === Role.Management
    );
  }

  onLogout(): void {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  openDialog(): void {
    this.loading = true;
    const dialogRef = this.dialog.open(LoginDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loading = false;
      this.router.navigate(['home']);
    });
  }
}
