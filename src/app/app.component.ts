import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment as env } from '../environments/environment';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PERSTAT-Web';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getUsers();
  }
}
