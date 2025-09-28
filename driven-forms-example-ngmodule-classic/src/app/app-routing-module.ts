import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';

const routes: Routes = [
   // 1. PÁGINA DE INICIO (RAÍZ)
  {
    path: '', 
    redirectTo: 'login',  // Redirige la raíz de la app (ej. /) a /login
    pathMatch: 'full'     // CRUCIAL: Asegura que solo coincida con la URL completamente vacía.
  },

  // 2. RUTAS DE NAVEGACIÓN
  {
    path: 'login',       // Cuando la URL es /login
    component: LoginComponent,
  },
  {
    path: 'sign-in',     // Cuando la URL es /sign-in
    component: SignInComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
