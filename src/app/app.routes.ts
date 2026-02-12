import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Acerca } from './features/acerca/acerca';
import { Consultas } from './features/consultas/consultas';
import { Mascotas } from './shared/mascotas/mascotas';
import { Usuarios } from './features/usuarios/usuarios';
import { FormularioCuenta } from './shared/formulario-cuenta/formulario-cuenta';

export const routes: Routes = [
    //1. Ruta inicial
    { path: 'home', component: Home },
    //2.Rutas de Navegacion
    { path: 'acerca', component: Acerca },    
    { path: 'consultas', component: Consultas },
    { path: 'mascotas', component: Mascotas },
    { path: 'crear-cuenta', component: FormularioCuenta },
    { path: 'usuarios', component: Usuarios },
    
];
