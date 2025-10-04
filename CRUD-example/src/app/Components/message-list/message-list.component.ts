import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageDTO } from 'src/app/Models/message.dto';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent {
  messages!: MessageDTO[];
  
  constructor(private messageService: MessageService, private router: Router){
    this.loadMessages();
  }

  private async loadMessages(): Promise<void>{
    try{
      this.messages = await this.messageService.getMessages() ?? [];
    }catch(error: any){
      this.messageService.errorLog(error);
    }
  }


  createMessage() : void {
    this.router.navigateByUrl('/message/');
  }

  async deleteMessage(msgId: number): Promise<void>{
    let result = confirm('Confirm delete message with id:' + msgId + '.');
    if(result){
      try{
        const rowsAffected = await this.messageService.deleteMessage(msgId);
        //La segunda parte es el operador de coalescencia nula (??).
        if ((rowsAffected?.affected ?? 0) > 0) {
          this.loadMessages();
        }
      }catch(error:any){
        this.messageService.errorLog(error);
      }
    }
  }

  updateMessage(msgId:number): void{
    this.router.navigateByUrl('/message/' + msgId);
  }

}
