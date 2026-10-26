# VIZA DESIGN — Frontend conectado al backend

## Configuración revisada
- Frontend Angular: `http://localhost:4200`
- Backend ASP.NET Core: `http://localhost:5205`
- API base URL: `src/app/core/config/api.config.ts`
- El backend ya incluye una política CORS que permite `http://localhost:4200`.
- Los servicios Angular usan las rutas que existen en los controladores del backend:
  - `GET /api/categorias`
  - `GET /api/categorias/{slug}/trabajos`
  - `GET /api/trabajos` y `GET /api/trabajos/{id}`
  - `POST /api/auth/login`, `GET /api/auth/yo`, `POST /api/auth/cambiar-password`
  - `POST /api/clientes`
  - `/api/mis-pedidos...`
  - `POST /api/pedidos`

## Cómo ejecutarlo
1. Abre el backend `ProyectoFinal-DW2` en Visual Studio.
2. Revisa `appsettings.json` y confirma que `ConnectionStrings:Default` tenga la conexión correcta a tu PostgreSQL.
3. Ejecuta el backend con el perfil HTTP, que escucha en `http://localhost:5205`.
4. Comprueba `http://localhost:5205/api/salud`. Debe indicar `estado: OK` y `baseDeDatos: Conectada`.
5. Abre la carpeta `fronted-viza-desing` en VS Code.
6. Ejecuta:
   ```bash
   npm install
   ng serve -o
   ```
7. Entra en `http://localhost:4200`.

## Si no conecta
- Si aparece `ERR_CONNECTION_REFUSED`, el backend no está ejecutándose en el puerto 5205 o cambió el puerto.
- Si aparece un error CORS, comprueba que la dirección del frontend sea exactamente `http://localhost:4200`.
- Si `api/salud` indica que la base de datos no está disponible, revisa la cadena de conexión y que PostgreSQL esté iniciado.
- Si los datos no aparecen, prueba primero `http://localhost:5205/api/categorias` y `http://localhost:5205/api/trabajos` en el navegador o Scalar.

## Ajustes de compatibilidad realizados
- Los mensajes de error del frontend ahora leen tanto `mensaje` (formato que devuelve el backend) como `message`.
- La validación de contraseña del frontend exige 8 caracteres, igual que el endpoint del backend para cambiar contraseña.

Nota: no se modificó el diseño visual de las páginas ni la lógica de negocio del backend.
