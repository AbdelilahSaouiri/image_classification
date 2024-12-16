import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  formGroup!:FormGroup;
   islogged:boolean=false;

   constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
   ){
   }

   ngOnInit(): void {

    this.formGroup = this.fb.group({
      email: this.fb.control('',[Validators.email,Validators.required]),
      password: this.fb.control('',[Validators.required,Validators.minLength(4),Validators.maxLength(50)])
      })
  }

  OnSubmit() {
    console.log(this.formGroup.value)
    this.authService.login(this.formGroup.value).subscribe({
      next:(response:HttpResponse<any>)=>{
        
        if(response.status==200){
          if(response.body.role.includes("ADMIN")){
            this.router.navigateByUrl("/admin")
          }
          this.authService.profile(response.body)
        }
      },error:err=>{
        Swal.fire({
          icon: 'error',
          timer: 1500,
          showConfirmButton: false,
          titleText:'something wrong ! 😔 please try later '
        })
      }
    })  
  }
}
