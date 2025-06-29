import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../../shared/services/user.service';
import { StorageService } from '../../../shared/services/storage.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MatMenuModule, MatIconModule, MatFormFieldModule],
})
export class HeaderComponent {
  private _authService = inject(AuthService);
  private _userService = inject(UserService);
  private _storageService = inject(StorageService);
  CreateOrRegister = 'Create or Register Account';
  userName = '';
  isLoggedIn = false;

  ngOnInit() {
    this._userService.userValidated$.subscribe((isValidated) => {
      this.isLoggedIn = isValidated;
      if (this.isLoggedIn) {
        this._userService.userInitialized$.subscribe((isInitialized) => {
          if (isInitialized) {
            const user = this._storageService.getUser();
            if (!!user) {
              this.userName = user.firstName + ' ' + user.lastName;
            }
          }
        });
      }
    });
  }

  logout() {
    this._authService.logout();
  }
}
