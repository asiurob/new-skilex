import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../../../services/users.service';
import { CompaniesService } from '../../../../services/companies.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { CampaignService } from '../../../../services/campaign.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  public curr: number;
  public form: FormGroup;
  public users: Array<any> = [];
  public companies: Array<any> = [];
  public touched = false;
  public companyName: string;
  public campaign: any;

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
    this.curr = Number(this.ROUTE.snapshot.params.page  || 1 );
    const name = this.ROUTE.snapshot.params.name;

    if ( name ) {

      this.CAMPAIGN_SERVICE.fetch(0, 1, name)
      .subscribe(
        ( res: any ) => this.campaign = res.data[0],
        ( err: any ) => this.TOSTADOR.error( err.message, '¡Error!' )
      ).add( () => {
        this.createForm();
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
      } );

    }



  }

  createForm() {
    const employees = this.campaign.employees.map( ( e: any ) => e._id );
    const d = new Date( this.campaign.date );
    const date = `${ d.getFullYear() }-${ this.addZero( d.getMonth() + 1) }-${ this.addZero( d.getDate() )}`;
    const time = `${ d.getHours() }:${ d.getMinutes() }`;
    this.form = new FormGroup({
      date:            new FormControl( date, [ Validators.required ] ),
      time:            new FormControl( time, [ Validators.required ] ),
      employees:       new FormControl( employees, [ Validators.required ] ),
      company:         new FormControl( this.campaign.company._id, [ Validators.required ] ),
      type:            new FormControl( this.campaign.type, [ Validators.required ] ),
      aprox_costumers: new FormControl( this.campaign.aprox_costumers, [ Validators.pattern('^[0-9]+$') ]),
      comments:        new FormControl( this.campaign.comments )
    });

    this.form.controls.company.disable({ onlySelf: true });
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
