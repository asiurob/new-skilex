import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { link } from '../variables/services.config';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private cHttp: HttpClient,
    private cUser: LocalStorageService
  ) { }

  public save( name: string ): Observable<any> {
    return this.cHttp.post( `${ link }/departments/`, {name, user: this.cUser.getIndex('id'), token: this.cUser.getToken()} );
  }

  public fetch( value?: string ): Observable<any> {
    value = value ? value : '';
    return this.cHttp.get( `${ link }/departments/${ value }` );
  }

  public edit( id: string, name: string ): Observable<any> {
    return this.cHttp.put( `${ link }/departments/${ id }`, { name, user: this.cUser.getIndex('id')  } );
  }
}
