import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import LoginUser from './login.interface';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {

  public form: FormGroup;
  @Output() loading = new EventEmitter<boolean>();

  constructor(
    public sLogin: LoginService,
    private tostador: ToastrService
  ) { }

  ngOnInit() {
    this.loading.emit( false );
    this.form = new FormGroup({
      user:     new FormControl( '', [ Validators.required, Validators.minLength( 4 ) ] ),
      password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ) ] )
    });
  }

  login(): void {
    if ( this.form.status === 'INVALID' ) {
      return;
    } else {
      this.form.value.password = this.form.value.password;
      const user: LoginUser = this.form.value;
      this.sLogin.getLogin( user )
      .subscribe(
        ( res: any ) => {

        },
        ( err: any ) =>  this.tostador.error( err.error.message, '¡Error!' ),
        () => {

        }
      );
    }
  }

}
