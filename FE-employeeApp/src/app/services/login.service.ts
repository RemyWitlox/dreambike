import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { SendUser } from '../models/sendUser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // For login test:
  url: string = 'http://Localhost:2020/api/login';
  username: string = 'Remy';
  password: string = 'Schaap1407!';
  sendUser: SendUser = { username: this.username, password: this.password };
  receiveUser: User;

  constructor(private http: HttpClient) {}

  getLogin(): Observable<User> {
    return this.http.get<User>(this.url, {
      params: { username: 'Remy', password: 'Schaap1407!' },
    });
  }
}
