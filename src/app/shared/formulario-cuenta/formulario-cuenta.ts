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
    email:['',[Validators.required, Validators.pattern(this.reglaEmail)]],
    password:['',[Validators.required, Validators.pattern(this.reglaPassword)]],
    repeatPassword:['',[Validators.required]],
  },
  {Validators: this.validarCalves}
);
//Metodo para la validacion de que las contraseñas coincidan
validarCalves(control:AbstractControl):ValidationErrors|null{
  const clave1 = control.get('password')?.value;
  const clave2 = control.get('repeatPassword')?.value;
  return clave1 === clave2 ? null : { noCoinciden: true};
}

//Metodo para mostrar los errrores personalizados
mostrarError (campo:string, tipoError:string):boolean{
  const imput = this.formCuenta.get(campo);

  if(imput && imput.invalid && imput.touched){
    return imput.hasError(tipoError);
  }
  return false;
}

registrar(){
  console.log(`La cuenta creada es ${this.formCuenta.value}`);
  alert(`Registro exitoso`)
}
}