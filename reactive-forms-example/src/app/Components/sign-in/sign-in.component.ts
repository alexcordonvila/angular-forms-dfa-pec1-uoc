import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDTO } from 'src/app/Models/user.dto';

const DATE_FORMAT_REGEX = /^\d{2}\/\d{2}\/\d{4}$/; 
const EMAIL_FORMAT_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {


  user: UserDTO;
  email: FormControl;
  password: FormControl;
  name: FormControl;
  surname1: FormControl;
  surname2: FormControl
 alias:FormControl;
 birthDate: FormControl;

  signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder){
        this.user = new UserDTO('', '', '', '', '', '', null);
        this.email = new FormControl(this.user.email, [Validators.required, Validators.pattern(EMAIL_FORMAT_REGEX) ]);

        this.password = new FormControl(this.user.password, [Validators.required, Validators.minLength(8)] );
        this.name = new FormControl(this.user.name, [Validators.required, Validators.minLength(8) , Validators.maxLength(25)] );
        this.surname1 = new FormControl(this.user.surname1, [Validators.required, Validators.minLength(8) , Validators.maxLength(25)] );
        this.surname2 = new FormControl(this.user.surname2, [Validators.required, Validators.minLength(8) , Validators.maxLength(25)] );
        this.alias = new FormControl(this.user.alias, [Validators.required, Validators.minLength(8) , Validators.maxLength(25)] );
        this.birthDate = new FormControl(this.user.birthDate, [Validators.required, Validators.pattern(DATE_FORMAT_REGEX) ]);


        this.signinForm = this.formBuilder.group({
          email: this.email,
          password: this.password,
          name: this.name,
          surname1: this.surname1,
          surname2: this.surname2,
          alias: this.alias,
          birthDate: this.birthDate
        });
  }

  checkSignin(): void{

  }

}
