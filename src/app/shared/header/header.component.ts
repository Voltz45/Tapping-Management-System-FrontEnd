import {Component, ElementRef, OnInit} from '@angular/core';

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

  constructor(private _er: ElementRef) {
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
}
