import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SsoToken } from '../models/response-models/sso-token.response-model';
import {
  API,
  authTokenParam,
  ssoParam,
  ssoParamValue,
} from '../constants/sso.constants';
import { appRoute } from '../../app-route.constants';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { UserDto } from '../models/response-models/user.response-model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _httpClient = inject(HttpClient);
  private _httpBackend = inject(HttpBackend);
  private _httpClientWithoutInterceptor = new HttpClient(this._httpBackend);
  private _logout$ = new Subject<void>();
  private _storageService = inject(StorageService);
  private _router = inject(Router);
  private path = 'Authorization/';
  get logout$() {
    return this._logout$.asObservable();
  }

  getTokenFromAuthorizationCode(code: string): Observable<SsoToken> {
    const url = environment.endpoint + this.path + API.Token;
    const body = {
      [authTokenParam.grantType]: ssoParamValue.grantTypeAuthorizationCode,
      [authTokenParam.grantValue]: code,
      [authTokenParam.redirectUri]: location.origin + '/' + appRoute.validate,
    };
    return this._httpClient.post<SsoToken>(url, body);
  }

  getRefreshToken(): Observable<any> {
    let url = environment.endpoint + this.path + API.Token;
    const body = {
      [authTokenParam.grantType]: ssoParamValue.grantTypeRefreshToken,
      [authTokenParam.grantValue]: this._storageService.getRefreshToken() ?? '',
    };
    return this._httpClientWithoutInterceptor.post<SsoToken>(url, body);
  }

  logout() {
    this._logout$.next();
    this.redirectToSSOLogoutPage();
  }

  redirectToSSOLogoutPage() {
    const redirectUrl = location.origin + '/' + appRoute.validate;
    const url =
      environment.ssoLogoutAPI +
      '?' + new HttpParams().set('redirectTo', redirectUrl).toString();
    window.location.href = url;
  }

  redirectToSSOLoginPage() {
    const redirectUrl = location.origin + '/' + appRoute.validate;
    const url =
      environment.ssoAuthorizeAPI +
      '?' +
      new HttpParams()
        .appendAll({
          [ssoParam.clientId]: environment.clientId,
          [ssoParam.redirectUri]: redirectUrl,
          [ssoParam.responseType]: ssoParamValue.responseTypeCode,
          [ssoParam.scope]:
            ssoParamValue.scopeOfflineAccess + ' ' + ssoParamValue.scopeProfile,
        })
        .toString();
    window.location.replace(url);
  }
}
