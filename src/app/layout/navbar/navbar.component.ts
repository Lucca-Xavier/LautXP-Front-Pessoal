import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Input() sidebarId: string = "sidebar";
  constructor(
    private authService: AuthService,
  ) { }

  logout() {
    this.authService.logout();
  }
}
