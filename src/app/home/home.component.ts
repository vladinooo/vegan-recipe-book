import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {User} from "../user/User";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(public authService: AuthService) { }

  ngOnInit() {

  }

}
