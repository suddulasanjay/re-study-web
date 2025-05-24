import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NavItem } from "../types/nav-item.type";

@Injectable({
    providedIn: 'root',
  })
export class SideNavService {
    private _sideNavItems$ = new BehaviorSubject<NavItem[] | null>(null);

    constructor() {
      this.fetchNavItems();
    }
    get sideNavItems$() {
      return this._sideNavItems$.asObservable();
    }
  
    setSideNavItems(NavItems: NavItem[] | null) {
      this._sideNavItems$.next(NavItems);
    }

    fetchNavItems(){
        let navItems : NavItem[] = [
            {
                name: 'Home',
                icon: 'assets/icons/icon-home.svg',
                route: ['/home'],
                disabled: false
            },
            {
                name: 'Dashboard',
                icon: 'assets/icons/icon-dashboard.svg',
                route: ['/dashboard'],
                disabled: false
            },
            {
                name: 'Settings',
                icon: 'assets/icons/icon-settings.svg',
                route: ['/settings'],
                disabled: false
            }
        ]
        this.setSideNavItems(navItems);
    }
}