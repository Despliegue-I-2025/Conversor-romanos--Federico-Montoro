# Conversor de Números Romanos (A2R / R2A)

API sencilla en Node.js que convierte números arábigos a romanos y números romanos a arábigos.

El servidor expone dos endpoints:

- `GET /api/a2r?value=<numero>` → convierte arábigo a romano.
- `GET /api/r2a?value=<romano>` → convierte romano a arábigo.

---

## Requisitos previos

- Node.js 18 o superior
- Cuenta en Vercel + proyecto vinculado
- Acceso de administrador al repositorio (crear GitHub Secrets)
- Git instalado

---

## Instalación local

```bash
git clone <URL_DEL_REPO>
cd <CARPETA_DEL_REPO>
npm install
npm test
npm start

Servidor local:

http://localhost:3000


Ejemplos:

GET http://localhost:3000/api/a2r?value=10
→ { "input": 10, "output": "X" }

GET http://localhost:3000/api/r2a?value=XLII
→ { "input": "XLII", "output": 42 }

Endpoints
✔ GET /api/a2r?value=<numero>

Convierte un entero positivo (1–3999).

Ejemplo:

/api/a2r?value=1999
→ { "input": 1999, "output": "MCMXCIX" }

✔ GET /api/r2a?value=<romano>

Convierte un número romano válido.

Ejemplo:

/api/r2a?value=XXI
→ { "input": "XXI", "output": 21 }


Si el valor no es válido → error 400 Bad Request.

Despliegue continuo en Vercel (CI/CD)

Este proyecto incluye un flujo automático usando GitHub Actions.
Cada push a la rama main ejecuta:

npm ci
npm test
npx vercel pull --yes --environment=production
npx vercel build --prod
npx vercel deploy --prebuilt --prod

Configuración inicial (solo 1 vez)
1️⃣ Autenticarse y vincular proyecto
npm install --global vercel
vercel login
vercel link


📌 Esto crea la carpeta .vercel/ (no subir a GitHub)
Allí están los valores:

orgId

projectId

2️⃣ Crear un token de acceso
vercel tokens create tateti-ci


Guardar el valor (solo se muestra una vez).

3️⃣ Crear GitHub Secrets

En GitHub → Settings → Secrets and variables → Actions → New repository secret:

Nombre del Secret	Valor
VERCEL_TOKEN	Token generado en el paso 2
VERCEL_ORG_ID	orgId de .vercel/project.json
VERCEL_PROJECT_ID	projectId de .vercel/project.json
4️⃣ Push a main 🚀

📌 GitHub Actions ejecuta el pipeline y despliega en Vercel automáticamente.

Ver estado:

Pestaña Actions en GitHub

Dashboard de Vercel

Ejemplo de URL final:

https://convertidor-a2r-r2a.vercel.app

Personalización

Cambiar rama de despliegue → editar on.push.branches en .github/workflows/deploy-vercel.yml

Saltar pruebas → borrar paso “Run tests” del YAML

Scripts útiles
Comando	Descripción
npm start	Inicia servidor local
npm test	Ejecuta Jest
npm i	Instala dependencias
Licencia

Proyecto educativo – libre uso para prácticas.
