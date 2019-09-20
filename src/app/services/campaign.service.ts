import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { link } from '../variables/services.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  public route = 'campaign';
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

  public catalog(): Observable<any> {
    return this.cHttp.get( `${ link }/campaign-catalog` );
  }
}
