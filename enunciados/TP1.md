---
id: tp1
title: ""
sidebar_label: TP1 - Prueba de ascensión de los magios
sidebar_position: 2
---

<div style={{ maxWidth: "900px", margin: "0 auto", paddingTop: "10px" }}>

<div style={{ textAlign: "center" }}>

<h1 style={{
  fontSize: "2.5rem",
  marginBottom: "10px",
  fontWeight: "700"
}}>
Trabajo Práctico Nº 1
</h1>

<h2 style={{
  fontSize: "2rem",
  fontWeight: "700"
}}>
Prueba de Ascensión de los Magios
</h2>

</div>

</div>

<p align="center">
  <img src="/img/enunciados/los_magios.jpg" width="450"></img>
</p>


<div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>

| Fecha de presentación | Fecha de entrega |
|:---------------------:|:----------------:|
| 02/04/2026            | 30/04/2026       |

</div>

<!-- <div style={{ display: "flex", justifyContent: "center", margin: "24px 0 0 0" }}>
  <a
    href="/tps/1c2026/correctores_tp0.pdf" 
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-block",
      backgroundColor: "#FDD835",
      color: "#1a1a1a",
      fontWeight: "700",
      fontSize: "1.1rem",
      padding: "12px 28px",
      borderRadius: "8px",
      textDecoration: "none",
      lineHeight: "1"
    }}
  >Ver lista de correctores</a>
</div> -->

---

## 1. Introducción

Los Magios son una antigua sociedad secreta que opera en las sombras de Springfield. A lo largo de los años han ejercido su influencia sobre distintos aspectos de la ciudad mediante rituales misteriosos, decisiones arbitrarias y una gran cantidad de donas.

Luego de ser aceptado como miembro, Homero se enfrentará a la siguiente prueba: la **Prueba de Ascensión Magia**.

Para determinar si una persona es digna de ascender dentro de la jerarquía de la sociedad secreta, los Magios realizan un desafío en el cual los participantes deben demostrar su valía y lealtad.

---

## 2. Objetivo

El presente trabajo práctico tiene como objetivo evaluar a los alumnos en aspectos fundamentales de la programación.

Entre ellos:

- Diseñe y desarrolle las funcionalidades de una biblioteca con un contrato preestablecido.
- Se familiarice con y utilice correctamente los tipos de datos estructurados.
- Se familiarice con y utilice correctamente memoria dinámica.
- Desarrolle una interfaz gráfica amigable y entendible para el usuario.

Por supuesto, se requiere que el trabajo cumpla con los objetivos de los previos trabajos prácticos en especial con las **buenas prácticas de programación** profesadas por la cátedra. Se considerarán críticos la modularización, reutilización y claridad del código.

---

## 3. Enunciado

Se solicita implementar un programa que realice la **prueba de ascensión de los Magios** en forma de juego.

El juego consiste en llevar todos los pergaminos sagrados magios y colocarlos en los distintos altares antes de que Homero se quede sin energía.

Al comenzar el juego, se deberá posicionar los elementos que lo componen en posiciones aleatorias en el terreno.

:::warning[IMPORTANTE]
- Ningún elemento puede inicializarse por fuera de los límites del terreno ni pisar otros elementos ya inicializados.
:::


### 3.1 Homero

Homero se inicializará en una posición aleatoria y podrá moverse por todo el terreno para cumplir el objetivo. Comenzará el juego con X puntos de energía, y con cada movimiento perderá un punto. Si Homero se queda sin energía antes de haber colocado cada uno de los pergaminos en sus respectivos altares, el juego se dará por perdido.


:::info[Reglas especiales]
- Homero podrá transportar los pergaminos empujandolos, de a uno a la vez.
- Cada pergamino tiene un altar asignado, y solo puede ser colocado en ese altar específico.

### 3.2 Donas
QUE LE DEN ENERGÍA

### 3.3 Pergaminos
QUE SON

### 3.4 Portales
Los portales unidireccionales podrán teletransportan a Homero o pergaminos. 

:::info[Reglas especiales]
- Si se teletransporta un pergamino, este quedará en el extremo de salida bloqueandolo y no permitiendo a Homero usar ese portal hasta que el pergamino sea retirado.

### 3.5 Tablas
Todos los demás magios de rango superior, exceptuando al líder supremo, se encuentran en el terreno con tablas de castigo. Si Homero pasa a una distancia (manhattan) menor o igual a 2, perderá X puntos de energía al ser golpeado por estos.

### 3.6 Piedra del castigo
La piedra de castigo es una roca de gran tamaño y peso que cuenta con una cadena y collar al que se le ata a un magio que ha cometido una falta grave. 
Durante esta prueba, este elemento se encontrará en el terreno y Homero al chocar con el mismo se realentizará, provocando que gaste el TRIPLE de energía en cada movimiento hasta que sea retirada después de X movimientos.

### 3.7 Paredes
El terreno contará con paredes que bloquean el paso de Homero y los pergaminos. Sin embargo, los portales podrán atravesar estas paredes.

### 3.8 Líder Supremo
El lider supremo se encontrará en el terreno y al colocar un pergamino sobre él, este indicará a través de un diálogo en qué altar debe ser colocado.

### 3.9 Terreno
El terreno está compuesto por los elementos mencionados anteriormente, cada uno de ellos con una coordenada (x, y) con x siendo un valor entre 0 y 19 inclusives e y siendo un valor entre 0 y 19 inclusives.

---

## 4. Modo de juego
Al moverse, Homero no puede pasarse de los límites del terreno, ni atravesar paredes. 
Por ejemplo, si Homero está en la fila 0 y el usuario lo mueve para arriba, Homero debería quedarse ahí, no se debería mover porque estaría saliéndose del terreno y ese movimiento no restaría energía ya que no se movió.

:::warning[IMPORTANTE]
- Antes de realizar el movimiento, se debe validar lo que ingresa el usuario, volviéndole a preguntar hasta que ingrese un movimiento correcto.
:::

Homero se podrá mover en 4 direcciones:

* Arriba: **W**
* Abajo: **S**
* Derecha: **D**
* Izquierda: **A**

Luego de realizar una acción en caso de chocar o estar a la distancia de reacción con un elemento se activará la reacción relacionada al mismo que afectará a Homero y el estado del juego.

El juego finaliza cuando:
* Homero coloca el último pergamino en su altar correspondiente. En este caso, el juego se dará por ganado
* Homero se queda sin energía. En este caso, el juego se dará por perdido.

---
## 5. Especificaciones
### 5.1 Convenciones
* Homero: **H**
* Donas: **O**
* Pergaminos: **P**
* Portales: **T**
* Tablas: **M**
* Piedra del castigo: **C**
* Líder Supremo: **S**

### 5.2 Funciones y procedimientos
El .h es viejo. Lo puse para ver como quedaba no más.
```c
#ifndef __ASCENSION_MAGIOS_H__
#define __ASCENSION_MAGIOS_H__

#include <stdbool.h>

#define MAX_BLOQUES 400
#define MAX_OBJETOS 50
#define MAX_FILAS 30
#define MAX_COLUMNAS 15

typedef struct coordenada {
    int fil;
    int col;
} coordenada_t;

typedef struct personaje {
    char tipo;
    coordenada_t posicion;
    int cantidad_madera;
    int cantidad_sopletes;
    bool recolecto_receta;
} personaje_t;

typedef struct bloque {
    char tipo;
    coordenada_t posicion;
    int resistencia;
} bloque_t;

typedef struct objeto {
    char tipo;
    coordenada_t posicion;
} objeto_t;

typedef struct juego {
    personaje_t homero;
    coordenada_t posicion_moe;
    coordenada_t posicion_receta;
    int movimientos_restantes;
    bloque_t bloques[MAX_BLOQUES];
    int tope_bloques;
    objeto_t herramientas[MAX_OBJETOS];
    int tope_herramientas;
    objeto_t obstaculos[MAX_OBJETOS];
    int tope_obstaculos;
} juego_t;

/*
 * Pre condiciones: -
 * Post condiciones: Inicializará el juego, cargando toda la información inicial de Homero, Moe, los bloques, las herramientas y los obstáculos.
 */
void inicializar_juego(juego_t *juego);


/*
 * Pre condiciones: El juego debe estar inicializado previamente con `inicializar_juego` y la acción
 * debe ser válida.
 * Post condiciones: Realizará la acción recibida por parámetro actualizando el juego.
 */
void realizar_jugada(juego_t *juego, char movimiento);

/*
 * Pre condiciones: El juego debe estar inicializado previamente con `inicializar_juego `.
 * Post condiciones: Imprime el juego por pantalla.
 */
void mostrar_juego(juego_t juego);

/*
 * Pre condiciones: El juego deberá estar inicializado previamente con `inicializar_juego `
 * Post condiciones: Devuelve:
 * --> 1 si es ganado
 * --> -1 si es perdido
 * --> 0 si se sigue jugando
 * El juego se dará por ganado cuando Homero recolecta su receta secreta y llega a Moe.
 * Se dará por perdido si se le terminan los movimientos antes de recolectar la receta y llegar a Moe.
 */
int estado_juego(juego_t juego);


#endif // __ASCENSION_MAGIOS_H__
```

---

## 6. Resultado Esperado

El trabajo práctico es un juego. Se espera que el trabajo cumpla la funcionalidad explicada anteriormente. Se deberá:
- Implementar todas las funciones especificadas en la biblioteca. 
- Inicializar **todos** los campos del registro *juego_t*.
- Pedirle al usuario que ingrese una acción **válida** a realizar cada turno.
- Mostrar todos los elementos en forma de terreno de forma clara con información que pueda serle útil al usuario (cuántas energía restante, dialogos, etc).
- Respetar las buenas prácticas de programación que profesamos en la cátedra.

### 6.1 Compilación y entrega
La funcionalidad indicada en ***ascension_magios.h*** debe ser implementada en un archivo llamado:

```
ascension_magios.c
```

conformando una biblioteca que luego será utilizada por el programa principal en un archivo llamado:

```
juego.c
```
e incluyendo el pedido del movimiento al usuario y la validación del mismo.

Se espera que el programa compile sin errores utilizando la siguiente línea:

```
gcc juego.c ascension_magios.c -o juego -std=c99 -Wall -Wconversion -Werror -lm
```

Por último debe ser entregado en la plataforma de corrección de trabajos prácticos **AlgoTrón** (patente pendiente), en la cual deberá tener la etiqueta **¡Exito!** significando que ha pasado las pruebas a las que la cátedra someterá al trabajo.

:::danger[IMPORTANTE]
La etiqueta **¡Éxito!** es un requisito **necesario pero no suficiente** para la aprobación del trabajo práctico.  
El trabajo deberá cumplir tanto con las **pruebas automatizadas** como con los **criterios de calidad evaluados por la cátedra**.
:::

:::info[ACLARACIÓN]
Para la entrega en **AlgoTrón** (patente pendiente), recuerde que deberá subir un archivo **zip** conteniendo únicamente los archivos antes mencionados, sin carpetas internas ni otros archivos. De lo contrario, la entrega no será validada por la plataforma.
:::

---

## 7. Anexos

### 7.1 FAQ
En <a>este link</a> encontrarán el documento de FAQ del TP, donde se irán cargando dudas realizadas con sus respuestas. Todo lo que esté en ese documento es válido y oficial para la realización del TP.

### 7.2 Obtención de números aleatorios en C
Para obtener números aleatorios debe utilizarse la función **rand()**, la cual está disponible en la biblioteca *stdlib.h*.

Esta función devuelve números pseudo-aleatorios, esto quiere decir que, cuando uno ejecuta nuevamente el programa, los números, aunque aleatorios, son los mismos.

Para resolver este problema debe inicializarse una semilla, cuya función es determinar desde dónde empezarán a calcularse los números aleatorios.

Los números arrojados por **rand()** son enteros sin signo, generalmente queremos que estén acotados a un rango (queremos números aleatorios entre tal y tal). Para esto, podemos obtener el resto de la división de **rand()** por el valor máximo del rango que necesitamos.

Aquí dejamos un breve ejemplo de como obtener números aleatorios entre 10 y 30.

```c
#include <stdio.h>
#include <stdlib.h> // Para usar rand
#include <time.h>   // Para obtener una semilla desde el reloj

int main(){
	srand ((unsigned)time(NULL)); 
	int numero = rand() % 20 + 10; // la amplitud del rango es 20 y el valor mínimo es 10.
	printf("El valor aleatorio es: %i\n", numero);

	return 0;
}
```

### 7.3 Limpiar la pantalla durante la ejecución de un programa
Muchas veces nos gustaría que nuestro programa pueda verse siempre en la pantalla sin ver texto anterior.

Para esto, podemos utilizar la llamada al sistema **clear**, de esta manera, limpiaremos todo lo que hay en nuestra terminal hasta el momento y podremos dibujar la información actualizada.

Y se utiliza de la siguiente manera:

```c
#include <stdio.h>
#include <stdlib.h>

int main(){
	printf("Escribimos algo\n");
	printf("que debería\n");
	printf("desaparecer...\n");
	
	system("clear"); // Limpiamos la pantalla
	
	printf("Solo deberiamos ver esto...\n");
	return 0;
}
```

### 7.4 Distancia Manhattan

Para obtener la distancia entre 2 puntos mediante este método, se debe conocer a priori las coordenadas de dichos puntos.

Luego, la distancia entre ellos es la suma de los valores absolutos de las diferencias de las coordenadas.
Se ve claramente en los siguientes ejemplos:


* La distancia entre los puntos (0,0) y (1,1) es 2 ya que:
```
| 0 - 1 | + | 0 - 1 | = 1 + 1 = 2
```	

* La distancia entre los puntos (10,5) y (2,12) es 15 ya que:
```	
| 10 - 2 | + | 5 - 12 | = 8 + 7 = 15
```	

* La distancia entre los puntos (7,8) y (9,8) es 2 ya que:
```	
| 7 - 9 | + | 8 - 8 | = 2 + 0 = 2
```	
