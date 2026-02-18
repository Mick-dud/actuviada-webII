import { inject, Injectable, signal } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { UsuarioServicio } from './usuario-servicio';

import { email } from '@angular/forms/signals';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private servicioUsuario = inject(UsuarioServicio);

  //localStorage para almacenar el usuario logueado, se puede usar para mantener la sesion activa incluso al recargar la pagina
  sesionIniciada = signal<boolean>(localStorage.getItem('sesion')==='true');

  usuario: User | null = null;
  private auth = getAuth();

  login(email: string, password: string):Observable<boolean> {
    return this.servicioUsuario.getUsuarios().pipe(
      map(usuarios =>{
        const usuarioCoincide = usuarios.find(u=> u.email === email && u.password === password)
        if(usuarioCoincide){
          localStorage.setItem('sesion','true');
          //guardar estos datos convirtiendo el objeto usuarioCoincide a string para almacenarlo en localStorage
          localStorage.setItem('user', JSON.stringify(usuarioCoincide));
          this.sesionIniciada.set(true);
          return true;
        }
        return false;
      })
    )
    //signInWithEmailAndPassword(this.auth, email, password)
      //.then(respuesta => this.usuario = respuesta.user)
      //.catch(err => console.error('No se puede iniciar sesión', err.message));
  }

  logout() {
    localStorage.removeItem('sesion');
    localStorage.removeItem('user');
    this.sesionIniciada.set(false);
    //signOut(this.auth);
    //this.usuario = null;
  }
}
