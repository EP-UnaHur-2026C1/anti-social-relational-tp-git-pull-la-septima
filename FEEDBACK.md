# Feedback del Trabajo Práctico

## Integrantes

Integrantes identificados a partir de los commits del repositorio:

- **Cris Ramírez**
- **Lucas Carrasco** (`Lucas Carrasco` / `Carrasco`)
- **Nicolás Blanco**
- **Nicolás Dondero** (`NicolasDondero`)
- **Marcos**

> Se observa trabajo repartido entre los integrantes del equipo. 👏

---

## Resumen General

¡Buen trabajo! 🎉 La entrega cubre el MVP de `ENUNCIADO.md` con una arquitectura en capas ordenada (controllers / db / middlewares / routes / schemas), modelado completo de relaciones, migraciones y validaciones con Joi. Implementaron además el **bonus de upload de imágenes** con `multer` (y, muy bien, también borran los archivos del disco al eliminar el post), y analizaron en `BONUS.txt` cómo encarar seguidores y caché. 👏

Hay dos puntos a ajustar que tienen impacto en el uso real: cómo se aplica la regla de los comentarios antiguos, y la puesta en marcha del proyecto (creación de tablas). Ambos son acotados y se apoyan en una base bien construida.

### Estado por criterio

| Criterio        | Estado | Comentario breve |
|-----------------|:------:|------------------|
| Arquitectura    |   ✅   | Capas claras + middlewares genéricos y por entidad. |
| Modelado        |   ✅   | Relaciones completas, `nickname` único, `onDelete: CASCADE`. |
| Validaciones    |   ✅   | Joi + `validateSchema`/`validateId` genéricos. |
| Middlewares     |   ✅   | Genéricos reutilizables y específicos por entidad. |
| API REST        |   ✅   | CRUD + relaciones + upload de imágenes. |
| Configuración   |   ⚠️   | Falta crear tablas al iniciar; regla de meses no automática (Obs. 1 y 2). |
| Documentación   |   ⚠️   | Swagger presente; faltan instrucciones y colección de prueba (Obs. 3). |

---

## Fortalezas

### 1. Upload de imágenes bien resuelto 📷
**Ubicación:** `src/controllers/post.controller.js`, `src/middlewares/upload.middleware.js`, `src/main.js`

El bonus de imágenes está completo: usan `multer` (`upload.array('images', 10)`), guardan los archivos y los sirven como estáticos en `/media`, y —detalle muy bueno— al borrar un post **también eliminan los archivos del disco** con `fs.unlink`. Eso evita acumular imágenes huérfanas. 👌

### 2. Middlewares genéricos reutilizables ♻️
**Ubicación:** `src/middlewares/generic.middleware.js`

`validateId(modelo)` valida formato + existencia para **cualquier** modelo, y `validateSchema(Schema)` centraliza la validación con Joi. Sumado a los middlewares por entidad, las rutas quedan muy declarativas (ver `post.routes.js`).

### 3. Modelado completo y prolijo 🗃️
**Ubicación:** `src/db/models/`

- `nickname` definido como **único**.
- Relaciones completas: 1:N (User→Post, User→Comment, Post→Comment, Post→Post_Images) y N:M (Post↔Tag), con `onDelete: CASCADE` en imágenes y comentarios para mantener consistencia al borrar un post.
- Modelaron `antiguedadMes` como atributo **VIRTUAL** y dejaron la cantidad de meses en una variable de entorno (`MESES_VISIBILIDAD`). La base para la regla de negocio está bien pensada.

### 4. Creación de posts flexible 📝
**Ubicación:** `src/controllers/post.controller.js` (`createPost`), `src/schemas/post.schema.js`

Al crear un post se aceptan imágenes (opcionales) y tags (array de ids), y el `postSchema` no obliga a enviar imágenes, respetando que sean opcionales. Luego se devuelve el post con sus relaciones incluidas.

---

## Observaciones

### 1. La regla de los comentarios antiguos no se aplica de forma automática

**Estado:** ⚠️  **Severidad:** 🟠 Importante
**Ubicación:** `src/controllers/post.controller.js` (`getPosts`, `getOnePostByUser`), `src/controllers/comment.controller.js`

**Descripción:**
La visibilidad está resuelta con un flag `visible` que se actualiza mediante un endpoint **manual** (`updateVisibilityByMonth`), que recalcula `visible = antiguedadMes < MESES` para todos los comentarios. El problema es doble:

1. En la **visualización de los posts** (`getPosts`, `getOnePostByUser`) los comentarios se incluyen **sin filtrar** (`include: ['comments']`), así que se muestran todos, viejos incluidos.
2. Aun en `getCommentsByPost` (que sí filtra por `visible: true`), el flag solo es correcto si alguien llamó antes a `updateVisibilityByMonth`. Un comentario que “cumple” 6 meses no se oculta solo.

**Impacto:**
La regla de negocio central queda dependiendo de un paso manual y no se aplica donde más importa (al ver el post con sus comentarios).

**Recomendación:**
Filtrar por fecha directamente en la lectura, para que sea automático y no haga falta el batch. Por ejemplo, en los `include` de los posts:

```js
const meses = Number(process.env.MESES_VISIBILIDAD ?? 6);
const limite = new Date();
limite.setMonth(limite.getMonth() - meses);
// include: [{ model: Comment, as: 'comments', where: { fecha_publicacion: { [Op.gte]: limite } }, required: false }]
```

---

### 2. El proyecto no crea las tablas al iniciar

**Estado:** ⚠️  **Severidad:** 🟠 Importante
**Ubicación:** `src/main.js`

**Descripción:**
`main.js` solo hace `sequelize.authenticate()`, sin `sequelize.sync()`. Las tablas se crean únicamente corriendo las migraciones, pero no hay un script npm para eso (`package.json` solo tiene `dev`/`start`/`test`) ni instrucciones en el README. En un clon nuevo, `npm run dev` levanta el server pero las consultas fallan porque las tablas no existen.

**Impacto:**
Dificulta poner en marcha el proyecto: quien lo clone necesita saber que primero debe correr `npx sequelize-cli db:migrate` (paso hoy no documentado).

**Recomendación:**
Elegir una de estas opciones: (a) agregar `await sequelize.sync()` en el arranque (lo más simple para esta materia), o (b) mantener las migraciones pero documentar el paso en el README y/o agregar un script `"db:migrate": "sequelize-cli db:migrate"`.

---

### 3. Detalles menores (para una próxima pasada)

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada

- **`config.json`:** en `test` y `production` el dialecto figura como `"sqlite3"`, que no es un dialecto válido de Sequelize (debe ser `"sqlite"`). Además, en SQLite la ruta del archivo va en `storage`, no en `host`.
- **Colección de prueba:** el enunciado pide entregar una colección (Postman o JSON). Tienen Swagger, pero no encontramos la colección; sería bueno sumarla.
- **`updateUser`** responde con el `req.body` recibido en lugar del registro actualizado; conviene devolver el usuario tras releerlo para reflejar el estado real.

---

## Conclusión

Es una entrega sólida y con buen trabajo de equipo: arquitectura clara, modelado completo con borrado en cascada, validaciones genéricas y el bonus de upload muy bien resuelto (incluido el borrado de archivos). 🌟

Los dos focos principales son **hacer automática la regla de los comentarios** (filtrando por fecha en la lectura, ya tienen la variable de entorno) y **asegurar la creación de tablas** al iniciar. Con esos ajustes, el proyecto queda listo para usarse sin pasos manuales. ¡Felicitaciones y sigan así! 🚀
