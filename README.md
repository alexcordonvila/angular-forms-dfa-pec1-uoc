# angular-forms-dfa-pec1-uoc
Repositorio del ejercicio de la asignatura Desenvolupament front-end avançat (UOC), centrado en la comparación entre formularios Template-Driven y Reactive Forms en Angular. Incluye ejemplos prácticos, código de referencia y materiales de aprendizaje para comprender las diferencias y buenas prácticas de cada enfoque.


# 1. Angular NO Usa el Virtual DOM 🚫
Lo primero es aclarar que Angular no utiliza el Virtual DOM (VDOM) como lo hace React. Angular utiliza su propio mecanismo de renderizado llamado Detección de Cambios (Change Detection), que trabaja directamente con los objetos de tu componente y con la estructura del DOM real.

---

# 2. Git y `ng new` (Angular CLI)

- **Por defecto**, `ng new`:
  - Crea la carpeta del proyecto.
  - Inicializa un repositorio **Git** dentro (`.git/`).
  - Realiza un **commit inicial** con el mensaje *Initial commit*.

- **Útil si** empiezas un proyecto desde cero, porque ya tienes Git preparado.

- **Si ya tienes un repositorio externo** (ej. en GitHub):
  - No interesa tener dos `.git` (un repositorio dentro de otro).
  - Solución: crear el proyecto con:
    ```bash
    ng new mi-proyecto --skip-git
    ```
  - Así el proyecto se crea **sin Git** y lo integras al repositorio que ya tienes.


# 3. Angular: Standalone Components vs NgModule

En Angular 20, existe un **nuevo enfoque recomendado** para crear aplicaciones usando **Standalone Components**, aunque tradicionalmente Angular se ha basado en módulos (`NgModule`). A continuación se explican las diferencias y la elección pedagógica en los apuntes.

---

## 3.1 Enfoque Clásico: NgModule

### Características
- Basado en módulos (`app.module.ts`) que agrupan:
  - Componentes
  - Directivas
  - Servicios
- Todos los elementos deben declararse/importarse en los módulos correspondientes.
- Requiere `bootstrap` del módulo principal en `main.ts`.
- Es ampliamente usado en proyectos empresariales heredados y ejemplos de cursos...

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


## 3.2 Enfoque Moderno: Standalone Components

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

# 4 📚 Resumen de Formularios y Sintaxis Template-Driven Forms

## 4.1 La Inicialización Estricta (TypeScript) 🛠️

En proyectos modernos de Angular con `strict mode` activo, TypeScript exige que las propiedades de una clase se inicialicen en el constructor o en su declaración.

| Enfoque | Sintaxis | Uso en Angular |
| :--- | :--- | :--- |
| **Definite Assignment** | `propiedad!: Tipo;` | Se usa para decirle a TypeScript: "Sé que esta propiedad **será inicializada** por Angular más tarde (ej. por un `@Input()` o en `ngOnInit()`), confía en mí." |
| **Opcional** | `propiedad?: Tipo;` | Se usa si la propiedad **puede ser** `undefined` o `null` durante su ciclo de vida. |

---

## 4.2 Sintaxis de Enlace (Binding) y Comunicación 🔗

La forma en que Angular maneja la comunicación entre la **Plantilla (HTML)** y el **Componente (TS)**.

| Sintaxis | Nombre | Dirección | Rol |
| :---: | :--- | :---: | :--- |
| **`[propiedad]`** | **Property Binding (Input)** | TS **$\rightarrow$** HTML | **Envía** un valor (expresión o variable TS) a una propiedad del elemento. |
| **`(evento)`** | **Event Binding (Output)** | HTML **$\rightarrow$** TS | **Escucha** un evento (clic, submit) y ejecuta un método del componente. |
| **`[(propiedad)]`** | **Two-Way Binding** | TS **$\leftrightarrow$** HTML | Combina envío y escucha. Es el atajo para `[propiedad]` + `(propiedadChange)`. |
| **`#variable`** | **Referencia de Plantilla** | Interno (Control) | Crea una variable local para referenciar una **Directiva** (e.g., `ngForm`) o un elemento. |

---

## 4.3 Directivas Clave en Formularios de Plantilla 💡

Las directivas son las que convierten el HTML en un formulario gestionado por Angular.

| Directiva | Uso en el Código | Función Principal |
| :--- | :--- | :--- |
| **`NgForm`** | `#loginForm="ngForm"` | Se aplica al `<form>`. Crea un objeto `FormGroup` que rastrea el estado y la validez de **todo el formulario** y sus controles internos. |
| **`NgModel`** | `[(ngModel)]="user.email"` | Se aplica al `<input>`. Se encarga del **enlace bidireccional** y crea un `FormControl` individual, reportando su estado. |

---

## 4.4 Validación y Estado del Control (`NgModel`) 🚦

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

-----

# 5. 📝 `for` y `id` en Formularios HTML

El atributo **`for`** en la etiqueta `<label>` y el atributo **`id`** en el `<input>` son elementos clave para la **usabilidad** y la **accesibilidad** de los formularios, aunque no son esenciales para la lógica de Angular (`ngModel`).

## 🔑 La Relación y el Vínculo

| Elemento | Atributo | Rol y Función |
| :---: | :--- | :--- |
| **`<label>`** | **`for`** | Declara **a qué campo de formulario se refiere** esta etiqueta. El valor de `for` debe ser **exacto** al `id` del campo. |
| **`<input>`** | **`id`** | Proporciona un **identificador único** al campo. Es el destino que busca el atributo `for`. |

-----

## 🎯 Por qué son Importantes

1.  **Accesibilidad (WCAG/Aria) ♿:**

      * Permiten que los **lectores de pantalla** y otras tecnologías de asistencia anuncien correctamente el propósito de un campo de entrada (input) al usuario.
      * Este vínculo es la forma estándar de asegurar que los campos de formulario son comprensibles para todos.

2.  **Usabilidad (UX) 🖱️:**

      * Cuando un usuario hace **clic en el texto de la etiqueta** (`<label>`), el navegador automáticamente **enfoca** (pone el cursor en) el campo de entrada (`<input>`) asociado. Esto facilita la interacción con los formularios, especialmente en dispositivos táctiles.

### Ejemplo de Implementación

Para que la etiqueta "Email:" esté funcionalmente conectada al input, los valores deben coincidir:

```html
<label for="email">Email:</label>

<input type="email" id="email" name="email" ... /> 
```

-----

# 6. 📝 Validación de Campos: `pattern` y RegEx

El atributo **`pattern`** es la forma más sencilla de aplicar reglas de **Expresión Regular (RegEx)** a un campo de formulario cuando se utilizan **Formularios Dirigidos por Plantilla** (*Template-Driven Forms*).

## 🔑 Implementación en HTML

El atributo `pattern` recibe la expresión regular como un *string*. Angular la detecta automáticamente y la usa como validador.

```html
<div>
  <label for="alias">Alias:</label>
  <input 
    type="text" 
    name="alias"
    [(ngModel)]="user.alias" 
    #alias="ngModel"
    required
    
    pattern="^[a-zA-Z0-9]{3,}$"
  />
  
  <span [hidden]="alias.valid || !loginForm.submitted" style="color: red">
    El Alias debe tener 3 o más caracteres alfanuméricos.
  </span>
</div>
```


# 🛠️ Tabla Completa de Validadores y Propiedades de Formularios
## Hoja de trucos definitiva para la validación en *Template-Driven Forms*:

| Tipo de Herramienta | Validador / Propiedad | Aplicación | Clave de Error Generada | Propósito Principal |
| :--- | :--- | :--- | :--- | :--- |
| **Directiva Principal** | **`#form="ngForm"`** | Elemento `<form>` | N/A | **Gestión Global:** Rastrea el estado de todos los controles y expone `.valid`, `.submitted`, etc. |
| **Estado Global** | **`form.form.valid`** | Código TypeScript / Botón | N/A | **Validez Total:** Es `true` si todos los campos son válidos. |
| **Flujo de Datos** | **`[(ngModel)]`** | Elemento `<input>` | N/A | **Conexión Bidireccional:** Sincroniza el valor del campo con el modelo de datos (`this.user`). |
| **Referencia** | **`#campo="ngModel"`** | Elemento `<input>` | N/A | **Acceso:** Permite acceder a las propiedades de estado del control individual desde el HTML. |
| **Validador Básico** | **`required`** | Atributo en `<input>` | `required` | Asegura que el campo **no esté vacío**. |
| **Validador de Longitud** | **`minlength="X"`** | Atributo en `<input>` | `minlength` | Asegura que la longitud del *string* sea **al menos X**. |
| **Validador de Longitud** | **`maxlength="Y"`** | Atributo en `<input>` | `maxlength` | Asegura que la longitud del *string* sea **máximo Y**. |
| **Validador de Formato** | **`pattern="regex"`** | Atributo en `<input>` | `pattern` | Fuerza a que el valor cumpla con una **Expresión Regular (RegEx)** específica. |
| **Validador de Tipo** | **`type="email"`** | Atributo en `<input>` | `email` | Valida la **estructura básica** de un correo electrónico (validación nativa). |
| **Validador Numérico** | **`min="X"`** | Atributo en `<input type="number">` | `min` | Asegura que el **valor numérico** sea **al menos X**. |
| **Validador Numérico** | **`max="Y"`** | Atributo en `<input type="number">` | `max` | Asegura que el **valor numérico** sea **máximo Y**. |
| **Propiedad de Estado** | **`campo.pristine`** | Usado con `[hidden]` o `*ngIf` | N/A | **Interacción:** Es `true` si el usuario **NO ha tocado** el campo. |
| **Propiedad de Estado** | **`campo.dirty`** | Usado con `[hidden]` o `*ngIf` | N/A | **Interacción:** Es `true` si el usuario **ha tocado o modificado** el campo (opuesto a `pristine`). |
| **Propiedad de Estado** | **`form.submitted`** | Usado con `[hidden]` o `*ngIf` | N/A | **Evento:** Es `true` una vez que el botón de *submit* ha sido presionado. |
| **Acceso a Errores** | **`campo.errors`** | Usado con `*ngIf` | Objeto `{ clave: valor }` | Contiene un objeto con las claves de los validadores que han fallado (ej., `{ required: true }`). |

---

### Conclusión de Expertos

Utiliza la combinación de **`campo.invalid`** (o `!campo.valid`) **Y** **`form.submitted`** (o `campo.dirty`) para controlar cuándo mostrar los mensajes de error de forma óptima para el usuario.
-----

## 🎯 Efecto de `pattern` en Angular

Cuando se utiliza `pattern`, Angular realiza dos acciones clave:

1.  **Validación Automática:** Si el valor del campo **no cumple** con la expresión regular, la propiedad **`alias.valid`** (y consecuentemente `loginForm.form.valid`) se establece automáticamente en **`false`**.
2.  **Estado de Error:** El *framework* añade una clave de error específica, **`pattern`**, al objeto `errors` del control (`alias.errors`), permitiendo que tu lógica de validación condicional muestre el mensaje de error.

### Ejemplo de RegEx Usada

| Expresión Regular | Significado |
| :--- | :--- |
| **`^`** | Comienzo de la cadena. |
| **`[a-zA-Z0-9]`** | Solo se permiten letras mayúsculas, minúsculas o números. |
| **`{3,}`** | La secuencia anterior debe repetirse un mínimo de **3 veces**. |
| **`$`** | Fin de la cadena. |