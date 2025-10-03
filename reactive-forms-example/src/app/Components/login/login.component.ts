import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDTO } from 'src/app/Models/user.dto';
import { checkInvalidKeyWord } from 'src/app/Directives/check-invalid-keyword.validator';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
/*Declaramos  una  variable  pública  user  y  le  asignamos  el  tipo,  en  este  caso 
nuestro modelo UserDTO.
 */
  user: UserDTO;
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

    /*Es importante resaltar que el servicio (provider) FormBuilder debe ser inyectado para 
    poder construir los formularios haciendo uso de FormGroup y FormControl. */
  constructor(private formBuilder: FormBuilder){
    this.user = new UserDTO('','');
    this.email = new FormControl(
      this.user.email, 
      [Validators.required, 
        checkInvalidKeyWord(/info@uoc.edu/),
      ]);
    this.password = new FormControl(this.user.password, [Validators.required, Validators.minLength(8)] );
    /*
    Registramos los FormControl para los campos email y password y 
    posteriormente los agrupamos dentro del grupo loginForm. Posteriormente en  
    la vista veremos que esta variable loginForm se la asignaremos a la directiva 
    [formGroup] del formulario. 
    */
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }
  /* implementamos el método checkLogin que se llamará cuando se haga 
  submit del formulario. */
  checkLogin(): void{
    this.user.email = this.email.value;
    this.user.password = this.password.value;
    console.log(
      'User email-->' +
      this.user.email +
      'user password -->' +
      this.user.password
    );
  }
}
