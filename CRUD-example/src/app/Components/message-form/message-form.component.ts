import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageDTO } from 'src/app/Models/message.dto';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent {

  message: MessageDTO;
  title: FormControl;
  description: FormControl;
  messageForm: FormGroup;

   /*Esto es el patrón estándar de Angular para Inyección de Dependencias. Al usar el modificador de acceso private (o public) en un argumento del constructor, 
  TypeScript automáticamente hace dos cosas:
    1. Crea una propiedad de clase con ese mismo nombre (this.formBuilder).
    2.Asigna el valor inyectado (FormBuilder) a esa propiedad. */
  constructor(private formBuilder: FormBuilder){
    this.message = new MessageDTO('','');
    this.title = new FormControl(this.message.title, Validators.required);
    this.description = new FormControl(this.message.description, Validators.required);
    this.messageForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
    });
  }
  async saveMessage(){
    
  }
}
