import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  refreshTokenUrl: string = 'http://localhost:8080/api/auth/refresh/';
  loginUrl: string = 'http://localhost:9004/api/auth/login/';
  logoutUrl: string = 'http://localhost:9004/api/user/logout/';
  meInfoUrl: string = 'http://localhost:9004/api/user/me';

  constructor(private http: HttpClient) {}

  login(password: string, username: string): Observable<any> {
    var deviceInfo = new Device();
    deviceInfo.deviceId = (Math.random() + 1).toString(36).substr(1, 36);
    deviceInfo.deviceType = 'DEVICE_TYPE_ANDROID';
    deviceInfo.notificiationToken = (Math.random() + 1)
      .toString(36)
      .substr(1, 36);
    localStorage.setItem('deviceId', deviceInfo.deviceId);
    localStorage.setItem('deviceType', deviceInfo.deviceType);
    localStorage.setItem('notificationToken', deviceInfo.notificiationToken);
    const payload = { password, username, deviceInfo };
    console.log(payload);
    return Observable.create((observer) => {
      this.http.post(this.loginUrl, payload).subscribe((data: User) => {
        observer.next({ accessToken: data.accessToken });
        const expiresAt = this.addSeconds(new Date(), data.expiryDuration);
        localStorage.setItem('accesstoken', data.accessToken);
        localStorage.setItem('refreshtoken', data.refreshToken);
        localStorage.setItem('expiresat', expiresAt.valueOf.toString());
        console.log(data);
        const test = localStorage.getItem('accesstoken');
        console.log(test);
        console.log(localStorage.getItem('accesstoken'));
        observer.complete();
      });
    });
  }

  logOut(): Observable<any> {
    var deviceInfo = new Device();
    deviceInfo.deviceId = localStorage.getItem('deviceId');
    deviceInfo.deviceType = localStorage.getItem('deviceType');
    deviceInfo.deviceType = localStorage.getItem('notificationToken');
    var observable = Observable.create((observer) => {
      this.http.post(this.logoutUrl, deviceInfo).subscribe((data: any) => {});
    });
    localStorage.clear();
    return observable;
  }

  addSeconds(date, amount) {
    var tzOff = date.getTimezoneOffset() * 60 * 1000,
      t = date.getTime(),
      d = new Date(),
      tzOff2;

    t += 1000 * amount;
    d.setTime(t);

    tzOff2 = d.getTimezoneOffset() * 60 * 1000;
    if (tzOff != tzOff2) {
      var diff = tzOff2 - tzOff;
      t += diff;
      d.setTime(t);
    }
    return d;
  }
}
