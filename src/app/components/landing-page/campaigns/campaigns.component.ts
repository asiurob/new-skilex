import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.sass']
})
export class CampaignsComponent implements OnInit {

  public curr: number;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe( ( params: any ) => {
      this.curr = Number( params.page  || 1 );
      this.fetchCampaigns();
    });
  }

  fetchCampaigns() {
    
  }

}
