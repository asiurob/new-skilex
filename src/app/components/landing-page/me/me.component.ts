import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ImageHandlerService } from '../../../services/image-handler.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';
import { Employee } from '../employees/employees.interface';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.sass']
})
export class MeComponent implements OnInit {

  public form: FormGroup;
  public imgRender: string;
  public file: any;
  public user: any;
  public current: number;

  constructor(
    private tostador: ToastrService,
    private cIHandler: ImageHandlerService,
    private cLs: LocalStorageService,
    private cUserService: UsersService,
    private router: Router,
  ) { }

  ngOnInit() {
    const name = this.cLs.getIndex('normalizedToLink');
    if ( name ) {

      this.cUserService.fetch( 0, 1, name )
      .subscribe(
        ( res: any ) => this.user = res.data[0],
        ( err: any ) => this.tostador.error( err.error, '¡Error!' )
      ).add( () =>  this.createForm() );
    }

  }

  createForm() {
    const boss = this.user.boss.name + ' ' + this.user.boss.last_name;
    this.form = new FormGroup({
      name:     new FormControl( this.user.name,      [ Validators.required ]),
      lastname: new FormControl( this.user.last_name, [ Validators.required ]),
      gender:   new FormControl( this.user.gender,    [ Validators.required ]),
      email:    new FormControl( this.user.email),
      username: new FormControl( this.user.user_name),
      phone:    new FormControl( this.user.phone, [ Validators.required, Validators.pattern('[0-9]{10}')]),
      role:     new FormControl( this.user.role.name ),
      area:     new FormControl( this.user.area.name ),
      status:   new FormControl( this.user.status ),
      boss:     new FormControl( boss ),
      file:     new FormControl(),
      password: new FormControl(),
    });

    this.form.controls.email.disable({ onlySelf: true });
    this.form.controls.username.disable({ onlySelf: true });
    this.form.controls.role.disable({ onlySelf: true });
    this.form.controls.area.disable({ onlySelf: true });
    this.form.controls.status.disable({ onlySelf: true });
    this.form.controls.boss.disable({ onlySelf: true });
  }

  save() {
    if ( this.form.status === 'VALID' ) {
      let data = new FormData();
      data.append('name', this.form.controls.name.value );
      data.append('lastname', this.form.controls.lastname.value );
      data.append('gender', this.form.controls.gender.value );
      data.append('phone', this.form.controls.phone.value );
      data.append('active', this.form.controls.status.value );
      data.append('password', this.form.controls.password.value || '' );
      data.append('user', this.cLs.getIndex('id') );
      if ( this.file ) {
        data.append('image', this.file, 'image' );
      }

      this.cUserService.update( data, this.user._id )
      .subscribe(
        ( res: any ) => {
          const employee: Employee = {
            name: res.data.name,
            last_name: res.data.last_name,
            token: res.token,
            id: res.data._id,
            photo: res.data.photo,
            role: res.data.role.name,
            area: res.data.area.name,
            normalizedToLink: res.data.normalizedToLink,
            hierarchy: res.data.role.hierarchy
          };

          this.cLs.setData( employee );
          this.router.navigateByUrl('/');
        },
        ( err: any ) => this.tostador.error( err.error, '¡Error!' )
      ).add( () => {  } );
    }
  }


  renderImage( file: any ) {
    this.cIHandler.handler( file )
    .then( (res) => {this.imgRender = res, this.file = file; }, (err) => console.log( err ) );
  }

}
