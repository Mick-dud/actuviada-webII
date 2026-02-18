import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

//route es la ruta a la que se quiere acceder, state es el estado de la ruta, se puede usar para redirigir al usuario a otra ruta 
export const authGuard: CanActivateFn = (route, state) => {

  const servicioAuth =  inject(AuthService);
  const router = inject(Router);

  if (servicioAuth.sesionIniciada()){
    return true;
  }
  return router.parseUrl('/login');
};
