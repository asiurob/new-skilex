import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandsService } from '../../../../services/brands.service';
import { ToastrService } from 'ngx-toastr';
import { ModelsService } from '../../../../services/models.service';
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
    const name = this.route.snapshot.params.name;

    if ( name ) {
      this.glassesService.fetch( 0, 1, name )
      .subscribe(
        ( res: any ) => this.glass = res.data[0],
        ( err: any ) => this.tostador.error( err.message, '¡Error!')
      ).add( () => {} );
    }

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

}
