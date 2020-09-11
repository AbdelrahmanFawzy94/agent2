import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../../@core/services/auth/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  AdminUser,
  AgentUser,
  BoxType,
  City,
  Country,
  DriverUser,
  StatusAction,
  StatusTypes,
  SupportUser,
  SupportUserAccount,
  User,
  UserBox,
  UserVehicle,
  Vehicle,
} from '../../../../@core/models/data-objects';
import { Observable } from 'rxjs';
import { SystemService } from '../../../../@core/services/system/system.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { SupportService } from '../supports/support.service';
import { AdminService } from '../admins/admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userId: number;
  userType: string;
  userData: User;
  userVehicle: UserVehicle;
  userBox: UserBox;
  isReviewing: boolean = false;
  countries$: Observable<Country[]>;
  cities$: Observable<City[]>;
  residenceCountries$: Observable<Country[]>;
  residenceCities$: Observable<City[]>;
  vehicles$: Observable<Vehicle[]>;
  boxTypes$: Observable<BoxType[]>;
  baseURL: string;
  supportPath = 'Supports';
  adminPath = 'Admins';
  folderPersonalPhotosPath = 'PersonalPhotos';
  modalRef: BsModalRef;
  formData: FormData;

  constructor(
    private authService: AuthService,
    private systemService: SystemService,
    private userService: UserService,
    private supportService: SupportService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = Number.parseInt(params['id']);
      this.userType = params['type'];
      console.log(this.userType + '    ' + this.userId);
    });

    this.baseURL = this.authService.getBaseURL();
    //this.userData = this.authService.getLoggedUser().supportUser;
    this.loadCountries();

    //console.log(this.userData);

    if (this.userType != null && this.userType.toLowerCase() === 'driver') {
      this.userData = new DriverUser();
      if (this.userId == 0) return;

      this.loadDriverUserData(this.userId);
    } else if (
      this.userType != null &&
      this.userType.toLowerCase() === 'support'
    ) {
      this.userData = new SupportUser();
      if (this.userId == 0) return;

      this.loadSupportUserData(this.userId);
    } else if (
      this.userType != null &&
      this.userType.toLowerCase() === 'admin'
    ) {
      this.userData = new AdminUser();
      if (this.userId == 0) return;

      this.loadAdminUserData(this.userId);
    } else if (
      this.userType != null &&
      this.userType.toLowerCase() === 'agent'
    ) {
      this.userData = new AgentUser();
      if (this.userId == 0) return;
    }
  }

  showVehicleDetails(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  loadDriverUserData(id: number) {
    this.userService.getDriverUserData(id).subscribe((data) => {
      this.userData = data;
      if (this.userData.currentStatusId == StatusTypes.Reviewing)
        this.isReviewing = true;

      if (this.userData.userVehicles.length > 0)
        this.userVehicle = this.userData.userVehicles[0];

      if (this.userVehicle?.userBoxes.length > 0)
        this.userBox = this.userVehicle?.userBoxes[0];

      console.log(this.userData);
      this.loadCities(this.userData.countryId);
      this.loadResidenceCities(this.userData.residenceCountryId);
      this.loadVehicles();
      this.loadBoxTypes();
    });
  }

  loadSupportUserData(id: number) {
    this.supportService.getUser(id).subscribe((data) => {
      this.userData = data;

      console.log(this.userData);
      this.loadCities(this.userData.countryId);
      this.loadResidenceCities(this.userData.residenceCountryId);
    });
  }

  loadAdminUserData(id: number) {
    this.adminService.getUser(id).subscribe((data) => {
      this.userData = data;

      console.log(this.userData);
      this.loadCities(this.userData.countryId);
      this.loadResidenceCities(this.userData.residenceCountryId);
    });
  }

  loadVehicles() {
    this.vehicles$ = this.systemService.getVehicles();
  }

  loadBoxTypes() {
    this.boxTypes$ = this.systemService.getBoxTypes();
  }

  loadCountries() {
    this.countries$ = this.residenceCountries$ = this.systemService.getCountries();
  }

  loadResidenceCities(countryId: number): void {
    this.residenceCities$ = this.systemService.getCities(countryId);
  }

  loadCities(countryId: number): void {
    this.cities$ = this.systemService.getCities(countryId);
  }

  birthCountryChange(event): void {
    this.loadCities(event.target.value);
  }

  residenceCountryChange(event): void {
    this.loadResidenceCities(event.target.value);
  }

  vehicleDetails() {}

  acceptProfile() {
    // let statusAction : StatusAction = new StatusAction();
    // statusAction.userType = this.userType;
    // statusAction.userId = this.userId;
    // statusAction.statusTypeId = StatusTypes.Working;
    //
    // this.systemService.changeUserStatus(statusAction).subscribe((data) => {
    //
    // });
  }

  save() {
    if (this.userType.toLowerCase() === 'driver') this.saveDriverData();
    else if (this.userType.toLowerCase() === 'support') this.saveSupportData();
    else if (this.userType.toLowerCase() === 'admin') this.saveAdminData();
  }

  saveAdminData() {
    console.log(this.userData);

    if (this.userId > 0) {
      this.adminService.updateAdmin(this.userData).subscribe((result) => {
        if (result == true) {
          //show message success
        }
      });
    } else if (this.userId === 0) {
      this.adminService.addAdmin(this.userData).subscribe((result) => {
        //show message with generated password
      });
    }
  }

  saveSupportData() {
    console.log(this.userData);

    if (this.userId > 0) {
      this.supportService.updateSupport(this.userData).subscribe((result) => {
        if (result == true) {
          //show message success
        }
      });
    } else if (this.userId === 0) {
      this.supportService.addSupport(this.userData).subscribe((result) => {
        //show message with generated password
      });
    }
  }

  saveDriverData() {
    this.prepareImagesData();
    console.log(this.userData);

    if (this.userId > 0) {
      this.userService.updateDriver(this.userData).subscribe((data) => {
        if (data == true) {
          this.userService
            .submitDriverPictures(this.formData)
            .subscribe((data) => {
              // adding message success
            });
        }
      });
    }
  }

  saveVehicleDetails() {
    this.userVehicle.userBoxes = new Array<UserBox>();
    this.userData.userVehicles = new Array<UserVehicle>();
    this.userVehicle.userBoxes.push(this.userBox);
    this.userData.userVehicles.push(this.userVehicle);
    this.modalRef.hide();
  }

  prepareImagesData() {
    this.formData = new FormData();
    let blob: Blob = new Blob();

    this.formData.append('UserID', blob, this.userId.toString());

    this.formData.append(
      'PersonalPhotos',
      this.userData.personalPhotoFile,
      this.userData.personalPhotoFile.name
    );
    this.formData.append(
      'NationalNumberPhotos',
      this.userData.nationalNumberPhotoFile,
      this.userData.nationalNumberPhotoFile.name
    );
    this.formData.append(
      'VehicleLicensePhotos',
      this.userVehicle.licenseImageFile,
      this.userVehicle.licenseImageFile.name
    );
    this.formData.append(
      'VehiclesPhotos',
      this.userVehicle.vehicleImageFile,
      this.userVehicle.vehicleImageFile.name
    );
  }

  stopUserChange(event) {
    let statusAction: StatusAction = new StatusAction();
    statusAction.userType = this.userType;
    statusAction.userId = this.userId;
    if (event.target.checked == true)
      statusAction.statusTypeId = StatusTypes.Stopped;
    else statusAction.statusTypeId = StatusTypes.Working;

    this.systemService.changeUserStatus(statusAction).subscribe((data) => {});
  }

  suspendUserChange(event) {
    let statusAction: StatusAction = new StatusAction();
    statusAction.userType = this.userType;
    statusAction.userId = this.userId;
    if (event.target.checked == true)
      statusAction.statusTypeId = StatusTypes.Suspended;
    else statusAction.statusTypeId = StatusTypes.Working;

    this.systemService.changeUserStatus(statusAction).subscribe((data) => {});
  }

  onVehiclePictureChange(event) {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }

    const file: File = event.target.files[0];
    const extension = file.type.split('/')[1];
    const uniqueNumber = Math.floor(new Date().valueOf() * Math.random());
    // let uniqueNumber =(new Date().getTime()).toString(20);
    const fileName: string = 'VP_' + uniqueNumber + '.' + extension;
    this.userVehicle.vehicleImageName = fileName;
    this.userVehicle.vehicleImageFile = new File([file], fileName, {
      type: file.type,
    });

    console.log(this.userVehicle.vehicleImageName);
  }

  onLicensePictureChange(event) {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }

    const file: File = event.target.files[0];
    const extension = file.type.split('/')[1];
    const uniqueNumber = Math.floor(new Date().valueOf() * Math.random());
    // let uniqueNumber =(new Date().getTime()).toString(20);
    const fileName: string = 'LP_' + uniqueNumber + '.' + extension;
    this.userVehicle.licenseImageName = fileName;
    this.userVehicle.licenseImageFile = new File([file], fileName, {
      type: file.type,
    });

    console.log(this.userVehicle.licenseImageName);
  }

  onNationalNumberPhotoChange(event) {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }

    const file: File = event.target.files[0];
    const extension = file.type.split('/')[1];
    const uniqueNumber = Math.floor(new Date().valueOf() * Math.random());
    // let uniqueNumber =(new Date().getTime()).toString(20);
    const fileName: string = 'NNP_' + uniqueNumber + '.' + extension;
    this.userData.nationalNumberImageName = fileName;
    this.userData.nationalNumberPhotoFile = new File([file], fileName, {
      type: file.type,
    });

    console.log(this.userData.nationalNumberImageName);
  }

  onPersonalPhotoChange(event) {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }

    const file: File = event.target.files[0];
    const extension = file.type.split('/')[1];
    const uniqueNumber = Math.floor(new Date().valueOf() * Math.random());
    // let uniqueNumber =(new Date().getTime()).toString(20);
    const fileName: string = 'PP_' + uniqueNumber + '.' + extension;
    this.userData.personalImageName = fileName;
    this.userData.personalPhotoFile = new File([file], fileName, {
      type: file.type,
    });

    console.log(this.userData.nationalNumberImageName);
  }

  openFileInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const fileInput = input.nextElementSibling as HTMLInputElement;
    fileInput.click();
    const controlName = fileInput.getAttribute('name');

    fileInput.addEventListener('change', (e) => {
      const inputt = e.target as HTMLInputElement;
      const file = inputt.files[0] as File;
      const fileName = file.name;
      input.value = fileName;
      input.blur();
    });
  }
}
