# Funciones: Introducción a la Modularización

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


## 2. Qué es la Modularización?
> Dividir un problema grande en partes pequeñas y manejables.

Un módulo puede pensarse como una “pieza” del programa que cumple una función concreta, de la misma forma que una pieza mecánica cumple un rol dentro de una máquina. 

En programación corresponde a alguna de las partes en la que un determinado problema fue dividido, es decir, resuelve alguno de los subproblemas que conforman al problema original. 

Se debe tener en cuenta que un módulo no es estrictamente un único subprograma sino que también puede ser un conjunto de varios de ellos. 

La modularización en definitiva es construir un programa basándose en módulos independientes.

## 3. Modularización en C
> En C, la herramienta fundamental para modularizar un programa es la función.

La pieza fundamental para la modularización en C se denomina función. Una función permite al programador modularizar un programa. 

Según sus creadores:

“Las funciones dividen tareas grandes de computación en varias más pequeñas y, permiten la posibilidad de construir sobre lo que otros ya han hecho, en lugar de comenzar desde cero.... C ha sido diseñado para hacer que las funciones sean eficientes y fáciles de usar. Generalmente los programas en C consisten en muchas funciones pequeñas en lugar de unas pocas grandes.”

## 4. Funciones con valor de retorno

### 4.1 La funcion ```main```

En primer lugar tenemos que develar que ya se ha utilizado el concepto de función sin saberlo. Cuando se construye un programa en C y se escribe:

```c
int main() { 
    return 0;
}
```
En realidad se está usando la función main de C. El punto de entrada al programa, es decir, el punto a partir del cual se empieza a ejecutar el mismo.

En C existen dos tipos de funciones: 
* Las funciones de la biblioteca estándar 
* Las funciones definidas por el programador

### 4.2 Funciones definidas por el programador
La estructura esencial de una función definida por el programador es la siguiente:

```c
tipo_retorno nombre_funcion(tipo_1 parametro_1, tipo_2 parametro_2,..., tipo_n parametro_n) {

    /* declaraciones */

    /* acciones */
    accion_1;
    accion_2;
    ...
    accion_n;
}
```

### 4.3 Tipo de retorno
> El tipo de retorno corresponde al tipo de dato del valor que devolverá la función tras ser ejecutada. 

Existen dos roles entre una función y aquel que la utiliza:

* El rol de la parte del programa que hace uso de una función se llama “invocador o llamador”

* El rol de la función al ser utilizada por alguna parte del programa se denomina “invocada o llamada”

El tipo de retorno define el tipo de dato del valor que la función devolverá a su invocador. 

El mecanismo para devolver tanto el valor como el control al invocador es la instrucción ```return```.

```c
int sumar(int a, int b) {
    return a + b;
}
```

| Elemento | Descripción |
|---------|-------------|
| `int` | Tipo de retorno de la función |
| `sumar` | Nombre de la función |
| `a`, `b` | Parámetros de entrada |
| `return a + b` | Valor que devuelve la función |


### 4.4 Nombre de una Función
Toda función debe poseer un nombre único que la identifique. Este nombre debe cumplir con las mismas reglas sintácticas que cualquier otro identificador válido en el lenguaje C. El nombre es el principal comunicador del propósito y la intención de la función.

### 4.5 Lista de Parámetros
Los parámetros son variables que se utilizan para recibir valores de entrada que la función necesita para operar. La lista de parámetros consiste en una serie de declaraciones de variables, separadas por comas, que especifican el tipo y el nombre de cada dato que conforma su interfaz de entrada.

### 4.6 Declaraciones y Acciones
El cuerpo, delimitado por llaves ```{}```, contiene toda la lógica encapsulada de la función. Se compone de dos partes principales:

* Declaraciones: Define las variables necesarias para que la función cumpla su objetivo. Se conocen como **variables locales**, ya que su existencia y alcance están limitados exclusivamente al interior  de la función.

* Acciones: Corresponde al conjunto de instrucciones y estructuras de control (bucles, condicionales, etc.) que implementan el comportamiento de la función.

## 5. Funciones sin Valor de Retorno (Procedimientos)
Mientras que otros lenguajes de programación distinguen entre "funciones" (que devuelven un valor) y "procedimientos" (que realizan una acción sin devolver valor), C emula el concepto de procedimiento a través del tipo de dato especial ```void```.

* Cuando se utiliza ```void``` como tipo de retorno, se indica explícitamente que la función no devolverá ningún valor.

* También puede ser usado en la lista de parámetros formales, para indicar que la función no recibe parámetros.

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

## 6. Reglas de Diseño (Buenas Prácticas)
> Estas reglas no son obligatorias para que el programa funcione, pero sí para que el código sea legible, mantenible y reutilizable.

* Reglas Esenciales 

    * El Nombre debe denotar una única acción: El nombre de una función debe ser un verbo o una frase verbal que describa la acción que realiza. Esto establece una expectativa clara e inequívoca sobre su comportamiento.

    * Responsabilidad Única: En general, se recomienda que una función realice una sola responsabilidad, ya sea "producir un efecto" (por ejemplo imprimir) O calcular y devolver un valor.

* Reglas Recomendadas

    * Brevedad y Enfoque: Las funciones deben ser cortas. Una función larga casi siempre indica que se puede abstraer todavía un poco más. Las funciones breves y enfocadas son mucho más faciles de entender y menos propensas a errores ocultos.


    * Manejo de Parámetros: Se recomienda entre 7 ± 2. Esta es una regla empírica de diseño, no una restricción del lenguaje.

    * Reutilización:  Es una buena práctica que las funciones tiendan a ser genéricas. Esto implica diseñar soluciones para problemas abstractos en lugar de casos de uso específicos.

Además, se debe tener en cuenta que solo se pueden usar variables que estén dentro del **ámbito de la función** que se está ejecutando: parámetros, variables locales o variables globales.

## 7. Errores Comunes
- Funciones demasiado largas
- Nombres poco descriptivos (`f1`, `aux`, `func`)
- Mezclar cálculo y salida por pantalla
- Usar variables fuera de su ámbito


## Resumen
Programar en C consiste, en gran parte, en dividir problemas complejos en funciones pequeñas, claras y bien definidas.

Las funciones permiten escribir código más prolijo y organizado, reutilizar soluciones, evitar código duplicado y facilitar la detección de errores.