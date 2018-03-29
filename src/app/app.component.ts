import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from './services/map.service';
import { GeocodeService } from './services/geocode.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BIG Portal';
  isRecord = false;
  dataRecording=[];
  clearData(){
    this.dataRecording = [];
  }
  ngOnInit(){
    //buat obj map pada onInit agar dibuat ketika elemen html selesai dibuat
    const mymap = L.map("mymap", 
      {
        center:L.latLng(-6.5588784,106.8536461),
        zoom:7,
        layers:[this._mapService.baseLayers.OpenStreetMap]
      });
    //opsi / tombol untuk pilih base layer
    L.control.layers(this._mapService.baseLayers,this._mapService.featureLayers)
      .addTo(mymap);
      
    // L.control.layers(this._mapService.baseLayers).addTo(mymap);

    //tambahkan base layer
    // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
    this._mapService.myMap = mymap;
    //handle click pada peta
    mymap.on('click',(e)=>{
      console.log("anda click peta ",e.latlng);
      if(this.isRecord){
        this.dataRecording.push(e.latlng);
      }else{
            this._geocode.reverseGeo(e.latlng).subscribe(
              (data)=>{
                console.log("data",data);
                this._geocode.data = data;
                const posisi = L.latLng(data.lat,data.lon);
                this._mapService.goToLocation(posisi);
                this._mapService.addMarker(posisi,data.display_name);
              },(err)=>{
                console.log('Error:',err);
              }
            );
      }
    });
    mymap.on('contextmenu',(e)=>{
      L.popup().setLatLng(e.latlng)
      .setContent("<p>hello...</p>").openOn(mymap);
    }
  );
  }
  constructor(private _mapService:MapService,private _geocode:GeocodeService){}
}
