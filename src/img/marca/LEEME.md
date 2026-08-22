# Marca

Todas las piezas salen de `../originales/iconoCP.png` (2172×724), que trae la
marca y la firma juntas sobre fondo transparente.

## Qué es cada archivo

| Archivo | Qué contiene | Dónde se usa |
|---|---|---|
| `marca-verde.png` | Corona + monograma CP | **Navbar**, en las 9 páginas |
| `marca-blanca.png` | Igual, casi blanco | Libre — para fondos verdes u oscuros |
| `marca-negra.png` | Igual, casi negro | Libre — para fondos claros e impresión |
| `firma-verde.png` | Marca + separador + «Camilo Pacheco / Software Developer» | Libre |
| `firma-blanca.png` | Igual, casi blanco | **Pie de página**, sobre la franja verde |
| `firma-negra.png` | Igual, casi negro | Libre — documentos, CV, fondos claros |
| `favicon.png` | Solo la marca, 64×64 | Favicon de las 9 páginas |

## Los tres colores, y por qué son esos

| Tono | Hex | Razón |
|---|---|---|
| Verde | `#008A39` | **4,2:1 contra los dos fondos del sitio.** No es un token de la rampa: sale de barrer la luminosidad en OKLCH buscando el punto donde el contraste del *peor* de los dos temas es máximo. Ningún verde de la rampa lo iguala — `green-600` da 3,46:1 y `green-700` 3,72:1 |
| Blanco | `#EFFBF2` | Es `--color-on-brand`, el mismo que usa todo el texto sobre verde. Sobre la franja da 6,8:1 en claro y 10,1:1 en oscuro |
| Negro | `#0C0F0D` | Es `--neutral-950`, el fondo del tema oscuro |

**El verde de marca no sirve sobre la franja verde**: `#008A39` sobre el fondo
del pie da 1,64:1. Por eso el pie lleva la variante blanca y no la verde.

## Sobre el color original

El archivo que entregó Camilo viene en `#49C102`, un verde amarillento. Se
recoloreó al matiz de marca del portafolio (150° en OKLCH) para que la pieza no
desentonara con el resto del sitio.

## Cómo regenerarlas

El recoloreado **conserva el canal alfa intacto y solo sustituye el RGB**. Es
seguro porque la textura desgastada del original vive entera en el alfa: los
picados de dentro de las letras son transparentes, no negros. Se comprobó — de
215.572 píxeles opacos, prácticamente todos son verdes. Por eso los bordes
antialiaseados conservan su rampa y no se dentan al cambiar de color.

Recortes medidos sobre el original:

```
marca (corona + CP)   x   67..688   y  38..686
separador             x  760..772   y 116..632
firma                 x  830..2122  y 197..581
```

Las variantes se generan con un script de GD que recorta, recolorea y escala.
Si hay que rehacerlas, esos son los únicos números que hacen falta.

## Lo que falta

- **No hay versión SVG.** La textura del original es raster, así que convertirla
  a vectores exigiría redibujarla. Con SVG y `currentColor` el color cambiaría
  solo con el tema y sobrarían las tres variantes — es la mejora natural cuando
  Camilo rehaga el logotipo.
- Las variantes `-negra` y `firma-verde` no se usan todavía. Están aquí porque
  el juego completo se pidió a propósito, no porque sobren.
