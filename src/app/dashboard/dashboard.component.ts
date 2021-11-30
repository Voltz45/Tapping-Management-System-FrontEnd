import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

  ngAfterViewInit(): void {
    const data = document.querySelectorAll('.have-child');
    const collapsed = document.querySelector('.sidebar-container');

    //Animation
    document.addEventListener('animationstart', function (animation) {
      if (animation.animationName === 'fade-in') {
        const target = animation.target as HTMLElement;
        target.classList.add('did-fade-in');
      }
    })

    data.forEach(x => {
      const childrenChevron = x.children.item(0)?.children;
      const chevronIconInvestigation = childrenChevron?.namedItem('chevron-icon-investigation') as HTMLElement;
      const chevronIconAcquirer = childrenChevron?.namedItem('chevron-icon-acquirer') as HTMLElement;
      const chevronIconIssuer = childrenChevron?.namedItem('chevron-icon-issuer') as HTMLElement;
      const chevronIconExternalInt = childrenChevron?.namedItem('chevron-icon-external-int') as HTMLElement;
      const chevronIconTerminalConfig = childrenChevron?.namedItem('chevron-icon-terminal-config') as HTMLElement;
      const chevronIconUser = childrenChevron?.namedItem('chevron-icon-user') as HTMLElement;
      const chevronIconSystem = childrenChevron?.namedItem('chevron-icon-system') as HTMLElement;

      if (chevronIconInvestigation) {
        chevronIconInvestigation.style.left = x.getBoundingClientRect().right - 160 + 'px';
      }
      if (chevronIconAcquirer) {
        chevronIconAcquirer.style.left = x.getBoundingClientRect().right - 134 + 'px';
      }
      if (chevronIconIssuer) {
        chevronIconIssuer.style.left = x.getBoundingClientRect().right - 115 + 'px';
      }
      if (chevronIconTerminalConfig) {
        chevronIconTerminalConfig.style.left = x.getBoundingClientRect().right - 228 + 'px';
      }
      if (chevronIconExternalInt) {
        chevronIconExternalInt.style.left = x.getBoundingClientRect().right - 198 + 'px';
      }
      if (chevronIconUser) {
        chevronIconUser.style.left = x.getBoundingClientRect().right - 195 + 'px';
      }
      if (chevronIconSystem) {
        chevronIconSystem.style.left = x.getBoundingClientRect().right - 124 + 'px';
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

        if (this.children.namedItem('external-int-container') != null) {
          const externalInterfaces = this.children.namedItem('external-int-container') as HTMLElement;
          externalInterfaces.style.top = top + 'px';
          externalInterfaces.style.left = right + 'px';
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
            app.style.left = right - 273 + 'px';
          }
        }
      })
    })
  }


  test(event: MouseEvent) {
    console.log(event)
    const test = document.getElementsByClassName('have-child')[0] as HTMLElement;
    const investigation = document.getElementsByClassName('investigation-container')[0] as HTMLElement;
    const externalInterfaces = document.getElementsByClassName('first-submenu-container')[0] as HTMLElement;

    investigation.style.top = test.getBoundingClientRect().top + 'px';
    investigation.style.left = test.getBoundingClientRect().right + 'px';
    externalInterfaces.style.top = test.getBoundingClientRect().top + 'px';
    externalInterfaces.style.left = test.getBoundingClientRect().right + 'px';
  }

}
