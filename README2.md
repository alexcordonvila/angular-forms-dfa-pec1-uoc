# 📚 Apuntes de Angular: Gestión de Mensajes (CRUD)

---

## 🛠️ Implementación de Llamadas HTTP en el Servicio

Las funciones en el servicio (ej. `message.service.ts`) suelen ser **públicas** para ser llamadas desde el controlador (ej. `message-list.component.ts`). Se recomienda **tipar la respuesta** con DTOs (Data Transfer Objects) y definir que devuelven una **Promise**.

### 1. Obtener Todos los Mensajes (`getMessages`) 📥
* **Petición:** `http.get` con la URL base.
* **Tipado de Respuesta:** Se usa `this.http.get<MessageDTO[]>` y la función devuelve `Promise<MessageDTO[]>`.

---

### 2. Obtener un Mensaje por ID (`getMessageById`) 🔎
* **Parámetro:** El `id` del mensaje.
* **Petición:** `http.get` con la URL base concatenada con el `id`.
* **Tipado de Respuesta:** Se usa `this.http.get<MessageDTO>` y la función devuelve `Promise<MessageDTO>`.

---

### 3. Crear un Nuevo Mensaje (`createMessage`) ➕
* **Parámetro:** El mensaje a crear (`MessageDTO`), que será el **`body`** de la petición `post`.
* **Petición:** `http.post` con la URL base y el mensaje como `body`.
* **Tipado de Respuesta:** Se usa `this.http.post<MessageDTO>` y la función devuelve `Promise<MessageDTO>`.
    * **Nota Importante:** El servidor responde con el `MessageDTO` recién creado, lo que puede ser útil para acciones posteriores. En algunos flujos (como redireccionar a la `home` tras el alta), la respuesta no necesita ser tratada inmediatamente, ya que la lista de mensajes se actualizará con un `getMessages`.

---

### 4. Actualizar un Mensaje Existente (`updateMessage`) ✏️
* **Parámetros:** El `id` del mensaje y un objeto `MessageDTO` con las propiedades modificadas (el **`body`** de la petición `put`).
* **Petición:** `http.put` con la URL base concatenada con el `id` y el `body`.
* **Tipado de Respuesta:** Se usa `this.http.put<MessageDTO>` y la función devuelve `Promise<MessageDTO>`.
    * **Nota:** Al igual que en el alta, la API devuelve el mensaje modificado.

---

### 5. Eliminar un Mensaje (`deleteMessage`) 🗑️
* **Parámetro:** El `id` del mensaje a eliminar.
* **Petición:** `http.delete` con la URL base concatenada con el `id`.
* **Tipado de Respuesta:** Se usa `this.http.delete<deleteResponse>` y la función devuelve `Promise<deleteResponse>`.
    * **Respuesta Específica:** Se crea una interfaz (`deleteResponse`) para tipar la respuesta, que puede contener información como el **número de filas afectadas** (`rowsAffected`), útil para validar la eliminación.

---

## ⚙️ Métodos Auxiliares y Control de Errores

| Método | Propósito |
| :--- | :--- |
| **Manejo de Errores** | Método para mostrar por consola el código de error y los mensajes asociados. |
| **`delay`** | Método para simular un retraso, útil para mantener visibles mensajes de confirmación/error antes de una redirección. |

---

## 🔄 Flujo Completo: Servicio – Controlador – Vista

### 1. Carga Inicial de la HOME (`message-list.component.ts`) 🏠

1.  **Carga:** Al lanzar el `constructor` del controlador, se llama al método `loadMessages()`.
2.  **Llamada Asíncrona:** `loadMessages` llama al servicio `getMessages`.
3.  **`async/await`:** Es **crucial** usar `await` delante de la llamada al servicio para esperar la respuesta antes de continuar el código. Esto requiere que el método sea declarado como **`async`** y devuelva una **`Promise<void>`**.
4.  **Gestión de Errores:** Se utiliza la estructura **`try/catch`** para manejar errores específicos de la llamada (ej. llamar al método de logs).
    * **Mejor Práctica (Producción):** Normalmente, los errores HTTP se gestionan centralizadamente desde un **`interceptor`** para actuar en consecuencia (ej. redirigir a una página de error).
5.  **Vista:** Cuando la variable `messages` se carga con la respuesta, la vista se actualiza automáticamente con el bucle **`*ngFor`**.

---

## 👩‍💻 Controlador `message-list.component.ts` (Listado)

| Punto | Descripción |
| :--- | :--- |
| **Variables** | Se define la variable pública `messages: MessageDTO[]` para almacenar la lista. Se usa `!` (ej. `messages!: MessageDTO[]`) para permitir inicializarla en un método posterior (`loadMessages`) y no en el `constructor`. |
| **Inyección de Dependencias** | Se inyectan `MessageService` (para las llamadas API) y `Router` (para la navegación). |
| **`constructor`** | Lanza `loadMessages()`. |
| **`ADD`** | Navega al componente `MessageFormComponent` **sin** pasar un `id` por URL. |
| **`UPDATE`** | Navega a `MessageFormComponent` **pasando el `id`** del mensaje por URL. |
| **`DELETE`** | Ejecuta la lógica de eliminación: 1. Pide **confirmación**. 2. Llama al servicio (`await messageService.deleteMessage(...)`). 3. Usa el **`try/catch`**. 4. **Valida** que `rowsAffected > 0` para asegurar la eliminación. 5. Si es correcto, llama a `loadMessages` para recargar la lista. |

---

## 📝 Controlador `message-form.component.ts` (Alta/Edición)

### 1. Inicialización y Distinción Alta/Modificación 🔀
* **Variables:** Definición de variables públicas y privadas (ej. `msgId` para el ID recogido de la URL).
* **Inyección:** Inyección de servicios necesarios, incluyendo elementos de formularios reactivos (`FormControl`, `FormBuilder`).
* **Recolección de ID:** El `constructor` recoge el parámetro `id` de la URL y lo asigna a `msgId` (será **nulo** para alta, **informado** para modificación).
* **Lógica en `ngOnInit`:** Se discrimina si es alta o modificación:
    * **Alta:** Si `msgId` es nulo, no se hace nada (el formulario ya está vacío por el constructor).
    * **Modificación:** Si `msgId` existe, se llama a `getMessageById( +msgId )` para cargar los datos en el formulario.
        * **Conversión de Tipo:** Se usa el signo **`+`** (ej. `+msgId`) para convertir el `string` de la URL a un valor numérico, que es el tipo esperado por la función.
        * **Carga de Datos:** Los valores de la respuesta se cargan en los `FormControl` usando `setValue`.

### 2. Guardado (Alta o Modificación) 💾
* **Validación:** Al pulsar guardar, se valida el formulario (errores como "campo requerido").
* **Llamada API:** Si es válido, se llama a `editMessage` (si hay `msgId`) o `createMessage` (si no hay `msgId`).
* **Gestión de Resultado:** Se utiliza un `try/catch` que devuelve `true` o `false` para indicar el éxito o el error de la operación.
* **Avisos y Redirección:**
    * **Error:** Muestra un aviso de error temporal y no realiza ninguna acción.
    * **Éxito:** Muestra un aviso de confirmación temporal y luego redirige a la vista del listado (`home`).

---

## ✨ Buenas Prácticas Generales (JavaScript/TypeScript)

| Concepto | Recomendación |
| :--- | :--- |
| **Declaración de Variables** | Usar **`let`** (si la variable se reasigna) o **`const`** (si no se reasigna) en lugar de `var`. El ámbito de `const/let` es local al bloque donde se declaran. |
| **Condicionales (Booleano)** | Mejor: `if( variable )` en lugar de `if( variable == true )`. |
| **Condicionales (Negación)** | Mejor: `if( !variable )` en lugar de `if( variable == false )`. |
| **Comparación** | Usar siempre **`===`** (comparación de valor y tipo) en lugar de `==` (solo valor) cuando sea posible. |