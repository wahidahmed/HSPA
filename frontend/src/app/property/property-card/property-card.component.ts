import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  Property:any={
    name:'wahid house'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
