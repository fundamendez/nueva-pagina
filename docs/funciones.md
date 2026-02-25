# Funciones

## ¿Por qué son importantes las funciones?
Imaginemos que queremos hacer un programa que:

* Lea notas de alumnos
* Calcule el promedio
* Determine si están aprobados
* Muestre un informe final

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

**⚠️ ¿Qué problemas tendría eso?**

* El código sería largo y difícil de entender.
* Mezclaríamos muchas responsabilidades en un solo lugar.
* Es difícil reutilizar partes del programa.
* Si queremos cambiar una parte, podríamos romper otra.

Acá es donde las **funciones** juegan un rol fundamental en nuestro código.

---
## 🧠 Divide y vencerás

Desde hace siglos se utiliza una idea muy simple:
> Un problema grande es más fácil de resolver si lo dividimos en partes pequeñas.

En programación aplicamos exactamente el mismo principio:

* Dividimos el problema en subproblemas.
* Resolvemos cada parte por separado.
* Combinamos las soluciones.

A esto lo llamamos **modularización**.

---
## ¿Qué es la Modularización?
Modularizar significa construir un programa dividiéndolo en partes pequeñas, independientes y bien definidas.

Cada módulo:

* Tiene una responsabilidad específica.
* Resuelve un subproblema.
* Puede entenderse sin analizar todo el programa.

:::important[IMPORTANTE]
Una función debería tener una única responsabilidad.
Si realiza demasiadas tareas, probablemente debería dividirse.
:::

---
## Funciones en C
En C, la herramienta principal para modularizar es la **función**.

Una función es un bloque de código que:
* Puede recibir datos (parámetros).
* Realiza una tarea específica.
* Puede devolver un valor.

En muchos lenguajes de programación existe el concepto de **procedimiento**, éste es comparable a una función que no retorna valor alguno.

En C, no existen los procedimientos como una estructura separada de las funciones como en muchos otros lenguajes de programación. Para definir lo que en otros lenguajes es conocido como un procedimiento, C utiliza una función con valor de retorno nulo de tipo `void`.

Por lo que conceptualmente podemos distinguir entre:
* Funciones que devuelven un valor
* Funciones que no devuelven un valor (equivalentes a procedimientos en otros lenguajes)

---
## La función main
Todo programa en C comienza su ejecución en main: 

```c
int main() {
    return 0;
}
```

Aunque definamos muchas funciones, ninguna se ejecuta automáticamente. Una función solo se ejecuta cuando es llamada desde otra función (por ejemplo, desde `main`).

En C existen:
* Funciones de la biblioteca estándar (por ejemplo `printf`)
* Funciones definidas por el programador

---
## Funciones con valor de retorno
Supongamos que queremos sumar dos números.

En lugar de repetir la operación cada vez, podemos **definir una función**:
```c
int sumar(int a, int b) {
    return a + b;
}
```

### 🔎 ¿Qué significa cada parte?
* `int` → tipo de dato que devuelve la función.
* `sumar` → nombre de la función.
* `a, b` → parámetros.
* `return` → devuelve el resultado y finaliza la ejecución.

### 🤔 ¿Cómo se usa?
```c
int resultado = sumar(2,3);
```
En este caso:
* Se llama a la función.
* Se ejecuta su código.
* Se devuelve un valor.
* Ese valor se guarda en `resultado`.

:::note
La instrucción return cumple dos funciones:
* Devuelve un valor.
* Finaliza inmediatamente la ejecución de la función.
:::

---
## Parámetros
Los parámetros permiten que la función reciba datos para trabajar.
```c
int sumar(int a, int b)
```
La lista de parámetros consiste en una serie de declaraciones de variables, separadas por comas, que especifican el tipo y el nombre de cada dato que conforma su interfaz de entrada.

---
## Declaraciones y Acciones
El cuerpo, delimitado por llaves `{}`, contiene toda la lógica encapsulada de la función. Se compone de dos partes principales:

* Declaraciones: Define las variables necesarias para que la función cumpla su objetivo. Se conocen como **variables locales**, ya que su existencia y alcance están limitados exclusivamente al **interior de la función**.

    Una variable local:
    * Solo existe dentro de la función.
    * Se crea cuando la función comienza.
    * Se destruye cuando la función termina.
    * No puede usarse fuera de ella.

* Acciones: Corresponde al conjunto de instrucciones y estructuras de control (bucles, condicionales, etc.) que implementan el comportamiento de la función.

---
## Funciones sin valor de retorno (Procedimientos)
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
* La función realiza una acción.
* No devuelve ningún valor.
* Se utiliza como una instrucción.

:::note
Una función `void` puede usar `return;` sin valor, pero no es obligatorio.
:::
---
## 📌 Diferencia entre función y procedimiento

**Comparación conceptual**
| Función (con retorno) |  Procedimiento (`void`) |
|-----------------------|-------------------------|
| Calcula y devuelve un valor |	Realiza una acción | 
| Se usa dentro de expresiones | Se usa como instrucción |
| `int resultado = sumar(2,3);` |	`imprimir_saludo();` |

---
### 🔎 Diferencia práctica
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
:::danger[IMPORTANTE]
Una función void no devuelve ningún valor.
Intentar usarla dentro de una expresión produce un error de compilación.
:::

---
## Estructura general de una función
```c
tipo_retorno nombre_funcion(tipo_1 parametro_1, tipo_2 parametro_2) {

    // Declaraciones (variables locales)
    // Acciones

    return valor;   // si corresponde
}
```

---
## 📌 Reglas de Diseño
:::tip[RECORDA]
Estas reglas no son obligatorias para que el programa funcione, pero sí para que el código sea claro y mantenible.
:::
### ✔️ Nombre descriptivo
```c
calcular_promedio();
leer_notas();
imprimir_informe();
```

### ✔️ Responsabilidad única

Una función debería:
* **O** calcular y devolver un valor
* **O** producir un efecto

Pero no ambas cosas al mismo tiempo.

### ✔️ Funciones cortas

Funciones pequeñas:
* Son más fáciles de entender.
* Son más fáciles de probar.
* Son más fáciles de reutilizar.

---
## ⚠️ Errores comunes

* Hacer todo dentro de `main`.
* Funciones demasiado largas.
* Nombres poco descriptivos como:
`f1(), aux(), func()`
* Mezclar cálculo y salida por pantalla.
* Usar variables fuera de su ámbito.

:::warning
Si una función declara que devuelve un valor (por ejemplo `int`) y no ejecuta ningún return, el comportamiento del programa es indefinido.
:::

