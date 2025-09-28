import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../Models/user.dto';

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
   checkSignin(): void{
    console.log(
    'User email -->' +
    this.user.email +
    'User password -->' +
    this.user.password
    );
  }
}
