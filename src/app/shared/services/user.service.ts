import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, distinctUntilChanged, first } from 'rxjs';
import { AuthService } from './auth.service';
import { UserDto } from '../models/response-models/user.response-model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _httpClient = inject(HttpClient);
  private _authService = inject(AuthService);
  private _storageService = inject(StorageService);
  private _userValidated$ = new BehaviorSubject<boolean>(false);
  private _userInitialized$ = new BehaviorSubject<boolean>(false);
  path = 'User/';

  constructor() {
    this.initializeUser();
    this._authService.logout$.subscribe(() => {
      this.userValidated = false;
    });
  }

  get userValidated$() {
    return this._userValidated$.asObservable();
  }

  get userValidated() {
    return this._storageService.getUserValidated() || this._userValidated$.value;
  }

  set userValidated(value: boolean) {
    this._storageService.setUserValidated(value);
    this._userValidated$.next(value);
  }

  get userInitialized$() {
    return this._userInitialized$.asObservable();
  }

  initializeUser() {
    this._userValidated$
      .pipe(distinctUntilChanged())
      .subscribe((isValidated) => {
        if (isValidated) {
          this.getUserInfo()
            .pipe(first())
            .subscribe((user) => {
              this._storageService.setUser(user);
              this._userInitialized$.next(true);
            });
        }
      });
      if(this._storageService.getUserValidated()){
        this._userValidated$.next(true);
      }
  }

  getUserInfo(): Observable<UserDto> {
    const url = environment.endpoint + this.path;
    return this._httpClient.get<UserDto>(url);
  }
}
