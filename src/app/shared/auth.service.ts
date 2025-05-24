import { HttpBackend, HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _httpClient = inject(HttpClient);
  private _httpBackend = inject(HttpBackend);
  private _httpClientWithoutInterceptor = new HttpClient(this._httpBackend);
  private _logout$ = new Subject<void>();
  private _router = inject(Router);
  constructor() {}
  get logout$() {
    return this._logout$.asObservable();
  }

  getTokenFromAuthorizationCode(code: string): Observable<any> {
    return {} as any;
  }

  getRefreshToken(): Observable<any> {
    return {} as any;
  }

  getUserInfo(): Observable<any> {
    return {} as any;
  }

  logout() {
    this._logout$.next();
    this.redirectToSSOLogoutPage();
  }

  redirectToSSOLogoutPage() {
    
  }

  redirectToSSOLoginPage() {
  }
}
