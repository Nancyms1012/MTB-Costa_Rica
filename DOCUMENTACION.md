# 📋 DOCUMENTACIÓN - Sitio Web LA COPA MTB Costa Rica

**Versión:** 2.0  
**Última actualización:** Septiembre 2026  
**Responsable:** Nancy (Nancyms1012)  
**GitHub:** https://github.com/Nancyms1012/MTB-Costa_Rica  
**Dominio:** mtbcostarica.org (via CNAME)  
**Rama activa:** `sitio-web-nuevo`

---

## 📑 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Historial de Cambios y Mejoras](#historial-de-cambios-y-mejoras)
4. [Características Implementadas](#características-implementadas)
5. [Archivos Clave](#archivos-clave)
6. [Páginas Disponibles](#páginas-disponibles)
7. [Datos y APIs](#datos-y-apis)
8. [Proceso de Deploy](#proceso-de-deploy)
9. [Mantenimiento y Actualizaciones](#mantenimiento-y-actualizaciones)

---

## 🌐 Descripción General

**LA COPA - Asociación Nacional de Ciclismo de Montaña (ANCM)**

Sitio web oficial estático (SPA - Single Page Application) para la Copa Nacional de Ciclismo de Montaña de Costa Rica. Construido con HTML5, CSS3 y JavaScript vanilla (sin frameworks).

### Objetivos del Sitio
- Mostrar información sobre las competiciones anuales de MTB
- Publicar resultados de eventos (XCO, XCC, XCE)
- Mostrar clasificaciones generales y campeones
- Facilitar inscripciones a eventos
- Mantener un registro histórico de participantes y resultados

### Tecnología
- **Frontend:** HTML5 + CSS3 + JavaScript vanilla
- **Hosting:** GitHub Pages + CNAME (mtbcostarica.org)
- **Datos:** JSON + hardcode en JavaScript
- **Control de versiones:** Git

---

## 📁 Estructura del Proyecto

```
MTB-Costa_Rica/
├── index.html                    # Archivo principal (SPA)
├── css/
│   └── styles.css               # Estilos globales
├── js/
│   └── main.js                  # Lógica JavaScript principal
├── data/
│   ├── campeones.json           # Datos de campeones por categoría
│   ├── general.json             # Clasificación general
│   └── resultados.json          # Resultados históricos
├── img/                         # Imágenes (logos, banners, etc)
├── resultados-pdf/              # PDFs con resultados de fechas
├── CNAME                        # Configuración de dominio
├── Equipos-participacion.xlsx   # Hoja de equipos y participación
└── DOCUMENTACION.md             # Este archivo
```

---

## 📝 Historial de Cambios y Mejoras

### **Fase 1: Estructura Base**
- ✅ Creación del sitio SPA con navegación fluida
- ✅ Integración de navbar con megamenu
- ✅ Sistema de páginas dinámicas (data-page)
- ✅ Responsive design con CSS Grid y Flexbox
- ✅ Paleta de colores corporativa (azul marino #0d1b3e, rojo #e63946)

### **Fase 2: Contenido y Páginas**
- ✅ Página **Inicio** con countdown a Gran Final (VII Fecha)
- ✅ Página **Nosotros** con misión, visión, valores y estadísticas
- ✅ Página **Eventos** con calendario interactivo (XCO/XCC)
- ✅ Página **Categorías** con tablas de edades y géneros
- ✅ Página **Formatos** (XCO, XCC) con información y galería
- ✅ Página **Resultados** con carga dinámica por fecha
- ✅ Página **Campeones 2026** con galería de ganadores
- ✅ Página **Inscripciones** con instrucciones
- ✅ Página **Contacto** con formulario

### **Fase 3: Funcionalidades Dinámicas**
- ✅ **Contador de visitas** con visitor-badge.laobi.icu
- ✅ **Countdown Timer** a evento próximo (actualiza cada segundo)
- ✅ **Tabs de filtro** (XCO/XCC) en página de Eventos
- ✅ **Renderizado dinámico de resultados** por categoría
- ✅ **Galería de campeones** con dos columnas (M/F a la par)
- ✅ **Breadcrumbs** de navegación en sub-páginas
- ✅ **Megamenu** desplegable en navbar

### **Fase 4: Datos y Resultados**
- ✅ **Data de campeones** en `data/campeones.json` con estructura:
  - modalidad (XCO/XCC)
  - genero (M/F)
  - categoria
  - nombre, apellido, equipo
- ✅ **Carga de resultados** por fecha desde JSON
- ✅ **Podios** con clases CSS (podium-1, podium-2, podium-3)
- ✅ **Filtrado por categoría** en página de resultados

### **Fase 5: Mejoras Recientes (Septiembre 2026)**
- ✅ **Actualización E-Bike Masculino** con datos VI Fecha:
  - Aaron Guzmán (Acisa) - 950 puntos
  - Alex Guzmán (Acisa) - 700 puntos
  - Carlos Tenorio (Acisa Sarapiquí) - 530 puntos
  - Y más participantes
- ✅ **PDF actualizado** generado: `general-vi-fecha-ebike-updated.pdf`
- ✅ **Excel de clasificación** actualizado: `general-vi-fecha.xlsx`
- ✅ **Reactivación del contador de visitas** en página de inicio

---

## ⚙️ Características Implementadas

### **1. Navegación SPA**
```javascript
// Uso: navigateTo('nombre-de-pagina')
- Cambio dinámico de páginas sin recargar
- Menú activo actualiza automáticamente
- URL se actualiza en historial del navegador
- Soporte para enlaces de anclaje (#hash)
```

### **2. Countdown Timer**
- Ubicación: Banner de inicio
- Evento: VII Fecha Gran Final (31 Octubre - 01 Noviembre 2026)
- Lugar: Sarapiquí
- Actualización: Cada segundo
- Muestra: Días, Horas, Minutos, Segundos

### **3. Contador de Visitas**
- Servicio: visitor-badge.laobi.icu
- ID: `mtbcostarica.org.visitas`
- Ubicación: Página de inicio, esquina superior
- Colores: Azul marino + Rojo
- Estado: **ACTIVO** (reactivado septiembre 2026)

### **4. Galería de Campeones**
- Estructura: Dos columnas (Mujeres | Hombres)
- Gap: 40px entre columnas
- Filtro: Por modalidad (XCO/XCC)
- Datos: Se cargan de `data/campeones.json`
- Imagen: Avatar de cada campeón en `img/campeon-*.png`

### **5. Calendario de Eventos**
- Dos modalidades: XCO y XCC
- 7 fechas distribuidas en 2026
- Estados: Pasado (gris), Próximo (rojo), Actualizado (verde)
- Botón "Ver Resultados" redirige a página de resultados

### **6. Resultados por Fecha**
- Filtro por categoría (dropdown)
- Tabla con: Posición, Nombre, Equipo, Tiempo
- Podios resaltados (oro, plata, bronce)
- Carga dinámica desde JSON

### **7. Responsive Design**
- Breakpoints: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Navigation hamburgesa en mobile
- Grid adapta automáticamente
- Imágenes se escalan fluidamente

---

## 📄 Archivos Clave

### **index.html**
- Archivo principal SPA
- Contiene todas las secciones de páginas
- Breadcrumbs y navegación
- ~1500 líneas de HTML semántico
- Referencias a CSS (v=68) y JavaScript

**Páginas definidas:**
1. `#page-inicio` - Inicio con countdown
2. `#page-nosotros` - About
3. `#page-noticias` - News/Podcasts
4. `#page-eventos` - Calendario
5. `#page-format-xco` - Info de XCO
6. `#page-format-xcc` - Info de XCC
7. `#page-categorias` - Categorías
8. `#page-resultados` - Resultados
9. `#page-resultados-xco` - Detalle resultados XCO
10. `#page-campeones` - Galería campeones
11. `#page-inscripciones` - Inscripciones
12. `#page-contacto` - Contacto

### **css/styles.css**
- Estilos globales y componentes
- Variables CSS para colores
- Grid system personalizado
- Animaciones (transiciones suaves)
- Estilos responsivos
- Clases de utilidad (.active, .podium-*, .badge-*)

**Secciones principales:**
```css
- Root variables (colores, tipografía)
- Navbar y navegación
- Páginas y layouts
- Componentes (cards, buttons, badges)
- Tablas y formularios
- Animaciones y transiciones
- Media queries (responsive)
```

### **js/main.js**
- Lógica principal de la aplicación
- Funciones de navegación SPA
- Renderizado de resultados y campeones
- Countdown timer
- Event listeners
- Fetch de datos JSON

**Funciones principales:**
```javascript
navigateTo(page)              // Cambiar de página
renderResults(category)       // Pintar tabla de resultados
renderCampeones()            // Galería de campeones
updateCountdown()            // Actualizar contador atrás
loadCampeones()              // Cargar data de campeones
loadResults(fecha)           // Cargar resultados por fecha
```

### **data/campeones.json**
```json
[
  {
    "modalidad": "XCO",
    "genero": "M",
    "categoria": "elite",
    "nombre": "Carlos",
    "apellido": "Herrera",
    "equipo": "PEDREGAL 7C"
  },
  ...
]
```

---

## 🌍 Páginas Disponibles

### **1. Inicio**
- **Ruta:** `#page-inicio`
- **Elementos:**
  - Contador de visitas (visitor-badge)
  - Banner con imagen de fondo
  - Logo ANCM
  - Info de próximo evento (Gran Final)
  - Countdown timer a VII Fecha
- **Última actualización:** Sept 2026 (reactivación contador)

### **2. Nosotros**
- **Ruta:** `#page-nosotros`
- **Contenido:**
  - Descripción de la organización
  - Misión, Visión, Valores (3 cards)
  - Estadísticas (500 atletas, 6 fechas, 15 categorías, 30 años)
- **Breadcrumb:** Inicio > Nosotros

### **3. Noticias**
- **Ruta:** `#page-noticias`
- **Contenido:** 5 podcasts "Soñadores del MTB"
- **Links externos:** Abren en nueva ventana
- **Estado:** Temporalmente oculto (comentado en navbar)

### **4. Eventos**
- **Ruta:** `#page-eventos`
- **Filtros:** XCO / XCC (tabs interactivos)
- **Calendario:** 7 fechas con estados (Finalizada/Próximo)
- **Botones:** "Ver Resultados" redirige a página de resultados
- **Breadcrumb:** Inicio > Eventos

### **5. Categorías**
- **Ruta:** `#page-categorias`
- **Contenido:**
  - 3 tarjetas de modalidades (XCC, XCO, XCE)
  - Tabla 1: Categorías menores (Preinfantil a Sub-23)
  - Tabla 2: Máster (A-E) y otros (Open, E-Bike, Cyclocross)
- **Breadcrumb:** Inicio > Categorías

### **6. Formatos (XCO/XCC)**
- **Rutas:** `#page-format-xco`, `#page-format-xcc`
- **Contenido:**
  - Descripción del formato
  - Galería de 4 imágenes
  - Estadísticas (tiempo, vueltas, categorías)
  - Calendario de la modalidad
- **Breadcrumb:** Inicio > Eventos > [Formato]

### **7. Resultados**
- **Ruta:** `#page-resultados`
- **Funcionalidad:**
  - Dropdown para seleccionar fecha (1-7)
  - Tabla con resultados XCO (posición, nombre, equipo, tiempo)
  - Podios resaltados con clases CSS
  - Filtro por categoría
- **Sub-página:** `#page-resultados-xco` (resultados detallados)
- **Breadcrumb:** Inicio > Resultados > Por Fecha

### **8. Campeones 2026**
- **Ruta:** `#page-campeones`
- **Estructura:**
  - Dos columnas: MUJERES | HOMBRES
  - Gap 40px entre columnas
  - Imágenes de campeones
  - Nombre, Equipo, Modalidad
- **Filtro:** Por modalidad (XCO/XCC)
- **Breadcrumb:** Inicio > Resultados > Campeones

### **9. Inscripciones**
- **Ruta:** `#page-inscripciones`
- **Contenido:** Instrucciones y form (placeholder)
- **Breadcrumb:** Inicio > Inscripciones

### **10. Contacto**
- **Ruta:** `#page-contacto`
- **Contenido:** Formulario de contacto
- **Breadcrumb:** Inicio > Contacto

---

## 💾 Datos y APIs

### **Campeones (data/campeones.json)**
- **Estructura:** Array de objetos
- **Campos:** modalidad, genero, categoria, nombre, apellido, equipo
- **Carga:** fetch() en `loadCampeones()`
- **Renderizado:** `renderCampeones()` con grid de 2 columnas
- **Actualización:** Manual editando el archivo JSON

### **Resultados (data/resultados.json)**
- **Estructura:** Array de fechas con array de resultados
- **Carga:** Hardcodeado actualmente en `js/main.js`
- **Planes:** Migrar a JSON externo (pendiente)

### **Clasificación General (data/general.json)**
- **Propósito:** Clasificación acumulada
- **Estado:** Disponible pero no actualmente en uso en la web
- **Formato:** Excel y PDF en `resultados-pdf/`

### **Imágenes de Campeones**
```
img/campeon-aaron.png       # Aaron (E-Bike)
img/campeon-didier.png      # Didier
img/campeon-enrique.png     # Enrique
img/campeon-joaquin.png     # Joaquín
img/campeon-miguel.png      # Miguel
img/campeona-ariana.png     # Ariana
img/campeona-brianna.png    # Brianna
img/campeona-dilcen.png     # Dilcen
img/campeona-maidelyn.png   # Maidelyn
```

---

## 🚀 Proceso de Deploy

### **Hosting:** GitHub Pages + CNAME

**Configuración:**
- Rama: `sitio-web-nuevo` (rama activa)
- Dominio: mtbcostarica.org (via CNAME)
- Deploy automático: Push a rama = Deploy automático

### **Pasos para Deploy**
```bash
# 1. Clonar el repo
git clone --branch sitio-web-nuevo https://github.com/Nancyms1012/MTB-Costa_Rica.git

# 2. Hacer cambios locales (HTML, CSS, JS, datos)

# 3. Agregar cambios
git add .

# 4. Commit
git commit -m "Descripción del cambio"

# 5. Push (dispara deploy automático)
git push origin sitio-web-nuevo
```

### **Archivos de Configuración**
- **CNAME:** Contiene el dominio `mtbcostarica.org`
- **.gitignore:** (si existe) Define qué no versionar

---

## 🔧 Mantenimiento y Actualizaciones

### **Actualizar Campeones**
1. Editar `data/campeones.json`
2. Agregar nueva entrada con estructura:
   ```json
   {
     "modalidad": "XCO",
     "genero": "M",
     "categoria": "elite",
     "nombre": "Nombre",
     "apellido": "Apellido",
     "equipo": "EQUIPO"
   }
   ```
3. Commit y push
4. Imagen asociada: `img/campeon-[nombre].png`

### **Actualizar Resultados**
**Opción actual (Hardcode en JS):**
1. Editar `js/main.js`
2. Buscar objeto `resultsData`
3. Agregar/modificar entrada

**Opción recomendada (Pendiente):**
1. Crear archivo `data/resultados.json`
2. Estructura: Array de fechas
3. Cargar con fetch()

### **Actualizar Clasificación General**
- Excel: `resultados-pdf/general-vi-fecha.xlsx`
- PDF: `resultados-pdf/general-vi-fecha.pdf`
- Subir archivos y hacer commit

### **Actualizar Fechas/Eventos**
1. En `index.html` buscar elemento `.event-card`
2. Modificar fecha, lugar, estado
3. Actualizar links de resultados

### **Cambiar Countdown**
1. En `index.html` línea ~190
2. Modificar fecha: `new Date("Oct 31, 2026 00:00:00")`
3. Actualizar textos de lugar y evento

### **Agregar Página Nueva**
1. Crear nuevo `<section class="page" id="page-nombre">`
2. Agregar link en navbar
3. Agregar handler en JavaScript
4. Estilos en CSS (si es necesario)

---

## 📊 Estadísticas y Datos Clave

### **2026 - LA COPA - Información General**

| Métrica | Valor |
|---------|-------|
| **Total de Fechas** | 7 |
| **Modalidades** | 3 (XCO, XCC, XCE) |
| **Categorías totales** | 15+ |
| **Atletas activos** | ~500 |
| **Años de trayectoria** | 30+ |
| **Géneros** | Masculino, Femenino, Mixto |

### **Fechas 2026**
| Fecha | Ubicación | Modalidades | Estado |
|-------|-----------|-------------|--------|
| I - 21/22 Feb | Finca Grupo Orosi, Paraíso | XCO, XCC | ✅ Finalizada |
| II - 23 Mar | Parque La Libertad, Desamparados | XCO, XCC | ✅ Finalizada |
| III - 16/17 May | Adventure Park, Barva | XCO, XCC | ✅ Finalizada |
| IV - 21/22 Jun | Finca La Hisopa, Turrubares | XCO, XCC | ✅ Finalizada |
| V - 18/19 Jul | Oikoumene, Ochomogo | XCO, XCC | ✅ Finalizada |
| VI - 12/13 Sep | Finca Grupo Orosi, Paraíso | XCO, XCC | ✅ Finalizada |
| VII - 31Oct/1Nov | Sarapiquí | XCO, XCC, XCE | ⏳ Próximo (Gran Final) |

### **Campeones 2026 (Actualizado Septiembre)**
- **E-Bike Masculino Líder:** Aaron Guzmán (Acisa) - 950 puntos
- **Elite Masculino Líder:** Carlos Herrera (PEDREGAL 7C) - 1082 puntos
- **Elite Femenino Líder:** Adriana Rojas (CBZ Asfaltos) - 960 puntos

---

## ⚠️ Notas Importantes

### **Limitaciones Actuales**
- Resultados parcialmente hardcodeados en JS (no es 100% dinámico)
- Algunas páginas (Noticias, Galería) están comentadas temporalmente
- XCE (Cross Country Eliminator) no tiene resultados cargados

### **Planes Futuros**
1. Migrar todos los resultados a JSON
2. Implementar búsqueda de atletas
3. Historial completo de participantes
4. Reactivar página de Noticias
5. Sistema de actualizaciones en tiempo real durante eventos
6. APP móvil nativa

### **Contacto para Soporte**
- **Responsable:** Nancy (Nancyms1012)
- **GitHub:** https://github.com/Nancyms1012
- **Repo:** https://github.com/Nancyms1012/MTB-Costa_Rica

---

## 🔗 Enlaces Importantes

- **Sitio Live:** https://mtbcostarica.org
- **GitHub Repo:** https://github.com/Nancyms1012/MTB-Costa_Rica
- **Rama Activa:** sitio-web-nuevo
- **Dominio:** CNAME a mtbcostarica.org

---

## 📋 Checklist de Mantenimiento Regular

- [ ] Revisar contador de visitas mensualmente
- [ ] Actualizar clasificación después de cada fecha
- [ ] Cargar resultados completos en 48 horas post-evento
- [ ] Verificar links externos (especialmente podcasts)
- [ ] Validar responsive en mobile/tablet/desktop
- [ ] Backup de datos (JSON, imágenes)
- [ ] Revisar analytics si hay disponible
- [ ] Actualizar countdown para próximo evento

---

**Documento actualizado:** Septiembre 2026  
**Última modificación:** Reactivación de contador de visitas  
**Versión:** 2.0
