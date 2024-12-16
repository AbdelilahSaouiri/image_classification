import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit{

   images:any=[]
  constructor(public imageService:ImageService){
  }

  ngOnInit(): void {
    this.getAllImages()
  }
  getAllImages(){
    this.imageService.getImages().subscribe({
      next:data=>{
        this.images=data.results
      },error:err=>{
        console.log(err)
      }
    })
  }

 
  

 
}
