import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AdminUser,
  AgentUser,
  BoxType,
  City,
  Country,
  DriverUser,
  Order,
  PaymentType,
  ProductType,
  StatusAction,
  StatusTypes,
  SupportUser,
  User,
  UserBox,
  UserVehicle,
  Vehicle,
} from '../../../../@core/models/data-objects';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../../../../@core/services/auth/auth.service';
import { SystemService } from '../../../../@core/services/system/system.service';
import { UserService } from '../user/user.service';
import { SupportService } from '../supports/support.service';
import { AdminService } from '../admins/admin.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../orders/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orderId: number;
  userType: string;
  userData: User;
  orderData: Order;
  countries$: Observable<Country[]>;
  cities$: Observable<City[]>;
  productTypes$: Observable<ProductType[]>;
  paymentTypes$: Observable<PaymentType[]>;
  baseURL: string;
  modalRef: BsModalRef;
  formData: FormData;
  agentPath = 'Agents';
  folderPersonalPhotosPath = 'PersonalPhotos';

  constructor(
    private authService: AuthService,
    private systemService: SystemService,
    private userService: UserService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = Number.parseInt(params['id']);
    });

    this.baseURL = this.authService.getBaseURL();
    //this.userData = this.authService.getLoggedUser().supportUser;
    this.loadCountries();
    this.loadProductsTypes();
    this.loadPaymentTypes();
    //console.log(this.userData);

    this.loadOrderData(this.orderId);
  }

  loadOrderData(id: number) {
    this.orderService.getOrder(id).subscribe((data) => {
      this.orderData = data;

      console.log(this.orderData);
      this.loadCities(this.orderData.agent.countryId);
    });
  }

  loadCountries() {
    this.countries$ = this.systemService.getCountries();
  }

  loadCities(countryId: number): void {
    this.cities$ = this.systemService.getCities(countryId);
  }

  birthCountryChange(event): void {
    this.loadCities(event.target.value);
  }

  loadProductsTypes() {
    this.productTypes$ = this.systemService.getProductTypes();
    console.log(this.productTypes$);
  }

  loadPaymentTypes() {
    this.paymentTypes$ = this.systemService.getPaymentTypes();
    console.log(this.paymentTypes$);
  }

  saveOrderItems() {}

  save() {}

  getStatusName(id: number): string {
    return StatusTypes[id];
  }

  showTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
}
