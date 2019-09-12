import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../services/brands.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.sass']
})
export class BrandsComponent implements OnInit {

  public brands: Array<any> = [];
  constructor(
    private brandService: BrandsService,
    private tostador: ToastrService
  ) { }

  ngOnInit() {
    this.brandService.fetch()
    .subscribe(
      ( res: any ) => this.brands = res.data,
      ( err: any ) => this.tostador.error( err.error.message, '¡Error!' )
    ).add( () => {} );
  }

  delete( depto: any ) {
    console.log( depto );
  }

}
