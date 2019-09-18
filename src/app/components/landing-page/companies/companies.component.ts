import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesService } from '../../../services/companies.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.sass']
})
export class CompaniesComponent implements OnInit {

  public companies: Array<any> = [];
  public curr: number;
  public count: number;
  public pages: number;
  public cells: Array<number> = [];
  public showing: number;
  public timer: any;
  constructor(
    private route: ActivatedRoute,
    private COMPANY_SERVICE: CompaniesService,
    private TOSTADOR: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( ( params: any ) => {
      this.curr = Number( params.page  || 1 );
      this.fetchCompanies();
    });
  }

  fetchCompanies( name?: string ) {
    this.pages = 0;
    this.cells = [];
    this.COMPANY_SERVICE.fetch( this.curr, 8, name )
    .subscribe( ( res: any ) => {
        this.companies = res.data;
        this.count = res.count;
        this.pages = Math.ceil( res.count / 8 );
        if ( this.pages > 1 ) {
          for ( let i = 1; i <= this.pages; i++ ) { this.cells.push( i ); }
        }
        this.showing = this.companies.length < 8 ? this.count : ( this.companies.length * this.curr );
      },
      ( err: any ) => this.TOSTADOR.error( err.message, '¡Error!' )
    ).add( () => {});
  }

  findCompany( input: string ) {
    clearTimeout( this.timer );
    this.timer = setTimeout( () => {

        input = input.trim();
        if ( input.length === 0 ) {
          this.fetchCompanies();
        } else if ( input.length > 1 ) {
          this.fetchCompanies( input );
        }

      }, 500);
  }

  clearTime() {
    clearTimeout( this.timer );
  }

}
