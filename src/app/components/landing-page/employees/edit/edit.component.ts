import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RolesService } from '../../../../services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department.service';
import { ImageHandlerService } from '../../../../services/image-handler.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { UsersService } from '../../../../services/users.service';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  public form: FormGroup;
  public roles: Array<any>;
  public dptos: Array<any>;
  public rolLabel: string;
  public dpLabel: string;
  public imgRender: string;
  public file: any;
  public user: any;
  public current: number;

  constructor(
    private cRolService: RolesService,
    private cDptoService: DepartmentService,
    private tostador: ToastrService,
    private cIHandler: ImageHandlerService,
    private cLs: LocalStorageService,
    private cUserService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const name = this.route.snapshot.params.name;
    this.current = Number( this.route.snapshot.params.current );

    if ( name ) {

      this.cUserService.fetch( 0, 1, name )
      .subscribe(
        ( res: any ) => this.user = res.data[0],
        ( err: any ) => this.tostador.error( err.error, '¡Error!' )
      ).add( () => { this.createForm(); this.fetchRoles(); this.fetchDptos(); } );
    }

  }

  fetchRoles() {
    this.cRolService.fetch()
    .subscribe(
      ( res: any ) => this.roles = res.data,
      ( err: any ) => this.tostador.error( err.error, '¡Error!' )
    ).add( () => {  } );
  }

  fetchDptos() {
    this.cDptoService.fetch()
    .subscribe(
      ( res: any ) => this.dptos = res.data,
      ( err: any ) => this.tostador.error( err.error, '¡Error!' )
    ).add( () => {  } );
  }

  fetchBosses() {
    
  }

  createForm() {
    this.form = new FormGroup({
      name:     new FormControl( this.user.name,      [ Validators.required ]),
      lastname: new FormControl( this.user.last_name, [ Validators.required ]),
      gender:   new FormControl( this.user.gender,    [ Validators.required ]),
      email:    new FormControl( this.user.email,     [ Validators.required, Validators.email ]),
      username: new FormControl( this.user.user_name, [ Validators.required]),
      phone:    new FormControl( this.user.phone,     [ Validators.required, Validators.pattern('[0-9]{10}')]),
      role:     new FormControl( this.user.role._id,  [ Validators.required]),
      area:     new FormControl( this.user.area._id,  [ Validators.required]),
      status:   new FormControl( this.user.status ),
      boss:     new FormControl( this.user.boss ),
      file:     new FormControl(),
    });
  }

  save() {
    if ( this.form.status === 'VALID' ) {
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
      data.append('active', this.form.value.status );
      data.append('user', this.cLs.getIndex('id') );
      if ( this.file ) {
        data.append('image', this.file, 'image' );
      }

      this.cUserService.update( data, this.user._id )
      .subscribe(
        () => this.router.navigateByUrl('/employees/' + this.current ),
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
    this.cIHandler.handler( file )
    .then( (res) => {this.imgRender = res, this.file = file; }, (err) => console.log( err ) );
  }

  resetPassword() {
    this.cUserService.resetPassword( this.user._id )
    .subscribe( 
      () => this.tostador.success('Se reinició la contaseña', '¡Correcto!'),
      ( err: any ) => this.tostador.error( err.message, '¡Error!')
     ).add( () => {} );
  }

}
