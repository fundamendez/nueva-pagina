# Funciones

## 1. Divide et Impera!
> Los problemas grandes son difíciles de resolver de una sola vez. Dividirlos en partes pequeñas los hace más simples de entender, programar y mantener.

Hace ya miles de años los romanos habían comprendido que una estrategia efectiva que podía ser aplicada a la política y a la guerra se plasmaba en la frase “Divide et impera” (Divide y Vencerás), la autoría de la misma se le otorga al emperador romano Julio César. 

El concepto básico detrás de esta frase es la siguiente: esta técnica permite a un poder central compuesto por un número relativamente pequeño de personas, gobernar y dominar a una población mucho más numerosa, y de una forma relativamente simple.

Esta idea también puede aplicarse a la resolución de problemas.

Dado un problema complejo:

- se lo divide en subproblemas más simples
- se resuelve cada parte por separado
- se combinan las soluciones parciales

Este método puede describirse como un algoritmo.

Por ejemplo si queremos hacer un programa que:
* Lee notas de alumnos
* Calcula el promedio
* Determina si están aprobados
* Muestra un informe final

Podemos dividirlo en funciones diferentes para cada tarea. Esto hace que el programa sea más claro y fácil de mantener.

## 2. ¿Qué es la Modularización?
> Dividir un problema grande en partes pequeñas y manejables.

Un módulo puede pensarse como una pieza de una máquina: cada pieza cumple una función específica dentro del conjunto.

En programación, un módulo resuelve uno de los subproblemas del problema principal.

Una buena práctica es que cada módulo tenga una **única responsabilidad**.
Si una función realiza demasiadas tareas, probablemente debería dividirse.

En definitiva, modularizar es construir un programa a partir de partes independientes y bien definidas.

## 3. Modularización en C
> En C, la herramienta fundamental para modularizar un programa es la función.

La pieza fundamental para la modularización en C se denomina función. Una función permite al programador modularizar un programa. 

En muchos lenguajes de programación existe el concepto de procedimiento, éste es comparable a una función que no retorna valor alguno. 

En C, no existen los procedimientos como una estructura separada de las funciones como en muchos otros lenguajes de programación. Para definir lo que en otros lenguajes es conocido como un procedimiento, C utiliza una función con valor de retorno nulo de tipo ```void```.

Por lo que conceptualmente podemos distinguir entre:
* Funciones que devuelven un valor
* Funciones que no devuelven un valor (equivalentes a procedimientos en otros lenguajes)

## 4. La función ```main```

Todo programa en C comienza su ejecución en la función main.

```c
int main() { 
    return 0;
}
```

Aunque definamos muchas funciones, ninguna se ejecuta automáticamente.
Una función solo se ejecuta cuando es llamada desde otra función (por ejemplo, desde ```main```).

----
En C existen: 
* Funciones de la biblioteca estándar (como ```printf```)
* Funciones definidas por el programador

## 5. Funciones Con Valor de Retorno

La estructura esencial de una función definida por el programador es la siguiente:

```c
tipo_retorno nombre_funcion(tipo_1 parametro_1, tipo_2 parametro_2,..., tipo_n parametro_n) {

    // Declaraciones (variables locales) 

    // Acciones
    accion_1;
    accion_2;
    ...
    accion_n;
}
```
Ejemplo: 

```c
int sumar(int a, int b) {
    return a + b;
}
```

Una función con valor de retorno realiza un cálculo y devuelve un resultado a quien la invocó.

Ejemplo de uso de la funcion ```sumar()```: 
```c
int resultado = sumar(2,3);  // llamado de la función 
```
El resultado de la función queda guardado en la variable ```resultado```.

| Elemento | Descripción |
|---------|-------------|
| `int` | Tipo de retorno de la función |
| `sumar` | Nombre de la función |
| `a`, `b` | Parámetros de entrada |
| `return a + b` | Valor que devuelve la función |


### 5.1 Tipo de retorno
Existen dos roles entre una función y aquel que la utiliza:

* El rol de la parte del programa que hace uso de una función se llama “invocador o llamador”

* El rol de la función al ser utilizada por alguna parte del programa se denomina “invocada o llamada”


El tipo de retorno define el tipo de dato del valor que la función devolverá a su invocador. 

El mecanismo para devolver tanto el valor como el control al invocador es la instrucción ```return```.

La instrucción ```return``` cumple dos funciones:
* Devuelve un valor.
* Finaliza la ejecución de la función.

### 5.2 Parámetros
> Los parámetros permiten que la función reciba datos para trabajar.

Los parámetros son variables que se utilizan para recibir valores de entrada que la función necesita para operar.

La lista de parámetros consiste en una serie de declaraciones de variables, separadas por comas, que especifican el tipo y el nombre de cada dato que conforma su interfaz de entrada.

### 5.3 Declaraciones y Acciones
El cuerpo, delimitado por llaves ```{}```, contiene toda la lógica encapsulada de la función. Se compone de dos partes principales:

* Declaraciones: Define las variables necesarias para que la función cumpla su objetivo. Se conocen como **variables locales**, ya que su existencia y alcance están limitados exclusivamente al interior  de la función.

    Una variable local:

    - Solo existe dentro de la función.

    - Se crea cuando la función comienza.

    - Se destruye cuando la función termina.

    No puede usarse fuera de ella.

* Acciones: Corresponde al conjunto de instrucciones y estructuras de control (bucles, condicionales, etc.) que implementan el comportamiento de la función.

## 6. Funciones Sin Valor de Retorno (Procedimientos)
Cuando una función no debe devolver ningún valor, se utiliza el tipo ```void```.

Estas funciones realizan una acción o producen un efecto.

```c
void un_procedimiento(parametro_1, parametro_2,..., parametro_n);
```

Esquema básico del funcionamiento del llamado a una función sin valor de retorno:

```c
void imprimir_saludo() {
    printf("Hola, Mundo!\n");
}


int main() {
    imprimir_saludo();

    return 0;
}
```
---

Diferencia Conceptual: 

| Función (con retorno) | Procedimiento (```void```) |
|---------|-------------|
| devuelve y calcula un valor | realiza una acción |
| se usa en una expresión | se usa como una instrucción |
| ```int resultado = sumar(2,3);``` | ```imprimir_saludo();``` |


## 7. Reglas de Diseño (Buenas Prácticas)
> Estas reglas no son obligatorias para que el programa funcione, pero sí para que el código sea legible, mantenible y reutilizable.

* Reglas Esenciales 

    * El Nombre debe denotar una única acción: El nombre de una función debe ser un verbo o una frase verbal que describa la acción que realiza. Esto establece una expectativa clara e inequívoca sobre su comportamiento.

    * Responsabilidad Única: En general, se recomienda que una función realice una sola responsabilidad, ya sea "producir un efecto" (por ejemplo imprimir) O calcular y devolver un valor.

* Reglas Recomendadas

    * Brevedad y Enfoque: Las funciones deben ser cortas. Una función larga casi siempre indica que se puede abstraer todavía un poco más. Las funciones breves y enfocadas son mucho más fáciles de entender y menos propensas a errores ocultos.


    * Manejo de Parámetros: Se recomienda entre 7 ± 2. Esta es una regla empírica de diseño, no una restricción del lenguaje.

    * Reutilización:  Es una buena práctica que las funciones tiendan a ser genéricas. Esto implica diseñar soluciones para problemas abstractos en lugar de casos de uso específicos.

Además, se debe tener en cuenta que solo se pueden usar variables que estén dentro del **ámbito de la función** que se está ejecutando: parámetros, variables locales o variables globales.

## 8. Errores Comunes
- Funciones demasiado largas
- Nombres poco descriptivos (`f1`, `aux`, `func`)
- Mezclar cálculo y salida por pantalla
- Usar variables fuera de su ámbito


## Resumen
Programar en C consiste, en gran parte, en dividir problemas complejos en funciones pequeñas, claras y bien definidas.

Las funciones permiten escribir código más prolijo y organizado, reutilizar soluciones, evitar código duplicado y facilitar la detección de errores.