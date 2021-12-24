import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'tms-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.animationEvent();
    this.chevronAndChildPositioning();
  }

  chevronAndChildPositioning() {
    const data = document.querySelectorAll('.have-child');
    const collapsed = document.querySelector('.sidebar-container');

    data.forEach(x => {
      const childrenChevron = x.children.item(0)?.children;
      const subChildrenChevron = x.children.item(2);
      const chevronIconInvestigation = childrenChevron?.namedItem('chevron-icon-investigation') as HTMLElement;
      const chevronIconAcquirer = childrenChevron?.namedItem('chevron-icon-acquirer') as HTMLElement;
      const chevronIconIssuer = childrenChevron?.namedItem('chevron-icon-issuer') as HTMLElement;
      const chevronIconMsgFormat = childrenChevron?.namedItem('chevron-icon-msgFormat') as HTMLElement;
      const chevronIconExternalInt = childrenChevron?.namedItem('chevron-icon-external-int') as HTMLElement;
      const chevronIconIso8583Config = subChildrenChevron?.querySelector('#chevron-icon-iso8583-config') as HTMLElement;
      const chevronIconTerminalConfig = childrenChevron?.namedItem('chevron-icon-terminal-config') as HTMLElement;
      const chevronIconUser = childrenChevron?.namedItem('chevron-icon-user') as HTMLElement;
      const chevronIconSystem = childrenChevron?.namedItem('chevron-icon-system') as HTMLElement;

      if (chevronIconInvestigation) {
        chevronIconInvestigation.style.left = x.getBoundingClientRect().right - 165 + 'px';
      }
      if (chevronIconAcquirer) {
        chevronIconAcquirer.style.left = x.getBoundingClientRect().right - 132 + 'px';
      }
      if (chevronIconIssuer) {
        chevronIconIssuer.style.left = x.getBoundingClientRect().right - 114 + 'px';
      }
      if (chevronIconMsgFormat) {
        chevronIconMsgFormat.style.left = x.getBoundingClientRect().right - 194 + 'px';
      }
      if (chevronIconExternalInt) {
        chevronIconExternalInt.style.left = x.getBoundingClientRect().right - 211 + 'px';
      }
      if (chevronIconIso8583Config) {
        chevronIconExternalInt.style.left = x.getBoundingClientRect().right - 498 + 'px';
      }
      if (chevronIconTerminalConfig) {
        chevronIconTerminalConfig.style.left = x.getBoundingClientRect().right - 238 + 'px';
      }
      if (chevronIconUser) {
        chevronIconUser.style.left = x.getBoundingClientRect().right - 206 + 'px';
      }
      if (chevronIconSystem) {
        chevronIconSystem.style.left = x.getBoundingClientRect().right - 123 + 'px';
      }

      x.addEventListener('mouseover', function (this: Element) {
        const top = this.getBoundingClientRect().top;
        const right = this.getBoundingClientRect().right;

        if (this.children.namedItem('dashboard-container') != null) {
          const dashboard = this.children.namedItem('dashboard-container') as HTMLElement;
          dashboard.style.top = top + 'px';
          dashboard.style.left = right + 'px';
        }

        if (this.children.namedItem('investigation-container') != null) {
          const investigation = this.children.namedItem('investigation-container') as HTMLElement;
          investigation.style.top = top + 'px';
          investigation.style.left = right + 'px';
        }

        if (this.children.namedItem('acquirer-container') != null) {
          const acquirer = this.children.namedItem('acquirer-container') as HTMLElement;
          acquirer.style.top = top + 'px';
          acquirer.style.left = right + 'px';
        }

        if (this.children.namedItem('issuer-container') != null) {
          const issuer = this.children.namedItem('issuer-container') as HTMLElement;
          issuer.style.top = top + 'px';
          issuer.style.left = right + 'px';
        }

        if (this.children.namedItem('terminal-config-container') != null) {
          const acquirer = this.children.namedItem('terminal-config-container') as HTMLElement;
          acquirer.style.top = top + 'px';
          acquirer.style.left = right + 'px';
        }

        if (this.children.namedItem('msgFormat-container') != null) {
          const msgFormat = this.children.namedItem('msgFormat-container') as HTMLElement;
          msgFormat.style.top = top + 'px';
          msgFormat.style.left = right + 'px';
        }

        if (this.children.namedItem('external-int-container') != null) {
          const externalInterfaces = this.children.namedItem('external-int-container') as HTMLElement;
          externalInterfaces.style.top = top + 'px';
          externalInterfaces.style.left = right + 'px';
        }

        if (this.children.namedItem('iso8583-container') != null) {
          const app = this.children.namedItem('iso8583-container') as HTMLElement;
          if (collapsed?.classList.contains('collapsed')) {
            app.style.left = right - 67 + 'px';
          } else {
            app.style.left = right - 280 + 'px';
          }
        }

        if (this.children.namedItem('transaction-container') != null) {
          const transaction = this.children.namedItem('transaction-container') as HTMLElement;
          transaction.style.top = top + 'px';
          transaction.style.left = right + 'px';
        }

        if (this.children.namedItem('user-container') != null) {
          const user = this.children.namedItem('user-container') as HTMLElement;
          user.style.top = top + 'px';
          user.style.left = right + 'px';
        }

        if (this.children.namedItem('system-container') != null) {
          const system = this.children.namedItem('system-container') as HTMLElement;
          system.style.top = top + 'px';
          system.style.left = right + 'px';
        }

        if (this.children.namedItem('app-container') != null) {
          if (collapsed?.classList.contains('collapsed')) {
            const app = this.children.namedItem('app-container') as HTMLElement;
            app.style.left = right - 67 + 'px';
          } else {
            const app = this.children.namedItem('app-container') as HTMLElement;
            app.style.left = right - 280 + 'px';
          }
        }
      })
    })
  }

  animationEvent() {
    //Animation
    document.addEventListener('animationstart', function (animation) {
      if (animation.animationName === 'fade-in') {
        const target = animation.target as HTMLElement;
        target.classList.add('did-fade-in');
      }
    })
  }

  expandSidebar() {
    const className = document.querySelector('.sidebar-container');
    const headerLogo = document.querySelector('.header-logo-text');

    if (!className?.classList.contains('collapsed')) {
      className?.classList.add('collapsed');
      if (!headerLogo?.classList.contains('show-logo')) {
        headerLogo?.classList.add('show-logo');
      }
    } else {
      className?.classList.remove('collapsed');
      if (headerLogo?.classList.contains('show-logo')) {
        headerLogo?.classList.remove('show-logo');
      }
    }
  }
}
