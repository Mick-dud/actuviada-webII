import { Component } from '@angular/core';
import { LoginUsuario } from "../../shared/login-usuario/login-usuario";

@Component({
  selector: 'app-login',
  imports: [LoginUsuario],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
