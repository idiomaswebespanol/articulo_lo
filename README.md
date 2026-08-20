# La complejidad del «LO»

Presentación interactiva en React, TypeScript y Vite sobre las funciones gramaticales de «lo» en español.

## Desarrollo local

```bash
npm install
npm run dev
```

Comprobar la compilación de producción:

```bash
npm run build
npm run preview
```

## Subida manual a GitHub

### Subir el proyecto fuente

Sube estos elementos al repositorio `idiomaswebespanol/articulo_lo`:

- `index.html`
- `package.json` y `package-lock.json`
- `tsconfig.json` y `vite.config.ts`
- `src/`
- `public/`
- `.github/`
- `STYLE_GUIDE.md`
- `README.md`
- `.gitignore`

No subas `node_modules/`, `dist/` ni `node_modules/.cache/`. Se regeneran localmente y `.gitignore` los excluye.

### Publicar el sitio compilado directamente

1. Ejecuta `npm run build`.
2. En GitHub Pages selecciona la rama y carpeta donde publicarás el sitio.
3. Si publicas el contenido de `dist/` en la raíz de una rama de Pages, sube `dist/index.html`, `dist/assets/` y `dist/images/` manteniendo esa estructura.
4. El repositorio ya usa la ruta `/articulo_lo/`, que coincide con el nombre del repositorio actual.

No mezcles el proyecto fuente y el contenido de `dist/` dentro de la misma carpeta publicada: son dos formas distintas de desplegarlo.
