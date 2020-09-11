import {Component, OnInit, TemplateRef} from '@angular/core';
import {Observable} from "rxjs";
import {
  Country, CountryPrice,
  IgnorPerType,
  PenaltyPerType,
  RejectPerType,
  SystemSetting
} from "../../../../@core/models/data-objects";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {AuthService} from "../../../../@core/services/auth/auth.service";
import {SystemService} from "../../../../@core/services/system/system.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-country-price',
  templateUrl: './country-price.component.html',
  styleUrls: ['./country-price.component.scss']
})
export class CountryPriceComponent implements OnInit {


  countryPrice:CountryPrice = new CountryPrice();
  countries$ :Observable<Country[]>
  countriesPrices$ :Observable<CountryPrice[]>
  system: SystemSetting;
  baseURL : string;
  modalRef: BsModalRef;
  formData: FormData;

  constructor(private authService: AuthService,
              private systemService:SystemService,
              private route: ActivatedRoute,
              private modalService: BsModalService
  ) {}

  ngOnInit(): void {

    this.baseURL = this.authService.getBaseURL();
    this.loadCountries();
    this.loadData();



  }


  loadData(){
    this.countriesPrices$ = this.systemService.getcountriesPrices();
  }



  loadCountries(){
    this.countries$ = this.systemService.getCountries();
  }





  save(){
    console.log(this.system);
    this.systemService.addCountriesPrices(this.countryPrice).subscribe((data)=>{
      if(data == true){
        //show message success
        this.loadData();
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
