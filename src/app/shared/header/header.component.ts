import {Component, ElementRef, OnInit} from '@angular/core';
import {AuthenticationService} from "../../layout/service/authentication.service";
import {Route, Router} from "@angular/router";

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

  constructor(
    private _er: ElementRef,
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
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

  public onLogOut(): void {
    this.authenticationService.logout();
    this.router.navigate(['/TMS/login']);
  }
}
