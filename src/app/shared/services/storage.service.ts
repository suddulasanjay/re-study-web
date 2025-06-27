import { Injectable } from '@angular/core';
import { SsoToken } from '../models/response-models/sso-token.response-model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  TOKEN = 'access_token';
  REFRESH_TOKEN = 'refresh_token';

  setTokenData(response: SsoToken) {
    sessionStorage.setItem(this.TOKEN, response.access_token);
    sessionStorage.setItem(this.REFRESH_TOKEN, response.refresh_token);
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem(this.TOKEN);
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem(this.REFRESH_TOKEN);
  }

  getUser(): string | null {
    return sessionStorage.getItem('user');
  }
}
