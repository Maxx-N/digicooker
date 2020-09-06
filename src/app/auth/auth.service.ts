import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3ghYACNWtYsg3D3Irh9fTb4s-uUVEMlQ',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData: AuthResponseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3ghYACNWtYsg3D3Irh9fTb4s-uUVEMlQ',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData: AuthResponseData) => {
          this.handleAuthentication(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage: string = 'An unknown error occured';
    if (!errorResponse.error != !errorResponse.error.error) {
      return throwError(errorMessage);
    } else {
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists.';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage =
            'There is no user record corresponding to this identifier.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is invalid.';
          break;
        default:
          errorMessage = errorResponse.error.error;
          break;
      }
      return throwError(errorMessage);
    }
  }

  private handleAuthentication(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.userSubject.next(user);
  }
}
