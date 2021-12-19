import {Component, ElementRef, OnInit} from '@angular/core';
import {HeaderService} from "../../services/header-service/header.service";
import {RolesUserEnum} from "../../../enum/roles-user.enum";
import {AuthenticationService} from "../../../globalServices/authentication.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../../globalServices/notification.service";
import {NotificationTypeEnum} from "../../../enum/notification-type.enum";

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'tms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  $event!: PointerEvent;
  dataUser: any;

  constructor(
    private _er: ElementRef,
    private router: Router,
    private headerService: HeaderService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getUserData();
  }

  showDropdownMenu() {
    const userDropdownMenu = document.querySelector('.user-dropdown-menu') as HTMLElement;
    if (!userDropdownMenu.classList.contains('show-dropdown')) {
      userDropdownMenu.classList.add('show-dropdown');
    } else {
      userDropdownMenu.classList.remove('show-dropdown')
    }
  }

  onClick($event: PointerEvent) {
    const userDropdownMenu = document.querySelector('.user-dropdown-menu') as HTMLElement;
    if (!this._er.nativeElement.contains($event.target)) {
      userDropdownMenu.classList.remove('show-dropdown')
    }
  }

  getUserData() {
    const userDataFromLocalStorage = this.headerService.loadDataUserFromLocalStorage() || '';
    this.dataUser = JSON.parse(userDataFromLocalStorage);
    this.dataUser.profileImageUrl = this.dataUser.profileImageUrl.replace('localhost', '192.168.1.236');
    if (this.dataUser.roles == "ROLE_USER") {
      this.dataUser.roles = RolesUserEnum.ROLE_USER;
    }
  }

  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['TMS/login']);
    this.sendNotification(NotificationTypeEnum.SUCCESS, `You've been successfully logged out`);
  }

  private sendNotification(notificationType: NotificationTypeEnum, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message, 0);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.', 0);
    }
  }
}
