# 🛸 Rick y Morty · Favoritos 2026

Aplicación web desarrollada con **React + Vite** que consume **The Rick and Morty API**, permite buscar personajes por nombre, filtrarlos por género y guardar una lista de favoritos que se conserva al recargar la página.

Este proyecto corresponde al **Trabajo Práctico Sprint 4** y representa la evolución de la lista de lugares favoritos (Sprint 2) y de la arquitectura con Context API y persistencia del Sprint 3. En esta versión los datos ya no son locales: se obtienen de una **API pública** mediante `fetch`, con manejo de estados de carga y error, manteniendo `useState`, `useEffect`, hooks personalizados y LocalStorage.

---

## 🌎 Demo Online

## 🔗 **Deploy:** (https://rick-morty-favoritos.netlify.app/)

---

## 🛠️ Tecnologías Utilizadas

- React 19
- Vite 8
- JavaScript (ES6+)
- Fetch API
- The Rick and Morty API
- Context API
- Tailwind CSS v4
- LocalStorage API
- Material Symbols (iconografía)
- ESLint

---

## 📦 Dependencias Principales

| Dependencia          | Uso                                              |
| -------------------- | ------------------------------------------------ |
| React                | Construcción de interfaces de usuario            |
| Vite                 | Bundler y entorno de desarrollo                  |
| Tailwind CSS         | Estilos utilitarios, tokens y diseño responsive  |
| Fetch API            | Consumo de la API (nativo del navegador)         |
| Context API          | Manejo de estado global (favoritos y tema)       |
| LocalStorage         | Persistencia de favoritos y preferencia de tema  |
| ESLint               | Calidad y consistencia del código                |

> No se instalaron librerías extra para las peticiones: se usa `fetch`, que ya viene integrado en el navegador.

---

## 🎯 Objetivos del Sprint

- Consumir una API pública y mostrar sus datos en la interfaz.
- Mantener `useState`, `useEffect`, hooks personalizados y LocalStorage de los sprints anteriores.
- Manejar los estados de **carga**, **error** y **sin resultados** de forma visible.
- Hacer que la búsqueda y los filtros se resuelvan **en la API**, no sobre datos ya traídos.
- Guardar favoritos que persistan al recargar.
- Compartir el estado de favoritos y de tema mediante Context, evitando prop drilling.
- Usar variables de entorno para la URL de la API.
- Mantener una arquitectura organizada y escalable.

---

## 📋 Funcionalidades

### 🔍 Búsqueda de personajes

- Búsqueda por nombre contra la API, no sobre datos locales.
- Debounce de 400 ms para no disparar una petición por cada tecla.
- Cancelación automática de la petición anterior al cambiar la búsqueda.
- Estado "sin resultados" con botón para volver a ver todos los personajes.

### 🧬 Filtro por género

- Botones: Todos, Femenino, Masculino, Sin género y Desconocido.
- El filtro viaja a la API (`?gender=...`) y se combina con el nombre.
- Las opciones son fijas: no dependen de los resultados de la búsqueda.

### 🃏 Tarjetas de personajes

- Imagen con carga diferida (`loading="lazy"`).
- Nombre, género, especie, estado y origen, traducidos al español.
- Botón dinámico para agregar o quitar de favoritos.

### ⏳ Estados de carga y error

- Indicador de carga mientras se espera la respuesta.
- Mensajes distintos para falta de conexión, error del servidor y respuesta inválida.
- Un 404 de la API se interpreta como "sin resultados", no como un error.

### ❤️ Favoritos

- Agregar y quitar personajes desde la tarjeta o desde el panel.
- Contador de favoritos en la barra de navegación.
- Panel lateral con la lista de favoritos.
- Vaciar la lista completa con confirmación previa.

### 💾 Persistencia de datos

- Los favoritos se guardan en LocalStorage (clave `favoritos`).
- Recuperación automática al recargar la aplicación.
- Lectura inicial lazy para optimizar el rendimiento.

### 🌙 Tema claro / oscuro

- Alternancia entre modos visuales.
- Persistencia de la preferencia del usuario (clave `theme-mode`).
- Aplicación global mediante Context API.

### 🌐 Traducción de datos

- Los valores que devuelve la API (estado, especie, género y origen) se muestran en español mediante `constants/translations.js`.
- Si un valor no está en el diccionario, se muestra el original.

---

# 🏗️ Organización del Proyecto

La aplicación fue estructurada separando responsabilidades por dominio:

- **components/** contiene componentes reutilizables.
- **favoritos/** agrupa el panel lateral de favoritos.
- **layout/** agrupa elementos permanentes de la interfaz.
- **personajes/** contiene la tarjeta y la lista de personajes.
- **ui/** contiene componentes genéricos: modales y estados de carga y error.
- **constants/** almacena los diccionarios de traducción.
- **context/** centraliza estados globales.
- **hooks/** encapsula lógica reutilizable.
- **services/** concentra el acceso a la API (único lugar donde se hace `fetch`).
- **views/** representa las pantallas principales de la aplicación.

---

# 🌐 Consumo de la API

## The Rick and Morty API

| Dato            | Valor                                     |
| --------------- | ----------------------------------------- |
| URL base        | `https://rickandmortyapi.com/api`         |
| Endpoint usado  | `GET /character`                          |
| Documentación   | https://rickandmortyapi.com/documentation |
| Autenticación   | No requiere                               |

### Parámetros que usa la aplicación

| Parámetro | Valores                                 | Origen                        |
| --------- | --------------------------------------- | ----------------------------- |
| `name`    | Texto libre (coincidencia parcial)      | Caja de búsqueda              |
| `gender`  | `female`, `male`, `genderless`, `unknown` | Botones de filtro por género |

Ejemplo de consulta: `https://rickandmortyapi.com/api/character/?name=rick&gender=male`

### Datos que se utilizan de cada personaje

`id`, `name`, `image`, `gender`, `species`, `status` y `origin.name`. Cada consulta devuelve hasta 20 personajes.

## Variables de entorno

La URL de la API no está escrita en el código: se lee de `import.meta.env.VITE_API_URL`.

| Variable       | Descripción                                            |
| -------------- | ------------------------------------------------------ |
| `VITE_API_URL` | URL base de la API (`https://rickandmortyapi.com/api`) |

El repositorio incluye `.env` y `.env.example` con ese valor.

## Flujo del dato

1. El usuario escribe en el input (`busqueda`) o elige un género (`genero`): ambos son estado local de `BuscadorBar`.
2. `useDebounce(busqueda)` espera a que deje de escribir y devuelve `nombre`.
3. `useBuscarPersonajes(nombre, genero)` ejecuta un `useEffect` con esas dos dependencias.
4. El efecto crea un `AbortController`, activa `loading` y llama a `buscarPersonajes()` del servicio.
5. El servicio arma la URL con `URLSearchParams`, hace el `fetch` y devuelve la lista de personajes.
6. El hook guarda `personajes` y expone `{ personajes, loading, error }`.
7. `BuscadorBar` renderiza según el estado: carga, error, lista vacía o lista de tarjetas.
8. Cada tarjeta consulta `esFavorito(id)` en `FavoritosContext`.

## Manejo de errores

| Situación                | Cómo se detecta                       | Qué hace la aplicación                                  |
| ------------------------ | ------------------------------------- | ------------------------------------------------------- |
| Sin resultados           | Respuesta HTTP 404                    | Devuelve lista vacía y muestra el estado "sin resultados" |
| Sin conexión             | `fetch` rechaza la promesa            | Mensaje: no se pudo conectar con el servidor            |
| Error del servidor       | `respuesta.ok` es falso (500, 502...) | Mensaje con el código HTTP recibido                     |
| Respuesta inválida       | Falla `respuesta.json()`              | Mensaje: formato de respuesta no válido                 |
| Petición cancelada       | `AbortError`                          | Se ignora: es una cancelación intencional               |
| Variable de entorno vacía | `VITE_API_URL` sin definir           | Mensaje de error de configuración                       |

El `try/catch` del servicio envuelve únicamente el `fetch`, para que cada error conserve su propio mensaje.

---

# 🧠 Contextos Globales

## FavoritosContext

### Qué guarda

- favoritos

### Funciones disponibles

- esFavorito(id)
- toggleFavorito(personaje)
- vaciarFavoritos()

### Quién lo consume

- Navbar
- PersonajeCard
- FavoritosPanel

### Por qué es global

La lista de favoritos es utilizada por componentes ubicados en ramas distintas del árbol: el contador del Navbar, cada tarjeta de personaje y el panel lateral. Context permite evitar prop drilling y centralizar toda la lógica en un solo lugar.

---

## ThemeContext

### Qué guarda

- isDark
- toggleTheme()

### Quién lo consume

- Navbar

### Por qué es global

Aunque hoy solo se utiliza desde la navegación principal, el tema representa una configuración general de la aplicación que potencialmente puede ser consumida por cualquier componente futuro.

---

# 🎣 Hooks Personalizados

## useLocalStorage(key, initialValue)

Hook genérico encargado de sincronizar estado con LocalStorage.

### Responsabilidades

- Lectura inicial lazy.
- Persistencia automática.
- Parseo y serialización JSON.
- Reutilización para distintos dominios (favoritos y tema).

---

## useBuscarPersonajes(nombre, gender)

Hook de dominio que encapsula el consumo de la API.

### Devuelve

```js
{ personajes, loading, error }
```

### Responsabilidades

- Disparar la petición cada vez que cambia el nombre o el género.
- Cancelar la petición anterior con `AbortController`.
- Manejar los estados de carga y error.
- Evitar que una respuesta vieja pise a una más nueva.

---

## useDebounce(valor, delay)

Hook reutilizable que devuelve un valor recién cuando dejó de cambiar durante `delay` milisegundos (400 por defecto).

### Se utiliza para

- No consultar la API en cada tecla del buscador.

---

## useFavoritos()

Hook de dominio que encapsula toda la lógica de favoritos.

### Devuelve

```js
{ favoritos, esFavorito, toggleFavorito, vaciarFavoritos }
```

### Responsabilidades

- Agregar y quitar personajes.
- Guardar un resumen del personaje (no solo el id).
- Persistencia mediante `useLocalStorage`.

---

## useToggle(initialState)

Hook reutilizable para estados booleanos.

### Devuelve

```js
[estado, toggle, abrir, cerrar];
```

### Se utiliza para

- Panel de favoritos.
- Modal de confirmación al vaciar la lista.
- Cualquier estado de apertura o cierre.

---

# 📊 Decisiones de Estado

## Estado Global

Se decidió utilizar Context únicamente para información compartida por múltiples ramas del árbol:

### Favoritos

Necesarios en:

- Navbar
- Tarjetas de personajes
- Panel de favoritos

### Tema

Configuración visual aplicable a toda la aplicación.

---

## Estado Local

### Búsqueda y filtro de género

Permanecen en `BuscadorBar.jsx` porque únicamente esa vista necesita acceder a dicha información.

### Apertura del panel de favoritos

Permanece como estado de layout en `App.jsx`, porque lo comparten el Navbar (que lo abre) y el panel (que lo muestra).

### Modal de confirmación

Se mantiene dentro de `FavoritosPanel.jsx` porque ningún otro componente requiere conocer ese estado.

### Personajes, carga y error

Los administra `useBuscarPersonajes`: son datos que dependen de la búsqueda y no se comparten con otros componentes.

---

## ⚙️ Decisiones técnicas

- **`fetch` en vez de `axios`:** se usó `fetch` porque ya viene integrado en el navegador (no hay que instalar ni sumar una dependencia) y se consideró suficiente para este proyecto, que solo hace peticiones GET simples. La contrapartida es que `fetch` no rechaza ante errores HTTP (un 500 resuelve igual la promesa), así que hay que revisar `respuesta.ok` a mano, y eso se hace en `personajesApi.js`. `axios` lo resolvería solo, pero para este alcance no justifica una dependencia más.
- **Servicio + hook + vista:** `personajesApi.js` arma la URL y traduce los errores a mensajes claros; `useBuscarPersonajes` maneja el estado y el ciclo de vida; los componentes solo renderizan. Si cambia la API, solo se toca el servicio.
- **Filtro por género enviado a la API:** no se filtra sobre los resultados ya traídos. Así el filtro alcanza a todos los personajes de la API y no solo a los 20 de la página actual.
- **`AbortController`:** al cambiar la búsqueda se cancela la petición anterior. El `finally` del hook solo apaga `loading` si la petición no fue cancelada, para que el indicador no desaparezca con otra petición en curso.
- **Debounce:** evita una petición por cada tecla.
- **404 como "sin resultados":** esta API responde 404 cuando ningún personaje coincide, y eso es un resultado válido, no un error.
- **Favoritos con resumen del personaje:** se guardan `id`, `name`, `image`, `status` y `species`, porque al cambiar la búsqueda el personaje ya no viene en los resultados.
- **`Modal` genérico y `ConfirmationModal` por composición:** `Modal` solo muestra una caja y se cierra con Escape; `ConfirmationModal` se construye encima, sin duplicar el fondo ni la caja.

---

# 🔁 Prop Drilling: Antes y Después

## Antes

App.jsx tendría que distribuir múltiples props relacionadas con los favoritos:

- favoritos
- esFavorito
- toggleFavorito
- vaciarFavoritos

Estas props atravesarían componentes intermedios (`BuscadorBar`, `PersonajeList`) que no las consumen directamente.

## Después

Cada componente obtiene únicamente lo que necesita mediante:

```js
useFavoritosContext();
useThemeContext();
```

De esta forma:

- Se elimina el prop drilling.
- Se reduce el acoplamiento.
- Mejora la escalabilidad.
- Se simplifica el mantenimiento de la aplicación.

---

# 📁 Estructura del Proyecto

```text
src/
├── components/
│   ├── favoritos/
│   │   └── FavoritosPanel.jsx
│   │
│   ├── layout/
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   │
│   ├── personajes/
│   │   ├── PersonajeCard.jsx
│   │   └── PersonajeList.jsx
│   │
│   └── ui/
│       ├── Cargando.jsx
│       ├── ConfirmationModal.jsx
│       ├── MensajeError.jsx
│       └── Modal.jsx
│
├── constants/
│   └── translations.js
│
├── context/
│   ├── FavoritosContext.jsx
│   └── ThemeContext.jsx
│
├── hooks/
│   ├── useBuscarPersonajes.js
│   ├── useDebounce.js
│   ├── useFavoritos.js
│   ├── useLocalStorage.js
│   └── useToggle.js
│
├── services/
│   └── personajesApi.js
│
├── views/
│   └── BuscadorBar.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# ▶️ Instalación y Ejecución

### Clonar el repositorio

```bash
git clone https://github.com/juanpi24/Sprint4-TP4-Rick-Morty-Favoritos.git
```

### Ingresar a la carpeta del proyecto

```bash
cd Sprint4-TP4-Rick-Morty-Favoritos
```

### Instalar dependencias

```bash
npm install
```

### Variables de entorno

El repositorio ya incluye un `.env`. Si no estuviera, copiá el ejemplo:

```bash
cp .env.example .env
```

### Ejecutar el servidor de desarrollo

```bash
npm run dev
```

### Generar build de producción

```bash
npm run build
```

### Visualizar build localmente

```bash
npm run preview
```

### Revisar el código con ESLint

```bash
npm run lint
```

---

# ✨ Funcionalidades adicionales

Esta sección amplía la documentación anterior con detalles del comportamiento de la aplicación.

## Panel de favoritos y protección de acciones

- El panel lateral se cierra con la tecla Escape o haciendo clic en el fondo.
- Mientras se confirma el vaciado, Escape cierra únicamente la confirmación y no el panel.
- Antes de vaciar la lista se solicita confirmación; al confirmar, se vacía y se cierra el panel.
- Si no hay favoritos, el panel muestra un mensaje para guiar al usuario.

## Estados de la búsqueda

- Mientras se espera la respuesta se muestra un indicador de carga.
- Si la búsqueda no encuentra personajes, se ofrece un botón para limpiar la búsqueda y el filtro.
- Si falla la conexión o el servidor, se muestra un mensaje de error claro en lugar de dejar la pantalla vacía.

## Preferencia inicial del tema

- Si todavía no existe una preferencia guardada, la aplicación toma inicialmente el tema claro u oscuro configurado en el sistema operativo.
- Luego, la selección manual se guarda en LocalStorage y se aplica globalmente.

## Limitaciones conocidas

- Cada búsqueda muestra hasta 20 resultados (la primera página que devuelve la API); no hay paginación.
- Los datos de favoritos se guardan en el navegador: no se comparten entre dispositivos.

---

# 🚀 Conceptos Aplicados

- Consumo de API con `fetch` y `async/await`.
- `useState` y `useEffect` con array de dependencias y función de limpieza.
- Cancelación de peticiones con `AbortController`.
- Custom Hooks.
- Debounce.
- Context API.
- Persistencia con LocalStorage.
- Variables de entorno con Vite (`import.meta.env`).
- Renderizado condicional (carga, error, vacío y lista).
- Listas con `key` estable.
- Estado global y estado local.
- Manejo inmutable de arrays y objetos.
- Composición de componentes.
- Separación de responsabilidades (servicio, hook y vista).
- Eliminación de prop drilling.

---

# 🤖 Uso de Inteligencia Artificial

Durante el desarrollo del proyecto utilicé Claude (Anthropic) como apoyo para comprender conceptos, validar decisiones técnicas, revisar mi código y mejorar algunas implementaciones específicas.

## Qué partes desarrollé con ayuda de IA

- Análisis de mi proyecto del Sprint 3 para decidir qué reutilizar (`useLocalStorage`, `useToggle`, `Modal`, `ConfirmationModal`, `ThemeContext`, `Navbar`, `Footer`) y qué descartar (carrito, checkout y validaciones).
- Estructura del consumo de la API: servicio `personajesApi.js`, hook `useBuscarPersonajes`, debounce y cancelación con `AbortController`.
- Armado de la URL para filtrar la API con `URLSearchParams` y tratamiento del 404 como "sin resultados".
- Traducción de las constantes de la API al español (`constants/translations.js`).
- Favoritos y Context: `useFavoritos`, `FavoritosContext`.
- Adaptación de los componentes a mis tokens de Tailwind (`index.css`) y al modo oscuro.
- Vaciado de la lista de favoritos con `ConfirmationModal`, usando mi `Modal` genérico.
- Revisión final del repositorio, que detectó puntos a corregir: el filtro por género se hacía en el cliente, un `try/catch` pisaba los mensajes de error HTTP, había archivos sin usar con imports rotos, el panel y la confirmación se cerraban juntos con Escape, y faltaban ajustes en `index.html` y en este README.
- Funcionalidades que exploré con IA y que no están en esta versión final: paginación, filtros por estado y especie, y búsqueda por palabras clave escritas en la caja de búsqueda.

## Qué revisé o corregí manualmente

- Elegí la API, el alcance del trabajo y qué funcionalidades dejar en la versión final.
- Reutilicé mis propios componentes del Sprint 3 (`Modal`, `ConfirmationModal` y mi sistema de tokens de `index.css`).
- Adapté las soluciones propuestas a la estructura específica del proyecto: organización de carpetas (`personajes/`, `favoritos/`, `layout/`, `ui/`, `constants/`) y la vista `BuscadorBar`.
- Revisé las correcciones propuestas por la IA sobre mi repositorio y las apliqué.

## Qué tipo de consultas realicé

- Consumo de una API pública con `fetch` y `useEffect`.
- Manejo de estados de carga, error y "sin resultados".
- Cancelación de peticiones y condiciones de carrera.
- Filtros enviados a la API mediante parámetros de URL.
- Buenas prácticas para Context API y Custom Hooks.
- Adaptación de estilos con Tailwind CSS.
- Revisión de código.

---

## 👨‍💻 Autor

**Juan Pablo Millicay**

Proyecto realizado como parte del proceso de formación en desarrollo Frontend con React.
