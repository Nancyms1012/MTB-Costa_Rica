# Proyecto: sitio web LA COPA MTB Costa Rica (ANCM)

Memoria del proyecto. Léela al empezar cualquier sesión. Detalle completo en `DOCUMENTACION.md`.

## Datos básicos
- Dueña: Nancy (GitHub `Nancyms1012`). Texto de la interfaz siempre en español.
- Repo: `Nancyms1012/MTB-Costa_Rica`. Rama de trabajo y publicación: `sitio-web-nuevo` (nunca `main`).
- Sitio: https://mtbcostarica.org (GitHub Pages, archivo `CNAME`). Se reconstruye 1-2 min después de `git push`. Nancy debe recargar con Ctrl+Shift+R.
- Sitio estático: HTML + CSS + JS sin frameworks, sin backend. Archivos: `index.html`, `css/styles.css`, `js/main.js`, `data/*.json`, `img/`, `resultados-pdf/`.

## Cómo trabajar con Nancy
- No puede instalar software. Sube archivos por la web de GitHub o desde el celular.
- La web de GitHub rechaza archivos de más de 25 MB (los videos los sube desde el celular).
- Cuando ella suba archivos, hacer `git fetch`/clonar de nuevo y buscarlos antes de pedirlos otra vez.
- Dónde subir resultados: carpeta `resultados-pdf/`, rama `sitio-web-nuevo`.
- Después de cada cambio: commit, push a `sitio-web-nuevo`, esperar ~80 s y verificar con `curl` el sitio en vivo.
- Subir la versión de caché en `index.html` (`styles.css?v=NN`, `main.js?v=NN`) cuando cambie CSS/JS. Versión actual: **v=70**. Los `fetch` de JSON en `main.js` también llevan `?v=`.

## Entorno del sandbox (problemas conocidos)
- El repo local `/projects/sandbox/MTB-Costa_Rica` está corrupto (errores de objetos git). Usar el clon sano `/projects/sandbox/mtb-new`, o reclonar:
  `git clone --branch sitio-web-nuevo --single-branch https://github.com/Nancyms1012/MTB-Costa_Rica.git`
- `node` requiere `bash -lc 'node ...'`.
- `openpyxl` no está instalado y `pip install` no lo deja disponible. Leer xlsx/xlsm con `zipfile` + regex sobre el XML. Ojo: las celdas de fórmula con texto vienen como `<v xml:space="preserve">`, hay que aceptar atributos en `<v>`.
- `/tmp` no persiste entre llamadas: trabajar en `/projects/sandbox`.

## Cómo se publican los resultados
- `data/resultados.json`: claves `"1"`..`"7"` (una por fecha). Cada fecha: `label` ("VII Fecha · Lugar"), `fecha`, `modalidades` con `XCO`, `XCC` y `CX` (Cyclo Cross, solo VII). Cada modalidad: `categorias` → categoría → `M`/`F`/`X` → top 3 con `pos`, `name`, `team`, `time`, `gap`, `points`. Opcional `pdfs` por modalidad (botón de PDF completo).
- Puntos por fecha: XCO 200/150/120, XCC 25/20/16. Cyclo Cross sin puntos.
- `data/general.json`: `label`, `sub`, `xlsx`, `pdf` (opcional) y `categorias` → `M`/`F`/`X` con top 3 y `puntos` acumulados. Peso Pluma, E-Bike y Cyclo Cross usan `X` en la general; en las fechas, Peso Pluma y E-Bike usan `M`. Open usa `X` (masculino) y `F`.
- No se muestran SUB21 ni "MM". SUB23 solo aparece en la general.
- Categorías vacías (plantilla sin número de corredor) se omiten.
- Fuente de datos: Excel de la general (`general-vii-fecha.xlsx`, hoja por categoría, columna final = TOTAL PUNTOS, nombres por `VLOOKUP` a la hoja `Planilla`) y los `f7-xco.xlsm` / `f7-xcc-cyclo.xlsm` (hoja por categoría desde la fila 14; tiempo es fracción de día).
- En `main.js`: `MOD_LABEL`, `MOD_DOT`, `MOD_TITULO` definen las modalidades (incluye `CX`). Botones "Ver Resultados" en Eventos usan `class="btn-ver-fecha" data-fecha="N"`.

## Estado actual (septiembre 2026)
- Calendario 2026: I Fecha Finca Grupo Orosi (feb), II Parque La Libertad Desamparados (mar), III Adventure Park (may), IV Finca La Hisopa Turrubares (jun), V Campamento Oikoumene Ochomogo (jul), VI Finca Grupo Orosi Paraíso (12-13 set), VII Gran Final Parque Recreativo Sarapiquí (31 oct - 1 nov).
- VII Fecha: **Finalizada**. Resultados y General (hasta VII Fecha) publicados. Tarjetas de Eventos (XCO, XCC, Cyclocross) con botón "Ver Resultados" y botones de GPX/video.
- Inicio: bloque "Carrera finalizada / ¡Gracias por participar!" sin enlace. No hay cronómetro ni GPX en el inicio.
- Eventos tiene pestañas XCO, XCC y Cyclocross. Imagen de horarios `img/HORARIO_SALIDA_XCC.jpeg` en XCC y Cyclocross.
- Archivos de la Gran Final: `img/SARAPIQUI.jpeg` (escudo), `img/XCO.gpx`, `img/Short_Track.gpx`, `img/XCO_V.MP4`, `img/CYCLOCROSS.mp4`.
- Inscripciones activas: enlace `https://inscripciones.raceclubhub.com/landing`, QR de La Copa (`img/QR_COPA.png`) y Copa Kids (`img/QR_KIDS.png`).
- Contador de visitas: `visitor-badge.laobi.icu`, id `mtbcostarica.org.visitas`, `position:fixed; top:88px`, `z-index:1001`. `.breadcrumb-bar` tiene `padding-top:130px`.
- Fotos XCO/XCC (`XCO1-4.jpeg`, `XCC1-4.jpeg`): XCC son verticales 500x750, con `aspect-ratio:500/750`.
- Enlace de carrera en vivo usado antes: `https://control.raceclubhub.com/vivo` (hoy inhabilitado).

## Pendientes
- Subir el PDF de la clasificación general y de resultados completos de la VII Fecha (hoy no hay; el botón de PDF de la general se quitó porque el PDF era de la VI).
- Confirmar con Nancy: tiempo de Elite Femenino XCO VII (00:39:05, parece corto). E-Bike y Peso Pluma XCO sin tiempos en el Excel.
- Antiguo: mover más datos de resultados a JSON.
