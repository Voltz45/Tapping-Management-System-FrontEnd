import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../globalServices/authentication.service";
import {NotificationService} from "../globalServices/notification.service";
import {NotificationTypeEnum} from "../enum/notification-type.enum";

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService, private router: Router,
    private notificationService: NotificationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    }
    // this.router.navigate(['/TMS/login']);
    this.notificationService.notify(NotificationTypeEnum.ERROR, 'Login Heula Atu BOS!!!', 0);
    return true;
  }
}
