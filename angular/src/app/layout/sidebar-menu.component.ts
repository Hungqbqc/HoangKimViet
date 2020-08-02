// tslint:disable
import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import {
  Router,
  RouterEvent,
  NavigationEnd,
  PRIMARY_OUTLET
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuItem } from '@shared/layout/menu-item';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
  menuItems: MenuItem[];
  menuItemsMap: { [key: number]: MenuItem } = {};
  activatedMenuItems: MenuItem[] = [];
  routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
  homeRoute = '/app/home';
  testmenu = false;
  items: MegaMenuItem[];

  constructor(injector: Injector,
    private router: Router,
    public breakpointObserver: BreakpointObserver) {
    super(injector);
    this.router.events.subscribe(this.routerEvents);
  }

  ngOnInit(): void {
    this.items = [{
      label: 'Trang chủ', icon: 'fas fa-home', routerLink: '/app/home'
    },
    {
      label: 'Demo', icon: 'fas fa-list', routerLink: '/app/main/danh-muc/demo',
      visible: this.isGrantedAny('Pages.Demos'),
    },
    {
      label: 'Hồ sơ', icon: 'fas fa-list', routerLink: '/app/main/ho-so/ho-so-khach-hang',
    },
    {
      label: 'Người dùng', icon: 'fas fa-users', routerLink: '/app/users',
      visible: this.isGranted('Pages.Users')
    },
    {
      label: 'Vai trò', icon: 'fas fa-theater-masks', routerLink: '/app/roles',
      visible: this.isGranted('Pages.Roles')
    }
    ];

    this.menuItems = this.getMenuItems();
    this.patchMenuItems(this.menuItems);
    this.routerEvents
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const currentUrl = event.url !== '/' ? event.url : this.homeRoute;
        const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root
          .children[PRIMARY_OUTLET];
        if (primaryUrlSegmentGroup) {
          this.activateMenuItems('/' + primaryUrlSegmentGroup.toString());
        }
      });

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
          this.testmenu = false;
        }
        else if (state.breakpoints[Breakpoints.Medium] || state.breakpoints[Breakpoints.Large] || state.breakpoints[Breakpoints.XLarge]) {
          this.testmenu = true;
        }
      });
  }

  getMenuItems(): MenuItem[] {
    return [
      new MenuItem('Trang chủ', '/app/home', 'fas fa-home'),
      new MenuItem('Demo', '/app/main/danh-muc/demo', 'fas fa-list'),
      new MenuItem(
        'Tenants',
        '/app/tenants',
        'fas fa-building',
        'Pages.Tenants'
      ),
      new MenuItem(
        'Người dùng',
        '/app/users',
        'fas fa-users',
        'Pages.Users'
      ),
      new MenuItem(
        'Vai trò',
        '/app/roles',
        'fas fa-theater-masks',
        'Pages.Roles'
      ),
    ];

  }

  patchMenuItems(items: MenuItem[], parentId?: number): void {
    items.forEach((item: MenuItem, index: number) => {
      item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;
      if (parentId) {
        item.parentId = parentId;
      }
      if (parentId || item.children) {
        this.menuItemsMap[item.id] = item;
      }
      if (item.children) {
        this.patchMenuItems(item.children, item.id);
      }
    });
  }

  activateMenuItems(url: string): void {
    this.deactivateMenuItems(this.menuItems);
    this.activatedMenuItems = [];
    const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
    foundedItems.forEach((item) => {
      this.activateMenuItem(item);
    });
  }

  deactivateMenuItems(items: MenuItem[]): void {
    items.forEach((item: MenuItem) => {
      item.isActive = false;
      item.isCollapsed = true;
      if (item.children) {
        this.deactivateMenuItems(item.children);
      }
    });
  }

  findMenuItemsByUrl(
    url: string,
    items: MenuItem[],
    foundedItems: MenuItem[] = []
  ): MenuItem[] {
    items.forEach((item: MenuItem) => {
      if (item.route === url) {
        foundedItems.push(item);
      } else if (item.children) {
        this.findMenuItemsByUrl(url, item.children, foundedItems);
      }
    });
    return foundedItems;
  }

  activateMenuItem(item: MenuItem): void {
    item.isActive = true;
    if (item.children) {
      item.isCollapsed = false;
    }
    this.activatedMenuItems.push(item);
    if (item.parentId) {
      this.activateMenuItem(this.menuItemsMap[item.parentId]);
    }
  }

  isMenuItemVisible(item: MenuItem): boolean {
    if (!item.permissionName) {
      return true;
    }
    return this.permission.isGranted(item.permissionName);
  }
}
