import { Component, OnInit } from '@angular/core';

interface Item {
  item: string;
  quantity: string;
  price: string;
}

@Component({
  selector: 'app-making-order',
  templateUrl: './making-order.component.html',
  styleUrls: ['./making-order.component.scss'],
})
export class MakingOrderComponent implements OnInit {
  markers: google.maps.Marker[] = [];
  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    // maxZoom: 15,
    // minZoom:
  };
  pickupLoaction: google.maps.LatLngLiteral = null;
  dropLoaction: google.maps.LatLngLiteral = null;
  showMap = false;
  choosingPickup = false;
  choosingDrop = false;

  pickupInputValue = null;
  dropInputValue = null;

  customerName: string = null;
  customerPhone: string = null;
  customarAddress: string = null;
  paymentMethod = 'aaa';
  itemModel: Item = {
    item: null,
    quantity: null,
    price: null,
  };

  items: Item[] = [];

  constructor() {}

  ngOnInit(): void {}

  openMap() {
    this.showMap = true;
  }

  closeMap() {
    this.showMap = false;
  }

  choosePickup() {
    this.choosingPickup = true;
    this.openMap();
  }

  chooseDrop() {
    this.choosingDrop = true;
    this.openMap();
  }

  blur(e: Event) {
    (e.target as HTMLInputElement).blur();
  }

  mapClick(e: google.maps.MouseEvent) {
    if (this.choosingPickup) {
      this.pickupLoaction = e.latLng.toJSON();

      const marker = new google.maps.Marker({
        position: this.pickupLoaction,
        animation: google.maps.Animation.DROP,
      });

      this.markers[0] = marker;
      this.pickupInputValue = 'selected ...';
      console.log(this.pickupLoaction);
      console.log(this.dropLoaction);
    } else if (this.choosingDrop) {
      this.dropLoaction = e.latLng.toJSON();

      const marker = new google.maps.Marker({
        position: this.dropLoaction,
        animation: google.maps.Animation.DROP,
      });

      this.markers[0] = marker;
      this.dropInputValue = 'selected ...';
      console.log(this.pickupLoaction);
      console.log(this.dropLoaction);
    }
  }

  saveLocation() {
    this.choosingPickup = false;
    this.choosingDrop = false;
    this.closeMap();
    this.markers = [];
    console.log(this.pickupLoaction);
    console.log(this.dropLoaction);
  }

  resetMap() {
    this.markers = [];
    if (this.choosingPickup) {
      this.pickupLoaction = null;
      this.pickupInputValue = null;
      console.log(this.pickupLoaction);
      console.log(this.dropLoaction);
    } else if (this.choosingDrop) {
      this.dropLoaction = null;
      this.dropInputValue = null;
      console.log(this.pickupLoaction);
      console.log(this.dropLoaction);
    }
  }

  addItem() {
    if (
      this.itemModel.item &&
      this.itemModel.quantity &&
      this.itemModel.price
    ) {
      if (
        typeof this.itemModel.item === 'string' &&
        typeof this.itemModel.quantity === 'number' &&
        typeof this.itemModel.price === 'number'
      ) {
        const item = {
          item: this.itemModel.item,
          quantity: this.itemModel.quantity,
          price: this.itemModel.price,
        };
        this.items.push(item);
      }
    }
    this.itemModel.item = null;
    this.itemModel.quantity = null;
    this.itemModel.price = null;
  }

  deleteItem(index) {
    this.items.splice(index, 1);
  }

  submit() {
    const objectToApi = {
      AgentId: '1',
      PickupLocationLat: this.pickupLoaction.lat,
      PickupLocationLong: this.pickupLoaction.lng,
      DropLocationLat: this.dropLoaction.lat,
      DropLocationLong: this.dropLoaction.lng,
      CustomerName: this.customerName,
      CustomerPhone: this.customerPhone,
      CustomerAddress: this.customarAddress,
      OrderItems: this.items,
    };
    console.log(objectToApi);
  }
}
