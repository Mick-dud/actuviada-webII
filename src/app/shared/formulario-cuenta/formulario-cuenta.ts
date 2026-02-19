import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { email, required } from '@angular/forms/signals';

@Component({
  selector: 'app-formulario-cuenta',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-cuenta.html',
  styleUrl: './formulario-cuenta.css',
})
export class FormularioCuenta {
  private fb = inject(FormBuilder);
  //Definicion del formulario reactivo con validaciones
  reglaEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  reglaPassword = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';

  formCuenta = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.reglaEmail)]],
    comentario: ['', [Validators.required]]
  },
    //{Validators: this.validarCalves}
  );
  //Metodo para la validacion de que las contraseñas coincidan
  /*validarCalves(control:AbstractControl):ValidationErrors|null{
    const clave1 = control.get('password')?.value;
    const clave2 = control.get('repeatPassword')?.value;
    return clave1 === clave2 ? null : { noCoinciden: true};
  }*/

  //Metodo para mostrar los errrores personalizados
  mostrarError(campo: string, tipoError: string): boolean {
    const imput = this.formCuenta.get(campo);

    if (imput && imput.invalid && imput.touched) {
      return imput.hasError(tipoError);
    }
    return false;
  }

  registrar() {
    if (this.formCuenta.valid) {
      //URLSearchParams crear un objeto especial que formatea los datos del formulario como un url (email%jueanito@gmail.com)
      const contenido = new URLSearchParams
      contenido.set('form-name', 'contacto');
      contenido.set('email', this.formCuenta.value.email ?? '');
      contenido.set('comentario', this.formCuenta.value.comentario ?? '');

      //Promesa: Funcion especial de JS que se usa para hacer peticiones http a travez de la red

      fetch('/', {
        method: 'POST',
        //Indicar que los datos que se van a enviar estan codificados como una URL no como un JSON
        headers: { 'Content-Type': "application/x-www-form-urlencoded" },
        //Convertir todo el objeto a una cadena de texto lista para enviarse
        body: contenido.toString()
      })
        //Si la promesa se cumple
        .then(() => {
          alert("Enviando con exito");
          this.formCuenta.reset();
        })
        //Si ña promesa no se cumple
        .catch((error) =>
          console.log("No se puede enviar los datos", error))
    }
  }
}