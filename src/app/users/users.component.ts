import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  public users: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  public columns = ['name', 'included_in_report', 'perstat_required', 'role', 'team_name'];

  public filterForm: FormGroup = this.fb.group({
    team: [],
    included: [],
    report: []
  });

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) public sort!: MatSort;

  constructor(
    private api: ApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.api.users.subscribe(users => {
      this.users.data = users;
    });
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;

    setTimeout(() => {
      this.sort.sort({ id: 'name', start: 'asc' } as MatSortable);
      this.users.sort = this.sort;
    }, 0);
  }

}
