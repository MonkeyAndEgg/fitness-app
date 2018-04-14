import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('sideNav')
  sideNav;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initAuthStateListener();
  }
}
