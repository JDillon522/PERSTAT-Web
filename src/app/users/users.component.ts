import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  public columns = ['name', 'included_in_perstat', 'perstat_required'];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.users.subscribe(users => {
      this.users.data = users;
    });
  }

}
