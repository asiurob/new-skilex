import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandsService } from '../../../../services/brands.service';
import { ToastrService } from 'ngx-toastr';
import { ModelsService } from '../../../../services/models.service';
import { GlassesService } from '../../../../services/glasses.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent implements OnInit {

  public sent = false;
  public curr: number;
  public form: FormGroup;
  public brands: Array<any> = [];
  public models: Array<any> = [];
  public colors: Array<any> = [
    'Negro', 'Blanco', 'Gris',
    'Rojo', 'Amarillo', 'Azul',
    'Verde', 'Naranja', 'Purpura',
    'Cafe', 'Rosa', 'Plata',
    'Transparente', 'Metalico', 'Dorado'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandsService,
    private modelService: ModelsService,
    private tostador: ToastrService,
    private glassesService: GlassesService
  ) { }

  ngOnInit() {
    this.colors = this.colors.sort();
    this.curr = Number( this.route.snapshot.params.page ) || 1;
    this.form = new FormGroup({
      brand: new FormControl( 0, [ Validators.required ] ),
      model: new FormControl( 0, [ Validators.required ] ),
      price: new FormControl( '', [ Validators.required, Validators.pattern('[0-9]+') ] ),
      primaryColor: new FormControl( 0, [ Validators.required] ),
      secondaryColor: new FormControl( 0 ),
      quantity: new FormControl( 1, [ Validators.required, Validators.pattern('[0-9]+') ] ),
    });

    this.brandService.fetch(0, 1000, 1)
    .subscribe(
      ( res: any ) => this.brands = res.data,
      ( err: any ) => this.tostador.error( err.message, '¡Error!')
    ).add( () => {});
  }

  save() {
    this.sent = true;
    if ( this.form.status === 'VALID' && !this.checkErrors() ) {
      this.glassesService.save( this.form.value )
      .subscribe(
        () => this.router.navigateByUrl('/glasses/' + this.curr ),
        ( err: any ) => this.tostador.error( err.message, '¡Error!')
      ).add( () => {});
    }
  }

  checkErrors() {
    if ( this.form.controls.brand.value === 0 ||
         this.form.controls.model.value === 0 ||
         this.form.controls.primaryColor.value === 0
      ) {
        return true;
      } else {
        return false;
      }
  }

  findModels() {
    const brand = this.form.controls.brand.value;
    if ( brand ) {
      this.modelService.findByBrand( brand )
      .subscribe(
        ( res: any ) => this.models = res.data,
        ( err: any ) => this.tostador.error( err.message, '¡Error!')
      ).add( () => {});
    }
  }
}
