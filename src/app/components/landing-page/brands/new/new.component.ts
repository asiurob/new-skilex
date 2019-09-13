import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../../services/brands.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent implements OnInit {

  public curr: number;
  constructor(
    private brandService: BrandsService,
    private tostador: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.curr = Number( this.route.snapshot.params.page ) || 1;
  }

  save( brand: string ) {
    brand = brand.trim();
    if ( brand ) {
      this.brandService.save( brand )
      .subscribe(
        () => this.router.navigateByUrl('/glass-brands/' + this.curr ),
        ( err: any ) =>  this.tostador.error( err.error.message, '¡Error!' )
      ).add( () => {});
    }
  }

}
