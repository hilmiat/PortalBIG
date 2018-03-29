import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './services/map.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BIG Portal';
  
  ngOnInit(){
    //buat obj map pada onInit agar dibuat ketika elemen html selesai dibuat
    const mymap = L.map("mymap", 
      {
        center:L.latLng(-6.5588784,106.8536461),
        zoom:7,
        layers:[this._mapService.baseLayers.OpenStreetMap]
      });
    //opsi / tombol untuk pilih base layer
    L.control.layers(this._mapService.baseLayers).addTo(mymap);
    //tambahkan base layer
    // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
    this._mapService.myMap = mymap;
  }
  constructor(private _mapService:MapService){}
}
