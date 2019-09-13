import { Component, OnInit } from '@angular/core';
import { ModelsService } from 'src/app/services/models.service';
import { BrandsService } from 'src/app/services/brands.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  public model: any;
  public brands: Array<any> = [];
  public selectedOption: string;
  public curr: number;

  constructor(
    private modelService: ModelsService,
    private brandService: BrandsService,
    private tostador: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const value = this.route.snapshot.params.name;
    this.curr   = Number(this.route.snapshot.params.page) || 1;
    if ( value ) {
      this.modelService.fetch( 0, 1, value )
      .subscribe(
        ( res: any ) => this.model = res.data[0],
        ( err: any ) => this.tostador.error( err.error, '¡Error!' )
      ).add( () => { this.getBrands(); } );
    }
  }

  getBrands() {
    this.brandService.fetch(0, 10000, 1 )
    .subscribe(
      ( res: any ) => {
        this.brands = res.data;
        this.selectedOption = this.model.brand._id;
      },
      ( err: any ) =>  this.tostador.error( err.error.message, '¡Error!' )
    ).add( () => {});
  }

  save( model: string ) {
    const brandi = this.selectedOption;
    model = model.trim();
    if ( model && brandi ) {
      this.modelService.edit( this.model._id, model, brandi )
      .subscribe(
        () => this.router.navigateByUrl('/glass-models/' + this.curr ),
        ( err: any ) =>  this.tostador.error( err.error.message, '¡Error!' )
      ).add( () => {});
    }
  }

}
