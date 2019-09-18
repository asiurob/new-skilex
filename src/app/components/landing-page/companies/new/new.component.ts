import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ImageHandlerService } from '../../../../services/image-handler.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CompaniesService } from '../../../../services/companies.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent implements OnInit {

  public brands: Array<any> = [];
  public curr: number;
  public form: FormGroup;
  public file: any;
  public render: any;
  public imgErr: any;
  public touched = false;
  public me: any;
  constructor(
    private tostador: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private imgHandler: ImageHandlerService,
    private cLs: LocalStorageService,
    private comService: CompaniesService,
  ) { }

  ngOnInit() {
    this.curr = Number( this.route.snapshot.params.page ) || 1;
    this.me = this.cLs.getData();
    this.form = new FormGroup({
      name:    new FormControl( '', [Validators.required] ),
      contact: new FormControl( '', [Validators.required] ),
      type:    new FormControl( 0,  [Validators.required] ),
      phone:   new FormControl( '', [Validators.required, Validators.pattern('^[0-9]{10,10}$')] ),
      email:   new FormControl( '', [Validators.required, Validators.email ] ),
      address: new FormControl( '', [Validators.required] )
    });
  }

  loadPhoto( file: any ) {
    this.imgHandler.handler( file )
    .then( ( res: any ) => {
      this.file   = file;
      this.render = res;
      this.imgErr = null;
    })
    .catch( (err: any) => {
      this.imgErr = err;
      this.file   = null;
      this.render = null;
    });
  }

  save() {
    this.touched = true;
    if ( this.form.status !== 'INVALID' && this.file ) {
        const fd = new FormData();
        fd.append( 'name', this.form.value.name );
        fd.append( 'contact', this.form.value.contact );
        fd.append( 'type', this.form.value.type );
        fd.append( 'phone', this.form.value.phone );
        fd.append( 'email', this.form.value.email );
        fd.append( 'address', this.form.value.address );
        fd.append( 'name', this.form.value.name );
        fd.append('token',  this.cLs.getToken() );
        fd.append('image', this.file, 'image' );
        this.comService.save( fd )
        .subscribe(
          () => this.router.navigateByUrl('/companies/' + this.curr ),
          (err: any) => this.tostador.error( err.message, '¡Error!' )
        ).add( () =>  {});
    }
  }
}
