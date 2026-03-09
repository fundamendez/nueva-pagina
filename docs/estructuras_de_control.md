# Estructuras de control

Las estructuras de control permiten modificar el flujo de ejecución de un programa en C, tomando decisiones o repitiendo bloques de código según condiciones lógicas.

## Estructuras condicionales

### if

Evalúa una condición y determina si es verdadera o no para definir el flujo del programa.

```c
if (x > 0) {
    printf("x es positivo\n");
}
printf("Fin de ejecución\n");
```

En este fragmento de código se evalúa la condición `x > 0` mediante la estructura `if`. El resultado de dicha evaluación determina si el bloque encerrado entre llaves se ejecuta o se omite. Independientemente de esta decisión, la instrucción `printf("Fin de ejecución");` se ejecuta siempre, ya que se encuentra fuera de la estructura condicional.

Viéndolo gráficamente:

<p align="center">
  <img src="/img/docs/if.png" width="250"></img>
</p>

Tenemos dos ejecuciones posibles:

- **Caso 1:** x = 1

```
x es positivo
Fin de ejecución
```

El valor de x es mayor que cero, por lo que la condición `x > 0` resulta verdadera. El programa ingresa al bloque del `if` y ejecuta la instrucción que imprime el mensaje `"x es positivo"`. Finalizada esta ejecución, el flujo del programa continúa de manera secuencial, imprimiendo el mensaje `"Fin de ejecución"`.

- **Caso 2:** x = 0

```
Fin de ejecución
```

El valor de x no cumple la condición `x > 0`, ya que no es _estrictamente_ mayor que cero. El bloque asociado al `if` no se ejecuta y el flujo continúa directamente con la siguiente línea, imprimiendo únicamente el mensaje `"Fin de ejecución"`.

### if - else

Supongamos que ahora queremos que, si la condición del `if` se cumple, se imprima un mensaje, y en caso contrario se imprima otro distinto.
Para estos casos se utiliza la estructura **if-else**, que permite definir un bloque de código alternativo que se ejecuta _únicamente_ cuando la condición del `if` resulta falsa.

Por ejemplo:

```c
if (x > 0) {
    printf("x es positivo\n");
} else {
    printf("x es negativo o 0\n");
}
```

Viéndolo gráficamente:

<p align="center">
  <img src="/img/docs/if-else.png" width="300"></img>
</p>

Las salidas posibles son:

- **Caso 1:** x = 1

```
x es positivo
```

El valor de x es mayor que cero, por lo que la condición `x > 0` resulta verdadera. El programa ingresa al bloque del `if` e imprime el mensaje `"x es positivo"`. El bloque `else` no se ejecuta, ya que este solo se evalúa cuando la condición del `if` es falsa.

- **Caso 2:** x = 0

```
x es negativo o 0
```

El valor de x no cumple la condición `x > 0`, ya que no es _estrictamente_ mayor que cero. El bloque del `if` se omite y el flujo continúa con la ejecución del bloque `else`, imprimiendo el mensaje `"x es negativo o 0"`.

### if - else if - else

En algunas situaciones es necesario evaluar más de una condición y ejecutar distintos bloques de código según cuál de ellas se cumpla. Para estos casos, C permite encadenar condiciones mediante la estructura **if–else if–else**.
Las condiciones se evalúan en orden, de arriba hacia abajo. El programa ejecuta el primer bloque cuya condición resulte verdadera y luego sale de la estructura condicional. Si ninguna de las condiciones se cumple, se ejecuta el bloque `else`, si este está presente.

Por ejemplo:

```c
if (x > 0) {
    printf("x es positivo\n");
} else if (x == 0){
    printf("x es 0\n");
} else {
    printf("x es negativo\n");
}
```

Viéndolo gráficamente:

<p align="center">
  <img src="/img/docs/if-else-if.png" width="250"></img>
</p>

Las salidas posibles son:

- **Caso 1:** x = 1

```
x es positivo
```

Si el valor de x es mayor que cero, la primera condición resulta verdadera. Se ejecuta el bloque correspondiente al `if`, imprimiendo el mensaje `"x es positivo"`. Las condiciones siguientes no se evalúan.

- **Caso 2:** x = 0

```
x es 0
```

La condición `x > 0` resulta falsa, por lo que el programa evalúa la siguiente condición. Dado que `x == 0` es verdadera, se ejecuta el bloque del `else if`, imprimiendo el mensaje `"x es 0"`.

- **Caso 3:** x = -1

```
x es negativo
```

Si el valor de x es menor que cero, ninguna de las condiciones anteriores se cumple. El programa ejecuta el bloque `else`, imprimiendo el mensaje `"x es negativo"`.

:::info
Esta estructura permite cubrir todos los casos posibles para una variable, evitando múltiples estructuras `if` independientes y asegurando que solo un bloque de código se ejecute en cada ejecución del programa.
:::

#### Comparación con Python

- **if**

```py
if x > 0:
    print("x es positivo")

print("Fin de ejecución")
```

- **if - else**

```py
if x > 0:
    print("x es positivo")
else:
    print("x es negativo o 0")
```

- **if - elif - else**

```py
if x > 0:
    print("x es positivo")
elif x == 0:
    print("x es 0")
else:
    print("x es negativo")
```

:::warning
Si bien C y Python cuentan con estructuras de control conceptualmente similares, existen diferencias importantes en su sintaxis y en la forma en que se escribe y organiza el código.

En C, los bloques de código se delimitan mediante llaves **\{ \}** y las condiciones se escriben entre paréntesis **( )**. En Python, por el contrario, los bloques se definen exclusivamente por la indentación, lo que elimina el uso de llaves haciendo que el correcto espaciado del código sea fundamental para su funcionamiento.
:::

#### Errores comunes

1. **Usar `=` en lugar de `==`:** el `=` sirve para asignar valor a una variable, pero cuando queremos comparar debemos usar `==`.
2. **Olvidarse las llaves `{ }`:** es importante incluirlas porque si no, solo la primera línea se toma como parte del `if`. A diferencia de Python, la indentación no delimita lo que está dentro o fuera de la condición.

## Estructuras iterativas

### for

La estructura `for` se utiliza **cuando se conoce de antemano la cantidad de iteraciones que se desea realizar**. Permite concentrar en una sola línea la inicialización, la condición y la actualización de la variable de control.

Su sintaxis general es:

```c
for (inicialización; condición; actualización) {
    // bloque de código
}
```

Cada una de estas partes cumple un rol específico:

- **Inicialización:** se ejecuta una única vez al comenzar el ciclo.
- **Condición:** se evalúa antes de cada iteración. Si es verdadera, el ciclo continúa; si es falsa, finaliza.
- **Actualización:** se ejecuta al finalizar cada iteración.

Por ejemplo:

```c
for (int i = 0; i < 5; i++) {
    printf("%d\n", i);
}
```

El procedimiento es el siguiente:

- Se declara e inicializa la variable `i` en `0`.
- El ciclo se ejecuta mientras `i < 5`.
- En cada iteración, `i` aumenta en `1`.

La salida será:

```
0
1
2
3
4
```

Viéndolo gráficamente:

<p align="center">
  <img src="/img/docs/ejemplo_for.png" width="300"></img>
</p>

:::note
Si la condición inicial no se cumple, el ciclo no se ejecuta ninguna vez.
:::

#### Comparación con Python

En Python, la estructura `for` tiene un enfoque diferente al de C. Mientras que en C el `for` se basa en una variable de control con inicialización, condición y actualización explícitas, en Python el `for` se utiliza principalmente para recorrer secuencias (como listas, rangos o strings).

El mismo ejemplo se vería de la siguiente manera:

```py
for i in range(5):
    print(i)
```

- `range(5)` genera una _secuencia de valores_ desde 0 hasta 4.
- En cada iteración, la variable `i` toma uno de esos valores.
- Se ejecuta el bloque indentado, imprimiendo el valor actual de `i`.

La salida será:

```
0
1
2
3
4
```

### while

La estructura `while` permite repetir un bloque de código mientras una condición sea verdadera. A diferencia del `for`, **se utiliza principalmente cuando no se conoce de antemano la cantidad exacta de iteraciones**, sino que el ciclo depende de una condición lógica.

Su sintaxis general es:

```c
while (condición) {
    // bloque de código
}
```

La condición se evalúa antes de cada iteración. Si resulta verdadera, el bloque se ejecuta; si es falsa, el ciclo finaliza.

Por ejemplo:

```c
int i = 0;

while (i < 5) {
    printf("%d\n", i);
    i++;
}
```

Funcionamiento paso a paso:

- Se inicializa la variable `i` en `0`.
- Se evalúa la condición `i < 5`.
- Si es verdadera, se ejecuta el bloque.
- Se incrementa `i`.
- Se vuelve a evaluar la condición.

Este proceso se repite hasta que `i` deja de ser menor que 5.

La salida será:

```
0
1
2
3
4
```

:::note
Si bien en este caso sabemos que el ciclo terminará después de 5 iteraciones, hay situaciones más complejas en las que no se conoce de antemano cuántas veces se va a iterar. Para esos casos, el `while` resulta especialmente útil.
:::

Características importantes:

- El ciclo puede no ejecutarse nunca si la condición es falsa desde el inicio.
- La actualización de la variable de control debe hacerse manualmente.
- Si la condición nunca deja de cumplirse, se produce un _loop infinito_.

#### Comparación con Python

En Python, la estructura `while` funciona de manera muy similar:

```py
i = 0

while i < 5:
    print(i)
    i += 1
```

Diferencias principales:

- No se usan paréntesis en la condición.
- No se utilizan llaves, sino indentación y `:`.

#### Errores comunes

1. **Loop infinito:** es importante asegurarse de que el ciclo en algún momento va a terminar, ya que de lo contrario se generará un loop infinito.
2. **Recorrer elementos de más:** si la condición de corte es incorrecta, se pueden generar iteraciones de más. Por ejemplo: en un vector con `n` elementos, si se itera hasta `n` para recorrerlo se produce un acceso fuera de los límites _(segmentation fault)_. Por eso hay que iterar hasta `n-1`.
3. **Variable de control sin inicializar:** si no se inicializa la variable, puede contener _basura_, lo que afectará la ejecución o el corte del ciclo. Por ejemplo:

```c
int i; // esta variable no tiene un valor definido

while (i < 5) {
    printf("%d\n", i);
    i++;
}
```

4. **Usar `break` o `return`:** en la cátedra consideramos una _mala práctica_ el uso de `break` o `return` para cortar ciclos. Es importante aprender a delimitarlos con condiciones (en el caso de `while`) o con cantidad de iteraciones (en el caso del `for`).

#### Operadores para condiciones

| Operador | Uso                                                                                |
| -------- | ---------------------------------------------------------------------------------- |
| `==`     | Comparador de igualdad                                                             |
| `!=`     | Comparador de distinto                                                             |
| `&&`     | AND lógico: ambas condiciones deben cumplirse para que el resultado sea verdadero  |
| `\|\|`   | OR lógico: con que una de las dos condiciones se cumpla, el resultado es verdadero |
| `<`      | Menor que                                                                          |
| `>`      | Mayor que                                                                          |
| `<=`     | Menor o igual                                                                      |
| `>=`     | Mayor o igual                                                                      |

:::warning
Es importante el uso de paréntesis cuando se necesita separar o agrupar condiciones.
Por ejemplo, si se necesitan dos condiciones con AND y el resultado se compara con OR con otra condición:
`if((condicion1 && condicion2) || condicion3)`
:::
