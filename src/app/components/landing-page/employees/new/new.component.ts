import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RolesService } from '../../../../services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department.service';
import { ImageHandlerService } from '../../../../services/image-handler.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { UsersService } from '../../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent implements OnInit {

  public form: FormGroup;
  public roles: Array<any>;
  public dptos: Array<any>;
  public rolLabel: string;
  public dpLabel: string;
  public imgRender: string;
  public file: any;

  constructor(
    private cRolService: RolesService,
    private cDptoService: DepartmentService,
    private tostador: ToastrService,
    private cIHandler: ImageHandlerService,
    private cLs: LocalStorageService,
    private cUserService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [ Validators.required ]),
      lastname: new FormControl('', [ Validators.required ]),
      gender: new FormControl(0, [ Validators.required ]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      username: new FormControl('', [ Validators.required]),
      phone: new FormControl('', [ Validators.required, Validators.pattern('[0-9]{10}')]),
      role: new FormControl(0, [ Validators.required]),
      area: new FormControl(0, [ Validators.required]),
      boss: new FormControl(0),
      file: new FormControl(),
    });

    this.cRolService.fetch()
    .subscribe(
      ( res: any ) => this.roles = res.data,
      ( err: any ) => this.tostador.error( err.error, '¡Error!' )
    ).add( () => {  } );

    this.cDptoService.fetch()
    .subscribe(
      ( res: any ) => this.dptos = res.data,
      ( err: any ) => this.tostador.error( err.error, '¡Error!' )
    ).add( () => {  } );
  }

  save() {
    if ( this.form.status === 'VALID' && this.file ) {
      let data = new FormData();
      data.append('name', this.form.value.name );
      data.append('lastname', this.form.value.lastname );
      data.append('username', this.form.value.username );
      data.append('email', this.form.value.email );
      data.append('gender', this.form.value.gender );
      data.append('role', this.form.value.role );
      data.append('area', this.form.value.area );
      data.append('boss', this.form.value.boss );
      data.append('phone', this.form.value.phone );
      data.append('user', this.cLs.getIndex('id') );
      data.append('image', this.file, 'image' );
      this.cUserService.save( data )
      .subscribe(
        () => this.router.navigateByUrl('/employees'),
        ( err: any ) => this.tostador.error( err.error, '¡Error!' )
      ).add( () => {  } );
    }
  }

  roleLabel( selector: any ) {
    this.rolLabel = selector.options[ selector.selectedIndex ].text;
  }

  dptoLabel( selector: any ) {
    this.dpLabel = selector.options[ selector.selectedIndex ].text;
  }

  renderImage( file: any ) {
    console.log( file );
    this.cIHandler.handler( file )
    .then( (res) => {this.imgRender = res, this.file = file;}, (err) => console.log( err ) ); 
  }

}
