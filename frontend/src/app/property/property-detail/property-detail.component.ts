import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  propertyId:any;
  property=new Property();
  constructor(private route:ActivatedRoute,
    private router:Router,
    private housingService:HousingService) { }

  ngOnInit(): void {

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/images/prop-1.png',
        medium: 'assets/images/prop-1.png',
        big: 'assets/images/prop-1.png'
      },
      {
        small: 'assets/images/prop-2.png',
        medium: 'assets/images/prop-2.png',
        big: 'assets/images/prop-2.png'
      },
      {
        small: 'assets/images/prop-3.png',
        medium: 'assets/images/prop-3.png',
        big: 'assets/images/prop-3.png'
      },{
        small: 'assets/images/prop-4.png',
        medium: 'assets/images/prop-4.png',
        big: 'assets/images/prop-4.png'
      },
      {
        small: 'assets/images/prop-5.png',
        medium: 'assets/images/prop-5.png',
        big: 'assets/images/prop-5.png'
      }
    ];

   this.propertyId= this.route.snapshot.params['id']

   this.route.data.subscribe(
    (data: Property) => {
      // console.log('data',data)
      this.property = data['prp'];
    }
  );
  //  this.route.data.subscribe((data:Property)=>{
  //   console.log(`data['prp']`,data['prp'])
  //   this.property=data['prp'];
  //  })
    // this.route.params.subscribe(params=>{
    //   this.propertyId=+params['id'];
    //   this.housingService.getProperty(this.propertyId).subscribe(item=>{
    //     console.log('item',this.propertyId,params['id'],item)
    //     this.property=item;
    //   },
    //     error=>this.router.navigate(['/'])
    //   );
    // })
  }

}
