import { Component } from '@angular/core';
import { User } from '../../models';
import { UserService, AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // For login test:
  url: string =
    'http://localhost:8080/auth/realms/DreamBikeKeyCloak/protocol/openid-connect/';
  authUrl: string = this.url + 'auth';
  accesTokenUrl: string = this.url + 'token';

  // Keep these attributes after test:
  loading = false;
  currentUser: User;
  userFromApi: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loading = true;
    this.userService
      .getById(this.currentUser?.id)
      .pipe(first())
      .subscribe((user) => {
        this.loading = false;
        this.userFromApi = user;
      });
  }

  // function for login-test
  login() {
    console.log('login button');
  }
}
