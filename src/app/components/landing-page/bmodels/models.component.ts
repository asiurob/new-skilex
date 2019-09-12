import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModelsService } from '../../../services/models.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.sass']
})
export class ModelsComponent implements OnInit {

  public models: Array<any> = [];
  constructor(
    private modelService: ModelsService,
    private tostador: ToastrService
  ) { }

  ngOnInit() {
    this.modelService.fetch()
    .subscribe(
      ( res: any ) => this.models = res.data,
      ( err: any ) => this.tostador.error( err.error.message, '¡Error!' )
    ).add( () => {} );
  }

  delete( depto: any ) {
    console.log( depto );
  }
 
}
