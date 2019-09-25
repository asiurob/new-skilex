import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from '../../../../services/companies.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { ImageHandlerService } from '../../../../services/image-handler.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  public curr: number;
  public file: any;
  public company: any;
  public imgErr: any;
  public form: FormGroup;
  public touched = false;
  public me: any;
  public pic: string;
  public pagComments: Array<any> = [];
  public indexComments: number;

  constructor(
    private ROUTE: ActivatedRoute,
    private ROUTER: Router,
    private COMPANY_SERVICE: CompaniesService,
    private TOSTADOR: ToastrService,
    private ME: LocalStorageService,
    private IMG_HANDLER: ImageHandlerService
  ) { }


  ngOnInit() {

    this.indexComments = 0;
    this.curr = Number( this.ROUTE.snapshot.params.page ) || 1;
    const name = this.ROUTE.snapshot.params.name;

    if ( name ) {
      this.COMPANY_SERVICE.fetch( 0, 1, name )
      .subscribe(
        ( res: any ) => {
          this.company = res.data[0];
          let x = 0;
          this.company.modification = this.company.modification.reverse();
          for ( let i = 0; i < this.company.modification.length; i += 3 ) {
            this.pagComments[ x ] = this.company.modification.slice( i, (3 + i ) );
            x++;
          }
        },
        ( err: any ) => this.TOSTADOR.error( err.message, '¡Error!' )
      ).add( () => { this.createForm(); this.me = this.ME.getData(); } );
    }
  }

  createForm() {
    this.form = new FormGroup({
      name:    new FormControl( this.company.name, [Validators.required] ),
      contact: new FormControl( this.company.contact, [Validators.required] ),
      type:    new FormControl( this.company.type,  [Validators.required] ),
      phone:   new FormControl( this.company.phone, [Validators.required, Validators.pattern('^[0-9]{10,10}$')] ),
      email:   new FormControl( this.company.email, [Validators.required, Validators.email ] ),
      address: new FormControl( this.company.address, [Validators.required] ),
      status: new FormControl( this.company.status, [Validators.required] )
    });
    this.pic = `http://18.221.70.54:9000//companies/${ this.company.photo }`;
  }

  loadPhoto( file: any ) {
    this.IMG_HANDLER.handler( file )
    .then( ( res: any ) => {
      this.file   = file;
      this.pic = res;
      this.imgErr = null;
    })
    .catch( (err: any) => {
      this.imgErr = err;
      this.file   = null;
      this.pic = null;
    });
  }
  save() {
    if ( this.form.status === 'VALID' ) {
      let fd = new FormData();
      fd.append( 'name', this.form.value.name );
      fd.append( 'contact', this.form.value.contact );
      fd.append( 'type', this.form.value.type );
      fd.append( 'phone', this.form.value.phone );
      fd.append( 'email', this.form.value.email );
      fd.append( 'address', this.form.value.address );
      fd.append( 'status', this.form.value.status );
      fd.append('token',  this.ME.getToken() );
      if ( this.file ) {
        fd.append('image', this.file, 'image' );
      }

      this.COMPANY_SERVICE.edit( this.company._id, fd )
      .subscribe(
        () => this.ROUTER.navigateByUrl('/companies/' + this.curr ),
        (err: any) => this.TOSTADOR.error( err.message, '¡Error!' )
       ).add( () => {});
    }
  }

  plusComments() {
    this.indexComments = (this.indexComments + 1) > ( this.pagComments.length - 1 )
    ? (this.pagComments.length - 1)
    : this.indexComments + 1;
  }

  lessComments() {
    this.indexComments = (this.indexComments - 1) < 0 ? 0 : this.indexComments - 1;
  }

}

