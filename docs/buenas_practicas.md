---
sidebar_position: 5
title: "Buenas Prácticas de Programación"
label: Introducción
---

# Buenas prácticas de programación

<div style={{ display: "flex", justifyContent: "center", margin: "24px 0 0 0" }}>
  <a
    href="/buenas_practicas.pdf"
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
  >Pdf Buenas Prácticas</a>
</div>

## El Software
Etimológicamente, la palabra proviene del inglés: soft (blando) y ware (utensilio). Fue acuñada por analogía al hardware para describir la parte "maleable" de la informática. Según la RAE, es el conjunto de programas e instrucciones que permiten ejecutar tareas en una computadora.

Sin embargo, para entender por qué necesitamos buenas prácticas, debemos mirar más allá. En su famoso artículo "No hay balas de plata", Fred Brooks utiliza conceptos aristotélicos para definir la esencia del software a través de cuatro propiedades únicas:

**Complejidad:** A diferencia de los autos o edificios, el software no tiene partes repetidas; cada función o subrutina es única, lo que lo convierte en una de las construcciones humanas más complejas.

**Conformidad:** No siempre sigue leyes lógicas o físicas (como la gravedad), sino que debe "conformarse" a caprichos de interfaces, leyes o sistemas externos.

**Variabilidad:** El software está bajo presión constante para cambiar. A diferencia de un puente, que se termina y listo, el software se modifica incluso mientras está en funcionamiento.

**Invisibilidad:** No tiene una forma geométrica o espacial. No podemos "ver" el software; lo que graficamos son flujos de datos o de control que suelen ser imposibles de representar en un solo plano.

¿Por qué estudiamos buenas prácticas?
De estas cuatro, la complejidad y la variabilidad son las que podemos atacar. Los principios que verás a continuación no son reglas arbitrarias, sino herramientas probadas para reducir el caos y hacer que tu código sea capaz de sobrevivir al tiempo y al cambio.

:::info 
En resumen: el software es complejo e invisible por naturaleza. Las buenas prácticas son tu armadura para que esa complejidad no te gane
:::

## 1. Nombres Descriptivos

Existen dos cosas difíciles en la Informática:
1. Poner buenos nombres
2. La Concurrencia
3. Errarle por uno

Se recomienda usar nombres descriptivos, tanto para nombrar funciones como variables, ya que le aporta legibilidad y claridad al código. Esto ayudará también si se trabaja en grupo, el compañero (y uno mismo) sabrá para qué fue declarada la variable/función.

No es recomendable usar nombres muy largos.

#### Mala práctica

```c
#define MAX 30
const char ELEMENTO = 'H';
```

#### Buena práctica

```c
#define MAX_NOMBRE 30
const char HIDROGENO = 'H';
```

Los nombres son demasiado genéricos. ELEMENTO puede ser cualquier cosa y **MAX** también. Al ser tan genéricos los nombres, se dificulta determinar que representan sin el contexto.

#### Mala práctica

```c
bool funcion1(int numero){
    return (numero %2 == 0);
}
```

#### Buena práctica
```c
bool es_par(int numero){
    return (numero %2 == 0);
}
```

#### Mala práctica
```c
bool funcion_que_calcula_si_un_numero_es_par(int numero){
    return (numero %2 == 0);
}
```

Es visiblemente evidente que la longitud del nombre de la función es bien auto-descriptivo, pero seguramente se volverá una tortura tener que escribir ese nombre mas de una vez.   
Entonces, ¿cuán largo debe ser el nombre de una función? El nombre de una función debe seguir los mismos lineamientos que los nombres de las variables pero además el mismo debe indicar una acción atómica. Con atómica se refiere que lo que la función diga hacer debe ser solamente un concepto.

#### Mala práctica
```c
int x;
int xx;
char v[MAX];
```

#### Buena práctica
```c
int i;
int contador_personas;
char nombre_alumno[MAX_NOMBRE];
```

En este ejemplo es evidente que los nombres de las variables del primer código no aportan información sobre lo que la variable almacena.

### 1.1. Reglas para Poner Nombres


| Regla | ❌ Evitar (Mala práctica) | ✅ Preferir (Buena práctica) |
| :--- | :--- | :--- |
| **1. Reveladores** | `int d; // días` | `int dias_transcurridos;` |
| **2. Sin desinformación** | `bool verdadero;` | `bool es_valido;` |
| **3. Distinguibles** | `char a1[], a2[];` | `char destino[], origen[];` |
| **4. Buscables** | `int i;` (en funciones largas) | `int indice_usuario;` |
| **5. Sin "canchereos"** | `hacer_magia();` | `calcular_area();` |
| **6. Palabra única** | Mezclar `lograr` y `conseguir` | Usar siempre `obtener` |
| **7. Pronunciables** | `char dta_rcd_32;` | `char registro_datos;` |
| **8. Evitar genéricos** | `int temp;` | `int temperatura_agua;` |


:::tip
**La prueba de la "Voz Alta"**  
Si no podés pronunciar el nombre de una variable en una conversación técnica sin que suene a código indescifrable (ejemplo: `cnt_usr_act_v2`), el nombre no es adecuado. Un buen nombre debe poder leerse como parte de una oración natural.
:::

### Detalles de las reglas:


1.  **Nombres Reveladores**: El nombre debe responder por qué existe la variable y qué hace. Si se usa `int d;`, obliga al lector a buscar el comentario (`// días`). Si en cambio se usa  `dias_transcurridos`, la intención queda clara de inmediato.
2.  **Evitar la Desinformación**: El nombre no debe inducir a error ni generar contradicciones. Si se llama a una variable booleana `verdadero`, escribir `if (verdadero == false)` es confuso. Es preferible usar `es_valido` o `es_par`.
3.  **Nombres Distinguibles**: Evitar diferenciar variables por números o letras arbitrarias que no expliquen su rol. En una función de copiado, `a1` y `a2` son ambiguas; `destino` y `origen` indican exactamente el flujo de los datos.
4.  **Nombres Fáciles de Buscar**: Si se usa `int i;` (exceptuando los iteradores de las estructuras iterativas) en un archivo extenso, buscarla con un editor será imposible porque resaltará cada letra "i" del documento. Un nombre específico como `indice_usuario` es único y fácil de localizar.
5.  **No Te Hagas el Canchero**: La claridad siempre es prioritaria sobre el humor. `hacer_magia()` puede parecer ingenioso, pero no describe la operación. `calcular_area()` es comprensible para cualquier programador.
6.  **Una Sola Palabra por Concepto**: Mantener la consistencia terminológica en todo el proyecto. Si se elige el verbo `obtener` para traer un dato, no se debe alternar con `lograr`, `conseguir`, `alcanzar`, `conquistar`, `ganar`, etc. para la misma acción en otras funciones. 
7.  **Nombres Pronunciables**: Evitar las abreviaturas extremas o crípticas. `dta_rcd_32` es difícil de comunicar verbalmente. `registro_datos` es simple de decir y de entender al escucharlo.
8.  **Evitar los Nombres Genéricos**: Nombres como `temp` o `aux` suelen ser resultado de la pereza. Siempre es mejor describir el contexto específico: `temperatura_agua` aporta mucho más valor que un simple `temp`.

## 2. Declaración de variables

Se pueden declarar distintas variables de un mismo tipo en una línea. Es recomendable **solo** cuando las variables tienen el mismo uso (por ejemplo, índice de iteración) y no entorpezca la lectura del código.

#### Mala práctica
```c
int i, contador_personas, suma, resta, numero1, numero2, j, k;
char opcion, nombres_alumnos[MAX_NOMBRE], tablero[MAX_FILAS][MAX_COLUMNAS], sexo_femenino, sexo_masculino;
```

#### Buena práctica
```c
const char SEXO_FEMENINO = 'F';
const char SEXO_MASCULINO = 'M';

int i, j, k;
int suma, resta;
int numero1, numero2;

char opcion;
char nombres_alumnos[MAX_NOMBRE];
char tablero[MAX_FILAS][MAX_COLUMNAS];
```

En el ejemplo de la mala práctica se puede observar que por más que las variables corresponden al mismo tipo de dato, no implica que su uso será el mismo. Incluso se están trabajando con variables que involucran más de una dimensión.

En la buena práctica se observa que las variables están agrupadas por finalidad de las mismas (por ejemplo en la primera línea son variables que se usarán como índices) y a la vez por dimensiones (matrices y vectores).

## 3. Uso de constantes

Si se usarán constantes o literales, declararlos antes del main y las funciones. Esto servirá para que si en el futuro dicha constante tiene que ser modificada, sólo se hará en la declaración y se ahorrará trabajo al estar buscándola en todo el código. Como convención, deben estar escritos en mayúscula.


#### Mala práctica
```c
printf("El perimetro ...", 3,14 * radio * 2);
```

#### Buena práctica
```c
const float PI = 3.14;
printf("El perimetro ...", PI * radio * 2);
```

En este ejemplo se puede ver que si en el caso de la mala práctica que se quisiera agregar más dígitos en el valor de pi, se deberá buscar en todo el programa dicho valor y agregarlo. Caso contrario, en la buena práctica bastará con cambiar el valor de la constante en PI.

#### Mala práctica
```c
printf("El IVA aplicado ...", 21 * precio / 100);
```

#### Buena práctica
```c
const int IVA = 21;
printf("El IVA aplicado ...", IVA * precio / 100);
```
Este ejemplo es muy similar al anterior pero en este caso con el valor del IVA.


#### Mala práctica
```c
int calificaciones[50];

for (int i = 0; i < 50; i++) {
    ...
}
```

#### Buena práctica
```c
#define MAX_ALUMNOS 50

int calificaciones[MAX_ALUMNOS];

for (int i = 0; i < MAX_ALUMNOS; i++) {
    ...
}
```
Es vital usar constantes para definir el tamaño de los arreglos. Si el programa debe soportar más datos en un futuro, solo hay que cambiar el valor en la declaración inicial y se actualiza en todo el código.



#### Mala práctica
```c
char respuesta;
// ... (pedir ingreso)

if (respuesta == 's') {
    printf("Operación confirmada.");
}
```

#### Buena práctica
```c
const char SI = 's';

char respuesta;
// ... (pedir ingreso)

if (respuesta == SI) {
    printf("Operación confirmada.");
}
```
Usar constantes para caracteres hace que las condiciones sean mucho más descriptivas y fáciles de leer, evitando que queden "caracteres mágicos" sueltos.

## 4. Inicialización de variables

Principalmente si se usarán como contadores o para posiciones en vectores, esto evitará que se esté trabajando con "basura" durante la ejecución del programa y/o intentar acceder a una porción no asignada de memoria, siempre y cuando el usuario no tenga que inicializarla durante la ejecución del programa con los valores que necesite.
:::warning
La memoria tiene memoria: En C, las variables locales no se limpian automáticamente al crearse. Si no inicializás una variable (ej: int suma = 0;), esta contendrá "basura" (valores aleatorios que quedaron de programas anteriores). Esto hará que tu programa funcione a veces sí y a veces no, dependiendo de la suerte.
:::

#### Mala práctica
```c
int suma;
for (int i = 0; i < TOPE_SUMA; i++){
    suma = suma + i;
}
```

#### Buena práctica
```c
int suma = 0;
for (int i = 0; i < TOPE_SUMA; i++){
    suma = suma + i;
}
```

Al no asignarle un valor a suma y luego sumar sobre dicha variable, no garantiza que se obtenga el resultado deseado, ya que el compilador de C no sabe de antemano que valor desea el usuario. En este ejemplo, se desea sumar desde cero, y es por eso que le asignamos ese valor al declararla.

## 5. Emplear una sola convención

La convención elegida debe ser usada en todo el código y por todos los integrantes del grupo, si fuera el caso. Para la escritura de la declaración de variables y funciones, algunas de las convenciones más utilizadas son snake_case y camelCase. En el caso de apertura y cierre de llaves también se debe emplear una sola convención en todo el programa. 
:::warning
En este curso utilizaremos snake_case
:::

#### Mala práctica
Para la declaración de variables y funciones:

```c
int cantidad_alumnos, sumadorNotas;
int mes1,segundo_mes;
```

Para la apertura y cierre de llaves:

```c
if (numero1 < numero2)
{
    resultado = numero2 + numero1;
} else { 
    resultado = numero1 - numero2;
}
```

#### Buena práctica
Para la declaración de variables y funciones:

```c
int cantidad_alumnos; // (snake_case)

int mes1, mes2;
```
ó
```c
int cantidadAlumnos; // (camelCase)
```

Para la apertura y cierre de llaves:

```c
int sumar(int numero1 , int numero2){
    return numero1 + numero2;
}
```

ó

```c
int sumar(int numero1 , int numero2)
{
    return numero1 + numero2;
}
```

La diferencia que se nota en los ejemplos es que no se ve una uniformidad en las convenciones usadas. No sólo indica que no se respetaron las convenciones sino que también le quita claridad al código.

## 6. Variables globales

El uso de variables globales no es recomendable, ya que al ser parte del entorno global del programa dicha variable se puede modificar en cualquier parte del mismo, a su vez que todo el programa dependería de ella y también dificultaría la lectura del código. 
:::warning
Regla de la Cátedra: El uso de variables globales está estrictamente prohibido. Todo dato que una función necesite debe ingresar por parámetros, y todo resultado debe salir mediante el valor de retorno o parámetros por referencia.
:::

#### Mala práctica

```c
#include <stdio.h>

int resultado;

int sumar(int num1, int num2){
    resultado = num1 + num2;
    return resultado;
}

int main(){
    int numero1 = 2;
    int numero2 = 8;
    resultado = sumar(numero1, numero2);
    printf ("%d\n"  , resultado);
    return 0;
}
```

#### Buena práctica
```c
#include <stdio.h>

int sumar(int num1,int num2){
    return num1+num2 ;
}

int main(){
    int resultado;
    int numero1 = 2;
    int numero2 = 8;
    resultado = sumar(numero1, numero2);
    printf("%d\n"  , resultado);
    return 0;
}
```

## 7. Indentación

Para darle más claridad al código, cuando comienza una estructura de control, dentro de la misma se deja un espacio tabulado. Esto aplica aún cuando la sentencia para la estructura es una sola.

#### Mala práctica

```c
int suma = 0; 

while(suma < MAXPERSONAS){
for(int i = 0; i < MAX_PERSONAS ; i++){ 
suma=suma +i;
printf(" %d",i); 
}
}
```
#### Buena práctica

```c
int suma = 0; 

while(suma < MAXPERSONAS){
    for(int i = 0; i < MAX_PERSONAS ; i++){ 
        suma=suma +i;
        printf(" %d",i); 
    }
}
```


En el ejemplo de mala práctica se puede ver que es díficil saber dónde comienzan las instrucciones para la estructura de control, así como también la totalidad del código. En cambio en el ejemplo de la buena práctica se puede apreciar que es más claro saber qué instrucciones pertenecen a las estructuras de control y cuales no, sin importar si son varias instrucciones o una sola.

## 8. Una instrucción por línea

Si se escribe la totalidad del programa en una sola línea, el compilador no tendrá problemas en compilarlo y ejecutarlo (si no hubiesen errores de compilación y ejecución), se escribe de esta manera para hacer el seguimiento del código de una manera más sencilla.
#### Mala práctica
```c
for(int i = 0; i < MAX_PERSONAS; i++){ suma = suma + i; j = i + 1; }
```

#### Buena práctica

```c
for(int i = 0; i < MAX_PERSONAS; i++){
    suma = suma + i;
    j = i + 1;
}
```

Al igual que la identación, el indicar una instrucción por línea hace que el seguimiento del código sea mucho más llevadero. En la mala práctica, por más que el programa funcione correctamente, es dificultoso hacer un seguimiento del mismo. En cambio en la buena práctica, es más visible ver al menos cuántas instrucciones hay.

## 9. Usar paréntesis para cada operación lógica

No sólo será más legible para el programador, sino que también para el compilador.

#### Mala práctica
```c
if(numero < MAX_PERSONAS && opcion == OPCION_SI){
}
```

#### Buena práctica
```c
if((numero < MAX_PERSONAS) && (opcion == OPCION_SI)){
}
```

## 10. Evitar comentarios redundantes en el código

```c
int i = 1; /* asigno 1 a la variable 'i' */
```
Un buen código debe ser **autodocumentado**, es decir, su lógica y propósito deben entenderse por sí solos mediante el uso de nombres de variables y funciones descriptivos. Si se agregan comentarios extras para describir cada paso técnico o instrucción elemental, es una señal de que el código no es lo suficientemente claro o que se está subestimando al lector.

## 11. Modularización ("Divide y vencerás")

Modularizar un programa con funciones sencillas no solo da legibilidad al código, sino que también ayuda a evitar la repetición innecesaria del mismo.

**Ejemplo:** Se quiere calcular la producción total de energía en la Planta Nuclear de Springfield. Se sabe que hay cuatro sectores principales (Sector 7-G, Seguridad, Química y Administración). En cada oficina de cada sector trabajan 2 empleados, y cada empleado genera aproximadamente 300 MW de energía por día. La cantidad de oficinas por sector será ingresada por el usuario.

#### Mala práctica
```c
#include <stdio.h>

int main() {
    int sector_7g, seguridad, quimica, administracion;
    int total_energia;

    printf("Ingrese cantidad de oficinas para Sector 7-G: ");
    scanf("%d", &sector_7g);

    printf("Ingrese cantidad de oficinas para Seguridad: ");
    scanf("%d", &seguridad);

    printf("Ingrese cantidad de oficinas para Química: ");
    scanf("%d", &quimica);

    printf("Ingrese cantidad de oficinas para Administración: ");
    scanf("%d", &administracion);

    total_energia = (sector_7g + seguridad + quimica + administracion) * 2 * 300;

    printf("El total de energía generada (MW/día) en la Planta es: %d\n", total_energia);

    return 0;
}
```

#### Buena práctica
```c
#include <stdio.h>

const char SECTORES[4][20] = {"Sector 7-G", "Seguridad", "Química", "Administración"};
const int INDICE_S7G = 0;
const int INDICE_SEGURIDAD = 1;
const int INDICE_QUIMICA = 2;
const int INDICE_ADMINISTRACION = 3;

const int EMPLEADOS_POR_OFICINA = 2;
const int ENERGIA_POR_EMPLEADO = 300;

void pedir_cantidad_oficinas(int *oficinas, char *nombre_sector) {
    printf("Ingrese cantidad de oficinas para %s: ", nombre_sector);
    scanf("%d", oficinas);
}

int sumar_oficinas(int s7g, int seguridad, int quimica, int administracion) {
    return (s7g + seguridad + quimica + administracion);
}

int calcular_total_energia(int total_oficinas) {
    return (EMPLEADOS_POR_OFICINA * ENERGIA_POR_EMPLEADO * total_oficinas);
}

int main() {
    int s7g, seguridad, quimica, administracion;
    int total_oficinas, total_energia;

    pedir_cantidad_oficinas(&s7g, SECTORES[INDICE_S7G]);
    pedir_cantidad_oficinas(&seguridad, SECTORES[INDICE_SEGURIDAD]);
    pedir_cantidad_oficinas(&quimica, SECTORES[INDICE_QUIMICA]);
    pedir_cantidad_oficinas(&administracion, SECTORES[INDICE_ADMINISTRACION]);

    total_oficinas = sumar_oficinas(s7g, seguridad, quimica, administracion);
    total_energia = calcular_total_energia(total_oficinas);

    printf("El total de energía generada (MW/día) en la Planta es: %d\n", total_energia);

    return 0;
}
```

En el primer ejemplo se observa mucha repetición de código y no hay uso de constantes. En el segundo ejemplo, el problema se dividió en funciones sencillas y generales. Por ejemplo, `pedir_cantidad_oficinas` se reutiliza cuatro veces cambiando solo el argumento, lo que hace al código más fácil de mantener y escalar si la Planta Nuclear decidiera abrir un nuevo sector.


## 12. Usar pre y post condiciones

Principalmente al trabajar en grupo, ayuda mucho saber qué hace una función sin necesidad de hacer un seguimiento de la misma. Esta práctica se aplica incluso cuando la función es muy sencilla.

#### Mala práctica
```c
int division_entera(int numerador, int denominador){
    return numerador / denominador;
}
```

#### Buena práctica
```c
/* * Pre: El parámetro 'denominador' debe ser un número distinto de 0.
 * Post: Retorna el resultado truncado de la división entre 'numerador' y 'denominador'.
 */
int division_entera(int numerador, int denominador){
    return numerador / denominador;
}
```
En este caso, si otro programador usa la función pasando un 0 en el denominador, el programa fallará. No hay una advertencia clara sobre este riesgo mortal. Lo mismo sucede con el aviso de que la función trunca el resultado, si no lo dijera la post el otro programador se llevaría una sorpresa.  

- **Contrato de uso (Pre):** Indica qué condiciones deben cumplirse **antes** de llamar a la función para que no rompa el programa (ej: no pasar un puntero NULL o un número negativo).
- **Garantía de resultado (Post):** Indica qué hizo la función exactamente **después** de ejecutarse, permitiendo al resto del equipo confiar en el resultado sin auditar el código interno.
## 13. Una función que tenga interacción con el usuario, no debería devolver un tipo de dato que no sea void.
Una función que tiene interacción directa con el usuario (usa `printf` o `scanf`) no debería devolver un tipo de dato que no sea `void`. Por el contrario, si una función realiza un cálculo o proceso lógico, debe recibir los parámetros necesarios por valor o referencia, devolver el resultado y permitir que otra parte del programa decida cómo mostrarlo.
:::tip
Principio de Responsabilidad Única: Una función debe "saber hacer" o "saber hablar", pero no ambas cosas. Si mezclás un scanf con un cálculo matemático, esa función muere dentro de ese programa y no podrás llevártela a otro proyecto.
:::


#### Mala práctica

```c
// Esta función mezcla la obtención de datos, el cálculo y el retorno.
int calcular_area_rectangulo() {
    int base, altura;

    printf("Ingrese la base: ");
    scanf("%d", &base);
    printf("Ingrese la altura: ");
    scanf("%d", &altura);

    return base * altura;
}
```
*Problema: Si en el futuro necesitás calcular el área usando valores que ya tenés en el programa (sin pedirlos por teclado), esta función no te sirve porque obliga a la interacción con el usuario.*

#### Buena práctica

```c
int calculo_area(int base, int altura) {
    return base * altura;
}


void ejecutar_calculo_usuario() {
    int b, h, resultado;

    printf("Ingrese la base: ");
    scanf("%d", &b);
    printf("Ingrese la altura: ");
    scanf("%d", &h);

    resultado = calculo_area(b, h);
    printf("El área calculada es: %d\n", resultado);
}
```

Ahora se puede llamar a `calcular_area` desde cualquier parte del código, incluso pasando valores fijos o calculados previamente, sin que aparezcan carteles en la consola.
Es mucho más simple verificar si la lógica matemática es correcta si no se depende de que alguien tipee valores manualmente cada vez que haya que probar la función.

## 14. No declarar variables de más


No solo que puede llegar a confundir en la lectura del código, sino que también estaría ocupando memoria innecesaria.
#### Mala práctica
```c
void calcular_factura() {
    int id_producto; // Variable nunca usada
    int precio = 500;
    int unidades = 2;
    int subtotal; // Variable intermedia innecesaria para un cálculo simple
    float tasa_descuento; // Variable nunca usada

    subtotal = precio * unidades;
    printf("Total factura: %d\n", subtotal);
}
```

#### Buena práctica
```c
void calcular_factura() {
    int precio = 500;
    int unidades = 2;

    // Realizamos el cálculo directamente en el printf para mayor claridad
    printf("Total factura: %d\n", precio * unidades);
}
```

Menos variables significan menos nombres que recordar y menos riesgo de equivocarse al asignar un valor a la variable incorrecta.
Los compiladores modernos suelen dar *warnings* (avisos) cuando detectan variables sin usar, lo que "ensucia" la salida de la consola al compilar.
Llegado el caso y si el cálculo a realizar es muy largo se puede utilizar una variable auxiliar con un buen nombre para ayudar a entender que se está calculando.

## 15. Cortar estructuras iterativas correctamente

Las estructuras iterativas tienen una condición de corte, la cual debe ser respetada y debe ser la única puerta de salida de dicha estructura.

Usar instrucciones como break o return dentro de estructuras iterativas rompe con el normal flujo del algoritmo, obstruyendo la lectura y comprensión del código.
:::warning
Está PROHIBIDO el uso de instrucciones como break o return dentro de los bucles para forzar una salida anticipada (salida anómala). Estas prácticas rompen el flujo natural del algoritmo y dificultan la lectura del código.
:::

```c
while(true) {
    ...
    ...
    if(condicion) {
        break;
    }
}
```

En realidad esto es una estructura iterativa do-while:

```c
do {
    ...
    ...
} while(!condicion);
```

#### Mala práctica
```c
bool buscar_figurita_en_caja(int caja[MAX_FIGURITAS], int tamaño, int numero_buscado) {
    for (int i = 0; i < tamaño; i++) {
        if (caja[i] == numero_buscado) {
            return true; // Salida forzada: corta el flujo del for
        }
    }
    return false;
}
```

#### Buena práctica
```c
bool buscar_figurita_en_caja(int caja[MAX_FIGURITAS], int tamaño, int numero_buscado) {
    int i = 0;
    bool encontrada = false;

    while (i < tamaño && !encontrada) {
        if (caja[i] == numero_buscado) {
            encontrada = true;
        } else {
            i++;
        }
    }
    return encontrada; // Una sola puerta de salida para la función
}
```
El `for` promete recorrer todo el rango, pero el `return` sale en cualquier momento. Esto confunde la lectura del algoritmo.
El `while` dice claramente: "Seguí buscando mientras no llegues al final de la caja Y no la hayas encontrado". Es una frase lógica completa.
Si después se tiene que agregar una acción justo antes de que termine la función (como cerrar un archivo o liberar memoria), en la buena práctica solo se escribe una vez antes del `return encontrada`. En la mala práctica, tendría que repetirse antes de cada `return` utilizado.
El flujo del programa siempre entra por arriba y sale por abajo, sin saltos inesperados en el medio.


