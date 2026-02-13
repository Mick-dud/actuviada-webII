import { Component, inject } from '@angular/core';
import { email } from '@angular/forms/signals';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-usuario',
  imports: [FormsModule],
  templateUrl: './login-usuario.html',
  styleUrl: './login-usuario.css',
})
export class LoginUsuario {
  email:string ='';
  password:string='';

  private servicioAuth = inject(AuthService);

  iniciarSesion(){
    this.servicioAuth.login(this.email, this.password);
    alert('Bienvenidos al sistema');
  }

  cerrarSesion(){
    this.servicioAuth.logout();
  }
}
