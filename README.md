# Postal digital

Página estática en HTML y CSS que reproduce la postal del ejercicio 4Geeks `exercise-postcard`. La tarjeta mide 400×300 px, con fondo negro, el título «My Postcard», el logo de 4Geeks, el texto de la vista previa, tres campos y el botón «Send My Postcard».

## Cómo verla

Hace falta un servidor estático para que las rutas relativas resuelvan igual que en el navegador:

```bash
python3 -m http.server 4173
```

Abrir `http://127.0.0.1:4173/`. Sin servidor, el archivo también se puede abrir directo; el formulario y la hoja siguen en la página.

## Cómo comprobarla

```bash
npm install
npm test
```

`npm test` valida el HTML con html-validate, parsea el CSS, comprueba los textos y las reglas que piden los pasos finales, el contraste de los colores declarados y los sha256 de la procedencia y del lockup. Después corre los tests Jest de `.learn/exercises/`.

El paso 08.1 pide un borde rojo punteado para depurar y, en el mismo paso, quitarlo al terminar. `npm test` no ejecuta ese test intermedio. La postal terminada no lleva ese borde, para coincidir con `.learn/assets/preview.png`.

## Estructura

- `index.html`, `styles.css`, `postcard.js`: la postal.
- `.learn/`: instrucciones, assets y tests del starter oficial.
- `learn.json`: manifiesto LearnPack, sin modificar.
- `source/`: enunciados, `PROVENANCE.json` y `ASSETS.md`.
- `brand/lockups/`: lockup 4Geeks × Divinivid, bytes del paquete SIGNAL.
- `tokens/`: valores SIGNAL usados por el pie y el enlace de salto. No cambian la letra de la postal.

## Procedencia

El starter y `.learn/` salen de `4GeeksAcademy/exercise-postcard` en el commit `d449b939e301fca604c60b25239f3a2ec5327735`, fork de `breatheco-de/exercise-postcard`. Hashes y omisiones están en `source/ASSETS.md`. Ese commit no trae archivo LICENSE y la API de licencia de GitHub no publica una para esos dos repositorios. No se añade una licencia.

El pie muestra el lockup horizontal oficial (400 px). Por debajo de 440 px de ancho se usa el apilado del mismo paquete (280 px), porque el horizontal no cabe. Va sobre un panel claro: el SVG es tinta oscura y el enunciado pide fondo negro en la página. No es una asociación oficial.

## Decisiones

- La letra de la tarjeta es Comic Neue (Google Fonts), la versión publicada de la letra de `preview.png`. El botón, el pie y el enlace de salto usan Arial/Helvetica.
- Los campos se leen en la imagen solo con placeholder. Cada uno tiene además un `label` fuera de pantalla para que el nombre accesible no dependa del placeholder.
- El gris del placeholder en la captura oficial queda alrededor de `#808080` (por debajo de 4.5:1). En la página es `#767676`, el paso más cercano que cumple AA sobre blanco.
- Activar el botón no envía nada a un servidor. Si falta el nombre, o el email no lleva `@`, un aviso `status` lo dice y el foco vuelve al campo. Si los datos alcanzan, el aviso es «Postcard kept on this page.» Sin JavaScript la postal se sigue viendo; el formulario recarga la misma página.

## Entrega al LMS

No forma parte de esta rama. Queda como paso de Miguel (`HITL_ENVIO_MIGUEL`).
