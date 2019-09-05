import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../../services/department.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  public dpto: any;

  constructor(
    private cDptoService: DepartmentService,
    private route: ActivatedRoute,
    private tostador: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const value = this.route.snapshot.params.name;
    if ( value ) {
      this.cDptoService.fetch( value )
      .subscribe(
        ( res: any ) => this.dpto = res.data[0],
        ( err: any ) => this.tostador.error( err.error, '¡Error!' )
      ).add( () => { console.log( this.dpto ); } );
    }
  }

  save( value: string ) {
    value = value.trim();
    if ( value ) {
      this.cDptoService.edit( this.dpto._id, value )
      .subscribe(
        () => this.router.navigateByUrl('/departments'),
        ( err: any ) => this.tostador.error( err.error, '¡Error!' )
      ).add( () => {  } );
    }
  }

}
