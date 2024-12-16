import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imageUrlsSubject = new BehaviorSubject<string[]>([]);  
  public imageUrls$ = this.imageUrlsSubject.asObservable();  

  constructor(private sanitizer:DomSanitizer,private http: HttpClient) { }
  
  getClasses(data: any): void {
    this.imageUrlsSubject.next(data); 
  }

  getImageByImageUrl(imagePath: string) {
    return this.sanitizer.bypassSecurityTrustUrl(`${environment.backurl}${imagePath}`);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.backurl}/upload/`, formData);
  }
   
  uploadImageByAdmin(formData:FormData):Observable<any>{
    return this.http.post<any>(`${environment.backurl}/admin/upload`,formData);
  }

  getImages(page: number = 1): Observable<any> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<any>(`${environment.backurl}/images/`, { params });
  }
  

}