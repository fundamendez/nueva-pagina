# Vectores

Imaginemos que tenemos que guardar en un programa de C nuestras notas a lo largo del cuatrimestre, con lo que sabemos hasta ahora lo podríamos hacer de la siguiente manera:

```c
int nota_1 = 6;
int nota_2 = 8;
int nota_3 = 5;
int nota_4 = 7;
```
**⚠️ ¿Qué problemas podemos encontrar en este ejemplo?**

* Si tuviéramos que seguir agregando más notas deberíamos
hacerlo a mano y costaría más trabajo, además de que dejaría
**poco claro** el código.

* No podemos recorrer los datos. 

* Dificulta cálculos generales: para calcular el promedio habría que sumar variable por variable.

* **Código repetitivo:** se repiten estructuras muy similares.

Aca es cuando los vectores juegan un rol fundamental en nuestro código.

## ¿Qué es un vector en C?
Un vector (también llamado *arreglo* ol *array*) es una estructura de datos que permite almacenar varios valores del **mismo tipo** bajo un único nombre.
Cada valor se almacena en una posición identificada por un `índice`, que comienza en `0`.

Ahora, en lugar de escribir:
```c
int nota_1 = 6;
int nota_2 = 8;
int nota_3 = 5;
int nota_4 = 7;
```
Podemos agruparlas en un único vector de `ints`:
```c
int notas[4] = {6,8,5,7} 
```
En este caso:

* `notas` es el nombre del vector.

* `4` indica la cantidad de elementos que tiene el vector.

:::danger[IMPORTANTE]
Si bien el vector tiene 4 elementos, como el indice arranca desde `0`, el mismo va desde las posiciones `0 a 3`.
:::

Viéndolo gráficamente:

<p align="center">
  <img src="/nueva-pagina/img/docs/vector.png" width="400"></img>
</p>

## ¿Por qué necesitamos vectores en C?

* Permiten almacenar muchos valores del mismo tipo bajo un solo nombre.

* Facilitan el uso de estructuras repetitivas (`for`, `while`) para recorrer datos.

* Hacen el código más compacto y organizado.

* Permiten trabajar con cantidades variables de datos.

* Son la base para estructuras más complejas (matrices, estructuras dinámicas, etc.).

## Acceso a elementos 
En el ejemplo anterior tenemos:

<p align="center">
  <img src="/nueva-pagina/img/docs/vector_2.png" width="400"></img>
</p>

Mediante los índices podemos acceder a cada uno de los elementos dentro del arreglo. 

Si quisiéramos, por ejemplo, acceder al número 7:

```c 
int nota_4 = notas[3];
``` 

:::danger[IMPORTANTE]
Si bien el 7 es el ultimo elemento del arreglo y este tiene longitud 4, como se mencionó anteriormente, los indices van de `0 a longitud-1`. Esto es muy importante ya que si accediéramos de la siguiente manera:
```c 
int nota_4 = notas[4];
``` 
Estaríamos accediendo a una posición **inválida** de nuestro vector y obtendremos por consola el tan temido `segmentation fault`. Esto se debe a que estamos intentando acceder a memoria que no nos pertenece (en este caso, al elemento 5 de un vector de 4 elementos).
:::

Como el primer elemento siempre se encuentra en la posición o índice 0:
```c 
int primera_nota = notas[0]; // nota: 6
```

Entonces, para los diferentes elementos, usaremos los siguientes accesos:
```c 
notas[0]   // vale 6
notas[1]   // vale 8
notas[2]   // vale 5
notas[3]   // vale 7
```

## ¿Qué pasa cuando no sé cuantos elementos quiero guardar?

Un vector tiene un tamaño fijo por lo que no podemos definir un vector de tamaño 4 y luego intentar almacenar 5 elementos. En este caso estaríamos intentando acceder a memoria que no le pertenece.

Por ejemplo:
```c 
int notas[4] = {6, 8, 5, 7};

notas[4] = 10;   // ❌ Error: fuera de rango (segmentation fault)
```
Si no conocemos exactamente cuántos elementos se almacenarán, una solución común es definir el vector con un tamaño lo suficientemente grande como para contener la cantidad máxima esperada de datos.

Por ejemplo, si queremos almacenar las notas finales de nuestras materias:
```c 
#define MAX_MATERIAS 100

int notas[MAX_MATERIAS];
```

De esta manera reservamos espacio suficiente para poder seguir agregando notas a nuestro vector. 

:::note
Es importante considerar **que** estamos guardando en el vector. En este ejemplo, no es necesario almacenar espacio para 1000 materias siendo este un numero que nunca va a alcanzarse. Tenemos que elegir un numero coherente a lo que queremos almacenar. 
:::

Viéndolo gráficamente:
<p align="center">
  <img src="/nueva-pagina/img/docs/vector_3.png" width="600"></img>
</p>

## ¿Cómo recorrer un vector?
Para recorrer un vector en C se utiliza generalmente un ciclo for, ya que en este caso **conocemos la cantidad de elementos** que contiene.

Recordando el vector:
```c 
int notas[4] = {6, 8, 5, 7};
```

Supongamos que queremos calcular el promedio de las notas. Para hacerlo necesitaríamos recorrer el vector elemento por elemento para sumarlos y luego dividirlo por el total de elementos. 
Esto lo hacemos de la siguiente manera:
```c 
int suma = 0;

for (int i = 0; i < 4; i++) {
    suma += notas[i];
}

float promedio = (float)suma / 4;
```

🔎 **¿Qué está pasando?**

* Se declara una variable suma para acumular los valores.
* El ciclo for comienza en i = 0 ya que es la primer posición del vector.
* En cada iteración:
* Se accede al elemento notas[i].
    * Se lo suma a la variable suma.
    *  El ciclo termina cuando i alcanza el tamaño del vector (4).
* Finalmente, se divide la suma total por la cantidad de elementos para obtener el promedio.

:::warning[Error común]
Si la condición la definimos como `i <= tamaño_del_vector ` en la última iteración esteramos accediendo a una posición inválida. 
:::

Viéndolo gráficamente:
<p align="center">
  <img src="/nueva-pagina/img/docs/vector_recorrido.png" width="600"></img>
</p>


## 📌 Puntos importantes pare recordar

Un vector en C:

* Tiene **tamaño fijo**.
* **Todos** los elementos son del **mismo tipo**.
* Se almacena en memoria contigua.
* Se accede mediante índices comenzando en 0.

## ⚠️ Errores comunes

* Acceder fuera de rango (out of bounds)
    ```c 
    int notas[4];
    notas[4] = 10;   // ❌ índices válidos: 0 a 3
    ```
* Error de límite en el for (off-by-one)
    ```c 
    for (int i = 0; i <= 4; i++)   // ❌
    for (int i = 0; i < 4; i++)    // ✅
    ```    
* No inicializar el vector
    ```c 
    int notas[4];
    printf("%d", notas[0]);   // ❌ valor indeterminado, puede tener basura
    ```    
* Confundir tamaño con cantidad de elementos almacenados
    ```c 
    int notas[100];   // no significa que haya 100 cargadas
    ```  
* Intentar cambiar el tamaño del vector 
    ```c 
    notas[10];   // ❌ no redimensiona el arreglo
    ``` 

