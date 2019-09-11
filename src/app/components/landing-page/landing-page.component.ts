import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Employee } from './employees/employees.interface';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {
  public user: Employee;
  constructor(
    private cLs: LocalStorageService
  ) { }

  ngOnInit() {
    this.user = this.cLs.getData();
  }

}
