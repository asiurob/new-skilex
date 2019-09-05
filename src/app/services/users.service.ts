import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { link } from '../variables/services.config';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private cHttp: HttpClient,
    private cUser: LocalStorageService
  ) { }

  public save( data: any ): Observable<any> {
    return this.cHttp.post( `${ link }/users`, data );
  }
}
