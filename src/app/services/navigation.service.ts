import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Injectable, OnInit} from "@angular/core";

//todo Можно дёргать параметры с другой странички!
// https://angular.io/guide/router#accessing-query-parameters-and-fragments

@Injectable()
export class NavigationService {

  goToMain() {
    console.log("Go to main!");
    this.router.navigate(['/main']);
  }

  goToEntry() {
    console.log("Go to entry!");
    this.router.navigate(['/entry']);
  }

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }
}
