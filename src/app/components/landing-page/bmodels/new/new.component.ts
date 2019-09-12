import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModelsService } from '../../../../services/models.service';
import { BrandsService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent implements OnInit {

  public brands: Array<any> = [];
  constructor(
    private modelService: ModelsService,
    private brandService: BrandsService,
    private tostador: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.brandService.fetch()
    .subscribe(
      ( res: any ) => this.brands = res.data,
      ( err: any ) =>  this.tostador.error( err.error.message, '¡Error!' )
    ).add( () => {});
  }

  save( model: string, brandi: string ) {
    model = model.trim();
    if ( model && brandi ) {
      this.modelService.save( model, brandi )
      .subscribe(
        () => this.router.navigateByUrl('/glass-models'),
        ( err: any ) =>  this.tostador.error( err.error.message, '¡Error!' )
      ).add( () => {});
    }
  }

}
