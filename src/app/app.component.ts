import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth';

@Component({
  selector: 'fitn-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular 6';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initAuthListener();
  }
}
