import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BadgeModule, BreadcrumbModule, CollapseModule, DropdownModule, GridModule, HeaderModule, NavbarModule, NavModule, SidebarModule } from '@coreui/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutDefaultComponent } from './layout/layout-default/layout-default.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModule } from './login/login.module';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { SpinnerComponent } from './layout/spinner/spinner.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { LoaderInterceptor } from './core/interceptor/loader.interceptor';
import { SharedModule } from './shared/shared.module';

const APP_CONTAINERS = [
  LayoutDefaultComponent,
  NavbarComponent,
];
//function is use to get jwt token from local storage
export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,

  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    SidebarModule,
    NavbarModule,
    GridModule,
    BrowserAnimationsModule,
    DropdownModule,
    HeaderModule,
    NavModule,
    BreadcrumbModule,
    BadgeModule,
    CollapseModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:50573"],
        disallowedRoutes: []
      }
    }),
    ToastrModule.forRoot(),
    NgbModule,
    LoginModule,
    SpinnerComponent,
  ],
  providers: [
    AuthGuard,
    provideEnvironmentNgxMask(),
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
