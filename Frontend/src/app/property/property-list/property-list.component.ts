import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {


  properties: Array<any>=[
    {
    'Id':1,
    'Name':'Barlia House',
    'Type':'House',
    'Price':12000
  },
  {
    'Id':2,
    'Name':'Erro House',
    'Type':'Erro',
    'Price':1000
  },
  {
    'Id':3,
    'Name':'Mia House',
    'Type':'House MIA',
    'Price':9000
  },
  {
    'Id':4,
    'Name':'Cairo Villa',
    'Type':'Villa MIA',
    'Price':2900
  },

  {
    'Id':5,
    'Name':'Mia House -1',
    'Type':'House MIA-1',
    'Price':6000
  },

  {
    'Id':6,
    'Name':'Mainta Villa',
    'Type':'House Vila Mainata',
    'Price':90000
  },


]

  constructor() { }

  ngOnInit(): void {
  }

}
