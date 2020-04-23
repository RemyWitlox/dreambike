import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

import { environment } from '../../environments/environment';
import { User } from '../models';
import { Role } from '../models';
import { LoginService } from './login.service';
import { ReceiveUser } from '../models/receiveUser';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  receiveUser: ReceiveUser;
  token: string;

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  loginBackend(username: string, password: string) {
    let decoded: any;
    this.loginService.authenticate(username, password).subscribe((data) => {
      this.token = data.access_token;
      decoded = jwt_decode(this.token + '/// jwt token');
      this.receiveUser = {
        name: decoded.name,
        username: decoded.user_name,
        role: decoded.resource_access.loginapp.roles,
        access_token: this.token,
      };
      localStorage.setItem('backendUser', JSON.stringify(this.receiveUser));
    });
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/users/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          } else {
            return;
          }
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
