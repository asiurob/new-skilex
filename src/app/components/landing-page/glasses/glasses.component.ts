import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-glasses',
  templateUrl: './glasses.component.html',
  styleUrls: ['./glasses.component.sass']
})
export class GlassesComponent implements OnInit {
  public glasses = [];
  constructor() { }

  ngOnInit() {
  }

}
