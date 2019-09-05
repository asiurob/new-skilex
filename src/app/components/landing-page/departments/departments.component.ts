import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../services/department.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.sass']
})
export class DepartmentsComponent implements OnInit {

  data: Array<any>;
  constructor(
    public cDepService: DepartmentService,
    public tostador: ToastrService
  ) { }

  ngOnInit() {
    this.cDepService.fetch()
    .subscribe(
      ( res: any ) => this.data = res.data,
      ( err: any ) => this.tostador.error( err.message, '!Error' )
    ).add(
      () => { console.log( this.data ); }
    );
  }

  delete( depto: any ) {
    console.log( depto );
  }

}
