---
title: "Entrada y Salida"
---

# Entrada y Salida

La comunicación con el usuario es fundamental en cualquier programa que desarrollemos. En C, las funciones `printf` y `scanf` son las herramientas básicas para mostrar información en pantalla y obtener datos del usuario.

## `printf`: Mostrando información

La función `printf` (de "print formatted") permite imprimir texto y variables en la consola con un formato específico. Es el equivalente a `print()` en Python, con la diferencia de que requiere especificar el formato de cada dato a mostrar.

### Sintaxis básica

```c
printf("formato", argumentos);
```

### Especificadores de formato comunes

Los especificadores le dicen a `printf` cómo interpretar y mostrar cada variable:

- `%d` o `%i` - Enteros (int)
- `%f` - Números de punto flotante (float, double)
- `%c` - Caracteres (char)

:::note
Los siguientes especificadores los vemos más adelante:

- `%s` - Cadenas de texto (strings)
- `%p` - Punteros (direcciones de memoria)
  :::

### Modificadores útiles

Se puede controlar el formato con más precisión:

```c
printf("%5d", 42);        // Ancho mínimo de 5 caracteres: "   42"
printf("%.2f", 3.14159);  // 2 decimales: "3.14"
printf("%8.2f", 3.14);    // 8 caracteres totales, 2 decimales: "    3.14"
```

### Ejemplos de printf

```c
#include <stdio.h>

int main() {
    int edad = 25;
    float altura = 1.75;
    char inicial = 'F';

    printf("Hola, mundo!\n");
    printf("Tengo %d años\n", edad);
    printf("Mi altura es %.2f metros\n", altura);
    printf("Mi inicial es: %c\n", inicial);
    printf("Todo junto: %d años, %.2f m, inicial %c\n", edad, altura, inicial);

    return 0;
}
```

## `scanf`: Capturando entrada del usuario

La función `scanf` (de "scan formatted") lee datos del teclado siguiendo un formato específico. Es el equivalente a `input()` en Python, con la diferencia de que es necesario especificar el tipo de dato que se espera recibir.

### Sintaxis básica

```c
scanf("formato", &variable);
```

**Importante:** el símbolo `&` antes de la variable es necesario para que `scanf` pueda modificar la variable que le pasamos. Vamos a entender cómo funciona en profundidad más adelante.

### Ejemplos de `scanf`

```c
#include <stdio.h>

int main() {
    int edad;
    float peso;
    char inicial;

    printf("Ingresá tu edad: ");
    scanf("%d", &edad);

    printf("Ingresá tu peso (kg): ");
    scanf("%f", &peso);

    printf("Ingresá tu inicial: ");
    scanf(" %c", &inicial);  // prestar atención al espacio antes de %c, es necesario para que funcione

    printf("\nResumen:\n");
    printf("Edad: %d años\n", edad);
    printf("Peso: %.1f kg\n", peso);
    printf("Inicial: %c\n", inicial);

    return 0;
}
```

### Cuidados con `scanf`

1. **El ampersand (`&`):** no olvidar el `&` antes de variables simples (int, float, char). Los vectores son la excepción. Sin él, no es posible guardar el valor ingresado por el usuario.

2. **Espacios en blanco:** para leer caracteres, se usa un espacio antes de `%c` (sin él, se almacena el caracter junto con basura del buffer y el valor guardado no es el esperado):
   ```c
   scanf(" %c", &caracter);
   ```
3. **`scanf` siempre acompañado de `printf`:** todo `scanf` debe estar precedido por un mensaje que indique qué se solicita y cómo ingresarlo.

## Secuencias de escape

Caracteres especiales que se pueden usar en `printf`:

- `\n` - Nueva línea
- `\t` - Tabulación
- `\\` - Barra invertida literal
- `\"` - Comillas dobles
- `%%` - Símbolo de porcentaje literal

```c
printf("Primera línea\nSegunda línea\n");
printf("Columna1\tColumna2\tColumna3\n");
printf("El 50%% de descuento!\n");
```

## C vs Python: Comparación práctica

Veamos cómo se comparan estas operaciones en ambos lenguajes.

### Ejemplo 1: Saludar al usuario

#### C

```c
#include <stdio.h>

int main() {
    char nombre[50];

    printf("¿Cómo te llamas? ");
    scanf("%s", nombre);
    printf("¡Hola, %s!\n", nombre);

    return 0;
}
```

#### Python

```python
nombre = input("¿Cómo te llamas? ")
print(f"¡Hola, {nombre}!")
```

### Ejemplo 2: Calculadora simple

#### C

```c
#include <stdio.h>

int main() {
    float num1, num2, resultado;

    printf("Ingresá el primer número: ");
    scanf("%f", &num1);

    printf("Ingresá el segundo número: ");
    scanf("%f", &num2);

    resultado = num1 + num2;
    printf("%.2f + %.2f = %.2f\n", num1, num2, resultado);

    return 0;
}
```

#### Python

```python
num1 = float(input("Ingresá el primer número: "))
num2 = float(input("Ingresá el segundo número: "))

resultado = num1 + num2
print(f"{num1:.2f} + {num2:.2f} = {resultado:.2f}")
```

### Ejemplo 3: Calculadora de promedios

#### C

```c
#include <stdio.h>

int main() {
    float nota1, nota2, nota3, promedio;

    printf("=== Calculadora de Promedio ===\n");
    printf("Ingresá la nota 1: ");
    scanf("%f", &nota1);

    printf("Ingresá la nota 2: ");
    scanf("%f", &nota2);

    printf("Ingresá la nota 3: ");
    scanf("%f", &nota3);

    promedio = (nota1 + nota2 + nota3) / 3.0;

    printf("\nResultados:\n");
    printf("Nota 1: %.2f\n", nota1);
    printf("Nota 2: %.2f\n", nota2);
    printf("Nota 3: %.2f\n", nota3);
    printf("Promedio: %.2f\n", promedio);

    if (promedio >= 4.0) {
        printf("Estado: APROBADO ✓\n");
    } else {
        printf("Estado: REPROBADO ✗\n");
    }

    return 0;
}
```

#### Python

```python
print("=== Calculadora de Promedio ===")
nota1 = float(input("Ingresá la nota 1: "))
nota2 = float(input("Ingresá la nota 2: "))
nota3 = float(input("Ingresá la nota 3: "))

promedio = (nota1 + nota2 + nota3) / 3

print("\nResultados:")
print(f"Nota 1: {nota1:.2f}")
print(f"Nota 2: {nota2:.2f}")
print(f"Nota 3: {nota3:.2f}")
print(f"Promedio: {promedio:.2f}")

if promedio >= 4.0:
    print("Estado: APROBADO ✓")
else:
    print("Estado: REPROBADO ✗")
```

## Consejos prácticos

1. **Siempre incluir `<stdio.h>`** al usar `printf` y `scanf`.

2. **No olvidar el `&` con `scanf` para variables simples:** sin él, las variables no cambian su valor y se obtienen resultados inesperados.

3. **Recordar el espacio antes de `%c`:** es un detalle fácil de pasar por alto que genera resultados incorrectos difíciles de diagnosticar.
