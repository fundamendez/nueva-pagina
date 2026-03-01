# Entrada y Salida en C: printf y scanf

La comunicación con el usuario es fundamental en cualquier programa que desarrollemos. En C, las funciones `printf` y `scanf` son las herramientas básicas para mostrar información en pantalla y obtener datos del usuario.

## printf: Mostrando información

La función `printf` (de "print formatted") te permite imprimir texto y variables en la consola con un formato específico. Es como el `print()` de Python, pero con esteroides.

### Sintaxis básica

```c
printf("formato", argumentos);
```

### Especificadores de formato comunes

Los especificadores le dicen a `printf` cómo interpretar y mostrar cada variable:

- `%d` o `%i` - Enteros (int)
- `%f` - Números de punto flotante (float, double)
- `%c` - Caracteres (char)

##### Estos los vemos mas adelante
- `%s` - Cadenas de texto (strings)
- `%p` - Punteros (direcciones de memoria)


### Modificadores útiles

Podes controlar el formato con más precisión:

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

## scanf: Capturando entrada del usuario

La función `scanf` (de "scan formatted") lee datos del teclado siguiendo un formato específico. Es el equivalente a `input()` en Python, pero necesitas especificar el tipo de dato que esperas.

### Sintaxis básica

```c
scanf("formato", &variable);
```

**Importante:** Observa el símbolo `&` antes de la variable. Este simbolo es importante para permitir que la funcion `scanf()` pueda modificar la variable que le pasamos.

### Ejemplos de scanf

```c
#include <stdio.h>

int main() {
    int edad;
    float peso;
    char inicial;
    
    printf("Ingresa tu edad: ");
    scanf("%d", &edad);
    
    printf("Ingresa tu peso (kg): ");
    scanf("%f", &peso);
    
    printf("Ingresa tu inicial: ");
    scanf(" %c", &inicial);  // prestar atencion el espacio antes de %c, es necesario para que funcione!
    
    printf("\nResumen:\n");
    printf("Edad: %d años\n", edad);
    printf("Peso: %.1f kg\n", peso);
    printf("Inicial: %c\n", inicial);
    
    return 0;
}
```

### Cuidados con scanf

1. **El ampersand (&):** No olvides el `&` antes de variables simples (int, float, char). Los vectores son la excepción.

2. **Espacios en blanco:** Para leer caracteres después de números, usa un espacio antes de `%c`:
   ```c
   scanf(" %c", &caracter);  // El espacio consume el '\n' residual
   ```

4. **scanf solo lee hasta el primer espacio**

## Secuencias de escape

Caracteres especiales que puedes usar en `printf`:

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

**C:**
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

**Python:**
```python
nombre = input("¿Cómo te llamas? ")
print(f"¡Hola, {nombre}!")
```

### Ejemplo 2: Calculadora simple

**C:**
```c
#include <stdio.h>

int main() {
    float num1, num2, resultado;
    
    printf("Ingresa el primer número: ");
    scanf("%f", &num1);
    
    printf("Ingresa el segundo número: ");
    scanf("%f", &num2);
    
    resultado = num1 + num2;
    printf("%.2f + %.2f = %.2f\n", num1, num2, resultado);
    
    return 0;
}
```

**Python:**
```python
num1 = float(input("Ingresa el primer número: "))
num2 = float(input("Ingresa el segundo número: "))

resultado = num1 + num2
print(f"{num1:.2f} + {num2:.2f} = {resultado:.2f}")
```

### Ejemplo 3: Calculadora de promedios

**C:**
```c
#include <stdio.h>

int main() {
    float nota1, nota2, nota3, promedio;
    
    printf("=== Calculadora de Promedio ===\n");
    printf("Ingresa la nota 1: ");
    scanf("%f", &nota1);
    
    printf("Ingresa la nota 2: ");
    scanf("%f", &nota2);
    
    printf("Ingresa la nota 3: ");
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

**Python:**
```python
print("=== Calculadora de Promedio ===")
nota1 = float(input("Ingresa la nota 1: "))
nota2 = float(input("Ingresa la nota 2: "))
nota3 = float(input("Ingresa la nota 3: "))

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

### Diferencias clave

| Aspecto | C | Python |
|---------|---|--------|
| **Declaración de tipos** | Obligatoria (`int x;`) | Dinámica (`x = 5`) |
| **Operador de dirección** | Necesario con `scanf` (`&variable`) | No existe |
| **Formato de strings** | Especificadores (`%d`, `%f`) | F-strings o `.format()` |
| **Conversión de tipos** | Manual al leer | Automática o con `int()`, `float()` |
| **Simplicidad** | Más verboso y explícito | Más conciso y legible |
| **Control de formato** | Muy preciso y potente | Flexible pero más moderno |

## Consejos prácticos

1. **Siempre incluir `<stdio.h>`** al usar `printf` y `scanf`.

2. **Acordate del espacio antes del %c:** Solemos pasarlo por alto y obtenemos resultados raros sin entender porque.

 
3. **No olvidar el `&` con `scanf` para variables simples:** Solemos olvidarlo y nuestras variables no cambian su valor por lo que obtenemos resultados inesperados. 

4. **Practicar los especificadores de formato (`%d`, `%f`, ` %c`, etc.)** Le dicen a estas funciones cómo interpretar los datos


Con estas herramientas ya puedes crear programas interactivos desde lo mas basico a cosas avanzadas. ¡A practicar!
