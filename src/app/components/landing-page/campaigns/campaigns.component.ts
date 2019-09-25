import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '../../../services/campaign.service';
import { ToastrService } from 'ngx-toastr';
import { link } from '../../../variables/services.config';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.sass']
})
export class CampaignsComponent implements OnInit {

  public curr: number;
  public campaigns: Array<any> = [];
  public cells: Array<number> = [];
  public count: number;
  public pages: number;
  public showing: number;
  public timer: any;

  constructor(
    private ROUTE: ActivatedRoute,
    private CAMPAIGN_SERVICE: CampaignService,
    private TOSTADOR: ToastrService
  ) { }

  ngOnInit() {
    this.ROUTE.params.subscribe( ( params: any ) => {
      this.curr = Number( params.page  || 1 );
      this.fetchCampaigns();
    });
  }

  fetchCampaigns( name?: string ) {
    this.CAMPAIGN_SERVICE.fetch( this.curr, 8, name )
    .subscribe( ( res: any ) => {
      res.data.forEach( ( d: any ) => {
        d.company.photo = `${ link }/companies/${ d.company.photo }`;
        d.employees.map( ( u: any ) => u.photo = `${ link }/users/${ u.photo }`);
        const date = new Date( d.date ).setHours(0, 0, 0, 0 );
        const now = new Date().setHours(0, 0, 0, 0 );
        if ( date === now ) {
          d.border = 'isCurrent';
          d.allow  = true;
        } else if ( date < now ) {
          d.border = 'isInactive';
          d.allow = false;
        } else {
          d.border = 'isActive';
          d.allow  = true;
        }
      });
      this.campaigns = res.data;
      this.count = res.count;
      this.pages = Math.ceil( res.count / 8 );
      if ( this.pages > 1 ) {
        for ( let i = 1; i <= this.pages; i++ ) { this.cells.push( i ); }
      }
      this.showing = this.campaigns.length < 8 ? this.count : ( this.campaigns.length * this.curr );
    },
    ( err: any ) => this.TOSTADOR.error( err.message, '¡Error!' )
  ).add( () => {});
  }

  findCompany( input: string ) {
    clearTimeout( this.timer );
    this.timer = setTimeout( () => {

        input = input.trim();
        if ( input.length === 0 ) {
          this.fetchCampaigns();
        } else if ( input.length > 1 ) {
          this.fetchCampaigns( input );
        }

      }, 500);
  }

  clearTime() {
    clearTimeout( this.timer );
  }
  

}
