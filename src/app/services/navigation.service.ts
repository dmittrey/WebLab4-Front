import {Router} from '@angular/router';
import {Injectable} from "@angular/core";

@Injectable()
export class NavigationService {

  constructor(private router: Router) {
  }

  goToMain() {
    this.router.navigate(['/main']).then(() => console.log("Go to main!"));
  }

  goToEntry() {
    this.router.navigate(['/entry']).then(() => console.log("Go to entry!"));
  }
}
