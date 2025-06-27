import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { appRoute } from '../../app-route.constants';
import { SpinnerComponent } from '../../common/components/spinner/spinner.component';
import { finalize, first } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-validate',
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <app-spinner
      [showSpinner]="isLoading"
      [diameter]="80"
      [strokeWidth]="3"
      color="accent"
    ></app-spinner>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
      }
    `,
  ],
})
export class ValidateComponent implements OnInit {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _authService = inject(AuthService);
  private _storageService = inject(StorageService);
  private _userService = inject(UserService);

  isLoading = true;
  ngOnInit(): void {
    this.checkAuthorizationCode();
  }
  checkAuthorizationCode() {
    const code = this._activatedRoute.snapshot.queryParamMap.get('code');
    if (code) {
      this.getTokenFromAuthorizationCode(code);
    } else {
      this._router.navigate([appRoute.welcome], { replaceUrl: true });
    }
  }

  getTokenFromAuthorizationCode(code: string) {
    this._authService
      .getTokenFromAuthorizationCode(code)
      .pipe(
        first(),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response) => {
          this._storageService.setTokenData(response);
          this._userService.userValidated = true;
          this._router.navigate([appRoute.home], { replaceUrl: true });
        },
        error: () => {
          this._authService.redirectToSSOLoginPage();
        },
      });
  }
}
