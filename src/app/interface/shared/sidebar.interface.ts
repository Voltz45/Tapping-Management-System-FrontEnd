export interface sidebarMenuItem {
  className: string;
  routerLink: string | null;
  itemContainer: sidebarItemContainer;
  firstSubmenuContainer: firstSubmenuContainer;
}

export interface sidebarItemContainer {
  className: string;
  itemIconClass: string;
  itemTextClass: string;
  itemText: string;
  chevronClass: string | null;
  chevronId: string | null;
}

export interface firstSubmenuContainer {
  className: string;
  firstSubmenuId: string;
  submenuHeader: firstSubmenuHeader | null;
  submenuList: firstSubmenuList;
}

export interface firstSubmenuHeader {
  className: string;
  submenuHeaderTextClass: string;
  submenuHeaderText: string;
}

export interface firstSubmenuList {
  className: string;
  subMenuItem: firstSubmenuItem[];
}

export interface firstSubmenuItem {
  className: string;
  routerLink: string | null;
  submenuItemIconClass: string | null;
  submenuItemTextClass: string;
  submenuItemText: string;
  submenuChevronClass: string | null;
  submenuChevronId: string | null;
  secondSubmenuContainer: secondSubmenuContainer | null;
}

export interface secondSubmenuContainer {
  className: string;
  secondSubmenuId: string;
  submenuList: secondSubmenuList;
}

export interface secondSubmenuList {
  className: string;
  submenuItem: secondSubmenuItem[];
}

export interface secondSubmenuItem {
  className: string;
  routerLink: string;
  submenuItemIconClass: string;
  submenuItemTextClass: string;
  submenuItemText: string;
}
