import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment as env } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PERSTAT-Web';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`${env.host}/bot-user`).subscribe(users => {
      console.log(users);
    });
  }
}
