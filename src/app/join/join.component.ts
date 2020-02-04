import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  error: any;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.eventAuthError$.subscribe(data => {
      this.error = data;
    });
  }

}
