import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { link } from '../variables/services.config';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  public route = 'company';
  constructor(
    private cHttp: HttpClient
  ) { }

  public save( data: any ): Observable<any> {
    return this.cHttp.post( `${ link }/${ this.route }`, data );
  }

  public edit( id: string, data: any ): Observable<any> {
    return this.cHttp.put( `${ link }/${ this.route }/${ id }`, data );
  }

  public fetch( skip: number, limit: number, value?: string ): Observable<any> {
    value = value ? value : '';
    return this.cHttp.get( `${ link }/${ this.route }/${skip}/${limit}/${ value }` );
  }


}
