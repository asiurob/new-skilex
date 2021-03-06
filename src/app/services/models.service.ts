import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { link } from '../variables/services.config';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  public route = 'glass-models';
  constructor(
    private cHttp: HttpClient,
    private cUser: LocalStorageService
  ) { }

  public save( name: string, brand: string ): Observable<any> {
    return this.cHttp.post( `${ link }/${ this.route }/`, {name, brand, user: this.cUser.getIndex('id'), token: this.cUser.getToken()} );
  }

  public fetch( skip: number, limit: number, value?: string ): Observable<any> {
    value = value ? value : '';
    return this.cHttp.get( `${ link }/${ this.route }/${skip}/${limit}/${ value }` );
  }

  public edit( id: string, name: string, brand: string ): Observable<any> {
    return this.cHttp.put( `${ link }/${ this.route }/${ id }`, { name, brand, user: this.cUser.getIndex('id')  } );
  }

  public swapStatus( id: string, status: string ): Observable<any> {
    return this.cHttp.delete( `${ link }/${ this.route }/${id}/${status}` );
  }

  public findByBrand( id: string ): Observable<any> {
    return this.cHttp.get( `${ link }/glass-brand-model/${id}` );
  }
}
