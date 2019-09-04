import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { link } from '../variables/services.config';
import LoginUser from '../components/login/login.interface';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private cHttp: HttpClient,
    private cUser: LocalStorageService
  ) { }

  public getLogin( user: LoginUser ): Observable<any> {
    return this.cHttp.post( `${ link }/login`, user );
  }

  public isLogged() {
    return this.cHttp.get(`${ link }/login/${ this.cUser.getData().token }`);
  }
}
