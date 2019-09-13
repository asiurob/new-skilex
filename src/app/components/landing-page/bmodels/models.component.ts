import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModelsService } from '../../../services/models.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.sass']
})
export class ModelsComponent implements OnInit {

  public models: Array<any> = [];
  public curr: number;
  public count: number;
  public pages: number;
  public showing: number;
  public cells: Array<number> = [];
  public timer: any;
  constructor(
    private modelService: ModelsService,
    private tostador: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe( (val: any) => {
      let page = Number( val.page ) || 1;
      this.curr = page;
      page = page <= 0 ? 1 : page;
      this.fetchModels();
    });
  }

  fetchModels( name?: string ) {

    if ( !isNaN( this.curr ) ) {
      this.pages = 0;
      this.cells = [];
      this.modelService.fetch( this.curr, 10, name )
      .subscribe(
        ( res: any ) => {
          this.models = res.data;
          this.count = res.count;
          this.pages = Math.ceil( res.count / 10 );
          if ( this.pages > 1 ) {
            for ( let i = 1; i <= this.pages; i++ ) { this.cells.push( i ); }
          }
          this.showing = this.models.length < 10 ? this.count : (this.models.length * this.curr);
        },
        ( err: any ) => this.tostador.error( err.error.message, '¡Error!' )
      ).add( () => {} );
    }
  }

  swapStatus( model: any ) {
    const status = model.status === 'active' ? 'inactive' : 'active';
    this.modelService.swapStatus( model._id, status )
    .subscribe(
      () => model.status = status,
      ( err: any) => this.tostador.error( err.error.message, '¡Error!' )
    ).add( () => {} );
  }

  findModel( input: string ) {
    clearTimeout( this.timer );
    this.timer = setTimeout( () => {

        input = input.trim();
        if ( input.length === 0 ) {
          this.fetchModels();
        } else if ( input.length > 1 ) {
          this.fetchModels( input );
        }

      }, 500);
  }

  clearTime() {
    clearTimeout( this.timer );
  }
}
