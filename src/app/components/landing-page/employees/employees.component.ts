import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { link } from '../../../variables/services.config';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.sass']
})
export class EmployeesComponent implements OnInit {

  public users: any;
  public pages: number;
  public cells: Array<number> = [];
  public current: number;
  public count: number;
  public showing: number;
  public isLoading = true;
  public timer: any;

  constructor(
    private cUserService: UsersService,
    private tostador: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe( (val: any) => {
      let page = Number( val.page ) || 1;
      this.current = page;
      page = page <= 0 ? 1 : page;
      this.fetchUsers( page );
    });
  }

  fetchUsers( page: number, find = null ) {
    if ( !isNaN( page ) ) {
      this.pages = 0;
      this.cells = [];
      this.cUserService.fetch( page, 8, find )
      .subscribe(
        ( res: any ) => {
          this.users = res.data;
          this.users.map( ( u: any ) => u.photo = `${ link }/users/${ u.photo }`);
          this.count = res.count;
          this.pages = Math.ceil( res.count / 8 );
          if ( this.pages > 1 ) {
            for ( let i = 1; i <= this.pages; i++ ) { this.cells.push( i ); }
          }
          this.showing = this.users.length < 8 ? this.count : (this.users.length * this.current);
        },
        ( err: any ) => this.tostador.error( err.message, '¡Error!' )
      ).add( () => { this.isLoading = false; } );
    }
  }

  findEmployee( input: string ) {
    clearTimeout( this.timer );
    this.timer = setTimeout( () => {

        input = input.trim();
        if ( input.length === 0 ) {
          this.fetchUsers( this.current );
        } else if ( input.length > 1 ) {
          this.fetchUsers( 1, input );
        }

      }, 500);
  }

  clearTime() {
    clearTimeout( this.timer );
  }
}
