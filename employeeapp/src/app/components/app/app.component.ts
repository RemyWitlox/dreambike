import { Component, OnInit, NgZone } from '@angular/core';
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
  subtitle = 'DreamBike Employee Application';
  currentBackendUser: ReceiveUser;
  now: Date;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loginService: LoginService,
    private zone: NgZone
  ) {}

  getCurrentBackendUser() {
    this.authenticationService.currentBackendUser.subscribe(
      (x) => (this.currentBackendUser = x)
    );
  }

  ngOnInit() {
    this.loading = true;
    setInterval(() => {
      this.onConnect();
    }, 5000);
    this.zone.run(() => this.getCurrentBackendUser());
  }

  get isAdmin() {
    return (
      this.currentBackendUser && this.currentBackendUser.role === Role.Admin
    );
  }

  get isManagement() {
    return (
      this.currentBackendUser &&
      this.currentBackendUser.role === Role.Management
    );
  }

  onConnect() {
    this.loginService.testConnection().subscribe(
      (succes) => {
        this.connected = succes;
        this.now = new Date();
        console.log('connected', this.now);
      },
      (error) => {
        console.error(error);
        this.connected = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  onLogout(): void {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  onLogin(): void {
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
