import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../../services/department.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.sass']
})
export class NewComponent implements OnInit {

  public loading: Subject<boolean> = new Subject<boolean>();
  constructor(
    private cDepService: DepartmentService,
    private tostador: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  save( value: string ) {
    value = value.trim();
    if ( value ) {
      this.loading.next( true );
      this.cDepService.save( value )
      .subscribe(
        () => this.router.navigateByUrl('/departments'),
        ( err: any ) =>  this.tostador.error( err.error.message, '¡Error!' )
      ).add( () => this.loading.next( false ) );
    }
  }

}
