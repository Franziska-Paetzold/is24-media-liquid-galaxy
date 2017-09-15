import { Component } from '@angular/core';
import {MdSliderChange} from '@angular/material';
import {City} from './city';
import {CitiesNavigationService} from './cities-navigation.service';
import {Observable} from 'rxjs/Rx';
import {PropertiesListService} from './properties-list.service';
import {Property} from './property';
import {SearchService} from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  cities = City;
  city = City.Berlin;
  isRent = true;
  price = 800;
  space = 70;

  properties: Property[] = [];

  constructor(private citiesNavigationService: CitiesNavigationService,
              private propertiesListService: PropertiesListService,
              private searchService: SearchService) {
    this.startPollingProperties(propertiesListService);
  }

  private startPollingProperties(propertiesListService: PropertiesListService) {
    Observable.interval(100)
    .switchMap(() => propertiesListService.getCurrentProperties())
    .subscribe((data) => {
      if (JSON.stringify(data) !== JSON.stringify(this.properties)) {
        this.properties = data;
      }
    });
  }

  public cityChanged(city: City) {
    this.city = city;
    this.citiesNavigationService.navigate(this.city);
  }

  public spaceChanged(event: MdSliderChange) {
    this.space = event.value;
  }

  public priceChanged(event: MdSliderChange) {
    this.price = event.value;
  }

  public typeChanged(isRent: boolean) {
    this.isRent = isRent;
    if (isRent) {
      this.price = 2000;
    } else {
      this.price = 100000;
    }
  }

  public search() {
    this.searchService.search(this.isRent, this.price, this.space);
  }

  public opened(a:any) {
    console.log(a);
  }


}
