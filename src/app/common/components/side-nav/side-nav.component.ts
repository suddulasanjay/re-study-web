import { Component, OnInit, inject } from '@angular/core';
import { SideNavService } from '../../services/side-nav.service';
import { NavItem } from '../../types/nav-item.type';
import { Subscription } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone : true,
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  imports : [MatTooltipModule]
})
export class SideNavComponent{
  private _router = inject(Router);
  private _sideNavService = inject(SideNavService);
  sideNavItems: NavItem[] | null = null;
  subscriptions = new Subscription();
  ngOnInit() {
    this.subscribeSideNavItems();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  subscribeSideNavItems(): void {
    const userMenuSubscription = this._sideNavService.sideNavItems$.subscribe(
      (sideNavItems) => {
        this.sideNavItems = sideNavItems;
      },
    );
    this.subscriptions.add(userMenuSubscription);
  }

  navItemClick(navItem : NavItem) : void {
    if (navItem.route?.join('/') === this._router.url) {
      location.reload();
    } else if (navItem.route) {
      navItem.disabled = true;
      this._router
        .navigate(navItem.route)
        .finally(() => (navItem.disabled = false));
    }
  }
}
