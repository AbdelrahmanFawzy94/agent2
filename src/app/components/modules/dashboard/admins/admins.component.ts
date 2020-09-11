import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatRow } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import {
  AdminUser,
  SupportUser,
  SupportUserAccount,
  UserAccount,
} from '../../../../@core/models/data-objects';
import { AuthService } from '../../../../@core/services/auth/auth.service';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent implements OnInit {
  isLoading = false;
  displayedColumns: string[] = [
    // 'id',
    'avatar',
    'fullName',
    'mobile',
  ];
  dataSource: MatTableDataSource<AdminUser>;
  total = 0;
  page = 1;
  perPage = 5;

  baseURL = '';
  assetsPath = '/Assets/Images/Admins/';
  personalPhotosPath = 'PersonalPhotos';

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.baseURL = this.authService.getBaseURL();
    this.getAdminUsers(this.page, this.perPage);
  }

  getAdminUsers(page: number, perPage: number) {
    this.adminService
      .getUsers({ page, numberOfObjectsPerPage: perPage })
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<AdminUser>(data.users);
        this.total = data.total;
        this.isLoading = false;
      });
  }

  onPageChanges(e: PageEvent) {
    this.isLoading = true;
    this.page = e.pageIndex + 1;
    this.perPage = e.pageSize;
    this.getAdminUsers(this.page, this.perPage);
  }

  routeUser(id: number) {
    console.log(id);
    this.router.navigate(['dashboard/user', id, 'admin']);
  }

  newAdmin() {
    this.router.navigate(['dashboard/user', 0, 'admin']);
  }
}
