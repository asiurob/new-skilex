import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlassesService } from '../../../services/glasses.service';

@Component({
  selector: 'app-glasses',
  templateUrl: './glasses.component.html',
  styleUrls: ['./glasses.component.sass']
})
export class GlassesComponent implements OnInit {
  public glasses: Array<any> = [];
  public curr: number;
  public pages: number;
  public cells: Array<number> = [];
  public current: number;
  public count: number;
  public showing: number;
  public isLoading = true;
  public timer: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tostador: ToastrService,
    private glassesService: GlassesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( ( val: any ) => {
      this.curr = Number( val.page ) || 1;
      if ( !isNaN(this.curr) ) {
        this.fetchUsers();
      }
    });
  }

  fetchUsers(find = null) {
    this.pages = 0;
    this.cells = [];
    this.glassesService.fetch(this.curr, 10, find)
      .subscribe(
        (res: any) => {
          this.glasses = res.data;
          this.count = res.count;
          this.pages = Math.ceil(res.count / 10);
          if (this.pages > 1) {
            for (let i = 1; i <= this.pages; i++) {
              this.cells.push(i);
            }
          }
          this.showing = this.glasses.length < 10 ? this.count : (this.glasses.length * this.current);
        },
        (err: any) => this.tostador.error(err.message, '¡Error!')
      ).add(() => {});
  }

  swapStatus( glass: any ) {
    const status = glass.status === 'active' ? 'inactive' : 'active';
    this.glassesService.swapStatus( glass._id, status )
    .subscribe(
      () => glass.status = status,
      ( err: any) => this.tostador.error( err.error.message, '¡Error!' )
    ).add( () => {} );
  }


}
