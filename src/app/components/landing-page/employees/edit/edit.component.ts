import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RolesService } from '../../../../services/roles.service';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department.service';
import { ImageHandlerService } from '../../../../services/image-handler.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { UsersService } from '../../../../services/users.service';
import {  ActivatedRoute, Router } from '@angular/router';
import { link } from '../../../../variables/services.config';

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
  public bosses: Array<any>;
  public pagComments: Array<any> = [];
  public indexComments: number;

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
    this.indexComments = 0;
    const name = this.route.snapshot.params.name;
    this.current = Number( this.route.snapshot.params.current );

    if ( name ) {

      this.cUserService.fetch( 0, 1, name )
      .subscribe(
        ( res: any ) => {
          this.user = res.data[0];
          this.user.photo = `${ link }/users/${ this.user.photo }`;
          this.user.modification = this.user.modification.reverse();
          let x = 0;
          for ( let i = 0; i < this.user.modification.length; i += 3 ) {
            this.pagComments[ x ] = this.user.modification.slice( i, (3 + i ) );
            x++;
          }
        },
        ( err: any ) => this.tostador.error( err.error, '¡Error!' )
      ).add( () => {  this.fetchRoles(); } );
    }

  }

  fetchRoles() {
    this.cRolService.fetch()
    .subscribe(
      ( res: any ) => this.roles = res.data,
      ( err: any ) => this.tostador.error( err.error, '¡Error!' )
    ).add( () => {  this.fetchDptos(); } );
  }

  fetchDptos() {
    this.cDptoService.fetch()
    .subscribe(
      ( res: any ) => this.dptos = res.data,
      ( err: any ) => this.tostador.error( err.error, '¡Error!' )
    ).add( () => { this.createForm(); this.fetchBosses(); } );
  }

  fetchBosses() {
    if ( this.form.controls.role.value && this.form.controls.area.value ) {
      const role = Number( this.form.controls.role.value.slice( -1 ) );
      if ( !isNaN( role ) ) {
        this.cUserService.getBosses( role, this.form.controls.area.value )
        .subscribe(
          ( res: any ) => { this.bosses = res.data; },
          ( err: any ) => this.tostador.error( err.error, '¡Error!' )
        ).add( () => {  } );
      }
    }
  }

  createForm() {
    const hierarchy = this.user.role._id + this.user.role.hierarchy;
    this.form = new FormGroup({
      name:     new FormControl( this.user.name,      [ Validators.required ]),
      lastname: new FormControl( this.user.last_name, [ Validators.required ]),
      gender:   new FormControl( this.user.gender,    [ Validators.required ]),
      email:    new FormControl( this.user.email,     [ Validators.required, Validators.email ]),
      username: new FormControl( this.user.user_name, [ Validators.required]),
      phone:    new FormControl( this.user.phone,     [ Validators.required, Validators.pattern('[0-9]{10}')]),
      role:     new FormControl( hierarchy,  [ Validators.required]),
      area:     new FormControl( this.user.area._id,  [ Validators.required]),
      status:   new FormControl( this.user.status ),
      boss:     new FormControl( this.user.boss._id ),
      file:     new FormControl(),
    });

    if ( Number( this.cLs.getIndex('hierarchy') ) < 3 ) {
      this.form.controls.email.disable({ onlySelf: true });
      this.form.controls.username.disable({ onlySelf: true });
      this.form.controls.role.disable({ onlySelf: true });
      this.form.controls.area.disable({ onlySelf: true });
      this.form.controls.status.disable({ onlySelf: true });
      this.form.controls.boss.disable({ onlySelf: true });
    }
  }

  save() {
    if ( this.form.status === 'VALID' ) {
      let data = new FormData();
      data.append('name', this.form.controls.name.value );
      data.append('lastname', this.form.controls.lastname.value );
      data.append('username', this.form.controls.username.value );
      data.append('email', this.form.controls.email.value );
      data.append('gender', this.form.controls.gender.value );
      data.append('role', this.form.controls.role.value );
      data.append('area', this.form.controls.area.value );
      data.append('boss', this.form.controls.boss.value );
      data.append('phone', this.form.controls.phone.value );
      data.append('active', this.form.controls.status.value );
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
    this.fetchBosses();
  }

  dptoLabel( selector: any ) {
    this.dpLabel = selector.options[ selector.selectedIndex ].text;
    this.fetchBosses();
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

  plusComments() {
    this.indexComments = (this.indexComments + 1) > ( this.pagComments.length - 1 )
    ? (this.pagComments.length - 1)
    : this.indexComments + 1;
  }

  lessComments() {
    this.indexComments = (this.indexComments - 1) < 0 ? 0 : this.indexComments - 1;
  }

}
