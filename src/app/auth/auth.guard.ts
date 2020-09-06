import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.userSubject.pipe(
      take(1),
      map((user) => {
        const isAuth: boolean = !!user;
        if (isAuth) {
          return true;
        } else {
          return this.router.createUrlTree(['/auth']);
        }
      })
      //   tap((isAuth) => {
      //     if (!isAuth) {
      //       this.router.navigate(['/auth']);
      //     }
      //   })
    );
  }
}
