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
  public curr: number;
  constructor(
    private brandsService: BrandsService,
    private route: ActivatedRoute,
    private tostador: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const value = this.route.snapshot.params.name;
    this.curr   = Number(this.route.snapshot.params.page) || 1;
    if ( value ) {
      this.brandsService.fetch( 0, 1, 0, value )
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
        () => this.router.navigateByUrl('/glass-brands/' + this.curr),
        ( err: any ) => this.tostador.error( err.error, '¡Error!' )
      ).add( () => {  } );
    }
  }

}
