import { CanActivateFn } from '@angular/router';

//route es la ruta a la que se quiere acceder, state es el estado de la ruta, se puede usar para redirigir al usuario a otra ruta 
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
