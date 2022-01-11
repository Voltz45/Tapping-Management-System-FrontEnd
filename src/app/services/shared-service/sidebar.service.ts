import {Injectable} from '@angular/core';
import {sidebarMenuItem} from "../../interface/shared/sidebar.interface";
import {$sidebarMenu} from "../../constant/shared/sidebar.constant";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  sidebarMenu: sidebarMenuItem[] = $sidebarMenu;

  constructor() { }
}
