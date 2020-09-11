import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../@core/services/auth/auth.service';
import {City, Country, SupportUser, SupportUserAccount} from '../../../../@core/models/data-objects';
import {Observable} from "rxjs";
import {SystemService} from "../../../../@core/services/system/system.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData: SupportUser;
  countries$ :Observable<Country[]>;
  cities$ : Observable<City[]>;
  residenceCountries$ :Observable<Country[]>;
  residenceCities$ : Observable<City[]>;
  baseURL : string;
  supportPath = 'Supports';
  folderPersonalPhotosPath = 'PersonalPhotos';

  constructor(private authService: AuthService,
              private systemService:SystemService) {}

  ngOnInit(): void {
    this.baseURL = this.authService.getBaseURL();
    this.userData = this.authService.getLoggedUser().supportUser;
    this.loadCountries();
    this.loadCities(this.userData.countryId);
    this.loadResidenceCities(this.userData.residenceCountryId);
    console.log(this.userData);
  }


  loadCountries(){
    this.countries$  = this.residenceCountries$ = this.systemService.getCountries();
  }

  loadResidenceCities(countryId:number):void{
    this.residenceCities$ = this.systemService.getCities(countryId);
  }

  loadCities(countryId:number):void{
    this.cities$ = this.systemService.getCities(countryId);
  }

  birthCountryChange(event):void{
    this.loadCities(event.target.value);
  }

  residenceCountryChange(event):void{
    this.loadResidenceCities(event.target.value);
  }



  update() {
    console.log(this.userData);
  }
}
