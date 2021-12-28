import {Router} from '@angular/router';
import {Injectable} from "@angular/core";

//todo Можно дёргать параметры с другой странички!
// https://angular.io/guide/router#accessing-query-parameters-and-fragments

@Injectable()
export class NavigationService {

  //todo CanDeactivate to mediate navigation away from the current route.
  // Через это буду отрезать токен

  goToMain() {
    console.log("Go to main!");
    this.router.navigate(['/main']);
  }

  goToEntry() {
    console.log("Go to entry!");
    this.router.navigate(['/entry']);
  }

  constructor(private router: Router) {
  }
}
