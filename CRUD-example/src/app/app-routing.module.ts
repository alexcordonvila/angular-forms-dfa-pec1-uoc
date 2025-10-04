import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageListComponent } from './Components/message-list/message-list.component';
import { MessageFormComponent } from './Components/message-form/message-form.component';

const routes: Routes = [
  {
    path: '',
    component: MessageListComponent,
  },
  {
    path: 'message/:id',
    component: MessageFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
