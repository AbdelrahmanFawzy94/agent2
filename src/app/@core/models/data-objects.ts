export enum Role {
  User = 'User',
  Admin = 'Admin',
  Support = 'Support',
}

export enum StatusTypes {
  New = 1,
  Ready = 2,
  Working = 3 ,
  Progress = 4,
  Suspended = 5,
  Stopped = 6,
  Reviewing = 7,
  Penalty = 8,
  Incomplete = 9,
  Complete = 10
}

export class LoginUser {
  email: string;
  password: string;
}


export class StatusAction{
    userType :string;
    userId: number;
    statusTypeId :number;
    modifiedBy :number;
}


export class User {
  id : number;
  fullname: string;

  birthCountry: string;
  birthCity: string;
  countryId: number;
  cityId: number;

  birthDate: Date;
  birthDay: number;
  birthMonth: number;
  birthYear: number;

  address: string;
  gender: string;
  email: string;
  mobile: string;
  currentStatusId: number

  nationalNumber: string;
  residenceExpireDate: Date;
  residenceExpireDay: number;
  residenceExpireMonth: number;
  residenceExpireYear: number;
  nationalNumberImageName: string; // e.g 5363456.jpg
  nationalNumberPhotoFile: File;
  image:string;
  personalImageName: string; // e.g 124342556.jpg
  personalPhotoFile: File;

  residenceCountry: string;
  residenceCountryId: number;
  residenceCity: string;
  residenceCityId: number;

  userAccounts: Array<UserAccount> = new Array<UserAccount>();
  userVehicles: Array<UserVehicle> = new Array<UserVehicle>();

  supportUserAccounts: Array<SupportUserAccount> = new Array<SupportUserAccount>();
  adminUserAccounts: Array<AdminUserAccount> = new Array<AdminUserAccount>();
}







export class Pagination {
  page: number;
  numberOfObjectsPerPage: number;
}

export class DriversPaginationResult {
  users: Array<UserAccount> = new Array<UserAccount>();
  total: number;
}


export class SupportsPaginationResult {
  users: Array<SupportUser> = new Array<SupportUser>();
  total: number;
}

export class AdminsPaginationResult {
  users: Array<AdminUser> = new Array<AdminUser>();
  total: number;
}

export class AgentsPaginationResult {
  users: Array<AgentUser> = new Array<AgentUser>();
  total: number;
}

export class SupportUserAccount {
  id: number;
  supportUserId: number;
  statusTypeId: number;
  fullname: string;
  email: string;
  token: string;
  isDeleted: boolean;
  createdBy: number;
  modifiedBy: number;
  CreationDate: Date;
  ModificationDate: Date;
  statusType: SupportStatusType;
  supportUser: SupportUser;
}

export class AdminUserAccount {
  id: number;
  supportUserId: number;
  statusTypeId: number;
  fullname: string;
  email: string;
  token: string;
  isDeleted: boolean;
  createdBy: number;
  modifiedBy: number;
  CreationDate: Date;
  ModificationDate: Date;
  statusType: AdminStatusType = new AdminStatusType();
  adminUser: AdminUser = new AdminUser();
}

export class UserAccount {
  id: number;
  supportUserId: number;
  statusTypeId: number;
  fullName: string;
  mobile: string;
  token: string;
  isDeleted: boolean;
  createdBy: number;
  modifiedBy: number;
  CreationDate: Date;
  ModificationDate: Date;
  statusType: StatusType;
  user: User = new User();
}

// User is a Driver User
export class DriverUser extends User{
  // id : number;
  // fullname: string;
  //
  // birthCountry: string;
  // birthCity: string;
  // countryId: number;
  // cityId: number;
  //
  // birthDate: Date;
  // birthDay: number;
  // birthMonth: number;
  // birthYear: number;
  //
  // address: string;
  // gender: string;
  // email: string;
  // mobile: string;
  //
  // nationalNumber: string;
  // residenceExpireDate: Date;
  // residenceExpireDay: number;
  // residenceExpireMonth: number;
  // residenceExpireYear: number;
  // nationalNumberImageName: string; // e.g 5363456.jpg
  // nationalNumberPhotoFile: File;
  //
  // personalImageName: string; // e.g 124342556.jpg
  // personalPhotoFile: File;
  //
  // residenceCountry: string;
  // residenceCountryId: number;
  // residenceCity: string;
  // residenceCityId: number;

  //userAccounts: Array<UserAccount> = new Array<UserAccount>();
  //userVehicles: Array<UserVehicle> = new Array<UserVehicle>();

}

export class SupportUser extends User{

  // id : number;
  // fullname: string;
  //
  // birthCountry: string;
  // birthCity: string;
  // countryId: number;
  // cityId: number;
  //
  // birthDate: Date;
  // birthDay: number;
  // birthMonth: number;
  // birthYear: number;
  //
  // address: string;
  // gender: string;
  // email: string;
  // mobile: string;
  //
  // nationalNumber: string;
  // residenceExpireDate: Date;
  // residenceExpireDay: number;
  // residenceExpireMonth: number;
  // residenceExpireYear: number;
  // nationalNumberImageName: string; // e.g 5363456.jpg
  // nationalNumberPhotoFile: File;
  //
   image: string; // e.g 124342556.jpg
  // personalPhotoFile: File;
  //
  // residenceCountry: string;
  // residenceCountryId: number;
  // residenceCity: string;
  // residenceCityId: number;
}

export class SupportStatusType {
  id: number;
  type: string;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;
}

export class AdminStatusType {
  id: number;
  type: string;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;
}

export class AdminUser extends User{
  // id : number;
  // fullname: string;
  //
  // birthCountry: string;
  // birthCity: string;
  // countryId: number;
  // cityId: number;
  //
  // birthDate: Date;
  // birthDay: number;
  // birthMonth: number;
  // birthYear: number;
  //
  // address: string;
  // gender: string;
  // email: string;
  // mobile: string;
  //
  // nationalNumber: string;
  // residenceExpireDate: Date;
  // residenceExpireDay: number;
  // residenceExpireMonth: number;
  // residenceExpireYear: number;
  // nationalNumberImageName: string; // e.g 5363456.jpg
  // nationalNumberPhotoFile: File;
  //
  // image: string; // e.g 124342556.jpg
  // personalPhotoFile: File;
  //
  // residenceCountry: string;
  // residenceCountryId: number;
  // residenceCity: string;
  // residenceCityId: number;
}


export class AgentUser extends User{
  // id : number;
  // fullname: string;
  //
  // birthCountry: string;
  // birthCity: string;
  // countryId: number;
  // cityId: number;
  //
  // birthDate: Date;
  // birthDay: number;
  // birthMonth: number;
  // birthYear: number;
  //
  // address: string;
  // gender: string;
  // email: string;
  // mobile: string;
  //
  // nationalNumber: string;
  // residenceExpireDate: Date;
  // residenceExpireDay: number;
  // residenceExpireMonth: number;
  // residenceExpireYear: number;
  // nationalNumberImageName: string; // e.g 5363456.jpg
  // nationalNumberPhotoFile: File;
  //
  // personalImageName: string; // e.g 124342556.jpg
  // personalPhotoFile: File;
  //
  // residenceCountry: string;
  // residenceCountryId: number;
  // residenceCity: string;
  // residenceCityId: number;

  //userAccounts: Array<UserAccount> = new Array<UserAccount>();
  //userVehicles: Array<UserVehicle> = new Array<UserVehicle>();

}

export class StatusType {
  id: number;
  type: string;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;
}

export class SupportMessage {
  id: number;
  supportAssignId: number;
  isUser: boolean;
  message: string;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;
}

export class SupportAssignment {
  id: number;
  supportUserId: number;
  userId: number;
  supportId: number;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;

  support: Support = new Support();
  supportUser: SupportUser = new SupportUser();
  user: User = new User();
}

export class Support {
  id: number;
  supportTypeId: number;
  userId: number;
  statusTypeId: number;
  description: string;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;
}



export class Country {
  id: number;
  name: string;
  iso: string;
  code: number;
  arabicName: string;
  currencyName: string;
  currencyArabicName: string;
  currencyIso: string;
}

export class City {
  id: number;
  countryId: number;
  name: string;
  arabicName: string;
}



export class UserVehicle {
  id: number;
  userId: number;
  vehicleId: number;
  plateNumber: string;
  model: string;
  vehicleImageName: string; // e.g 3253464356.jpg
  vehicleImageFile: File;

  isActive: boolean = true;

  licenseImageName: string; // e.g 3253464356.jpg
  licenseImageFile: File;
  licenseNumber: string;

  userBoxes: Array<UserBox> = new Array<UserBox>();
}

export class UserBox {
  id: number;
  userVehicleId: number;
  boxTypeId: number;
  isDeleted: boolean = false;
}

export class Vehicle {
  id: number;
  type: string;
  arabicType:string;
}

export class BoxType {
  id: number;
  type: string;
  arabicType:string;
}


export class Order{
  id : number;
  agentId : number;
  productTypeId :number;
  productOtherType : string;
  customerName : string;
  customerPhone :string;
  customerAddress :string;
  paymentTypeId :number;
  description :string;
  details :string;
  pickupLocationLat :string;
  pickupLocationLong :string;
  dropLocationLat :string;
  dropLocationLong :string;
  currentStatus :number;
  isDeleted :boolean;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;

  agent : AgentUser;
  paymentType: PaymentType ;
  productType: ProductType ;
  orderItems : Array<OrderItem> = new Array<OrderItem>();
  orderCurrentStatus : Array<OrderCurrentStatus> = new Array<OrderCurrentStatus>();
}

export class PaymentType {
  id: number;
  type: string;
  allowed:boolean;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;
}

export class ProductType {
  id: number;
  type: string;
  arabicType:string;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;
}


export class OrderCurrentStatus {
  id: number;
  orderId:number;
  statusTypeId:number;
  isCurrent:boolean;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;
}

export class OrderItem {
  id: number;
  orderId:number;
  item: string;
  description:string;
  quantity:number;
  price:number;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;
}

export class OrdersPaginationResult {
  orders: Array<Order> = new Array<Order>();
  total: number;
}


export class SystemSetting {
  id : number;
  allowUserToReject :boolean;
  allowUserToWorkOutShift :boolean;
  allowUserPayment :boolean;
  allowFixedPricePerCountry :boolean;
  allowPricePerProductCountry :boolean;
  rejectPerTypeId : number;
  rejectRequestsNumbers :number;
  rejectPenaltyPerTypeId :number;
  rejectPenaltyPeriodNumber :number;
  ignorPerTypeId :number;
  ignorRequestsNumbers :number;
  ignorPenaltyPerTypeId :number;
  ignorPenaltyPeriodNumber :number;
  isCurrent :boolean;
  isDeleted :boolean;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;
}


export class RejectPerType {
  id: number;
  type: string;
  arabicType:string;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;
}

export class IgnorPerType {
  id: number;
  type: string;
  arabicType:string;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;
}


export class PenaltyPerType {
  id: number;
  type: string;
  arabicType:string;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;
}


export class CountryPrice {
  id: number;
  countryId: number;
  kilometers:number;
  price:number;
  extraKilometers : number;
  extraKiloPrice : number;
  isDeleted : number;
  createdBy: number;
  modifiedBy: number;
  creationDate: Date;
  modificationDate: Date;
  country: Country;
}
