import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandsService } from '../../../../services/brands.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  public brand: any;
  constructor(
    private brandsService: BrandsService,
    private route: ActivatedRoute,
    private tostador: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const value = this.route.snapshot.params.name;
    if ( value ) {
      this.brandsService.fetch( value )
      .subscribe(
        ( res: any ) => this.brand = res.data[0],
        ( err: any ) => this.tostador.error( err.error, '¡Error!' )
      ).add( () => { } );
    }
  }

  save( value: string ) {
    value = value.trim();
    if ( value ) {
      this.brandsService.edit( this.brand._id, value )
      .subscribe(
        () => this.router.navigateByUrl('/glass-brands'),
        ( err: any ) => this.tostador.error( err.error, '¡Error!' )
      ).add( () => {  } );
    }
  }

}
