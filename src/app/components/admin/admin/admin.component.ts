import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ImageService } from '../../../services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] 
})
export class AdminComponent {

  public files: NgxFileDropEntry[] = [];
  isImage:boolean=false
  isClicked:boolean=false
  isDisabled:boolean=false
  name!:any

  constructor(private router:Router,private imageService:ImageService) { 
     this.name=localStorage.getItem("name")?.split("@")[0]||null
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file.type.startsWith('image/')) {
            this.isImage = true;
            this.isDisabled=true
          } else {
            Swal.fire({
              timer: 1500,
              title: `Fichier non accepté : ${file.name}`,
              icon: 'warning',
              showConfirmButton: false
            });
          }
        });
      }
    }
  }
  
  changeClick() {
    this.isClicked = true;
    if (this.isClicked && this.files.length > 0 && this.isImage) {
      const file = this.files[0].fileEntry as FileSystemFileEntry;
      file.file((f: File) => {
        this.uploadImage(f); 
      });
    }
  }
  
  public fileOver(event: any) {
    console.log('File hovered: ', event);
  }

  public fileLeave(event: any) {
    console.log('File left: ', event);
  }

  private uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
  
    this.imageService.uploadImageByAdmin(formData).subscribe({
      next: (data: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: `${data.message}`,
          confirmButtonText: 'OK'
        });
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: err.error?.message || 'Une erreur est survenue lors du téléchargement de l\'image.',
          confirmButtonText: 'Réessayer'
        });
      }
    });
  }
}
