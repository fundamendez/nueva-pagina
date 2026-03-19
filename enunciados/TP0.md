---
id: tp0
title: ""
sidebar_label: TP0 - Prueba de iniciación de los Magios
sidebar_position: 1
---

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
Prueba de Iniciación de los Magios
</h2>

</div>

</div>

<p align="center">
  <img src="/img/enunciados/los_magios.jpg" width="450"></img>
</p>


<div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>

| Fecha de presentación | Fecha de entrega |
|:---------------------:|:----------------:|
| 19/03/2026            | 26/03/2026       |

</div>

---

## 1. Introducción

Los Magios son una antigua sociedad secreta que opera en las sombras de Springfield. A lo largo de los años han ejercido su influencia sobre distintos aspectos de la ciudad mediante rituales misteriosos, decisiones arbitrarias y una gran cantidad de donas.

Recientemente, la logia abrió una nueva convocatoria para aceptar nuevos miembros. Homero Simpson decidió postularse y, como cualquier aspirante, deberá atravesar la **Prueba de Iniciación Magia**.

Para determinar si una persona es digna de ingresar a la sociedad secreta, los Magios realizan una serie de preguntas rituales. Según las respuestas obtenidas, se calculará un **puntaje de dignidad magística** que determinará si el aspirante puede formar parte de la logia o no.

---

## 2. Objetivo

El presente trabajo práctico tiene como objetivo evaluar a los alumnos en aspectos fundamentales de la programación.

Entre ellos:

- Validación de datos ingresados por el usuario  
- Comunicación con el usuario  
- Uso de tipos de datos simples  
- Uso de estructuras de control  
- Uso de estructuras iterativas  
- Buenas prácticas de programación  

Buenas prácticas esperadas:

- Modularización del código  
- Nombres descriptivos para funciones y variables  
- No utilizar variables globales  
- Uso de constantes para valores literales  
- Correcta indentación  
- Pre y post condiciones en funciones  
- Inicialización correcta de variables  
- Evitar comentarios innecesarios  

---

## 3. Enunciado

Se solicita implementar un programa que realice una **prueba de iniciación para ingresar a los Magios**.

El programa deberá realizar **4 preguntas al usuario**. Con las respuestas obtenidas se calculará un puntaje final que determinará si el aspirante puede ingresar, o no, a la logia.

:::warning[IMPORTANTE]

- Si el usuario ingresa una respuesta inválida (formato incorrecto, valor fuera de rango o la respuesta no esta dentro de las opciones), se deberá **volver a realizar la misma pregunta**.
- No se debe avanzar a la siguiente pregunta hasta que la respuesta actual sea válida.
- Queda fuera del alcance de este trabajo práctico el manejo de errores por discrepancia en los tipos de datos. Si el enunciado especifica el ingreso de una variable entera (int) se debe asumir que se respetará el tipo de dato ingresado. 
:::
---

## 3.1 Preguntas

### Pregunta 1  
**¿Quién fundó realmente Springfield?**

Opciones posibles:

```
[J] Jebediah Springfield
[A] Los aliens
[S] Los Magios
[B] Sr. Burns
```

Validaciones:

- Solo se aceptan los caracteres `J`, `A`, `B` o `S`, siendo `J` la respuesta correcta definitiva.
- La letra debe ingresarse en **mayúscula**

:::info[Reglas especiales]
- El aspirante tiene **máximo 3 intentos** para responder correctamente.
- Cada intento incorrecto resta puntos.
- Solo cuenta como intento incorrecto una respuesta válida. Es decir, si se responde una letra que no está en las opciones no se cuenta como intento incorrecto.
- Si el aspirante falla los **3 intentos**, el programa finaliza inmediatamente mostrando:

```
-RECHAZADO-
```
:::

---

### Pregunta 2  
**¿Promete mantener en secreto la existencia de los Magios?**

Opciones válidas:

```
[S] Sí
[N] No
```

Validaciones:

- Solo se aceptan `S` o `N` en mayúscula.
- La respuesta debe almacenarse en una variable booleana.

---

### Pregunta 3  
**¿Cuál es su fecha de nacimiento? (formato: yyyy/mm)**

La respuesta debe ingresarse como números enteros de la siguiente manera:

- Los primeros **4 números** representan el año
- Luego la barra `/`
- Los últimos **números** representan el mes (puede ser 1 o 2 digitos)

Ejemplo válido:

```
1998/4
```

Validaciones requeridas:

- Ambos numeros deben ser positivos  
- El año debe tener exactamente 4 dígitos  
- El mes debe estar entre **1 y 12**  
- El formato debe ser estrictamente **yyyy/mm**
- La fecha no puede ser posterior a la actual
- La fecha no puede ser anterior a 1926/03

#### Cálculo de edad

Una vez ingresada la fecha válida, el programa deberá calcular automáticamente la edad del usuario utilizando como referencia la fecha actual:

```
2026/03
```

Si la edad calculada es **menor a 18 años**, el programa finaliza inmediatamente mostrando:

```
-RECHAZADO-
```

---

### Pregunta 4  
**¿Cuántas donas estaría dispuesto a sacrificar para el Número Uno?**

La respuesta debe ser un número entero.

Validaciones:

- El valor debe ser un número entero
- Debe estar en el rango:

```
0 – 12
```

Si el número ingresado está fuera del rango, se debe volver a solicitar la respuesta.

---

## 3.2 Cálculo del Puntaje

Cada respuesta aporta o resta puntos al aspirante.

---

### Pregunta 1 — Fundador de Springfield

| Situación | Puntos |
|:---:|:---:|
Respuesta correcta: [J] | +100 |
Cada intento incorrecto | −20 |

---

### Pregunta 2 — Secreto de los Magios

| Respuesta | Puntos |
|:---:|:---:|
S | +50 |
N | −300 |

Revelar el secreto de los Magios implica prácticamente la eliminación del aspirante.

---

### Pregunta 3 — Edad

El puntaje obtenido será:

```
puntos_edad = edad × 2
```

Ejemplo:

edad = 25 → +50 puntos

---

### Pregunta 4 — Donas sacrificadas para el Número Uno

| Donas | Puntos |
|:---:|:---:|
0 | −100 |
1–3 | +10 |
4–6 | +40 |
7–9 | +70 |
10–12 | +120 |

---

## 3.3 Cálculo final

El puntaje final se calcula mediante la siguiente ecuación:

```
puntaje_final =
puntos_pregunta1 +
puntos_pregunta2 +
puntos_pregunta3 +
puntos_pregunta4
```

---

## 4. Resultados posibles

El resultado final dependerá del puntaje obtenido.

| Puntaje | Resultado |
|:---:|:---:|
< 0 | -RECHAZADO- |
0 – 150 | -ASPIRANTE- |
151 – 250 | -MAGIO NOVATO- |
251 – 349 | -MAGIO- |
 350 o mas | -LIDER SUPREMO- |

---

## 5. Resultado Esperado

El trabajo práctico debe ser realizado en un archivo llamado:

```
magios.c
```

Se espera que el programa compile sin errores utilizando la siguiente línea:

```
gcc magios.c -Wall -Werror -Wconversion -std=c99 -o magios
```

Luego, el programa deberá ejecutarse realizando las preguntas correspondientes al aspirante y, finalmente, mostrar por pantalla un mensaje que indique el **estado final dentro de la logia de los Magios**.

El resultado debe mostrarse en texto **entre guiones**, como se muestra en la [tabla](#4-resultados-posibles).

Por ejemplo, una salida válida podría ser:

```
Con las respuestas brindadas, tu estado es: -MAGIO-
```

:::info[ACLARACIÓN]
Si bien el texto completo del mensaje puede quedar a elección del alumno, se debe:

- Mostrar el resultado final entre guiones.
- Realizar las preguntas en **el orden indicado en el enunciado**.
:::

---

## 6. Entrega

El trabajo práctico deberá ser entregado en la plataforma de corrección de trabajos prácticos **AlgoTrón** (patente pendiente).

Para la entrega, se deberá subir un archivo `.zip` conteniendo únicamente el archivo de código (magios.c), sin carpetas internas ni otros archivos. De lo contrario, la entrega no será validada por la plataforma.

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

:::danger[IMPORTANTE]
La etiqueta **¡Éxito!** es un requisito **necesario pero no suficiente** para la aprobación del trabajo práctico.  
El trabajo deberá cumplir tanto con las **pruebas automatizadas** como con los **criterios de calidad evaluados por la cátedra**.
:::
---

## 7. Ejemplos de ejecución

### Ejemplo 1

**Pregunta 1:** ¿Quién fundó realmente Springfield?

- Respuesta: A  
    - Intento incorrecto → −20 puntos

- Respuesta: S  
    - Intento incorrecto → −20 puntos

- Respuesta: J  
    - Respuesta correcta

**Pregunta 2:** ¿Promete mantener en secreto la existencia de los Magios?

- Respuesta: S

**Pregunta 3:** Fecha de nacimiento:

- Respuesta: 2000/03  
- Edad calculada: 26 años

**Pregunta 4:** Donas sacrificadas:

- Respuesta: 6

**Cálculo:**

```
P1 = 100 − 40 = 60
P2 = 50
P3 = 26 × 2 = 52
P4 = 40
```

**Puntaje final:**

```
60 + 50 + 52 + 40 = 202
```

**Resultado:**

```
-MAGIO NOVATO-
```
---

### Ejemplo 2

**Pregunta 1:** ¿Quién fundó realmente Springfield? 
- Respuesta: J  

**Pregunta 2:** ¿Promete mantener en secreto la existencia de los Magios?  
- Respuesta: N

**Pregunta 3:** Fecha de nacimiento:  
- Respuesta: 1996/01
- Edad calculada: 30

**Pregunta 4:** Donas sacrificadas:
- Donas: 5

**Cálculo:**

```
P1 = 100
P2 = −500
P3 = 60
P4 = 40
```

**Puntaje final:**

```
100 − 300 + 60 + 40 = −300
```

**Resultado:**

```
-RECHAZADO-
```
---

### Ejemplo 3

**Pregunta 1:** ¿Quién fundó realmente Springfield?
- Respuesta: J  

**Pregunta 2:** ¿Promete mantener en secreto la existencia de los Magios?  
- Respuesta: S

**Pregunta 3:** Fecha de nacimiento:  
- Fecha: 1990/07
- Edad calculada: 35

**Pregunta 4:** Donas sacrificadas: 
- Donas: 11

**Cálculo:**

```
P1 = 100
P2 = 50
P3 = 70
P4 = 120
```

**Puntaje final:**

```
340
```

**Resultado:**

```
-MAGIO-
```

---
### Ejemplo 4

**Pregunta 1:** ¿Quién fundó realmente Springfield?  

- Respuesta: A  
    - Intento incorrecto → −20 puntos, intentos: 1

- Respuesta: S  
    - Intento incorrecto → −20 puntos, intentos: 2

- Respuesta: B  
    - Respuesta incorrecta → intentos: 3

**Resultado:**

```
-RECHAZADO-
```