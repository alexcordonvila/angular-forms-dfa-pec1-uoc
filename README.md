# angular-forms-dfa-pec1-uoc
Repositorio del ejercicio de la asignatura Desenvolupament front-end avançat (UOC), centrado en la comparación entre formularios Template-Driven y Reactive Forms en Angular. Incluye ejemplos prácticos, código de referencia y materiales de aprendizaje para comprender las diferencias y buenas prácticas de cada enfoque.

# Git i `ng new` (Angular CLI)

- **Per defecte**, `ng new`:
  - Crea la carpeta del projecte.
  - Inicialitza un repositori **Git** dins (`.git/`).
  - Fa un **commit inicial** amb el missatge *Initial commit*.

- **Útil si** comences un projecte de zero, perquè ja tens Git preparat.

- **Si ja tens un repositori extern** (ex. a GitHub):
  - No interessa tenir dos `.git` (repo dins d’un altre).
  - Solució: crear el projecte amb:
    ```bash
    ng new mi-proyecto --skip-git
    ```
  - Així el projecte es crea **sense Git** i l’integres al repo que ja tens.




# Angular: Standalone Components vs NgModule

En Angular 20, existe un **nuevo enfoque recomendado** para crear aplicaciones usando **Standalone Components**, aunque tradicionalmente Angular se ha basado en módulos (`NgModule`). A continuación se explican las diferencias y la elección pedagógica en los apuntes.

---

## 1. Enfoque Clásico: NgModule

### Características
- Basado en módulos (`app.module.ts`) que agrupan:
  - Componentes
  - Directivas
  - Servicios
- Todos los elementos deben declararse/importarse en los módulos correspondientes.
- Requiere `bootstrap` del módulo principal en `main.ts`.
- Es ampliamente usado en documentación histórica, proyectos empresariales heredados y ejemplos de cursos.

### Ejemplo mínimo
```ts
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```


## 2. Enfoque Moderno: Standalone Components

### Características
- Introducido oficialmente en Angular 17.
- No requiere módulos (`NgModule`) para declarar componentes.
- Cada componente puede declarar sus propios `imports` y `providers`.
- Simplifica la estructura del proyecto y reduce la complejidad inicial.
- Proyectos nuevos creados con Angular CLI ya generan componentes standalone por defecto.

### Ejemplo mínimo

```ts
// app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent { }

// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent)
  .catch(err => console.error(err));

```


| Característica      | NgModule (Clásico)                                    | Standalone Components (Moderno)      |
| ------------------- | ----------------------------------------------------- | ------------------------------------ |
| Archivo principal   | `app.module.ts`                                       | Ninguno, cada componente standalone  |
| Declaraciones       | En el módulo                                          | En el propio componente              |
| Bootstrap           | `platformBrowserDynamic().bootstrapModule(AppModule)` | `bootstrapApplication(AppComponent)` |
| Complejidad inicial | Media                                                 | Baja                                 |
| Uso recomendado     | Conceptos, proyectos heredados                        | Nuevos proyectos Angular 20+         |
