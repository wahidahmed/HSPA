import { Component, Input, OnInit } from '@angular/core';
import { IPropertyBase } from 'src/app/model/iproperty-base';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {
@Input() property:IPropertyBase;
@Input()hideIcon:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

}
