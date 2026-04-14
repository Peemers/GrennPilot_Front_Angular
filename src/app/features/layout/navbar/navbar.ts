import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  currentUser = this.authService.currentUser;

  onLogout(): void {
    this.authService.logout();
    void this.router.navigateByUrl('/login');
  }
}
