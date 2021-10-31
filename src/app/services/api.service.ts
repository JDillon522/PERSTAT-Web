import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { environment as env } from '../../environments/environment';
import { AssignedTeam } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public teams: BehaviorSubject<AssignedTeam[]> = new BehaviorSubject<AssignedTeam[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  public getUsers(): void {
    this.http.get<User[]>(`${env.host}/api/bot-user`).subscribe(users => {
      this.users.next(users);
    });
  }

  public getTeams(): void {
    this.http.get<AssignedTeam[]>(`${env.host}/api/team`).subscribe(teams => {
      this.teams.next(teams);
    });
  }
}
