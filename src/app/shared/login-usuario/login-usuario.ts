import { Component, inject } from '@angular/core';
import { email } from '@angular/forms/signals';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  imports: [FormsModule],
  templateUrl: './login-usuario.html',
  styleUrl: './login-usuario.css',
})
export class LoginUsuario {
  email: string = '';
  password: string = '';

  private servicioAuth = inject(AuthService);

  private router = inject(Router);

  iniciarSesion() {
    this.servicioAuth.login(this.email, this.password).subscribe(success => {
      if (success) {
        alert('Bienvenidos al sistema');
        this.router.navigate(['/dashboard']);
      } else {
        alert('Credenciales incorrectas');
      }
    });
  }

  cerrarSesion() {
    this.servicioAuth.logout();
  }
}
