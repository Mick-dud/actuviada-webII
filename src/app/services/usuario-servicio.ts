import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServicio {
  private http = inject(HttpClient);
  private API_URL = 'https://evaluacion-dos-86884-default-rtdb.firebaseio.com/';

  //Metodo get para obtener los usuarios
  /*getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.API_URL);}*/

    //metodo get para obtener los usuarios, se hace un mapeo para convertir el objeto de respuesta en un array de usuarios con id incluido
  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<{[key:string]:Usuario}>(`${this.API_URL}/usuarios.json`).pipe(
      map(respuesta=>{
        if(!respuesta){
          return[];
        }
          return Object.keys(respuesta).map(id=>{
            const usuarioConId = {...respuesta[id], id:id};
            return usuarioConId;
          });
        
      })
    )}
  
  //metodo post para agregar un nuevo usuario
  postUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.API_URL}/usuarios.json`,usuario);
  }
  //metodo buscar usuario por id
  getUsuarioById(id: string):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.API_URL}/usuarios/${id}.json`);
  }


  

  //metodo para actualizar usuario
  putUsuario(id:string, usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.API_URL}/usuarios/${id}.json`, usuario);
  }
  //metodo para eliminar usuario
  deleteUsuario(id:string):Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/usuarios/${id}.json`);
  }
}
