import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandsService } from '../../../../services/brands.service';
import { ToastrService } from 'ngx-toastr';
import { GlassesService } from '../../../../services/glasses.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  public sent = false;
  public curr: number;
  public form: FormGroup;
  public glass: any;
  public brands: Array<any> = [];
  public models: Array<any> = [];
  public colors: Array<any> = [
    'Negro', 'Blanco', 'Gris',
    'Rojo', 'Amarillo', 'Azul',
    'Verde', 'Naranja', 'Purpura',
    'Cafe', 'Rosa', 'Plata',
    'Transparente', 'Metalico', 'Dorado'
  ];
  public brandName: string;
  public pagComments: Array<any> = [];
  public indexComments: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandsService,
    private tostador: ToastrService,
    private glassesService: GlassesService
  ) { }

  ngOnInit() {
    this.colors = this.colors.sort();
    this.curr = Number( this.route.snapshot.params.page ) || 1;
    const name = this.route.snapshot.params.name;
    this.indexComments = 0;

    if ( name ) {
      this.glassesService.fetch( 0, 1, name )
      .subscribe(
        ( res: any ) => {
          this.glass = res.data[0];
          this.glass.modification = this.glass.modification.reverse();
          let x = 0;
          for ( let i = 0; i < this.glass.modification.length; i += 3 ) {
            this.pagComments[ x ] = this.glass.modification.slice( i, (3 + i ) );
            x++;
          }
          this.createForm();
        },
        ( err: any ) => this.tostador.error( err.message, '¡Error!')
      ).add( () => { this.fetchBrands(); } );
    }

  }

  fetchBrands() {
    this.brandService.fetch(0, 1000, 1)
    .subscribe(
      ( res: any ) => this.brands = res.data,
      ( err: any ) => this.tostador.error( err.message, '¡Error!')
    ).add( () => {});
  }

  createForm() {
    this.form = new FormGroup({
      brand:          new FormControl( this.glass.brand._id, [ Validators.required ] ),
      model:          new FormControl( this.glass.model, [ Validators.required ] ),
      price:          new FormControl( this.glass.price, [ Validators.required, Validators.pattern('[0-9]+') ] ),
      primaryColor:   new FormControl( this.glass.primaryColor, [ Validators.required] ),
      secondaryColor: new FormControl( this.glass.secondaryColor),
      quantity:       new FormControl( this.glass.quantity, [ Validators.required, Validators.pattern('[0-9]+') ] ),
    });

    this.brandName = this.glass.brand.name;
  }

  save() {
    this.sent = true;
    if ( this.form.status === 'VALID' && !this.checkErrors() ) {
      const data = this.form.value;
      data.brand_name = this.brandName;
      this.glassesService.edit( data, this.glass._id )
      .subscribe(
        () => this.router.navigateByUrl('/glasses/' + this.curr ),
        ( err: any ) => this.tostador.error( err.message, '¡Error!')
      ).add( () => {});
    }
  }


  setBrandName( selector: any ) {
    this.brandName = selector.options[ selector.selectedIndex ].text;
  }

  plusComments() {
    this.indexComments = (this.indexComments + 1) > ( this.pagComments.length - 1 )
    ? (this.pagComments.length - 1)
    : this.indexComments + 1;
  }

  lessComments() {
    this.indexComments = (this.indexComments - 1) < 0 ? 0 : this.indexComments - 1;
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

}
