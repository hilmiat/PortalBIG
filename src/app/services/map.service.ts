import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
@Injectable()
export class MapService {
  public myMap:L.map; 
  marker;
  public baseLayers;
  public featureLayers;
  constructor() { 
    //buat pilihan layer
    this.baseLayers = {
      OpenStreetMap:L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        {attribution:'Open Street Map'}),
      RBI:esri.basemapLayer("Streets",
        {
          url:'http://portal.ina-sdi.or.id/arcgis/rest/services/IGD/RupabumiIndonesia/MapServer',
          attribution:'Peta RBI'
        }),
    }
    //menambahkan feature layer
    this.featureLayers = {
      "Batas Wilayah":esri.featureLayer({url:"http://portal.ina-sdi.or.id/gis/rest/services/RakornasIG2018/BatasAdmProv/MapServer/0"}),
      
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
