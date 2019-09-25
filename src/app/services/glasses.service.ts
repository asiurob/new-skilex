import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { link } from '../variables/services.config';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GlassesService {

  public route = 'glasses';

  constructor(
    private cHttp: HttpClient,
    private cUser: LocalStorageService
  ) { }

  public save( data: any ): Observable<any> {
    data.token = this.cUser.getIndex('token');
    return this.cHttp.post( `${ link }/${ this.route }`, data );
  }

  public edit( data: any, id: string ): Observable<any> {
    data.token = this.cUser.getIndex('token');
    return this.cHttp.put( `${ link }/${ this.route }/${ id }`, data );
  }

  public fetch( skip: number, limit: number, value?: string ): Observable<any> {
    value = value ? value : '';
    return this.cHttp.get( `${ link }/${ this.route }/${skip}/${limit}/${ value }` );
  }

  public swapStatus( id: string, status: string ): Observable<any> {
    return this.cHttp.delete( `${ link }/${ this.route }/${id}/${status}` );
  }
}
