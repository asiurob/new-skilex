import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LoginService } from '../login.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private cLogin: LoginService,
               private cRouter: Router,
               private cLs: LocalStorageService) {}

  canActivate(): Observable<boolean | UrlTree> {

    return this.cLogin.isLogged()
        .pipe(
            // Si la petición es exitosa se puede proceder
            map( () => true ),
            // Si la peticion tiene un error de estado >= 400 se dirige al login
            catchError( () => {
               this.cLs.deleteData();
               return of(this.cRouter.createUrlTree( ['/login'] ) );
            })
        );
    }
}

