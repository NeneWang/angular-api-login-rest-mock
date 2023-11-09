import { Component } from '@angular/core';
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user = this.authService.authUser$;
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
