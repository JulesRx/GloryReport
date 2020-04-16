import { Component, OnDestroy } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter, distinctUntilChanged } from 'rxjs/operators';

import { ManifestService } from './services/manifest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  public navbar: boolean;

  private routeChanges: Subscription;

  // injecting manifest service to load definitions on page load
  constructor(
    private manifestService: ManifestService,
    private router: Router
  ) {
    this.routeChanges = this.router.events
      .pipe(
        filter(e => e instanceof RouterEvent),
        distinctUntilChanged((prev: RouterEvent, curr: RouterEvent) => prev.url === curr.url)
      )
      .subscribe((e: RouterEvent) => {
        this.navbar = e.url !== '/';
      });
  }

  ngOnDestroy(): void {
    this.routeChanges.unsubscribe();
  }

}
