import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})

export class LoaderComponent implements OnInit {
  @Input() loading: boolean;
  public display: string;
  constructor() { }

  ngOnInit() {
    console.log( this.loading );
    this.loading = false;
  }

}
