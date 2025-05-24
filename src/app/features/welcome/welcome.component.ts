import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { appRoute } from '../../app-route.constants';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  imports : [MatButtonModule]
})
export class WelcomeComponent{
  private _router = inject(Router);
  onGetStarted() {
    this._router.navigate([appRoute.home]);
  }
}
