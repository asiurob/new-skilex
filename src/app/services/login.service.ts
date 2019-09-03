import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { link } from '../variables/services.config';
import LoginUser from '../components/login/login.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  public getLogin( user: LoginUser ): Observable<any> {
    return this.http.post( `${ link }/login`, user );
  }
}
