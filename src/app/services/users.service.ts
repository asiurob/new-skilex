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
    return this.cHttp.put( `${ link }/users`, data );
  }

  public update( data: any, id: string ): Observable<any> {
    return this.cHttp.post( `${ link }/users/${ id }`, data );
  }

  public fetch( skip: number, limit: number, user?: string ): Observable<any> {
    user = user ? user : '';
    return this.cHttp.get( `${ link }/users/${ skip }/${ limit }/${ user }` );
  }

  public resetPassword( id: string ): Observable<any> {
    return this.cHttp.get( `${ link }/password/${ id }` );
  }

  public getBosses( role: number, dpto: string ): Observable<any> {
    return this.cHttp.get( `${ link }/boss/${ role }/${ dpto }` );
  }
}
