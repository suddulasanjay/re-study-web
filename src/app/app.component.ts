import { Component , inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./common/components/header/header.component";
import { SideNavComponent } from "./common/components/side-nav/side-nav.component";
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [RouterOutlet, HeaderComponent, SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  hideSideNav = true;
  title = 're-study';
  private _router = inject(Router);
  ngOnInit() {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this._router.url;
      this.hideSideNav = url === '/welcome';
      });
  }
}
