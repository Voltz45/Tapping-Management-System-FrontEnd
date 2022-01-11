import {sidebarMenuItem} from "../../interface/shared/sidebar.interface";

export const $sidebarMenu: sidebarMenuItem[] = [
  {
    className: 'sidebar-menu-item have-child',
    routerLink: 'dashboard',
    itemContainer: {
      className: 'sidebar-item-container',
      itemIconClass: 'sidebar-item-icon bx bxs-dashboard',
      itemTextClass: 'sidebar-item-text',
      itemText: 'Dashboard',
      chevronClass: null,
      chevronId: null
    },
    firstSubmenuContainer: {
      className: 'first-submenu-container not-child',
      firstSubmenuId: 'dashboard-container',
      submenuHeader: null,
      submenuList: {
        className: 'first-submenu-list',
        subMenuItem: [
          {
            className: 'first-submenu-item',
            routerLink: 'dashboard',
            submenuItemIconClass: null,
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'Dashboard',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          },
        ]
      }
    }
  },
  {
    className: 'sidebar-menu-item have-child',
    routerLink: null,
    itemContainer: {
      className: 'sidebar-item-container',
      itemIconClass: 'sidebar-item-icon bx bx-search-alt-2',
      itemTextClass: 'sidebar-item-text',
      itemText: 'Investigation',
      chevronClass: 'chevron-icon bx bx-chevron-down',
      chevronId: 'chevron-icon-investigation'
    },
    firstSubmenuContainer: {
      className: 'first-submenu-container',
      firstSubmenuId: 'investigation-container',
      submenuHeader: {
        className: 'first-submenu-header',
        submenuHeaderTextClass: 'first-submenu-text',
        submenuHeaderText: 'Investigation'
      },
      submenuList: {
        className: 'first-submenu-list',
        subMenuItem: [
          {
            className: 'first-submenu-item',
            routerLink: 'investigation/alert-analysis',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-error',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'Alert Analysis',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          },
        ]
      }
    }
  },
  {
    className: 'sidebar-menu-item have-child',
    routerLink: null,
    itemContainer: {
      className: 'sidebar-item-container',
      itemIconClass: 'sidebar-item-icon bx bx-laptop',
      itemTextClass: 'sidebar-item-text',
      itemText: 'Acquirer',
      chevronClass: 'chevron-icon bx bx-chevron-down',
      chevronId: 'chevron-icon-acquirer'
    },
    firstSubmenuContainer: {
      className: 'first-submenu-container',
      firstSubmenuId: 'acquirer-container',
      submenuHeader: {
        className: 'first-submenu-header',
        submenuHeaderTextClass: 'first-submenu-text',
        submenuHeaderText: 'Acquirer'
      },
      submenuList: {
        className: 'first-submenu-list',
        subMenuItem: [
          {
            className: 'first-submenu-item',
            routerLink: 'acquirer/channel-list',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-desktop',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'Terminal List',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          },
          {
            className: 'first-submenu-item',
            routerLink: 'acquirer/alert',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-error',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'Alert',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          }
        ]
      }
    }
  },
  {
    className: 'sidebar-menu-item have-child',
    routerLink: null,
    itemContainer: {
      className: 'sidebar-item-container',
      itemIconClass: 'sidebar-item-icon bx bxs-credit-card',
      itemTextClass: 'sidebar-item-text',
      itemText: 'Issuer',
      chevronClass: 'chevron-icon bx bx-chevron-down',
      chevronId: 'chevron-icon-issuer'
    },
    firstSubmenuContainer: {
      className: 'first-submenu-container',
      firstSubmenuId: 'issuer-container',
      submenuHeader: {
        className: 'first-submenu-header',
        submenuHeaderTextClass: 'first-submenu-text',
        submenuHeaderText: 'Issuer'
      },
      submenuList: {
        className: 'first-submenu-list',
        subMenuItem: [
          {
            className: 'first-submenu-item',
            routerLink: 'issuer/channel-list',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-desktop',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'Terminal List',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          },
          {
            className: 'first-submenu-item',
            routerLink: 'issuer/alert',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-error',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'Alert',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          }
        ]
      }
    }
  },
  {
    className: 'sidebar-menu-item have-child',
    routerLink: null,
    itemContainer: {
      className: 'sidebar-item-container',
      itemIconClass: 'sidebar-item-icon bx bx-code-alt',
      itemTextClass: 'sidebar-item-text',
      itemText: 'Message Format',
      chevronClass: 'chevron-icon bx bx-chevron-down',
      chevronId: 'chevron-icon-msgFormat'
    },
    firstSubmenuContainer: {
      className: 'first-submenu-container',
      firstSubmenuId: 'msgFormat-container',
      submenuHeader: {
        className: 'first-submenu-header',
        submenuHeaderTextClass: 'first-submenu-text',
        submenuHeaderText: 'Message Format'
      },
      submenuList: {
        className: 'first-submenu-list',
        subMenuItem: [
          {
            className: 'first-submenu-item',
            routerLink: 'message-format/iso8583-format',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-code',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'ISO8583 Format',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          }
        ]
      }
    }
  },
  {
    className: 'sidebar-menu-item have-child',
    routerLink: null,
    itemContainer: {
      className: 'sidebar-item-container',
      itemIconClass: 'sidebar-item-icon bx bx-data',
      itemTextClass: 'sidebar-item-text',
      itemText: 'External Interfaces',
      chevronClass: 'chevron-icon bx bx-chevron-down',
      chevronId: 'chevron-icon-external-int'
    },
    firstSubmenuContainer: {
      className: 'first-submenu-container',
      firstSubmenuId: 'external-int-container',
      submenuHeader: {
        className: 'first-submenu-header',
        submenuHeaderTextClass: 'first-submenu-text',
        submenuHeaderText: 'External Interfaces'
      },
      submenuList: {
        className: 'first-submenu-list',
        subMenuItem: [
          {
            className: 'first-submenu-item have-child',
            routerLink: null,
            submenuItemIconClass: 'first-submenu-item-icon bx bx-layer',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'ISO8583 Configuration',
            submenuChevronClass: 'chevron-icon bx bx-chevron-down',
            submenuChevronId: 'chevron-icon-iso8583-config',
            secondSubmenuContainer: {
              className: 'second-submenu-container',
              secondSubmenuId: 'iso8583-container',
              submenuList: {
                className: 'second-submenu-list',
                submenuItem: [
                  {
                    className: 'second-submenu-item',
                    routerLink: 'external-interfaces/iso8583-configuration/iso8583-dialect',
                    submenuItemIconClass: 'second-submenu-item-icon bx bx-code-curly',
                    submenuItemTextClass: 'second-submenu-item-text',
                    submenuItemText: 'ISO Dialects'
                  },
                  {
                    className: 'second-submenu-item',
                    routerLink: 'external-interfaces/iso8583-configuration/iso8583Field-Configuration',
                    submenuItemIconClass: 'second-submenu-item-icon bx bx-code-curly',
                    submenuItemTextClass: 'second-submenu-item-text',
                    submenuItemText: 'ISO Field Configuration'
                  },
                  {
                    className: 'second-submenu-item',
                    routerLink: 'external-interfaces/iso8583-configuration/iso8583-ResponseMapping',
                    submenuItemIconClass: 'second-submenu-item-icon bx bx-code-curly',
                    submenuItemTextClass: 'second-submenu-item-text',
                    submenuItemText: 'Response Mapping'
                  }
                ]
              }
            }
          },
          {
            className: 'first-submenu-item',
            routerLink: 'external-interfaces/iso20022',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-layer',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'ISO20022',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          },
          {
            className: 'first-submenu-item',
            routerLink: 'external-interfaces/json-configuration',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-code-curly',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'JSON Configuration',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          },
          {
            className: 'first-submenu-item',
            routerLink: 'external-interfaces/NDC',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-cube',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'NDC',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          },
          {
            className: 'first-submenu-item',
            routerLink: 'external-interfaces/xml-configuration',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-code',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'XML Configuration',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          }
        ]
      }
    }
  },
  {
    className: 'sidebar-menu-item have-child',
    routerLink: null,
    itemContainer: {
      className: 'sidebar-item-container',
      itemIconClass: 'sidebar-item-icon bx bx-desktop',
      itemTextClass: 'sidebar-item-text',
      itemText: 'Channel Configuration',
      chevronClass: 'chevron-icon bx bx-chevron-down',
      chevronId: 'chevron-icon-channel-config'
    },
    firstSubmenuContainer: {
      className: 'first-submenu-container',
      firstSubmenuId: 'channel-config-container',
      submenuHeader: {
        className: 'first-submenu-header',
        submenuHeaderTextClass: 'first-submenu-text',
        submenuHeaderText: 'Channel Configuration'
      },
      submenuList: {
        className: 'first-submenu-list',
        subMenuItem: [
          {
            className: 'first-submenu-item',
            routerLink: 'channel-configuration/channel',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-server',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'Channel',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          },
          {
            className: 'first-submenu-item',
            routerLink: 'channel-configuration/channel-type',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-server',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'Channel Type',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          }
        ]
      }
    }
  },
  {
    className: 'sidebar-menu-item have-child',
    routerLink: 'transaction',
    itemContainer: {
      className: 'sidebar-item-container',
      itemIconClass: 'sidebar-item-icon bx bx-transfer',
      itemTextClass: 'sidebar-item-text',
      itemText: 'Transaction',
      chevronClass: null,
      chevronId: null
    },
    firstSubmenuContainer: {
      className: 'first-submenu-container not-child',
      firstSubmenuId: 'transaction-container',
      submenuHeader: null,
      submenuList: {
        className: 'first-submenu-list',
        subMenuItem: [
          {
            className: 'first-submenu-item',
            routerLink: 'transaction',
            submenuItemIconClass: null,
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'Transaction',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          },
        ]
      }
    }
  },
  {
    className: 'sidebar-menu-item have-child',
    routerLink: null,
    itemContainer: {
      className: 'sidebar-item-container',
      itemIconClass: 'sidebar-item-icon bx bxs-user-account',
      itemTextClass: 'sidebar-item-text',
      itemText: 'User Management',
      chevronClass: 'chevron-icon bx bx-chevron-down',
      chevronId: 'chevron-icon-user'
    },
    firstSubmenuContainer: {
      className: 'first-submenu-container',
      firstSubmenuId: 'user-container',
      submenuHeader: {
        className: 'first-submenu-header',
        submenuHeaderTextClass: 'first-submenu-text',
        submenuHeaderText: 'UserModel Management'
      },
      submenuList: {
        className: 'first-submenu-list',
        subMenuItem: [
          {
            className: 'first-submenu-item',
            routerLink: 'user-management/private-scheme',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-code-alt',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'Private Schemes',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          },
          {
            className: 'first-submenu-item',
            routerLink: 'user-management/roles',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-layer',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'Roles',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          },
          {
            className: 'first-submenu-item',
            routerLink: 'user-management/user',
            submenuItemIconClass: 'first-submenu-item-icon bx bxs-user-rectangle',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'Users',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          }
        ]
      }
    }
  },
  {
    className: 'sidebar-menu-item have-child',
    routerLink: null,
    itemContainer: {
      className: 'sidebar-item-container',
      itemIconClass: 'sidebar-item-icon bx bx-server',
      itemTextClass: 'sidebar-item-text',
      itemText: 'System',
      chevronClass: 'chevron-icon bx bx-chevron-down',
      chevronId: 'chevron-icon-system'
    },
    firstSubmenuContainer: {
      className: 'first-submenu-container',
      firstSubmenuId: 'system-container',
      submenuHeader: {
        className: 'first-submenu-header',
        submenuHeaderTextClass: 'first-submenu-text',
        submenuHeaderText: 'System'
      },
      submenuList: {
        className: 'first-submenu-list',
        subMenuItem: [
          {
            className: 'first-submenu-item have-child',
            routerLink: null,
            submenuItemIconClass: 'first-submenu-item-icon bx bx-code-curly',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'Application Parameters',
            submenuChevronClass: 'chevron-icon bx bx-chevron-down',
            submenuChevronId: 'chevron-icon-app-parameter',
            secondSubmenuContainer: {
              className: 'second-submenu-container',
              secondSubmenuId: 'app-container',
              submenuList: {
                className: 'second-submenu-list',
                submenuItem: [
                  {
                    className: 'second-submenu-item',
                    routerLink: 'system/application-parameters/ARP',
                    submenuItemIconClass: 'second-submenu-item-icon bx bx-code-curly',
                    submenuItemTextClass: 'second-submenu-item-text',
                    submenuItemText: 'ARP'
                  }
                ]
              }
            }
          },
          {
            className: 'first-submenu-item',
            routerLink: 'system/system-parameters',
            submenuItemIconClass: 'first-submenu-item-icon bx bx-code-curly',
            submenuItemTextClass: 'first-submenu-item-text',
            submenuItemText: 'System Parameters',
            submenuChevronClass: null,
            submenuChevronId: null,
            secondSubmenuContainer: null
          }
        ]
      }
    }
  }
]
