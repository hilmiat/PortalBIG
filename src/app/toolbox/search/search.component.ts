import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../services/map.service';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import { GeocodeService } from '../../services/geocode.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  model = {searchText:''}
  result;
  cari(){
    console.log("Anda ingin pergi ke-",this.model.searchText);
    // const latlng = this.model.searchText.split(",");
    this._geocode.geocode(this.model.searchText).subscribe(
      (result)=>{
        if(result.length === 0){
          return;
        }
        this.result = result;
        console.log(result);
        this._geocode.data = result[0];
        this.pilih(result[0]);
      },
      (error)=>{

      }
    );
    
  }
  constructor(private _mapService:MapService,
    private _http:HttpClient,private _geocode:GeocodeService) { }


  ngOnInit() {
  }
  pilih(lokasi){
    const posisi = L.latLng(lokasi.lat,lokasi.lon);
    this._mapService.goToLocation(posisi);
    this._mapService.addMarker(posisi,lokasi.display_name);
    this.model.searchText = lokasi.display_name;
  }
}
