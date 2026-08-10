# Utils

Utils es una aplicacion web de herramientas para developers. Reune utilidades comunes para trabajar con JSON, XML, CSV, Base64, JWT, URLs, UUIDs, timestamps y hashes desde una sola interfaz.

Todas las transformaciones se ejecutan localmente en el navegador. La aplicacion no utiliza backend ni envia los datos introducidos a servidores externos.

## Demo

La aplicacion esta publicada en GitHub Pages:

```text
https://jenner2017.github.io/utils/
```

## Herramientas

- **JSON Formatter**: valida, formatea y minimiza JSON.
- **JSON Escape**: escapa y desescapa contenido de texto JSON.
- **XML <-> JSON**: convierte documentos XML y JSON localmente.
- **CSV <-> JSON**: convierte datos tabulares, incluyendo rutas anidadas en encabezados CSV.
- **Base64**: codifica y decodifica texto Unicode en Base64.
- **URL Encode / Decode**: codifica, decodifica e inspecciona parametros de URL.
- **JWT Decoder**: muestra el header y payload de un JWT sin verificar su firma.
- **Timestamp Converter**: convierte timestamps Unix y fechas entre UTC, hora local e ISO 8601.
- **UUID Generator**: genera UUID v4 usando las APIs criptograficas del navegador.
- **Hash Generator**: genera hashes SHA-256, SHA-384 y SHA-512 usando Web Crypto API.

## Privacidad

Utils esta disenada para trabajar sin backend. El contenido introducido por el usuario permanece en el navegador y no se envia a servicios externos.

La decodificacion de un JWT no verifica su firma ni confirma que el token sea valido.

## Tecnologia

- Angular 22
- Standalone components
- Angular Router con lazy loading
- Signals y control flow moderno de Angular
- TypeScript con configuracion estricta
- Web APIs nativas: Clipboard, Web Crypto, DOMParser, URL, TextEncoder y TextDecoder
- Space Grotesk para la interfaz
- JetBrains Mono para contenido tecnico

No se utilizan dependencias externas para realizar las transformaciones de datos.

## Estructura

```text
src/app/
├── layout/
│   ├── main-layout/
│   └── sidebar/
├── features/
│   ├── converters/
│   ├── generators/
│   ├── json/
│   └── web/
└── shared/
    └── components/
```

Cada herramienta es un componente standalone independiente y se carga de forma lazy mediante Angular Router.

## Desarrollo local

Requisitos:

- Node.js compatible con Angular 22
- npm

Instala las dependencias:

```bash
npm ci
```

Inicia el servidor de desarrollo:

```bash
npm start
```

Abre `http://localhost:4200/` en el navegador.

## Build y tests

Ejecuta el build de produccion:

```bash
npm run build
```

El resultado se genera en:

```text
dist/utils/browser
```

Ejecuta los tests en modo no interactivo:

```bash
npm test -- --watch=false
```

## GitHub Pages

El despliegue se ejecuta automaticamente mediante:

```text
.github/workflows/deploy.yml
```

El workflow se ejecuta al hacer push sobre `master` y realiza estos pasos:

1. Instala las dependencias con `npm ci`.
2. Construye Angular usando `--base-href /utils/`.
3. Publica `dist/utils/browser` como artefacto de GitHub Pages.
4. Despliega el artefacto en el entorno `github-pages`.

La aplicacion utiliza hash routing para funcionar correctamente en GitHub Pages:

```text
https://jenner2017.github.io/utils/#/json/formatter
```
