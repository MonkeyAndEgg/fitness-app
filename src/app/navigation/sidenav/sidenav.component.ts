import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output()
  toggleSideNavOff = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authStatus.subscribe(status => {
      this.isAuth = status;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  toggleSideNav() {
    this.toggleSideNavOff.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
