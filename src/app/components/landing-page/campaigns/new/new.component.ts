import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../../../services/users.service';
import { CompaniesService } from '../../../../services/companies.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { CampaignService } from '../../../../services/campaign.service';


@Component({ 
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent implements OnInit {

  public curr: number;
  public form: FormGroup;
  public users: Array<any> = [];
  public companies: Array<any> = [];
  public touched = false;
  public companyName: string;

  constructor(
    private ROUTE: ActivatedRoute,
    private ROUTER: Router,
    private TOSTADOR: ToastrService,
    private USER_SERVICE: UsersService,
    private COMPANY_SERVICE: CompaniesService,
    private STORAGE_SERVICE: LocalStorageService,
    private CAMPAIGN_SERVICE: CampaignService
  ) { }

  ngOnInit() {

    this.USER_SERVICE.catalog()
    .subscribe(
      ( res: any ) => this.users = res.data,
      ( err: any ) => this.TOSTADOR.error( err.message, '¡Error!' )
    ).add( () => {} );

    this.COMPANY_SERVICE.catalog()
    .subscribe(
      ( res: any ) => this.companies = res.data,
      ( err: any ) => this.TOSTADOR.error( err.message, '¡Error!' )
    ).add( () => {} );

    this.curr = Number(this.ROUTE.snapshot.params.page  || 1 );
    this.form = new FormGroup({
      date:            new FormControl( this.now(), [ Validators.required ] ),
      time:            new FormControl( '10:30', [ Validators.required ] ),
      employees:       new FormControl('', [ Validators.required ] ),
      company:         new FormControl( 0, [ Validators.required ] ),
      type:            new FormControl( 0, [ Validators.required ] ),
      place:           new FormControl( 'Matriz', [ Validators.required ] ),
      aprox_costumers: new FormControl( 0, [ Validators.pattern('^[0-9]+$') ]),
      comments:        new FormControl()
    });
  }

  now(): string {
    const date = new Date();
    return `${ date.getFullYear() }-${ this.addZero( date.getMonth() + 1) }-${ this.addZero( date.getDate() )}`;
  }

  addZero( value: any ): string {
    return value < 10 ? `0${value}` : value;
  }

  save() {
    this.touched = true;
    if ( this.form.status === 'VALID' ) {
      const data = this.form.value;
      data.token = this.STORAGE_SERVICE.getToken();
      data.company_name = this.companyName;
      this.CAMPAIGN_SERVICE.save( data )
      .subscribe(
        () => this.ROUTER.navigateByUrl( '/campaigns/' + this.curr ),
        ( err: any ) =>  this.TOSTADOR.error( err.message, '¡Error!' )
      ).add( () => {} );
    }
  }

}
