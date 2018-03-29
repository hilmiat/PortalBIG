import { Injectable } from '@angular/core';
import * as L from 'leaflet';
@Injectable()
export class MapService {
  public myMap:L.map; 
  marker;
  public baseLayers;
  constructor() { 
    //buat pilihan layer
    this.baseLayers = {
      OpenStreetMap:L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        {attribution:'Open Street Map'}),
      // Esri:{},
    }
  }
  goToLocation(location:L.latLng){
    this.myMap.panTo(location);
  }
  addMarker(position,keterangan){
    const icon = L.icon({
      iconUrl:'assets/marker-icon.png',
      shadowUrl:'assets/marker-shadow.png'
    })
    this.removeMarker();
    this.marker = L.marker(position,{icon:icon}).addTo(this.myMap);
    //buat popup untuk menampilkan display name
    const textPopup = `<div>Display Name:${keterangan}</div>`;
    this.marker.bindPopup(textPopup);
  }
  removeMarker(){
    if(this.marker)this.marker.remove();
  }
}
