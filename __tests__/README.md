# Conversor de Números Romanos ↔ Arábigos

API en Node.js que convierte números romanos a arábigos y viceversa.
Incluye pruebas automáticas con Jest + Supertest.

---

## 🚀 Endpoints

| Método | Ruta | Parámetro | Ejemplo | Respuesta |
|--------|------|------------|---------|-----------|
| GET | `/r2a` | `roman` | `/r2a?roman=X` | `{ "arabic": 10 }` |
| GET | `/a2r` | `arabic` | `/a2r?arabic=50` | `{ "roman": "L" }` |

---

## 🧪 Testing

Ejecutar:

```bash
npm test
