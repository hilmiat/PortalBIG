import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GeocodeService {
  public data;
  constructor(private _httpClient:HttpClient) { }

  geocode(alamat:string):Observable<any>{
    const encoded = encodeURIComponent(alamat);
    return this._httpClient
      .get<any>(`https://nominatim.openstreetmap.org/search.php?q=${encoded}&format=jsonv2`);
  }

  reverseGeo(posisi):Observable<any>{
    return this._httpClient.get<any>(
      `https://nominatim.openstreetmap.org/reverse.php?lat=${posisi.lat}&lon=${posisi.lng}&format=jsonv2`
    );
  }
}
