import { AppComponentBase } from '@shared/app-component-base';
// tslint:disable
import {
  Component,
  ChangeDetectionStrategy,
  Renderer2,
  OnInit,
  Injector
} from '@angular/core';
import { LayoutStoreService } from '@shared/layout/layout-store.service';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent extends AppComponentBase implements OnInit {
  sidebarExpanded: boolean;
  isMobile = false;
  constructor(
    injector: Injector,
    private renderer: Renderer2,
    private _layoutStore: LayoutStoreService,
    public breakpointObserver: BreakpointObserver
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.Small]) {
          this.isMobile = true;
        }
        else if (state.breakpoints[Breakpoints.Medium] || state.breakpoints[Breakpoints.Large] || state.breakpoints[Breakpoints.XLarge]) {
          this.isMobile = false;
        }
      });

    this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value;
      this.toggleSidebar();
    });
  }

  toggleSidebar(): void {
    if (this.sidebarExpanded) {
      this.hideSidebar();
    } else {
      this.showSidebar();
    }
  }

  showSidebar(): void {
    this.renderer.addClass(document.body, 'sidebar-open');
    $('.content-wrapper').addClass('m-l-250');
    $('.content-wrapper').removeClass('m-l-0');
    $('.main-header').removeClass('m-l-0');
    $('.main-header').addClass('m-l-250');
    $('.main-sidebar').removeClass('visibility-hidden');
    $('.main-sidebar').addClass('bg-transparent');
  }

  hideSidebar(): void {
    this.renderer.removeClass(document.body, 'sidebar-open');
    $('.content-wrapper').removeClass('m-l-250');
    $('.content-wrapper').addClass('m-l-0');
    $('.main-header').removeClass('m-l-250');
    $('.main-header').addClass('m-l-0');
    $('.main-sidebar').addClass('visibility-hidden');
  }
}
