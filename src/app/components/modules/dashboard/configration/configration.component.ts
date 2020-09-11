import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  City,
  Country,
  IgnorPerType,
  Order,
  PaymentType,
  PenaltyPerType,
  ProductType,
  RejectPerType,
  StatusTypes,
  SystemSetting,
  User,
} from '../../../../@core/models/data-objects';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../../../../@core/services/auth/auth.service';
import { SystemService } from '../../../../@core/services/system/system.service';
import { UserService } from '../user/user.service';
import { OrderService } from '../orders/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configration',
  templateUrl: './configration.component.html',
  styleUrls: ['./configration.component.scss'],
})
export class ConfigrationComponent implements OnInit {
  rejectPerTypes$: Observable<RejectPerType[]>;
  ignorPerTypes$: Observable<IgnorPerType[]>;
  rejectPenaltyPerTypes$: Observable<PenaltyPerType[]>;
  ignorePenaltyPerTypes$: Observable<PenaltyPerType[]>;
  ignoreType: string = '[type]';
  rejectType: string = '[type]';
  rejectPenaltyType: string = '[type]';
  ignorePenaltyType: string = '[type]';
  system: SystemSetting;
  baseURL: string;
  modalRef: BsModalRef;
  formData: FormData;

  constructor(
    private authService: AuthService,
    private systemService: SystemService,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadIgnorPerTypes();
    this.loadPenaltyPerTypes();
    this.loadRejectPerTypes();
    this.baseURL = this.authService.getBaseURL();
    this.loadData();
  }

  loadData() {
    this.systemService.getCurrentSystemSettings().subscribe((data) => {
      this.system = data;
    });
  }

  loadIgnorPerTypes() {
    this.ignorPerTypes$ = this.systemService.getIgnorePerTypes();
  }

  loadRejectPerTypes() {
    this.rejectPerTypes$ = this.systemService.getRejectPerTypes();
  }

  loadPenaltyPerTypes() {
    this.rejectPenaltyPerTypes$ = this.ignorePenaltyPerTypes$ = this.systemService.getPenaltyPerTypes();
  }

  getRejectPerType(id: number): string {
    return '';
  }

  rejectPerTypeOnChange(id: any) {
    switch (id) {
      case '1': {
        this.rejectType = 'Hour';
        break;
      }
      case '2': {
        this.rejectType = 'Day';
        break;
      }
      case '3': {
        this.rejectType = 'Month';
        break;
      }
      case '4': {
        this.rejectType = 'Year';
        break;
      }
    }
  }

  ignorePerTypeOnChange(id: any) {
    switch (id) {
      case '1': {
        this.ignoreType = 'Hour';
        break;
      }
      case '2': {
        this.ignoreType = 'Day';
        break;
      }
      case '3': {
        this.ignoreType = 'Month';
        break;
      }
      case '4': {
        this.ignoreType = 'Year';
        break;
      }
    }
  }

  rejectPenaltyPerTypeOnChange(id: any) {
    switch (id) {
      case '1': {
        this.rejectPenaltyType = 'Hour';
        break;
      }
      case '2': {
        this.rejectPenaltyType = 'Day';
        break;
      }
      case '3': {
        this.rejectPenaltyType = 'Month';
        break;
      }
      case '4': {
        this.rejectPenaltyType = 'Year';
        break;
      }
    }
  }

  ignorePenaltyPerTypeOnChange(id: any) {
    switch (id) {
      case '1': {
        this.ignorePenaltyType = 'Hour';
        break;
      }
      case '2': {
        this.ignorePenaltyType = 'Day';
        break;
      }
      case '3': {
        this.ignorePenaltyType = 'Month';
        break;
      }
      case '4': {
        this.ignorePenaltyType = 'Year';
        break;
      }
    }
  }

  save() {
    console.log(this.system);
    this.systemService.saveConfigurations(this.system).subscribe((data) => {
      if (data == true) {
        //show message success
      }
    });
  }

  showTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
}
