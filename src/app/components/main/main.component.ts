import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  
  images:any[]=[]

  constructor(public imageService:ImageService){
  }

  ngOnInit(): void {

    this.imageService.imageUrls$.subscribe((urls: string[]) => {
      this.images = urls;  
    });
  }


}
