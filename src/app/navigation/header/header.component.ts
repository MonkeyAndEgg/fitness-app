import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  toggleSideNavOn = new EventEmitter<void>();

  isAuth$: Observable<boolean>;


  constructor(private store: Store<fromRoot.State>,
              private authService: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSideNav() {
    this.toggleSideNavOn.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
