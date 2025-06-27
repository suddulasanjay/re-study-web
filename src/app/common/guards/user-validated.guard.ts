import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

export const userValidatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  if (userService.userValidated) {
    return true;
  } else {
    authService.redirectToSSOLoginPage();
    return false;
  }
};
