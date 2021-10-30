import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): void {
    this.http.get<User[]>(`${env.host}/api/bot-user`).subscribe(users => {
      this.users.next(users);
    });
  }
}
