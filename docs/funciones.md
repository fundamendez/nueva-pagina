---
sidebar_position: 3
title: "Funciones"
label: Introducción
---

# Funciones

## ¿Por qué son importantes las funciones?

Imaginemos que queremos hacer un programa que:

- Lea notas de alumnos
- Calcule el promedio
- Determine si están aprobados
- Muestre un informe final

Con lo que sabemos hasta ahora, podríamos escribir todo dentro del `main`.

```c
int main() {
    // leer notas
    // calcular promedio
    // determinar aprobación
    // imprimir informe

    return 0;
}
```

**¿Qué problemas tendría esto?**

- El código sería largo y difícil de entender.
- Mezclaríamos muchas responsabilidades en un solo lugar.
- Es difícil reutilizar partes del programa.
- Si queremos cambiar una parte, podríamos romper otra.

Acá es donde las **funciones** juegan un rol fundamental en nuestro código.

## ¿Qué es la Modularización?

Desde hace siglos se utiliza una idea muy simple:

> Un problema grande es más fácil de resolver si lo dividimos en partes pequeñas.

En programación aplicamos exactamente el mismo principio:

- Dividimos el problema en subproblemas.
- Resolvemos cada parte por separado.
- Combinamos las soluciones.

A esto lo llamamos **modularización**.

Cada módulo:

- Tiene una responsabilidad específica.
- Resuelve un subproblema.
- Puede entenderse sin analizar todo el programa.

:::info
Cada módulo debería tener una única responsabilidad.
Si realiza demasiadas tareas, probablemente debería dividirse en más submódulos.
:::

## Funciones en C

En C, la herramienta principal para modularizar es la **función**.

Una función es un bloque de código que:

- Puede recibir datos (parámetros).
- Realiza una tarea específica.
- Puede devolver un valor.

A veces hay funciones que no necesitan devolver ningún valor, a estas funciones las llamaremos **procedimientos**.

En C, no existen los procedimientos como una estructura separada de las funciones como en otros lenguajes de programación. Para definir un procedimiento en C, utilizamos una función con valor de retorno nulo, de tipo `void`.

Por lo que conceptualmente podemos distinguir entre:

- Funciones que devuelven un valor
- Procedimientos (funciones que no devuelven un valor)

## La función main

Todo programa en C comienza su ejecución en `main`:

```c
int main() {
    return 0;
}
```

Aunque definamos muchas funciones, ninguna se ejecuta automáticamente. Una función solo se ejecuta cuando es llamada desde otra función (por ejemplo, desde `main`).

En C existen:

- Funciones de la biblioteca estándar (por ejemplo `printf`)
- Funciones definidas por el programador

## Funciones con valor de retorno

Supongamos que queremos sumar dos números.

En lugar de repetir la operación cada vez, podemos **definir una función**:

```c
int sumar(int a, int b) {
    return a + b;
}
```

### ¿Qué significa cada parte?

- `int` → tipo de dato que devuelve la función.
- `sumar` → nombre de la función.
- `a, b` → parámetros.
- `return` → devuelve el resultado y finaliza la ejecución.

### Parámetros

Los parámetros permiten que la función reciba datos para trabajar.

```c
int sumar(int a, int b)
```

La lista de parámetros consiste en una serie de declaraciones de variables, separadas por comas, que especifican el tipo y el nombre de cada dato que conforma su entrada.

### ¿Cómo se usa?

Al llamar a una función, los parámetros se reemplazan con valores literales o con variables que contengan un valor:

```c
int puntos = 10;
int resultado = sumar(puntos,3);
```

En este caso:

- Se llama a la función.
- Los parámetros se inicializan con los valores asignados: `a=puntos=10` y `b=3`.
- Se ejecuta su código.
- Se devuelve un valor.
- Ese valor se guarda en `resultado`.

:::info
La instrucción return cumple dos funciones:

- Devuelve un valor.
- Finaliza inmediatamente la ejecución de la función, por lo que todo el código que siga después de una llamada a `return`, no se ejecuta.
  :::

## Declaraciones y Acciones

El cuerpo, delimitado por llaves `{}`, contiene toda la lógica encapsulada de la función. Se compone de dos partes principales:

- Declaraciones: Define las variables necesarias para que la función cumpla su objetivo. Se conocen como **variables locales**, ya que su existencia y alcance están limitados exclusivamente al **interior de la función**.

  Una variable local:
  - Solo existe dentro de la función.
  - Se crea cuando la función comienza.
  - Se destruye cuando la función termina.
  - No puede usarse fuera de ella.

  Los parámetros tienen el mismo alcance local. Esto se puede ver más claro en el siguiente ejemplo.

- Acciones: Corresponde al conjunto de instrucciones y estructuras de control (bucles, condicionales, etc.) que definen el comportamiento de la función.

```c
float calcular_promedio(int nota_tp0, int nota_tp1, int nota_tp2) {

    // Declaraciones (variables locales)
    int suma_notas = 0;
    float promedio = 0;

    // Acciones
    suma_notas = nota_tp0 + nota_tp1 + nota_tp2;
    promedio = suma_notas / 3.0;

    return promedio;
}
```

En este ejemplo `nota_tp0`, `nota_tp1` y `nota_tp2` son parámetros de la función.
Reciben los valores que se pasan al llamar a la función `calcular_promedio`.

Funcionan como **variables locales**, ya que:

- Solo existen dentro de `calcular_promedio`
- No pueden usarse fuera de la función

## Procedimientos (Funciones sin valor de retorno)

Cuando una función no debe devolver ningún valor, se utiliza el tipo `void`.

Ahora supongamos que queremos una función que solo imprima algo en pantalla.

```c
void imprimir_saludo() {
    printf("Hola, Mundo!\n");
}
```

Uso:

```c
int main() {
    imprimir_saludo();
    return 0;
}
```

En este caso:

- La función realiza una acción.
- No devuelve ningún valor.
- Se utiliza como una instrucción.

:::note
Una función `void` puede usar `return;` sin valor, pero no es obligatorio.
Normalmente se usa cuando se quiere terminar con la ejecución de la función de manera temprana.
:::

## Diferencia entre función y procedimiento

**Comparación conceptual**
| Función (con retorno) | Procedimiento (`void`) |
|-----------------------|-------------------------|
| Calcula y devuelve un valor | Realiza una acción |
| Se usa dentro de expresiones | Se usa como instrucción |
| `int resultado = sumar(2,3);` | `imprimir_saludo();` |

### Diferencia práctica

```c
int sumar(int a, int b) {
    return a + b;
}
```

Se puede usar así:

```c
int total = sumar(4,5);
```

En cambio:

```c
void imprimir_saludo() {
    printf("Hola\n");
}
```

No se puede hacer esto:

```c
int x = imprimir_saludo();   // ❌ Error
```

## Estructura general de una función

```c
tipo_retorno nombre_funcion(tipo_1 parametro_1, tipo_2 parametro_2) {

    // Declaraciones (variables locales)
    // Acciones

    return valor;   // si corresponde
}
```

## Reglas de diseño

:::tip
Estas reglas no son obligatorias para que el programa funcione, pero sí para que el código sea claro y fácil de mantener.
:::

### Nombre descriptivo

```c
float calcular_promedio();
void leer_notas();
void imprimir_informe();
```

Los nombres de las funciones suelen contener **verbos en infinitivo**. Algunos nombres poco apropiados son:

```c
float promedio_calculado(); // ❌
int leeran_notas(); // ❌
```

### Responsabilidad única

Una función debería:

- **O** calcular y devolver un valor
- **O** producir un efecto

Pero no ambas cosas al mismo tiempo.

### Funciones cortas

Funciones pequeñas:

- Son más fáciles de entender.
- Son más fáciles de probar.
- Son más fáciles de reutilizar.

## Errores comunes

- Hacer todo dentro de `main`.
- Funciones demasiado largas.
- Nombres poco descriptivos como:
  `f1(), aux(), func()`
- Mezclar cálculo y salida por pantalla.
- Usar variables fuera de su ámbito.

:::warning
Si una función declara que devuelve un valor (por ejemplo `int`) y no ejecuta ningún return, el compilador suele darse cuenta de estos casos y terminaría en un error de compilación.
:::
