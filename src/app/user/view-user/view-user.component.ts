import { Component, OnInit } from '@angular/core';
import {User} from "../User";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {


  constructor(public authService: AuthService) { }

  ngOnInit() {

  }

}
