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


---

¡Claro que sí! Aquí tienes un resumen completo de todo lo que hemos explorado sobre formularios y la sintaxis de Angular, organizado en un único archivo Markdown para tus apuntes.

---

# 📚 Resumen de Angular: Formulario y Sintaxis (Template-Driven Forms)

## 1. La Inicialización Estricta (TypeScript) 🛠️

En proyectos modernos de Angular con `strict mode` activo, TypeScript exige que las propiedades de una clase se inicialicen en el constructor o en su declaración.

| Enfoque | Sintaxis | Uso en Angular |
| :--- | :--- | :--- |
| **Definite Assignment** | `propiedad!: Tipo;` | Se usa para decirle a TypeScript: "Sé que esta propiedad **será inicializada** por Angular más tarde (ej. por un `@Input()` o en `ngOnInit()`), confía en mí." |
| **Opcional** | `propiedad?: Tipo;` | Se usa si la propiedad **puede ser** `undefined` o `null` durante su ciclo de vida. |

---

## 2. Sintaxis de Enlace (Binding) y Comunicación 🔗

La forma en que Angular maneja la comunicación entre la **Plantilla (HTML)** y el **Componente (TS)**.

| Sintaxis | Nombre | Dirección | Rol |
| :---: | :--- | :---: | :--- |
| **`[propiedad]`** | **Property Binding (Input)** | TS **$\rightarrow$** HTML | **Envía** un valor (expresión o variable TS) a una propiedad del elemento. |
| **`(evento)`** | **Event Binding (Output)** | HTML **$\rightarrow$** TS | **Escucha** un evento (clic, submit) y ejecuta un método del componente. |
| **`[(propiedad)]`** | **Two-Way Binding** | TS **$\leftrightarrow$** HTML | Combina envío y escucha. Es el atajo para `[propiedad]` + `(propiedadChange)`. |
| **`#variable`** | **Referencia de Plantilla** | Interno (Control) | Crea una variable local para referenciar una **Directiva** (e.g., `ngForm`) o un elemento. |

---

## 3. Directivas Clave en Formularios de Plantilla 💡

Las directivas son las que convierten el HTML en un formulario gestionado por Angular.

| Directiva | Uso en el Código | Función Principal |
| :--- | :--- | :--- |
| **`NgForm`** | `#loginForm="ngForm"` | Se aplica al `<form>`. Crea un objeto `FormGroup` que rastrea el estado y la validez de **todo el formulario** y sus controles internos. |
| **`NgModel`** | `[(ngModel)]="user.email"` | Se aplica al `<input>`. Se encarga del **enlace bidireccional** y crea un `FormControl` individual, reportando su estado. |

---

## 4. Validación y Estado del Control (`NgModel`) 🚦

La directiva `NgModel` expone propiedades de estado que permiten mostrar mensajes de error solo cuando son relevantes para el usuario:

| Propiedad (Ej. `#email`) | Valor `true` Significa... | Lógica Común en la Plantilla |
| :--- | :--- | :--- |
| **`email.valid`** | El campo cumple con todas las reglas de validación (e.g., está lleno si es `required`). | `[disabled]="!loginForm.form.valid"` (Deshabilita el botón si es `false`). |
| **`email.pristine`** | El usuario **NO ha tocado ni modificado** el campo. | `[hidden]="email.valid || email.pristine"` (Oculta el error si aún es `pristine`). |
| **`email.dirty`** | El usuario **SÍ ha modificado** el campo. | Opuesto a `pristine`. |

**Lógica para Mostrar Errores:**
El mensaje de error en tu código (`[hidden]="email.valid || email.pristine"`) se **muestra** solo cuando el formulario cumple las siguientes dos condiciones **al mismo tiempo**:
1.  `email.valid` es **`false`** (Es inválido, e.g., está vacío).
2.  `email.pristine` es **`false`** (El usuario ya interactuó con él).

---

