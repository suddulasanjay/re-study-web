import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { SsoToken } from '../models/response-models/sso-token.response-model';

// State management for the interceptor
const state = {
  failedTokenRequest: false,
  isRefreshing: false,
  refreshTokenSubject: new BehaviorSubject<any>(null),
};

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const authService = inject(AuthService);

  const addTokenHeader = (request: HttpRequest<any>, token: string) => {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  };

  const handle401Error = (request: HttpRequest<any>, next: HttpHandlerFn) => {
    if (!state.isRefreshing) {
      state.isRefreshing = true;
      state.refreshTokenSubject.next(null);

      const tokenKey = storageService.getAccessToken();
      const refreshToken = storageService.getRefreshToken();

      if (tokenKey && refreshToken) {
        return authService.getRefreshToken().pipe(
          switchMap((response: SsoToken) => {
            state.isRefreshing = false;
            storageService.setTokenData(response);
            state.refreshTokenSubject.next(response.access_token);

            return next(addTokenHeader(request, response.access_token));
          }),
          catchError((err) => {
            state.isRefreshing = false;
            if (err.url?.includes('token')) {
              if (!state.failedTokenRequest) {
                authService.logout();
              }
              state.failedTokenRequest = true;
            }
            return throwError(() => new Error(err));
          })
        );
      } else {
        authService.logout();
        return throwError(() => new Error('No tokens available'));
      }
    }

    return state.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next(addTokenHeader(request, token)))
    );
  };

  // Skip token requests
  if (req.url.includes('token')) {
    return next(req);
  }

  const token = storageService.getAccessToken();
  if (!token) {
    authService.logout();
    return throwError(() => new Error('No authentication token available'));
  }

  const authReq = addTokenHeader(req, token);

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401 && !req.url.includes('token')) {
        return handle401Error(authReq, next);
      }
      if (req.url.includes('token')) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
