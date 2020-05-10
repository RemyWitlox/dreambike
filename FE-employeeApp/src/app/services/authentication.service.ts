import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

import { LoginService } from './login.service';
import { ReceiveUser } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  receiveUser: ReceiveUser;
  token: string;

  public currentBackendUserSubject: BehaviorSubject<ReceiveUser>;
  public currentBackendUser: Observable<ReceiveUser>;

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.currentBackendUserSubject = new BehaviorSubject<ReceiveUser>(
      JSON.parse(localStorage.getItem('currentBackendUser'))
    );
    this.currentBackendUser = this.currentBackendUserSubject.asObservable();
  }

  public get currentBackendUserValue(): ReceiveUser {
    return this.currentBackendUserSubject.value;
  }

  loginBackend(username: string, password: string) {
    let decoded: any;
    return this.loginService.authenticate(username, password).pipe(
      map((user) => {
        this.token = user.access_token;
        decoded = jwt_decode(this.token + '/// jwt token');
        this.receiveUser = {
          name: decoded.name,
          username: decoded.user_name,
          role: decoded.resource_access.loginapp.roles,
          access_token: this.token,
        };
        localStorage.setItem(
          'currentBackendUser',
          JSON.stringify(this.receiveUser)
        );
        this.currentBackendUserSubject.next(this.receiveUser);
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentBackendUser');
    this.currentBackendUserSubject.next(null);
  }
}
