import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authenticatedUserId: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.authenticatedUserId$.subscribe(uid => {
      this.authenticatedUserId = uid;
    });
  }

}
