import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../services/map.service';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  model = {searchText:''}

  cari(){
    console.log("Anda ingin pergi ke-",this.model.searchText);
    // const latlng = this.model.searchText.split(",");
    this.geocode(this.model.searchText).subscribe(
      (result)=>{
        if(result.length === 0){
          return;
        }
        const posisi = L.latLng(result[0].lat,result[0].lon);
        this._mapService.goToLocation(posisi);
        this._mapService.addMarker(posisi,result[0].display_name);
      },
      (error)=>{

      }
    );
    
  }
  constructor(private _mapService:MapService,private _http:HttpClient) { }

  geocode(alamat:string):Observable<any>{
    const encoded = encodeURIComponent(alamat);
    return this._http
      .get<any>(`https://nominatim.openstreetmap.org/search.php?q=${encoded}&format=jsonv2`);
  }
  ngOnInit() {
  }

}
