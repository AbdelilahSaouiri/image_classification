import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const role=localStorage.getItem("roles")
  const router=inject(Router)
  if(role?.includes("ADMIN")){
    return true
  }
  else{
    router.navigateByUrl("/home")
    return false;
  }
};
