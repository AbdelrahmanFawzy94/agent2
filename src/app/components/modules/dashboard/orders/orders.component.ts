import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Order, UserAccount } from '../../../../@core/models/data-objects';
import { UserService } from '../user/user.service';
import { AuthService } from '../../../../@core/services/auth/auth.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  isLoading = false;
  displayedColumns: string[] = [
    // 'id',
    'orderNumber',
    'fromAgent',
    'toCustomer',
  ];
  dataSource: MatTableDataSource<Order>;
  total = 0;
  page = 1;
  perPage = 5;

  baseURL = '';
  assetsPath = '/Assets/Images/Drivers/';
  personalPhotosPath = 'PersonalPhotos';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.baseURL = this.authService.getBaseURL();
    this.getDrivers(this.page, this.perPage);
  }

  getDrivers(page: number, perPage: number) {
    this.orderService
      .getOrders({ page, numberOfObjectsPerPage: perPage })
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<Order>(data.orders);
        this.total = data.total;
        this.isLoading = false;
      });
  }

  onPageChanges(e: PageEvent) {
    this.isLoading = true;
    this.page = e.pageIndex + 1;
    this.perPage = e.pageSize;
    this.getDrivers(this.page, this.perPage);
  }

  routeUser(id: number) {
    console.log(id);
    this.router.navigate(['dashboard/order/', id]);
  }
}
