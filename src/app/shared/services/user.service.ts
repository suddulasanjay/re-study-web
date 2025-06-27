import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, first } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _authService = inject(AuthService);
  private _userValidated$ = new BehaviorSubject<boolean>(false);

  get userValidated$() {
    return this._userValidated$.asObservable();
  }

  get userValidated() {
    return this._userValidated$.value;
  }

  set userValidated(value: boolean) {
    this._userValidated$.next(value);
  }

  initializeUser(){
    this._userValidated$.pipe(distinctUntilChanged()).subscribe((isValidated)=>{
        if(isValidated){
            this._authService.getUserInfo().pipe(first()).subscribe((user) => {})
        }
    })
  }
}
