import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

    selectedFile: File | null = null;
    islogged:boolean=false;

    public categories:any[]=[
      {name:'Home'},
      {name:'All Categories'},
      {name:'Electronics'},
      {name:'Accessories'},
    ]
  
  constructor(private imageService:ImageService,private router:Router){}
  
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSearch(event:any){
    event.preventDefault();
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
       Swal.fire({
        title: 'Uploading...',
        text: 'Please wait while we upload your image.',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      this.imageService.uploadImage(formData).subscribe({
        next:(data:any)=>{
          this.imageService.getClasses(data.image_urls)
          Swal.close();
          this.router.navigateByUrl("/products")
        },error:err=>{
          console.log(err)
          Swal.close()
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.error.message}`,
            showConfirmButton:false
          });
        }
      });
  }
  }
}
