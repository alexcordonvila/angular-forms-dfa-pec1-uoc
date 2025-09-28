import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../Models/user.dto';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  
  /*
  Declaramos una variable pública user y le asignamos el tipo, en este caso nuestro modelo UserDTO.
  CLEAN CODE: Siempre definiremos el tipo, evitaremos poner ANY en nuestro código.
  CLEAN CODE: Si son variables públicas (accesibles desde la vista .html), 
  no hace falta escribir la palabra reservada public, es implícito. Si son variables
  privadas entonces sí, escribiríamos la palabra reservada private.
 */
  user: UserDto;

  /*
   Inicializamos la clase user  
  CLEAN CODE: En el constructor inicializamos las variables u objetos
  implicados en nuestro componente. Fijémonos que tenemos que inicializar la
  clase UserDTO mediante el constructor pasando por parámetro los valores ''
  */
  constructor(){
    this.user = new UserDto('','','','','', '', new Date());
  }
  /*
  Normalmente en el ngOnInit tendremos código implementado, pero si se diera el caso
  de que no nos hiciera falta, eliminaremos el método y también eliminaremos el
  implements OnInit en la declaración de la clase. Nota: Desde la versión 15 de Angular
  el CLI no genera el componente con la implementación del interfaz OnInit
  */
  ngOnInit(): void {
    //Descometa esta inicialización para entender en TWO DATA BINDING
    //this.user.email = 'info@uoc.edu';
  }

  /*
  El método checkLogin se ejecutará cuando hagamos submit del formulario y su función será mostrar por la consola
  del navegador los valores de los campos del formulario. En nuestro caso serán email y password
  
  CLEAN CODE: De igual manera que en las variables, los métodos o funciones públicas 
  no hace falta utilizar la palabra reservada public. En cambio, si son
  métodos o funciones privadas si, escribiéramos delante la palabra reservada private.
  */
  checkLogin(): void{
    console.log(
    'User email -->' +
    this.user.email +
    'User password -->' +
    this.user.password
    );
  }

  /*
  CLEAN CODE:
    Ejemplo tipo simple:
    isAdminProfile(): boolean {
    …
    return (boolean variable)
    }
    2. Ejemplo tipo objeto:Estudios de Informática, Multimedia y Telecomunicación 01/03/2023 pág. 10
    getUserByEmail(email: string): UserDTO {
    …
    return (UserDTO variable)
    }
    3. Ejemplo array de objetos:
    getUsersByProfile(profileCode: string): UserDTO[] {
    …
    Return ( UserDTO array variable)
    }
    4. Ejemplo de petición al backend:
    private async getUsers(): Promise<UserDTO[]> {
    …
    return await this.userService.getUsers();
    }
  */
}
