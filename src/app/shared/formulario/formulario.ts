import { Component, inject, signal } from '@angular/core';
import { UsuarioServicio } from '../../services/usuario-servicio';
import { Usuario } from '../../models/usuario';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  private servicioUsuario = inject(UsuarioServicio);

  public servicioAuth = inject(AuthService);

  //lista reactiva para almacenar los usuarios, signal es una función que cre uan señal reactiva que se puede actualizar y suscribirse a cambios 
  listaUsuarios = signal<Usuario[]>([]);

  editando = false;

  nuevoUsuario: Usuario = {
    name: '',
    email: '',
    phone: '',
    password:'',
    rol: 'EMPLEADO'
  };
  //Metodo para agregar u nuevo usuario a la lista
  ngOnInit() {
    this.obtenerUsuarios();
  }
  //metodo obtener usuarios para que se muestren al cargar la pagina
  obtenerUsuarios() {
    this.servicioUsuario.getUsuarios().subscribe(usuarios => {
      this.listaUsuarios.set(usuarios);
    })
  }

  //metodo para guardar los cambios realizados en la edicion
  guardarUsuario() {
    if (this.editando && this.nuevoUsuario.id) {
      this.servicioUsuario.putUsuario(this.nuevoUsuario.id, this.nuevoUsuario).subscribe(() => {
        this.obtenerUsuarios();
        this.resetear();
      })
    }
    else {
      this.servicioUsuario.postUsuario(this.nuevoUsuario).subscribe(() => {
        this.obtenerUsuarios();
        this.resetear();
      })
    }
  }

  //metodo para eliminar
  eliminarUsuario(id: string) {
    if (confirm('¿Desea eliminar este usuario?')) {
      this.servicioUsuario.deleteUsuario(id).subscribe(() => {
        this.obtenerUsuarios();
      });
    }
  }

  //metodo para poner los datos seleccionados en el formulario para editar
  seleccionarParaEditar(user: Usuario) {
    this.editando = true;
    this.nuevoUsuario = { ...user };
  }

  //metodo para limpiar el formulario y salir del modo edicion
  resetear() {
    this.editando = false;
    this.nuevoUsuario = { name: '', email: '', phone: '', password:'', rol: 'EMPLEADO' };
  }
}




//Guardar nuevo usuario
//guardarUsuario(){
//this.servicioUsuario.postUsuario(this.nuevoUsuario).subscribe(usuarioId =>{
//... Spread Operador : combina el nuevo usuario con la lista existente, creando una nueva lista con el nuevo usuario al principio
//this.listaUsuarios.set([usuarioId,...this.listaUsuarios()]);
//limpiar el formulario
//this.nuevoUsuario = {
// name:'',
//email:'',
//phone:''
//};
// })
//}