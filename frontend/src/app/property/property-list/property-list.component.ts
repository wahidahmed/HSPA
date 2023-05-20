
import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IProperty } from '../../model/iproperty';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  sellRent=1;
  properties:Array<IProperty>;

  constructor(private housingServie:HousingService,private route:ActivatedRoute) {

  }

  ngOnInit(): void {
      if(this.route.snapshot.url.toString()){
        this.sellRent=2;
      }
    this.housingServie.getAllProperties(this.sellRent).subscribe(data=>{
      this.properties=data;
      const newProperties=JSON.parse(localStorage.getItem('newProp'));

      if(newProperties.SellRent==this.sellRent){
        this.properties=[newProperties,...this.properties]
      }
    })
  }

}
