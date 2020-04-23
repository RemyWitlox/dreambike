import { Component } from '@angular/core';
import { User } from '../../models';
import {
  UserService,
  AuthenticationService,
  LoginService,
} from '../../services';
import { first } from 'rxjs/operators';
import { ReceiveUser } from 'src/app/models/receiveUser';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loading = false;
  currentUser: User;
  userFromApi: User;
  receivedUser: ReceiveUser;
  token: string;
  decoded: ReceiveUser;
  decodedName: any;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private loginService: LoginService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loading = true;
    if (!this.currentUser) {
      return;
    } else {
      this.userService
        .getById(this.currentUser?.id)
        .pipe(first())
        .subscribe((user) => {
          this.loading = false;
          this.userFromApi = user;
        });
    }
  }

  login() {
    this.loginService.getLogin().subscribe((data) => {
      this.receivedUser = data;
      console.log('receivedUser: ' + JSON.stringify(this.receivedUser));
      this.token = this.receivedUser.access_token + '/// jwt token';
      console.log('token: ' + this.token);
      this.decoded = jwt_decode(this.token);
      console.log('decoded: ' + JSON.stringify(this.decoded));
      this.decodedName = this.decoded['name'];
      console.log('decodedName: ' + this.decodedName);
      this.receivedUser.role = this.decoded['resource_access'];
    });
  }
}
