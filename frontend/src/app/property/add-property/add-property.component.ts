import { Component, OnInit,ViewChild } from '@angular/core';
import{NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
@ViewChild('Form') addPropertyForm:NgForm
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.addPropertyForm)
  }

}
