import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cat-images',
  templateUrl: './cat-images.component.html',
  styleUrls: ['./cat-images.component.css']
})
export class CatImagesComponent implements OnInit {
  images: string[] = [
    "../../assets/cat1.jpg",
    "../../assets/cat2.jpg",
    "../../assets/cat3.jpg",
  ];

  constructor() { }

  ngOnInit() {

  }

}
