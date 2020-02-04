import { Component, OnInit } from '@angular/core';
import {User} from "../../user/User";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentlyAuthenticatedUser: User;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentlyAuthenticatedUser()
      .subscribe(user => {
        this.currentlyAuthenticatedUser = user;
      });
  }

}
