
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../../model/iproperty';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/model/property';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  sellRent=1;
  properties:Array<Property>;
  Today = new Date();
  City = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';

  constructor(private housingServie:HousingService,private route:ActivatedRoute) {

  }

  ngOnInit(): void {
      if(this.route.snapshot.url.toString()){
        this.sellRent=2;
      }
    this.housingServie.getAllProperties(this.sellRent).subscribe(data=>{
      this.properties=data;
      // const newProperties=JSON.parse(localStorage.getItem('newProp'));

      // if(newProperties.SellRent==this.sellRent){
      //   this.properties=[newProperties,...this.properties]
      // }
    })
  }

  onCityFilter() {
    this.SearchCity = this.City;
  }

  onCityFilterClear() {
    this.SearchCity = '';
    this.City = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }


}
