import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { link } from '../variables/services.config';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(
    private cHttp: HttpClient,
    private cUser: LocalStorageService
  ) { }

  public save( name: string ): Observable<any> {
    return this.cHttp.post( `${ link }/glass-brands/`, {name, user: this.cUser.getIndex('id'), token: this.cUser.getToken()} );
  }

  public fetch( skip: number, limit: number, filter?: number, value?: string ): Observable<any> {
    value = value ? value : '';
    return this.cHttp.get( `${ link }/glass-brands/${skip}/${limit}/${filter}/${ value }` );
  }

  public edit( id: string, name: string ): Observable<any> {
    return this.cHttp.put( `${ link }/glass-brands/${ id }`, { name, user: this.cUser.getIndex('id')  } );
  }

  public swapStatus( id: string, status: string ): Observable<any> {
    return this.cHttp.delete( `${ link }/glass-brands/${id}/${status}` );
  }
}
