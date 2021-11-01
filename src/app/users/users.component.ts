import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AssignedTeam } from '../models/team';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { debounceTime } from 'rxjs/operators';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  public users: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  public columns = ['name', 'included_in_report', 'perstat_required', 'role', 'team_name', 'action'];

  public teams: AssignedTeam[] = [];

  public filterForm: FormGroup = this.fb.group({
    team: ['all'],
    role: ['all'],
    included: [],
    report: [],
    search: []
  });

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) public sort!: MatSort;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.api.users.subscribe(users => {
      this.users.data = users;
    });

    this.api.teams.subscribe(teams => {
      this.teams = teams;
    });

    this.filterForm.valueChanges.subscribe(change => {
      this.users.filter = change.search;
    });
  }

  ngAfterViewInit(): void {
    this.users.paginator = this.paginator;
    setTimeout(() => {
      this.users.filterPredicate = this.customFilter.bind(this);

      this.sort.sort({ id: 'name', start: 'asc' } as MatSortable);
      this.users.sort = this.sort;
    }, 0);
  }

  public resetFilter(): void {
    this.filterForm.setValue({
      report: null,
      included: null,
      team: 'all',
      role: 'all',
      search: ''
    });
  }

  private customFilter(data: User, filterString: string): boolean {
    const filter = this.filterForm.value;
    filterString = filterString.toLocaleLowerCase();

    if (filterString &&
      (
        !new RegExp(filterString, 'g').test(data.name?.toLocaleLowerCase()) &&
        !new RegExp(filterString, 'g').test(data.team_name?.toLocaleLowerCase())
      )
      ) {
      return false;
    }

    if (filter.report && !data.included_in_report) {
      return false;
    }

    if (filter.included && !data.perstat_required) {
      return false;
    }

    if (filter.team !== 'all' && data.team_name !== filter.team) {
      return false;
    }

    if (filter.role !== 'all' && data.role !== filter.role) {
      return false;
    }

    return true;
  }

  public editUser(user: User): void {
    this.router.navigate(['edit', user.bot_id], { relativeTo: this.route });
  }

}
