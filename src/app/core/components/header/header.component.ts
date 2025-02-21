import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAuthorized$: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthorized$ = this.authService.isAuthorized();
  }

  navigationLinks = [
    { path: 'characters', label: 'Characters' },
    { path: 'episodes', label: 'Episodes' },
    { path: 'locations', label: 'Locations' },
  ];

  logout(): void {
    this.authService.logOut();
  }
}
