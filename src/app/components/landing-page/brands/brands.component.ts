import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../services/brands.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.sass']
})
export class BrandsComponent implements OnInit {

  public brands: Array<any> = [];
  public curr: number;
  public count: number;
  public pages: number;
  public showing: number;
  public cells: Array<number> = [];
  public timer: any;
  constructor(
    private brandService: BrandsService,
    private tostador: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe( (val: any) => {
      let page = Number( val.page ) || 1;
      this.curr = page;
      page = page <= 0 ? 1 : page;
      this.fetchBrands();
    });
  }

  fetchBrands( name?: string ) {

    if ( !isNaN( this.curr ) ) {
      this.pages = 0;
      this.cells = [];
      this.brandService.fetch( this.curr, 5, 0, name )
      .subscribe(
        ( res: any ) => {
          this.brands = res.data;
          this.count = res.count;
          this.pages = Math.ceil( res.count / 5 );
          if ( this.pages > 1 ) {
            for ( let i = 1; i <= this.pages; i++ ) { this.cells.push( i ); }
          }
          this.showing = this.brands.length < 5 ? this.count : (this.brands.length * this.curr);
        },
        ( err: any ) => this.tostador.error( err.error.message, '¡Error!' )
      ).add( () => {} );
    }
  }

  swapStatus( brand: any ) {
    const status = brand.status === 'active' ? 'inactive' : 'active';
    this.brandService.swapStatus( brand._id, status )
    .subscribe(
      () => brand.status = status,
      ( err: any) => this.tostador.error( err.error.message, '¡Error!' )
    ).add( () => {} );
  }

  findBrand( input: string ) {
    clearTimeout( this.timer );
    this.timer = setTimeout( () => {

        input = input.trim();
        if ( input.length === 0 ) {
          this.fetchBrands();
        } else if ( input.length > 1 ) {
          this.fetchBrands( input );
        }

      }, 500);
  }

  clearTime() {
    clearTimeout( this.timer );
  }

}
