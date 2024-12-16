import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] 
})
export class AdminComponent {

  public files: NgxFileDropEntry[] = [];
  isImage:boolean=false

  constructor(private http: HttpClient,private imageService:ImageService) { }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file.type.startsWith('image/')) {
            this.isImage=true
            this.uploadImage(file);
          } else {
            Swal.fire({
              timer:1500,
              title:`Fichier non accepté :  ${file.name}`,
              icon:'warning',
              showConfirmButton:false
            })
            
          }
        });
      }
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
