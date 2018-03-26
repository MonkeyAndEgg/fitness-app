import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output()
  toggleSideNavOn = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authStatus.subscribe(status => {
      this.isAuth = status;
    });
  }

  ngOnDestroy() {
    // avoid memory leak
    this.authSubscription.unsubscribe();
  }

  onToggleSideNav() {
    this.toggleSideNavOn.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
