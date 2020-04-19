import { Component } from '@angular/core';
import { User } from '../../models';
import { UserService, AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    private authenticationService: AuthenticationService,
    private http: HttpClient
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
  login(): Observable<any> {
    const username: string = "Remy";
    const password: string = "Schaap1407!";
    const payload = { username, password};
    return Observable.create(observer => {
      this.http.post(this.authUrl, payload).subscribe((data: User) => {
          console.log(data);
          observer.next({accessToken: data.accessToken});
          localStorage.setItem("accesstoken", data.accessToken);
          localStorage.setItem("refreshtoken", data.refreshToken);
          console.log(data);
          const test = localStorage.getItem("accesstoken");
          console.log(test);
          console.log(localStorage.getItem("accesstoken"));
          observer.complete();
      })
  }
}
