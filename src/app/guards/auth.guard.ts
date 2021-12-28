import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {
    return this.checkLogin();
  }

  checkLogin(): true | UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    }

    // Redirect to the login page
    return this.router.parseUrl('/entry');
  }
}
