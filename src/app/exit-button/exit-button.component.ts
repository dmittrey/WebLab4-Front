import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {NavigationService} from "../services/navigation.service";

@Component({
  selector: 'app-exit-button',
  templateUrl: './exit-button.component.html',
  styleUrls: ['./exit-button.component.scss']
})
export class ExitButtonComponent {

  constructor(private authService: AuthService,
              private navigationService: NavigationService) {
  }

  logout() {
    this.authService.logout();
    this.navigationService.goToEntry();
  }
}
