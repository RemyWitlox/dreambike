import { Component } from '@angular/core';
import { AuthenticationService } from '../../services';
import { ReceiveUser } from 'src/app/models/receiveUser';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loading = false;
  currentBackendUser: ReceiveUser;
  userFromApi: ReceiveUser;

  constructor(private authenticationService: AuthenticationService) {
    this.currentBackendUser = this.authenticationService.currentBackendUserValue;
  }

  ngOnInit() {
    this.loading = true;
    if (!this.currentBackendUser) {
      return;
    } else {
      this.loading = false;
      this.userFromApi = this.currentBackendUser;
    }
  }
}
