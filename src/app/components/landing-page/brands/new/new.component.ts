import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../../services/brands.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent implements OnInit {

  constructor(
    private brandService: BrandsService,
    private tostador: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  save( brand: string ) {
    brand = brand.trim();
    if ( brand ) {
      this.brandService.save( brand )
      .subscribe(
        () => this.router.navigateByUrl('/glass-brands'),
        ( err: any ) =>  this.tostador.error( err.error.message, '¡Error!' )
      ).add( () => {});
    }
  }

}
