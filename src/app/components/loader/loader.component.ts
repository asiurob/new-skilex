import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})

export class LoaderComponent implements OnInit, OnDestroy {
  @Input() loading: Observable<boolean>;
  public subscription: Subscription;
  public display = false;
  constructor() { }

  ngOnInit() {
    console.log('ENTRE');
    this.subscription = this.loading.subscribe( ( data: boolean ) => this.display = data );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
