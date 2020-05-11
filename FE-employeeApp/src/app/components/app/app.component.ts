import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../../dialogs/login-dialog';
import { Role } from 'src/app/models';
import { Router } from '@angular/router';
import { AuthenticationService, LoginService } from 'src/app/services';
import { ReceiveUser } from 'src/app/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading: boolean;
  connected: boolean;
  title = 'Dreambike';
  currentBackendUser: ReceiveUser;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loginService: LoginService
  ) {
    this.authenticationService.currentBackendUser.subscribe(
      (x) => (this.currentBackendUser = x)
    );
  }

  async ngOnInit() {
    // this.loading = false;
    // this.connected = true;
    this.loading = true;
    this.connected = false;
    await this.loginService.testConnection().subscribe(
      (x) => ((this.connected = x), (this.loading = false)),
      (err) => (
        console.log('HTTP error', err),
        (this.connected = false),
        (this.loading = false)
      )
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
    const dialogRef = this.dialog.open(LoginDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['home']);
    });
  }
}
