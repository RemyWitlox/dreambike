import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { SendUser } from '../models/sendUser';
import { ReceiveUser } from '../models/receiveUser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // For login test:
  url: string = 'http://Localhost:2020/api/login';
  username: string = 'Remy';
  password: string = 'Schaap1407!';
  sendUser: SendUser = { username: this.username, password: this.password };

  constructor(private http: HttpClient) {}

  getLogin(): Observable<User> {
    return this.http.get<User>(this.url, {
      params: { username: 'Remy', password: '123' },
    });
  }

  authenticate(username: string, password: string): Observable<ReceiveUser> {
    return this.http.get<any>(this.url, {
      params: { username: username, password: password },
    });
  }

  getUserById(id: number) {}
}
