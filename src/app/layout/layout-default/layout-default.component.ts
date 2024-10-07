import { Component } from '@angular/core';
import { navItems } from './route';

@Component({
  selector: 'app-layout-default',
  template: `
    <c-sidebar #sidebar="cSidebar" class="docs-sidebar elevation-0 border-end  sidebar sidebar-fixed" id="sidebar" visible
    [colorScheme]="'light'">
    <c-sidebar-brand [brandFull]="{
      src: 'assets/img/brand/coreui-angular.svg',
      width: 200,
      height: 46,
      alt: 'Angular 15 Template'
    }" [brandNarrow]="{
      src: 'assets/img/brand/coreui-signet-white.svg',
      width: 46,
      height: 46,
      alt: 'Angular 15 Template'
    }" routerLink="./">
    </c-sidebar-brand>
    <c-sidebar-nav [navItems]="navItems" dropdownMode="close">
    </c-sidebar-nav>
    <c-sidebar-toggler *ngIf="!sidebar.narrow" toggle="unfoldable" cSidebarToggle="sidebar"></c-sidebar-toggler>
</c-sidebar>
    <!--main-->
<div class="wrapper d-flex flex-column min-vh-100 bg-light">
  <!--app-header-->
  <app-navbar class="mb-3 d-print-none header header-sticky" position="sticky" sidebarId="sidebar"></app-navbar>
  <!--app-body-->
  <div class="body flex-grow-1 px-3">
    <c-container breakpoint="lg" class="h-auto">
      <router-outlet></router-outlet>
    </c-container>
  </div>
  
</div>
  `,
})
export class LayoutDefaultComponent {
  navItems = navItems;
}
