import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageDTO } from 'src/app/Models/message.dto';
import { MessageService } from 'src/app/Services/message.service';

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
  isValidForm: boolean | null; //A

  private isUpdateMode: boolean;
  private validRequest: boolean;
  private msgId: string;

   /*Esto es el patrón estándar de Angular para Inyección de Dependencias. Al usar el modificador de acceso private (o public) en un argumento del constructor, 
  TypeScript automáticamente hace dos cosas:
    1. Crea una propiedad de clase con ese mismo nombre (this.formBuilder).
    2.Asigna el valor inyectado (FormBuilder) a esa propiedad. */
  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router
  ){                  //B
      this.isValidForm = null;
      this.isUpdateMode = false;
      this.validRequest = false;
      this.msgId = this.activatedRoute.snapshot.paramMap.get('id')!;
      this.message = new MessageDTO('','');
   
      this.title = new FormControl(this.message.title, [
        Validators.required,
        Validators.maxLength(150),
      ]);
    
      this.description = new FormControl(this.message.description, Validators.required);
      this.messageForm = this.formBuilder.group({
        title: this.title,
        description: this.description,
      });
  }

  async ngOnInit(): Promise<void> {
    //Update 
    if(this.msgId){ //C
      this.isUpdateMode = true;
    }
    try{
      //Modificacion de Alex para adaptar el codigo
      const result = await this.messageService.getMessageById(+this.msgId);
      if (result) {
        this.message = result;
      } else {
      console.error("Mensaje no encontrado");
      }

      this.title.setValue(this.message.title);

      this.description.setValue(this.message.description);

      this.messageForm = this.formBuilder.group({
        title:this.title,
        description:this.description
      });
    }catch(error: any){
      this.messageService.errorLog(error);
    }
  }



private async managementToast(): Promise<void>{ //G
  //Ejemplo de como crear un mensaje de confirmación usando un toast
  const toastMsg = document.getElementById('toastMessage');
  if(toastMsg){
    //Request ok-> mostramos el toast i volvemos a la home
    if(this.validRequest){
      toastMsg.className = 'show requestOk';
      toastMsg.textContent = 'Form submited successfully.';
      await this.messageService.wait(1500);
      toastMsg.className = toastMsg.className.replace('show', '');
      this.router.navigateByUrl('');
    }
    else{
      toastMsg.className = 'show requestKo';
      toastMsg.textContent = 'Error on form submitted, show logs.';
      await this.messageService.wait(1500);
      toastMsg.className = toastMsg.className.replace('show', '');
    }
  }
}
  private async editMessage(): Promise<boolean>{ //F
return false;

}

private async createMessage(): Promise<boolean>{ //E
  let responseOK: boolean = false;
  try{
    await this.messageService.createMessage(this.message);
    responseOK = true;
  }catch(error: any){
    this.messageService.errorLog(error);
  }
  return responseOK;
}

  async saveMessage(){ //D
    this.isValidForm = false;

    if(this.messageForm.invalid){
      return;
    }


  this.isValidForm = true;
  this.message = this.messageForm.value;

  if(this.isUpdateMode){
    this.validRequest = await this.editMessage();
  }else{
    this.validRequest = await this.createMessage();
  }
  this.managementToast();
    }
}
