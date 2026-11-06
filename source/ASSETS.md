# Assets copiados

Origen del ejercicio: `4GeeksAcademy/exercise-postcard` commit `d449b939e301fca604c60b25239f3a2ec5327735` (2023-04-05), fork de `breatheco-de/exercise-postcard`. Registro en `source/PROVENANCE.json`.

| Destino | Origen | Nota |
|---|---|---|
| `.learn/` | mismo path del commit oficial | Ejercicios, tests y assets. |
| `learn.json` y `source/learn.json` | `learn.json` del mismo commit | Bytes idénticos. sha256 `fd24c7b5b716ca92f13dacdca5f940b618528e71a17efe8a435ea6583ca6c7ae`. |
| `source/OFFICIAL_README.md` | `README.md` | sha256 `ed2991668e5266bc2d3e32ba3b4b8f2106f8af7cb28caa294db1cedd0d2c8393`. |
| `source/OFFICIAL_README.es.md` | `README.es.md` | sha256 `73ccf6105a7496f394f9e131d82ce63ea8172b41c99634f85493267c1caef9e9`. |

No se copió `.learn/assets/preview.png?raw=true`: en el árbol oficial es un archivo vacío de 0 bytes, no la imagen. La vista previa real es `.learn/assets/preview.png`.

No se copiaron `.github/workflows/learnpack-audit.yml`, `.devcontainer/` ni `.gitpod.yml`. Fijan Node 14 y LearnPack global; no forman parte de la postal. `learn.json` y `.learn/` quedan para quien quiera abrir los pasos.

`.learn/utils/dom.js` tiene un cambio local en `withStylesheet` / `selector`. El jsdom actual no crea `CSSStyleSheet` en un documento clonado, y los tests leen `styleSheets[0]`. El harness sigue clonando para las consultas y lee las reglas desde un iframe, que sí expone CSSOM. El resto del archivo queda igual.

## Licencia

El 2026-11-06 la API de licencia de GitHub respondió 404 para `4GeeksAcademy/exercise-postcard` y para `breatheco-de/exercise-postcard`. No hay archivo LICENSE en ese commit. No se inventa una licencia ni una cesión.

## Lockup

Copiados sin recomprimir desde `SIGNAL_PACKAGE.zip`, verificado contra `MANIFEST.json` del paquete:

- `brand/lockups/signal-horizontal.svg` sha256 `85459232bf51e7bf7c94225fd4f2cd6b71a681b6d701cb4ffd6d2a142cf57a81`
- `brand/lockups/signal-stacked.svg` sha256 `11314b300284db342bc15a7c7695c23199f65f68178af45586b62d01e9ea133a`

Procedencia del dibujo: `brand/README.md`. `tokens/tokens.css`, `tokens/tokens.json`, `tokens/motion.css` y `tokens/motion.json` son la fuente de los valores del chrome. La hoja de la postal no enlaza `tokens.css` porque sus selectores de elemento reemplazarían el fondo negro y el tamaño del `h1`.

El logo de la postal sigue la URL que fija el test 11.1. El archivo local `.learn/assets/4geeks.png` es el asset del ejercicio, no el `src` de la página.
