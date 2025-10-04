import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageDTO } from '../Models/message.dto';

interface deleteResponse {
  affected: number;
}
@Injectable({
  providedIn: 'root',
})
export class MessageService {
 
  private urlMessageApi: string;  //A

  /*Esto es el patrón estándar de Angular para Inyección de Dependencias. Al usar el modificador de acceso private (o public) en un argumento del constructor, 
  TypeScript automáticamente hace dos cosas:

    1. Crea una propiedad de clase con ese mismo nombre (this.http).
    2.Asigna el valor inyectado (HttpClient) a esa propiedad. */

  constructor(private http: HttpClient) {
   
    this.urlMessageApi = 'http://localhost:3000/messages';  //B

    //this.app nos permite acceder a this.http.get, this.http.put, this.http.post, this.http.delete...
  }

  getMessages(): Promise<MessageDTO[] | undefined> {
    return this.http.get<MessageDTO[]>(this.urlMessageApi).toPromise(); //C
  }

  getMessageById(msgId: number): Promise<MessageDTO | undefined> {
    return this.http
      .get<MessageDTO>(this.urlMessageApi + '/' + msgId)
      .toPromise(); //D
  }

  createMessage(msg: MessageDTO): Promise<MessageDTO | undefined> {
    return this.http.post<MessageDTO>(this.urlMessageApi, msg).toPromise(); //E
  }

  updateMessage(msgId: number, msg: MessageDTO): Promise<MessageDTO | undefined> { //F
    return this.http
      .put<MessageDTO>(this.urlMessageApi + '/' + msgId, msg)
      .toPromise();
  }

  deleteMessage(msgId: number): Promise<deleteResponse | undefined> { //G
    return this.http
      .delete<deleteResponse>(this.urlMessageApi + '/' + msgId)
      .toPromise();
  }

  errorLog(error: HttpErrorResponse): void {
    console.error('An error occurred:', error.error.msg);
    console.error('Backend returned code:', error.status); //H
    console.error('Complete message was::', error.message);
  }

  async wait(ms: number) {
    return new Promise((resolve) => { //I
      setTimeout(resolve, ms);
    });
  }
}

/**ERROR:  Type 'Promise<MessageDTO[] | undefined>' is not assignable to type 'Promise<MessageDTO[]>'.
Type 'MessageDTO[] | undefined' is not assignable to type 'MessageDTO[]'.
Type 'undefined' is not assignable to type 'MessageDTO[]'. **/

/*SOLUCION:
¡Claro\! El error que estás recibiendo es un problema de **incompatibilidad de tipos en TypeScript** generado por el método `toPromise()` de RxJS.

-----

## 🛑 Razón del Error (En Resumen)

El problema principal es este:

1.  **Tu función promete devolver:** `Promise<MessageDTO[]>` (Una promesa que resuelve en una matriz de mensajes).
2.  **`toPromise()` devuelve en RxJS 7+:** `Promise<MessageDTO[] | undefined>` (Una promesa que podría resolver en una matriz **o** en `undefined`).

TypeScript detecta que existe la posibilidad de que se devuelva `undefined`, pero el tipo de retorno que has definido (`MessageDTO[]`) no lo permite. Esto genera el error: "`Type 'undefined' is not assignable to type 'MessageDTO[]'.`"

-----

## ✅ Soluciones (El Enfoque Moderno Recomendado)

Dado que `toPromise()` está **obsoleto (deprecated)**, la mejor solución es migrar a los reemplazos modernos que RxJS ofrece para convertir un `Observable` a una `Promise`.

### 1\. La Mejor Solución: Usar `lastValueFrom`

Para las llamadas HTTP (que emiten un solo valor y luego completan), **`lastValueFrom`** es el reemplazo semántico directo. A diferencia de `toPromise()`, `lastValueFrom` **no añade `| undefined`** al tipo de retorno si el Observable emite al menos un valor. Si no emite nada, la promesa se **rechaza** (falla), lo cual es el comportamiento esperado para una llamada HTTP.

```typescript
import { lastValueFrom } from 'rxjs'; // 👈 Importa la función

getMessages(): Promise<MessageDTO[]> {
    const observable$ = this.http.get<MessageDTO[]>(this.urlMessageApi);
    // lastValueFrom devuelve Promise<MessageDTO[]> (sin | undefined)
    return lastValueFrom(observable$); 
}
```

-----

## Opción 2: Corregir el Tipo de Retorno (Si Insistes en `toPromise`)

Si por alguna razón necesitas seguir usando `toPromise()`, debes actualizar el tipo de retorno de tu función para que refleje con precisión lo que realmente devuelve:

```typescript
// Acepta explícitamente la posibilidad de 'undefined'
getMessages(): Promise<MessageDTO[] | undefined> {
    return this.http.get<MessageDTO[]>(this.urlMessageApi).toPromise();
}

// Nota: Luego, donde llames esta función, deberás manejar el caso `undefined`:

const messages = await getMessages();
if (messages) {
    // Procesa messages
}


### Opción 3: Forzar la Asignación (Con Precaución)

Si estás **absolutamente seguro** de que el servidor siempre devolverá una matriz (incluso si está vacía, `[]`), puedes usar una aserción de tipo (`as`) para decirle a TypeScript que confíe en ti. Esto elimina la seguridad de TypeScript y debe usarse como último recurso.

```typescript
getMessages(): Promise<MessageDTO[]> {
    // Le decimos a TypeScript: "Sé que el resultado es solo MessageDTO[]"
    return this.http.get<MessageDTO[]>(this.urlMessageApi).toPromise() as Promise<MessageDTO[]>;
}
```
*/