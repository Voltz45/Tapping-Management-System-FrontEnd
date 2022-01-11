import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../services/authentication-service/authentication.service";
import {NotificationService} from "../services/notification-service/notification.service";

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService, private router: Router,
    private notificationService: NotificationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn(route, state);
  }

  private isUserLoggedIn(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigate(['/TMS/login'], {queryParams: {returnUrl: state.url}})
      this.notificationService.errorNotification('Please login first to access the other page.', 0);
    }
    return false;
  }
}
