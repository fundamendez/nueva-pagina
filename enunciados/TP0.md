---
id: tp0
title: ""
sidebar_label: TP0 - Inspección del Monorriel
sidebar_position: 1
---

<!-- import BuscadorCorrector from '@site/src/components/BuscadorCorrectores' -->

<div style={{ maxWidth: "900px", margin: "0 auto", paddingTop: "10px" }}>

<div style={{ textAlign: "center" }}>

<h1 style={{
  fontSize: "2.5rem",
  marginBottom: "10px",
  fontWeight: "700"
}}>
Trabajo Práctico Nº 0
</h1>

<h2 style={{
  fontSize: "2rem",
  fontWeight: "700"
}}>
Inspección del Monorriel
</h2>

</div>

</div>

<p align="center">
  <img src="/img/enunciados/2c2026tp0/cuca.webp" width="650"></img>
</p>


<div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>

| Fecha de presentación | Fecha de entrega |
|:---------------------:|:----------------:|
| 03/09/2026            | 10/09/2026     |

</div>
<!-- <BuscadorCorrector numeroTp={0}/> -->

---

## 1. Introducción

Luego de que el Sr. Burns pagara una cuantiosa multa de $3.000.000 de dólares a la ciudad de Springfield por arrojar desechos tóxicos en el parque infantil, los ciudadanos decidieron destinar esos fondos a la construcción de un flamante monorriel, siguiendo las convincentes propuestas del vendedor, el Sr. Mandino.
Sin embargo, Marge Simpson sospecha que el proyecto no es tan seguro como aparenta y teme que las obras del Sr. Mandino oculten serias fallas de infraestructura. Con Homero al mando como conductor en su viaje inaugural, ella está preocupada así que se infiltra en la oficina del Sr. Mandino y roba el informe sobre el estado del monorriel. Antes de analizarlo, establece un sistema de evaluación en el que cada respuesta con un resultado desfavorable resta puntos al puntaje total. Para evitar errores al realizar el cálculo manualmente, necesita un programa que procese las respuestas del informe, calcule el puntaje obtenido y determine si el monorriel se encuentra apto para funcionar.

Marge contra el Monorriel [T4 E12]  

---

## 2. Objetivo

El presente trabajo práctico tiene como objetivo evaluar a los alumnos en aspectos fundamentales de la programación.

Entre ellos:

- Validación de datos ingresados por el usuario  
- Comunicación con el usuario  
- Uso de tipos de datos simples  
- Uso de estructuras de control  
- Uso de estructuras iterativas  
- [Buenas prácticas de programación](/docs/buenas_practicas)  


---

## 3. Enunciado

Se solicita implementar un programa que **ayude a Marge a calcular el puntaje obtenido y decida si el monorriel está apto para hacer el viaje inaugural**.

El programa deberá realizar **4 preguntas al usuario**. Cada respuesta permitirá determinar el estado de un control de seguridad y, una vez finalizados los cuatro controles, se deberá informar si el monorriel resulta apto. 


Importante:
- Se sabe que se empieza con 10 puntos y no se pueden exceder.
- Si el usuario ingresa una respuesta inválida (formato incorrecto, valor fuera de rango o la respuesta no esta dentro de las opciones), se deberá **volver a realizar la misma pregunta**.
- No se debe avanzar a la siguiente pregunta hasta que la respuesta actual sea válida.
- Queda fuera del alcance de este trabajo práctico el manejo de errores por discrepancia en los tipos de datos. Si el enunciado especifica el ingreso de una variable entera (int) y el usuario introduce un carácter (char), se esperará que haya una falla de ejecución en el programa.

---

## 3.1 Preguntas

### Pregunta 1  
**¿Cuántos pasajeros realizarán el viaje inaugural?**


La respuesta debe ser un número entero.
El monorriel tiene una capacidad máxima recomendada de 180 pasajeros.

Validaciones:
- La respuesta debe estar en el rango:
```
 1 - 250
```

Si la cantidad de pasajeros es menor o igual a 180, el viaje puede realizarse.

Si la cantidad de pasajeros es mayor a 180, el viaje no se debe realizar. Se deberá imprimir -NO APTO- y cortar la ejecución del programa.

---

### Pregunta 2  
**¿Qué distancia recorrió el monorriel durante la prueba de los frenos marca Patito?**

Durante la inspección, se realiza una prueba sobre los modernos frenos marca Patito instalados en el monorriel.
El usuario deberá ingresar la cantidad de metros recorridos desde el momento en que se accionaron los frenos hasta que el monorriel se detuvo completamente.
Según las especificaciones provistas por el Sr. Mandino, la distancia máxima de frenado considerada segura es de 50.0 metros.

Validaciones:
- La respuesta debe ser un número decimal.
- Debe estar en el rango:
```
0.0 - 150.0
```

Una distancia menor o igual a 50.0 implica que el control fue aprobado.

Una distancia mayor a 50.0 y menor o igual a 100.0 implica que el control falla pero no hay heridos, y se resta 1 punto.

Una distancia mayor a 100.0 (y dentro del rango) implica que el control fue desaprobado y se restan 2 puntos.

---

### Pregunta 3  
**¿A qué hora está programado el viaje inaugural? (formato: hh:mm)**

La respuesta debe ingresarse como números enteros de la siguiente manera:

- Los primeros **2 números** representan la hora
- Luego los dos puntos  `:`
- Los últimos **2 números** representan los minutos
- La hora no puede ser mayor a 23 ni menor a 0
- Los minutos no pueden ser mayores a 59 ni menores a 0

Ejemplo válido:

```
08:30
```

Validaciones requeridas:

- Ambos numeros deben ser positivos  
- La hora no puede ser mayor a 23 ni menor a 0
- Los minutos no pueden ser mayores a 59 ni menores a 0
- El formato debe ser estrictamente **hh:mm**

Durante la inspección, Marge descubrió que el sistema de iluminación exterior del monorriel no funciona.
Por este motivo:

Si el viaje está programado entre las 06:00 y las 19:59, inclusive, el control será aprobado.

Si el viaje está programado entre las 20:00 y las 05:59, el control será desaprobado y se restan 3 puntos.

---

### Pregunta 4  
**¿Qué encontró Marge en el compartimiento del matafuegos?**

Opciones posibles:
```
[M] Un matafuegos
[Z] Una familia de zarigüeyas
[V] El compartimiento vacío
```
Validaciones:

- Solo se aceptan los caracteres `M`, `Z` o `V`.
- La letra debe ingresarse en **mayúscula**

Si la respuesta es `Z` se resta 1 punto.

Si la respuesta es `V` se restan 3 puntos.

Si la respuesta es `M` se suma 1 punto.


:::info[ACLARACIÓN]
Esta es la única pregunta que puede sumar puntos.
:::

---

## 3.2 Cálculo del Puntaje

Cada respuesta puede restar (o no) puntos del puntaje inicial del control.

---



### Pregunta 2 — Distancia de frenado

| Respuesta | Puntos |
|---|---|
| `distancia_frenado <= 50.0` | 0 |
| `50.0 < distancia_frenado <= 100.0` | −1 |
| `100.0 < distancia_frenado` | −2 |

---

### Pregunta 3 — Hora programada del viaje

| Respuesta | Puntos |
|---|---|
 Entre las 06:00 y las 19:59 | 0 |
  Entre las 20:00 y las 05:59 | −3 |

---

### Pregunta 4 — Compartimento de matafuegos

| Respuesta | Puntos |
|---|---|
M  | +1 |
Z  | −1 |
V | -3 |

---

# 3.3 Cálculo final

El puntaje final se calcula mediante la siguiente ecuación:

```
puntaje_final = puntaje_inical +
puntos_pregunta2 +
puntos_pregunta3 +
puntos_pregunta4
```


---

## 4. Resultados Posibles
Cada una de las cuatro preguntas representa un control de seguridad del monorriel.

* Por cada control desaprobado se deberá restar el puntaje indicado por dicho control.

Por lo tanto, al finalizar todas las preguntas, el monorriel podrá tener entre 10 y 0 de puntaje final.

El resultado de la inspección se determinará de la siguiente manera:

|Puntaje Final | Estado              |
|  ----------------- | --------------      |
|    8 - 10             | -APTO-              |
| 5 - 7              | -REQUIERE REVISION- |
| 0 - 4           | -NO APTO-           |


## 5. Resultado Esperado
El trabajo práctico debe ser realizado en un archivo llamado:
`inspeccion.c`

Se espera que el programa compile sin errores utilizando la siguiente línea:

`gcc inspeccion.c -Wall -Werror -Wconversion -std=c99 -o inspeccion`

Luego, el programa deberá ejecutarse realizando las preguntas correspondientes a la inspección y, finalmente, mostrar por pantalla un mensaje que indique el **estado final de la inspección**.

El resultado debe mostrarse **entre guiones**, como se muestra en la tabla.

Por ejemplo, una salida válida podría ser:

`Con las respuestas brindadas, el estado de la inspección de seguridad del monorriel es: -REQUIERE REVISIÓN-  `

:::info[ACLARACIÓN]
Si bien el texto completo del mensaje puede quedar a elección del alumno, se debe:

* Mostrar el resultado final entre guiones.
* Realizar las preguntas en el orden indicado en el enunciado
:::

---

## 6. Entrega

El trabajo práctico deberá ser entregado en la plataforma de corrección de trabajos prácticos **AlgoTrón** (patente pendiente).

Para la entrega en AlgoTrón, deberá subir un archivo zip conteniendo únicamente el archivo de código (inspeccion.c), sin carpetas internas ni otros archivos. De lo contrario, la entrega no será validada por la plataforma.

Para ser considerado válido, el programa deberá obtener la etiqueta:

```
¡Éxito!
```

Esto significa que el trabajo ha superado correctamente las **pruebas automatizadas** realizadas por la plataforma.

Una vez obtenida la etiqueta **¡Éxito!**, el trabajo será revisado por un colaborador de la cátedra, quien evaluará:

- Cumplimiento de las buenas prácticas de programación mencionadas en el objetivo.
- Correcta implementación de las validaciones solicitadas.
- Calidad del código y legibilidad.
- Uso adecuado de estructuras de control y modularización.

Importante:

La etiqueta **¡Éxito!** es un requisito **necesario pero no suficiente** para la aprobación del trabajo práctico.  
El trabajo deberá cumplir tanto con las **pruebas automatizadas** como con los **criterios de calidad evaluados por la cátedra**.

---

## 7. Ejemplos de ejecución

### Ejemplo 1

Pregunta 1  
¿Cuántos pasajeros realizarán el viaje inaugural?

Respuesta: 251

Respuesta: 80 


Pregunta 2  
¿Qué distancia recorrió el monorriel durante la prueba de los frenos marca Patito?

Respuesta: 45


Pregunta 3  
¿A qué hora está programado el viaje inaugural? 

Respuesta: 24:00

Respuesta: 15:30


Pregunta 4  
¿Qué encontró Marge en el compartimiento del matafuegos?

Respuesta: M


Cálculo:

```
P2 = 0
P3 = 0
P4 = 1
```

Puntaje final:

```
10 + 0 + 0 + 1 = 10 (no se pasa de 10)
```

Resultado:


-APTO- 


---

### Ejemplo 2

Pregunta 1  
¿Cuántos pasajeros realizarán el viaje inaugural?  
Respuesta: 300  
Respuesta: -5  
Respuesta: 195  


Resultado:  
`-NO APTO-`

---

### Ejemplo 3

Pregunta 1  
¿Cuántos pasajeros realizarán el viaje inaugural?  
Respuesta: 180  
  

Pregunta 2  
¿Qué distancia recorrió el monorriel durante la prueba de los frenos marca Patito?  
Respuesta: 120.0  
 

Pregunta 3  
¿A qué hora está programado el viaje inaugural? (formato: hh:mm)  
Respuesta: 03:00  
  

Pregunta 4  
¿Qué encontró Marge en el compartimiento del matafuegos?  
Respuesta: V  


Cálculo:  
```
P2 = -2
P3 = -3
P4 = -3
```
Puntaje final:  
```
10 - 2 - 3 - 3 = 2
```
Resultado:  
`-NO APTO-`

---

### Ejemplo 4 

Pregunta 1  
¿Cuántos pasajeros realizarán el viaje inaugural?  
Respuesta: 100  


Pregunta 2  
¿Qué distancia recorrió el monorriel durante la prueba de los frenos marca Patito?  
Respuesta: 85.5  

Pregunta 3  
¿A qué hora está programado el viaje inaugural? (formato: hh:mm)  
Respuesta: 21:00  


Pregunta 4  
¿Qué encontró Marge en el compartimiento del matafuegos?  
Respuesta: M  
  

Cálculo:  
```
P2 = -1
P3 = -3
P4 = 1
```
Puntaje final:  
```
10 - 1 - 3 + 1 = 7
```
Resultado:  
`-REQUIERE REVISION-`

---

### Ejemplo 5 

Pregunta 1  
¿Cuántos pasajeros realizarán el viaje inaugural?  
Respuesta: 260  
Respuesta: 0  
Respuesta: 175  
 

Pregunta 2  
¿Qué distancia recorrió el monorriel durante la prueba de los frenos marca Patito?  
Respuesta: -1.5  
Respuesta: 200.0  
Respuesta: 55.0  
 

Pregunta 3  
¿A qué hora está programado el viaje inaugural? (formato: hh:mm)  
Respuesta: 08:60  
Respuesta: 25:10  
Respuesta: 19:59  
 

Pregunta 4  
¿Qué encontró Marge en el compartimiento del matafuegos?  
Respuesta: X  
Respuesta: z  
Respuesta: Z  
 

Cálculo:  
```
P2 = -1
P3 = 0
P4 = -1
```
Puntaje final:  
```
10 - 1 + 0 - 1 = 8
```
Resultado:  
`-APTO-`

---

### Ejemplo 6 

Pregunta 1  
¿Cuántos pasajeros realizarán el viaje inaugural?  
Respuesta: 50  
 

Pregunta 2  
¿Qué distancia recorrió el monorriel durante la prueba de los frenos marca Patito?  
Respuesta: 90.0  


Pregunta 3  
¿A qué hora está programado el viaje inaugural? (formato: hh:mm)  
Respuesta: 22:00  


Pregunta 4  
¿Qué encontró Marge en el compartimiento del matafuegos?  
Respuesta: Z  
  

Cálculo:  
```
P2 = -1
P3 = -3
P4 = -1
```
Puntaje final:  
```
10 - 1 - 3 - 1 = 5
```
Resultado:  
`-REQUIERE REVISION-`


----