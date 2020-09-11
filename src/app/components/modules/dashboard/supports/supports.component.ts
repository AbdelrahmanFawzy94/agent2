import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatRow } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import {
  SupportUser,
  SupportUserAccount,
  UserAccount,
} from '../../../../@core/models/data-objects';
import { AuthService } from '../../../../@core/services/auth/auth.service';
import { Router } from '@angular/router';
import { SupportService } from './support.service';

@Component({
  selector: 'app-supports',
  templateUrl: './supports.component.html',
  styleUrls: ['./supports.component.scss'],
})
export class SupportsComponent implements OnInit {
  isLoading = false;
  displayedColumns: string[] = [
    // 'id',
    'avatar',
    'fullName',
    'mobile',
  ];
  dataSource: MatTableDataSource<SupportUser>;
  total = 0;
  page = 1;
  perPage = 5;

  baseURL = '';
  assetsPath = '/Assets/Images/Supports/';
  personalPhotosPath = 'PersonalPhotos';

  constructor(
    private supportService: SupportService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.baseURL = this.authService.getBaseURL();
    this.getSupportUsers(this.page, this.perPage);
  }

  getSupportUsers(page: number, perPage: number) {
    this.supportService
      .getUsers({ page, numberOfObjectsPerPage: perPage })
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<SupportUser>(data.users);
        this.total = data.total;
        this.isLoading = false;
      });
  }

  onPageChanges(e: PageEvent) {
    this.isLoading = true;
    this.page = e.pageIndex + 1;
    this.perPage = e.pageSize;
    this.getSupportUsers(this.page, this.perPage);
  }

  routeUser(id: number) {
    console.log(id);
    this.router.navigate(['dashboard/user', id, 'support']);
  }

  newSupport() {
    this.router.navigate(['dashboard/user', 0, 'support']);
  }
}
