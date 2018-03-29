import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './toolbox/search/search.component';
import { MapService } from './services/map.service';
import { GeocodeService } from './services/geocode.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MapService,HttpClientModule, GeocodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
