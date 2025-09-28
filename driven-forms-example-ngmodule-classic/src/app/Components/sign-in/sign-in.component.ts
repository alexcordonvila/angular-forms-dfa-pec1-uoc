import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../Models/user.dto';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent  implements OnInit{ 
  user: UserDto;
  constructor(){
    this.user = new UserDto('','','','','', '', new Date());
  }
  ngOnInit(): void {
    //Descometa esta inicialización para entender en TWO DATA BINDING
    //this.user.email = 'info@uoc.edu';
  }
   checkSignin(form: NgForm): void{
      if (!form.valid) {
        console.log('Intento de envío bloqueado: El formulario no es válido.');
        return
      }
      else{
        console.log('¡Formulario válido! Enviando datos:', this.user);
console.log(
    'User email -->' +
    this.user.email +
    'User password -->' +
    this.user.password +
    'User Name -->' +
    this.user.name 
    );
      }
    
  }
}
