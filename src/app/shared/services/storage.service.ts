import { Injectable } from '@angular/core';
import { SsoToken } from '../models/response-models/sso-token.response-model';
import { UserDto } from '../models/response-models/user.response-model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  TOKEN = 'access_token';
  REFRESH_TOKEN = 'refresh_token';

  setTokenData(response: SsoToken) {
    localStorage.setItem(this.TOKEN, response.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, response.refresh_token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  getUserValidated(): boolean {
    const userValidated = localStorage.getItem('userValidated');
    if (!!userValidated) {
      return JSON.parse(userValidated );
    }
    return false;
  }

  setUserValidated(userValidated: boolean) {
    localStorage.setItem('userValidated', JSON.stringify(userValidated));
  }

  getUser(): UserDto | null {
    const user = localStorage.getItem('user');
    if (!!user) {
      return JSON.parse(user);
    }
    return null;
  }

  setUser(user: UserDto) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
