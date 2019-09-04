import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import LoginUser from './login.interface';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {

  public form: FormGroup;
  public loading: Subject<boolean> = new Subject<boolean>();

  constructor(
    public sLogin: LoginService,
    private tostador: ToastrService,
    private sLs: LocalStorageService,
    private router: Router) { }

  ngOnInit() {
    this.sLs.deleteData();
    this.form = new FormGroup({
      user:     new FormControl( '', [ Validators.required, Validators.minLength( 4 ) ] ),
      password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ) ] )
    });
  }

  login(): void {
    if ( this.form.status === 'INVALID' ) {
      return;
    } else {
      this.loading.next( true );
      this.form.value.password = this.form.value.password;
      const user: LoginUser = this.form.value;
      this.sLogin.getLogin( user )
      .subscribe(
        ( res: any ) => {
          res.data[0].token = res.token;
          this.sLs.setData( res.data[0] );
          this.router.navigateByUrl('');
        },
        ( err: any ) =>  this.tostador.error( err.error.message, '¡Error!' )
      ).add( () => this.loading.next( false ) );
    }
  }

}
