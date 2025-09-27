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
