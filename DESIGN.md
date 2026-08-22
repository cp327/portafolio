# Design

Sistema visual del portafolio. La estrategia y el porqué están en
[PRODUCT.md](PRODUCT.md); aquí está el cómo.

Implementado en `src/css/tokens.css` (variables) y `src/css/components.css`
(piezas). Este documento describe lo que existe, no una aspiración.

---

## Dirección

**Editorial estructural, no editorial de revista.**

La dirección elegida fue "editorial tipográfico", pero la referencia de marca
señala ese carril como saturado, con una huella concreta: serif display en
cursiva, etiquetas mono en versalitas, columnas separadas por reglas,
monocromía y cero imágenes.

Se conserva lo que aportaba (jerarquía fuerte, aire, datos a la vista,
composición asimétrica) y se descarta la piel que lo delata:

| Se descarta | Se hace en su lugar |
|---|---|
| Serif display en cursiva | Una grotesca de señalética, en negro y estrecha |
| Etiquetas en versalitas sobre cada sección | Ninguna. La numeración solo aparece en proyectos, donde identifica una pieza |
| Monocromía contenida | Verde comprometido: superficies enteras |
| Sin imágenes | Las capturas reales son la columna vertebral |

El ángulo diferencial es el contenido, no el gesto: sistemas industriales en
Cartagena, no software de startup.

---

## Color

Definido en **OKLCH**. Ningún neutro es blanco ni negro puro: todos llevan
croma 0.003–0.014 en el matiz de marca (150), lo que integra los grises con
el verde en lugar de dejarlos sueltos.

### Estrategia: comprometida

El verde no es un acento del 10%: **carga superficies enteras** en la franja
posterior al hero, en el pie y en las cabeceras de las vistas de proyecto.
Entre esos momentos el fondo es neutro. El contraste entre ambos es lo que
hace que el verde se recuerde.

### Anclaje

El verde original `#16a34a` resuelve a `oklch(0.627 0.170 149.2)`. La rampa
está construida alrededor de ese punto, así que la identidad se conserva.

### Los tres verdes que importan

| Token | Valor | Para qué | Regla |
|---|---|---|---|
| `--color-brand` | `oklch(0.600 0.163 150)` | Identidad: punto del logo, énfasis del titular, viñetas | **Solo texto grande** (3.45:1) |
| `--color-accent` | `oklch(0.520 0.140 150)` | Todo el texto normal, botones, enlaces | 4.87:1 y superior |
| `--color-brand-surface` | `oklch(0.440 0.115 152)` | Franjas de color pleno | Con `--color-on-brand` encima |

> El error más fácil de cometer aquí es usar `--color-brand` en texto
> pequeño. Ya pasó una vez con el número de proyecto: 3.45:1, por debajo del
> mínimo. Si el texto mide menos de 24px, va `--color-accent`.

### Texto terciario: dos primitivas

`--neutral-450` y `--neutral-550` existen porque **ningún valor único cumple
AA en los dos temas**: sobre fondo claro hace falta L ≤ 0.53 y sobre fondo
oscuro L ≥ 0.60. Cada tema mapea el suyo en `--color-text-subtle`.

### Contraste verificado

28 pares comprobados en tema claro y oscuro, calculados desde los valores de
`tokens.css` con conversión OKLCH → sRGB. **Todos cumplen WCAG AA.** El más
ajustado es el énfasis verde del titular, 3.45:1 sobre un mínimo de 3:1 por
tratarse de texto grande.

---

### La marca

El logotipo es una pieza raster con textura desgastada, no un vector. Vive en
`src/img/marca/` con su propio LEEME; aquí solo lo que afecta al sistema visual.

Se usa en dos sitios y con dos recortes distintos:

- **Navbar**: solo la marca (corona + monograma), en `#008A39`. Alta a 1.75em
  porque es casi cuadrada y la corona ocupa el tercio superior: por debajo de
  esa altura sus trazos finos se empastan.
- **Pie**: la firma completa —marca, separador y «Camilo Pacheco / Software
  Developer»— en casi blanco. Un pie es una despedida, y ahí una firma cierra
  en vez de decorar. Va al 85% de opacidad para no competir con «Hablemos.».

**El verde de marca no sirve sobre la franja verde.** `#008A39` sobre el fondo
del pie da 1,64:1. De ahí que existan tres variantes de color y no una.

El archivo original venía en `#49C102`, un verde amarillento. Se recoloreó al
matiz de marca (150°) para que no desentonara. El recoloreado conserva el canal
alfa y solo sustituye el RGB, lo que preserva la textura y los bordes suaves.

## Tipografía

**Archivo**, una sola familia, variable en peso (400–800) y anchura (75–125).

Se eligió por lo que representa como objeto físico: una placa de equipo
industrial o un rótulo de señalética, no una landing de producto. Encaja con
la historia portuaria y operativa del contenido.

Una familia con contraste fuerte de peso y ancho es más sólida que un par
display + cuerpo elegido por costumbre.

| Uso | Tamaño | Peso | Anchura |
|---|---|---|---|
| Titular del hero | `--text-display` (hasta 8.5rem) | 800 | 88% |
| Títulos de sección | `--text-3xl` | 700 | 94% |
| Cita de la franja | `--text-4xl` | 700 | 92% |
| Cuerpo | `--text-base` | 400 | 100% |
| Etiquetas | `--text-xs` en mayúsculas | 600 | 100% |

Escala modular ~1.28 con `clamp()`. Los saltos son grandes a propósito: una
escala plana se lee como falta de decisión.

En tema oscuro, `--leading-normal` y `--leading-relaxed` suben 0.05 y 0.07:
el texto claro sobre fondo oscuro se percibe más fino y pide más aire.

---

## Layout

- Ancho máximo **78rem**, canalón fluido `clamp(1.25rem, 5vw, 3rem)`.
- Separación entre secciones `clamp(5rem, 11vw, 10rem)`. Generosa a propósito.
- **Hero asimétrico**: 1.45fr para el texto, 0.55fr para el retrato, que además
  baja 4rem respecto a la línea superior para romper el eje.
- **El aire sobre el hero es corto**: `clamp(1.5rem, 2.5vw, 2.5rem)`, unos 38px
  en escritorio. La separación generosa del sistema es la de *entre* secciones;
  el header es una barra fina, no una sección, y aplicarle la misma escala
  dejaba 96px hasta la línea de datos y 150px hasta el titular — una banda vacía
  que no separaba nada y empujaba los botones fuera de la primera pantalla.
  El suelo de 1.5rem no es arbitrario: por debajo de ~24px la línea de datos
  roza el header, que en reposo no tiene borde.
- **Proyectos en filas alternas**, no en rejilla de tarjetas. Las filas pares
  invierten el orden de la imagen.
- **Franjas a sangre completa por estructura**, nunca con
  `margin-inline: calc(50% - 50vw)`: ese truco desborda exactamente el ancho de
  la barra de scroll y provoca desplazamiento horizontal.

### Móvil

Tres decisiones propias, todas medidas a 375px y comprobadas a 305px:

- **El panel del menú va a `left/right: 0`, no a `-gutter`.** Su contexto de
  posicionamiento es `.site-header__inner`, que *es* el `.wrapper`: su gutter es
  `padding-inline`, así que su caja ya llega de borde a borde. Sacarlo otro
  gutter lo hacía 40px más ancho que la pantalla, y eso producía **dos fallos a
  la vez**: la página se arrastraba en horizontal y el texto de los enlaces caía
  justo sobre el borde izquierdo, como si estuviera cortado.
- **La ficha de datos apila la etiqueta sobre el valor.** A dos columnas la
  etiqueta se comía 5.5rem de los ~21rem disponibles y los valores largos caían
  en tres líneas quebradas. Las dos columnas vuelven a partir de 48em.
- **Una regla separa un proyecto del siguiente.** En una sola columna la
  separación no basta: la captura del proyecto siguiente parece pertenecer al
  bloque anterior. Desaparece a partir de 62em, donde las filas alternan lado y
  el cambio de eje ya marca el corte.

En las vistas de proyecto, «Volver al portafolio» se recorta a «Volver» por
debajo de 30em: con la marca completa al lado, el texto entero partía el header
en dos líneas.

### Dos niveles de proyecto

Con ocho proyectos, ocho filas a sangre completa convierten la portada en un
scroll sin final y le quitan peso justo a los dos que deben dominar. Los cuatro
destacados conservan la fila alterna; los otros cuatro bajan a `.brief`.

`.brief` es **una lista separada por reglas, no una rejilla de tarjetas**. La
tarjeta era el reflejo evidente y habría sido un error doble: es la
anti-referencia principal de [PRODUCT.md](PRODUCT.md), y además cuatro tarjetas
idénticas les devuelven exactamente el peso visual que se les quería quitar.

| Pieza | Decisión |
|---|---|
| Miniatura | 16/10 y pequeña a propósito: `12rem` desde 48em, `15rem` desde 62em |
| Descripción | `max-width: 58ch` |
| Pie (enlace + stack) | **El mismo `58ch`**. Sin ese tope, en pantallas anchas el stack se va al borde derecho del contenedor mientras el texto termina mucho antes, y los dos dejan de leerse como parte de la misma ficha |
| Por debajo de 48em | Una sola columna, sin `grid-template-columns`. No hay ningún ancho fijo en toda la pieza |

---

## Movimiento

Curvas exponenciales de salida (`--ease-out-quint` por defecto). Sin rebote ni
elástico. Solo se animan `opacity` y `transform`.

| Pieza | Comportamiento |
|---|---|
| Revelado al scroll | Opacidad y 1.75rem de desplazamiento, `IntersectionObserver`, una sola vez |
| Grupos escalonados | 90ms de retardo por hijo, índice escrito desde JS |
| Retrato del hero | El bloque verde se desplaza al pasar el ratón |
| Capturas | Escala 1.025 al pasar el ratón, 900ms |
| Punto de disponibilidad | Latido de 2.6s, se detiene con movimiento reducido |

**Dos reglas que no se negocian:**

1. El contenido **nunca** se oculta si el JavaScript no corre. El estado
   oculto depende de `[data-js]`, que solo escribe `reveal.js`.
2. Hay un **seguro de 3 segundos**: si el observador no llega a entregar nada
   (pestaña en segundo plano al cargar, extensión que interfiere), se revela
   todo. Perder la animación es aceptable; perder el contenido no.

`prefers-reduced-motion` pone las cuatro duraciones a 0.01ms, lo que desactiva
todo el movimiento del sitio de golpe.

---

## Vistas de proyecto

Misma dirección que la portada, con tres decisiones propias:

- **La ficha de datos vive en la cabecera verde.** Rol, periodo, estado y stack
  se ven sin bajar. Es lo que convierte la página en un caso de trabajo y no en
  un artículo de blog.
- **La franja verde lleva el aire repartido de forma asimétrica**: 48px arriba y
  80px abajo en escritorio. Simétrica a 96px repetía el problema del hero de la
  portada — el título del proyecto aparecía a 96px del header sin nada en medio.
  Un titular de portada se apoya en el borde superior; el aire que necesita va
  debajo, separándolo de la ficha.
- **El primer titular de la página tiene su propia separación de la franja.**
  El ritmo entre secciones lo pone `.page > * + *`, y `* + *` solo separa
  *entre* hermanos: el primer hijo se quedaba sin nada y «Las capturas» tocaba
  el borde verde a 0px. Lo resuelve `.page-hero + .page`. No usa
  `--space-section` (160px) sino `clamp(4rem, 7vw, 6rem)`: se sale de una franja
  de color, y el salto de color ya hace parte del trabajo de separar.
- **Las capturas van primero**, justo después de la cabecera, y la primera
  ocupa el ancho completo. Son la única prueba de que el sistema existe;
  enterrarlas al final desaprovecha el activo más fuerte.
- **Secciones reescritas en lenguaje de caso**: "El problema", "Qué construí",
  "Retos técnicos", "Qué me llevo". Antes eran "Descripción general",
  "Objetivos principales", "Aprendizajes", que es el índice de una plantilla.
- **Navegación entre proyectos** al final. Sin ella, la única salida es el
  botón de volver y se pierde a quien acaba de leer un caso entero.

---

## Sobre los textos alternativos

El visor usa el `alt` de cada captura **como pie de foto** (`gallery.js` lo
copia en el `figcaption`). Un `alt` genérico tipo «captura 3 de 6» no es solo
una carencia de accesibilidad: sale escrito en pantalla debajo de la imagen.

Las páginas nuevas —AG Identity, ArgosMonitors y Southern Roofing— ya describen
lo que se ve en cada captura. Las cinco anteriores siguen con el texto
numerado.

---

## Pendiente

- `alt` descriptivos en las capturas de **SITI Colombia, AgroIA, WhatsApp, B&B y
  GoodMovies**, que aún usan «— captura N de M» y por tanto lo muestran como pie
  en el visor.
- Botón manual de tema. La arquitectura ya lo soporta: basta escribir
  `data-theme` en `<html>` y guardarlo en `localStorage`.
- Scroll-spy en el nav; el CSS ya contempla `.site-nav__link[aria-current]`.
- Las capturas nuevas son **JPEG de ~1536×674**, más anchas que la proporción
  `1920/1020` de `.project__img`, así que se recortan por abajo. Se ve bien
  porque el recorte respeta `object-position: top center`, pero convertirlas a
  WebP y a la proporción correcta ahorraría peso y evitaría el recorte.
