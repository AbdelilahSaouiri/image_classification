import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeroComponent } from './components/hero/hero.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { authorizationGuard } from './guards/authorization.guard';


const routes: Routes = [
  {path:'home',component:HeroComponent},
  {path:'products',component:MainComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent, canActivate:[authorizationGuard], data:{role:'ADMIN'}},
  {path:'',redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
