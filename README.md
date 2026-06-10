# DevPortfolio — Portafolio de Servicios

Aplicación web tipo portafolio profesional multiusuario desarrollada con Angular, Firebase y Strapi CMS.

El sistema permite presentar a los integrantes del equipo, mostrar proyectos y servicios administrados desde Strapi, registrar usuarios externos mediante Firebase Authentication y gestionar solicitudes de contacto almacenadas en Cloud Firestore.

---

## Descripción

DevPortfolio es una aplicación web diseñada para presentar los perfiles profesionales de dos programadores, sus áreas de especialización y los proyectos en los que han participado.

Los visitantes pueden explorar públicamente el portafolio, revisar los perfiles individuales, consultar proyectos y conocer los servicios disponibles.

Para enviar una solicitud de contacto, el visitante debe registrarse o iniciar sesión. Las solicitudes son dirigidas a un programador específico y quedan almacenadas en Cloud Firestore.

Los programadores pueden iniciar sesión con cuentas registradas en Firebase Authentication, consultar las solicitudes que han recibido, registrar una respuesta y cambiar su estado de pendiente a respondida.

---

## Objetivo

Desarrollar una aplicación web profesional y responsive utilizando:

* Angular como frontend.
* Firebase Authentication para registro e inicio de sesión.
* Cloud Firestore para almacenar y actualizar solicitudes.
* Strapi como CMS Headless para administrar el contenido dinámico.
* Tailwind CSS y DaisyUI para el diseño de la interfaz.

---

## Tecnologías utilizadas

### Frontend

* Angular 21
* TypeScript
* HTML5
* Tailwind CSS
* DaisyUI
* Angular Router
* Angular Forms
* HttpClient
* RxJS

### Autenticación y base de datos

* Firebase Authentication
* Inicio de sesión con correo y contraseña
* Registro de usuarios externos
* Inicio de sesión con Google
* Cloud Firestore

### CMS y backend de contenido

* Strapi CMS
* API REST
* SQLite en desarrollo local
* Gestión de archivos e imágenes desde Strapi

### Control de versiones

* Git
* GitHub
* Ramas de trabajo
* Pull Requests

---

## Arquitectura del sistema

La aplicación utiliza una arquitectura distribuida con separación de responsabilidades.

```text
Usuario
   |
   v
Angular Frontend
   |
   |----------------------------|
   |                            |
   v                            v
Firebase                    Strapi CMS
   |                            |
   |                            |
Authentication             API REST
Firestore                  Contenido dinámico
   |                            |
   v                            v
Usuarios y solicitudes     Programadores
                           Proyectos
                           Servicios
                           Imágenes
```

### Angular

Angular se encarga de:

* Mostrar la interfaz.
* Gestionar la navegación.
* Consumir los endpoints REST de Strapi.
* Gestionar formularios.
* Validar usuarios autenticados.
* Crear y consultar solicitudes de Firestore.
* Mostrar diferentes opciones según el tipo de usuario.

### Firebase Authentication

Firebase Authentication se utiliza para:

* Registrar usuarios externos.
* Iniciar sesión con correo y contraseña.
* Iniciar sesión con Google.
* Cerrar sesión.
* Mantener la sesión activa.
* Obtener el UID y correo del usuario autenticado.

### Cloud Firestore

Firestore almacena las solicitudes de contacto.

Cada solicitud incluye:

```text
nombre
correo
descripcion
programadorNombre
programadorSlug
uidUsuario
estado
fecha
respuesta
fechaRespuesta
```

### Strapi CMS

Strapi administra el contenido dinámico del portafolio sin necesidad de crear un panel administrativo propio en Angular.

---

## Contenido administrado en Strapi

### Programadores

La colección `Programadores` contiene:

* Nombre completo
* Especialidad
* Descripción breve
* Descripción completa
* Foto de perfil
* Correo
* GitHub
* LinkedIn
* Estado activo
* Slug
* Relación con proyectos

### Proyectos

La colección `Proyectos` contiene:

* Nombre
* Slug
* Descripción breve
* Descripción completa
* Imagen principal
* Tipo de proyecto
* Tecnologías
* Repositorio
* Demo
* Estado destacado
* Relación con uno o varios programadores

Los tipos de proyecto disponibles son:

```text
academico
personal
laboral
simulado
```

### Servicios

La colección `Servicios` contiene:

* Nombre
* Descripción

Ejemplos:

* Desarrollo Web
* Diseño UI/UX
* Integración Firebase

---

## Roles del sistema

### Visitante público

Puede:

* Ver la página principal.
* Consultar programadores.
* Ver perfiles individuales.
* Consultar proyectos.
* Ver detalles de proyectos.
* Consultar servicios.

No puede enviar solicitudes sin autenticarse.

### Usuario externo autenticado

Puede:

* Acceder a todas las secciones públicas.
* Crear solicitudes de contacto.
* Seleccionar un programador.
* Consultar sus solicitudes enviadas.
* Ver el estado de cada solicitud.
* Leer la respuesta enviada por el programador.

### Programador autenticado

Puede:

* Consultar solicitudes dirigidas a su perfil.
* Ver información del solicitante.
* Leer la descripción del proyecto.
* Escribir una respuesta u observación.
* Cambiar el estado de pendiente a respondida.
* Guardar la actualización en Firestore.

La aplicación identifica a un programador comparando el correo de Firebase Authentication con el correo registrado en Strapi.

---

## Funcionalidades implementadas

### Página principal

* Hero de presentación.
* Información general del equipo.
* Cards de ambos programadores.
* Servicios obtenidos desde Strapi.
* Proyectos destacados.
* Botón para crear una solicitud.
* Navegación hacia perfiles individuales.

### Programadores

* Listado dinámico desde Strapi.
* Perfil individual mediante slug.
* Foto e información profesional.
* Enlaces a GitHub y LinkedIn.
* Descripción completa.
* Proyectos asociados.

### Proyectos

* Listado de proyectos.
* Navegación mediante slug.
* Imagen principal.
* Tipo de proyecto.
* Tecnologías.
* Descripción breve y completa.
* Enlace al repositorio.
* Enlace a la demo.
* Programadores participantes.
* Filtro de proyectos destacados en el Home.

### Autenticación

* Registro con correo y contraseña.
* Validación de formularios.
* Inicio de sesión.
* Inicio de sesión con Google.
* Cierre de sesión.
* Persistencia de sesión.
* Protección de rutas con guards.

### Solicitudes

* Creación de solicitudes.
* Fecha automática.
* Estado inicial pendiente.
* Asociación con el UID del usuario.
* Asociación con el programador seleccionado.
* Consulta de solicitudes enviadas.
* Consulta de solicitudes recibidas.
* Respuesta del programador.
* Cambio de estado a respondida.
* Visualización de la respuesta por el usuario.

### Diseño

* Diseño responsive.
* Menú para escritorio.
* Menú hamburguesa para dispositivos móviles.
* Cards, formularios y botones reutilizables.
* Mensajes de error, carga y confirmación.
* Diferenciación entre usuario externo y programador.

---

## Requisitos previos

Antes de ejecutar el proyecto se necesita instalar:

* Node.js
* npm
* Angular CLI
* Git
* Una cuenta de Firebase
* Un proyecto de Strapi configurado

Verificar las instalaciones:

```bash
node --version
npm --version
ng version
git --version
```

---

## Instalación del frontend Angular

Clonar el repositorio:

```bash
git clone https://github.com/dome323/icc-ppw-angular21-proyecto-final.git
```

Entrar a la carpeta:

```bash
cd icc-ppw-angular21-proyecto-final
```

Instalar dependencias:

```bash
npm install
```

Ejecutar Angular:

```bash
ng serve -o
```

La aplicación estará disponible en:

```text
http://localhost:4200
```

---

## Configuración de Firebase

### Crear el proyecto

1. Ingresar a Firebase Console.
2. Crear un proyecto.
3. Agregar una aplicación web.
4. Copiar la configuración de Firebase.
5. Configurar el archivo de entorno de Angular.

Ejemplo:

```typescript
export const environment = {
  firebaseConfig: {
    apiKey: 'REEMPLAZAR',
    authDomain: 'REEMPLAZAR',
    projectId: 'REEMPLAZAR',
    storageBucket: 'REEMPLAZAR',
    messagingSenderId: 'REEMPLAZAR',
    appId: 'REEMPLAZAR'
  }
};
```

No se deben publicar contraseñas, claves privadas ni archivos secretos.

### Configurar Authentication

En Firebase Console:

```text
Authentication
→ Sign-in method
```

Habilitar:

* Correo y contraseña
* Google

Las cuentas de programadores deben crearse manualmente en Firebase Authentication utilizando el mismo correo registrado en Strapi.

### Configurar Firestore

Crear una base de datos de Cloud Firestore.

La aplicación crea y consulta la colección:

```text
solicitudes
```

Ejemplo de reglas básicas:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /solicitudes/{solicitudId} {

      allow create: if request.auth != null
        && request.resource.data.uidUsuario == request.auth.uid;

      allow read, update: if request.auth != null;
    }
  }
}
```

Estas reglas deben revisarse antes de utilizar la aplicación en un entorno de producción.

---

## Configuración de Strapi

El backend Strapi se encuentra en un proyecto separado del frontend Angular.

Estructura recomendada:

```text
Desktop/
├── proyecto-final/
└── backend-strapi/
```

Entrar al backend:

```bash
cd backend-strapi
```

Instalar dependencias:

```bash
npm install
```

Ejecutar Strapi:

```bash
npm run develop
```

Strapi estará disponible en:

```text
http://localhost:1337
```

El panel administrativo estará disponible en:

```text
http://localhost:1337/admin
```

### Permisos públicos

En Strapi se deben habilitar los permisos de lectura necesarios:

```text
Settings
→ Users & Permissions Plugin
→ Roles
→ Public
```

Habilitar `find` y `findOne` para:

* Programadores
* Proyectos
* Servicios

### Recursos importantes de Strapi

Para conservar los registros e imágenes en desarrollo local, se deben mantener:

```text
src
config
public/uploads
.tmp
package.json
package-lock.json
```

La carpeta `node_modules` no necesita compartirse porque puede recuperarse ejecutando:

```bash
npm install
```

---

## Cómo ejecutar el proyecto

Se deben mantener dos terminales abiertas.

### Terminal 1: Strapi

```bash
cd backend-strapi
npm run develop
```

### Terminal 2: Angular

```bash
cd proyecto-final
ng serve -o
```

Servicios locales:

```text
Angular: http://localhost:4200
Strapi:  http://localhost:1337
```

Sin Strapi ejecutándose, Angular no podrá mostrar programadores, proyectos, servicios ni imágenes.

---

## Rutas principales

```text
/                           Página principal
/programadores              Listado de programadores
/programadores/:slug        Perfil individual
/proyectos                   Listado de proyectos
/proyectos/:slug             Detalle de proyecto
/servicios                   Servicios
/login                       Inicio de sesión
/register                    Registro
/contact                     Formulario de solicitud
/mis-solicitudes             Solicitudes del usuario
/solicitudes-recibidas       Solicitudes del programador
```

---

## Guía de usuario externo

### Explorar el portafolio

El visitante puede consultar sin iniciar sesión:

* Inicio
* Programadores
* Perfiles individuales
* Proyectos
* Detalles de proyectos
* Servicios

### Registrarse

1. Seleccionar `Ingresar`.
2. Seleccionar `Regístrate aquí`.
3. Ingresar un correo válido.
4. Crear una contraseña de mínimo seis caracteres.
5. Confirmar la contraseña.
6. Presionar `Registrarse`.

### Iniciar sesión

El usuario puede iniciar sesión mediante:

* Correo y contraseña.
* Cuenta de Google.

### Crear una solicitud

1. Iniciar sesión.
2. Ingresar a `Contacto`.
3. Escribir el nombre del solicitante.
4. Verificar el correo.
5. Seleccionar un programador.
6. Escribir la descripción del proyecto.
7. Presionar `Enviar solicitud`.

La solicitud se guarda con estado inicial:

```text
pendiente
```

### Consultar solicitudes

1. Iniciar sesión.
2. Seleccionar `Mis solicitudes`.
3. Revisar el programador seleccionado.
4. Consultar la descripción.
5. Verificar el estado.
6. Leer la respuesta cuando haya sido registrada.

---

## Guía del programador

### Inicio de sesión

El programador debe iniciar sesión con una cuenta de Firebase cuyo correo coincida exactamente con el correo registrado en Strapi.

### Revisar solicitudes recibidas

1. Iniciar sesión.
2. Seleccionar `Recibidas`.
3. Revisar las solicitudes dirigidas al perfil.
4. Leer el nombre, correo y descripción del solicitante.

### Responder una solicitud

1. Escribir una respuesta u observación.
2. Presionar `Guardar respuesta`.
3. Firestore actualizará la solicitud.
4. El estado cambiará a:

```text
respondida
```

5. El usuario externo podrá consultar la respuesta desde `Mis solicitudes`.

---

## Guía del administrador de Strapi

El administrador puede:

* Crear y editar programadores.
* Activar o desactivar programadores.
* Subir fotografías.
* Administrar proyectos.
* Marcar proyectos como destacados.
* Relacionar proyectos con programadores.
* Administrar servicios.
* Publicar o despublicar contenido.

Después de modificar un registro se debe presionar:

```text
Save
Publish
```

---

## Despliegue

### Compilar Angular

Antes del despliegue:

```bash
ng build
```

La compilación de producción se genera dentro de:

```text
dist/
```

### Firebase Hosting

Instalar Firebase CLI:

```bash
npm install -g firebase-tools
```

Iniciar sesión:

```bash
firebase login
```

Inicializar Hosting:

```bash
firebase init hosting
```

Durante la configuración:

* Seleccionar el proyecto de Firebase.
* Indicar la carpeta generada dentro de `dist`.
* Configurar la aplicación como SPA.
* No sobrescribir el archivo principal si Firebase lo pregunta.

Compilar:

```bash
ng build
```

Desplegar:

```bash
firebase deploy
```

URL del frontend:

```text
REEMPLAZAR_CON_URL_DE_FIREBASE_HOSTING
```

### Despliegue de Strapi

Para que el frontend desplegado pueda consumir contenido, Strapi debe publicarse en Strapi Cloud u otro servicio compatible.

La URL local:

```text
http://localhost:1337/api
```

debe reemplazarse en producción por una URL pública:

```text
https://REEMPLAZAR-DOMINIO-STRAPI/api
```

URL de Strapi:

```text
REEMPLAZAR_CON_URL_PUBLICA_DE_STRAPI
```

---

## Control de versiones y colaboración

El proyecto utiliza ramas separadas:

```text
main
feature-domenica
feature-josue
```

Flujo de trabajo:

```bash
git switch main
git pull origin main
git switch feature-domenica
git merge main
```

Después de realizar cambios:

```bash
git add -A
git commit -m "feat: descripción del cambio"
git push
```

Los cambios se integran mediante Pull Requests hacia `main`.

No se debe utilizar `git push --force` durante el trabajo colaborativo.

---

## Dificultades encontradas

Durante el desarrollo se presentaron los siguientes desafíos:

### Integración entre Angular y Strapi

Fue necesario configurar correctamente los endpoints REST y utilizar `populate=*` para obtener imágenes y relaciones.

### Relaciones entre proyectos y programadores

Se configuró una relación de varios a varios para permitir que un proyecto pueda pertenecer a uno o más programadores.

### Actualización de la interfaz

Algunos datos obtenidos de servicios asíncronos no se reflejaban inmediatamente en la vista, por lo que se utilizó `ChangeDetectorRef` en determinados componentes.

### Autenticación y protección de rutas

Fue necesario esperar la recuperación de la sesión de Firebase antes de permitir o bloquear el acceso mediante guards.

### Diferenciación de roles

Firebase Authentication no contiene por sí mismo el perfil profesional. Por esta razón, el sistema compara el correo autenticado con los programadores registrados en Strapi.

### Gestión de solicitudes

Se implementaron consultas diferentes para mostrar solicitudes enviadas y recibidas. También se agregaron actualizaciones de estado, respuesta y fecha de respuesta.

### Desarrollo colaborativo

Se utilizaron ramas de Git para evitar sobrescribir el trabajo de los integrantes y Pull Requests para integrar los cambios.

### Diseño responsive

Se adaptó el menú, las cards, los formularios y las páginas de detalle para dispositivos móviles, tablets y computadoras.

---

## Pruebas realizadas

Se comprobaron los siguientes flujos:

* Registro de usuario externo.
* Validaciones del formulario.
* Inicio de sesión con correo.
* Inicio de sesión con Google.
* Cierre de sesión.
* Navegación pública.
* Protección del formulario de contacto.
* Creación de solicitud.
* Almacenamiento en Firestore.
* Consulta de solicitudes enviadas.
* Consulta de solicitudes recibidas.
* Respuesta del programador.
* Cambio de estado.
* Visualización de la respuesta.
* Consumo de contenido desde Strapi.
* Relaciones entre proyectos y programadores.
* Diseño responsive.

---

## Autores

### Domenica Uyunkar

* Rol: Desarrollo frontend, integración de Firebase, Strapi y gestión de solicitudes.
* GitHub: https://github.com/dome323
* LinkedIn: https://www.linkedin.com/in/domenica-uyunkar-32b905374/

### Josue Valdez

* Rol: Desarrollo frontend, diseño de interfaz y colaboración en funcionalidades.
* GitHub:  https://github.com/Josuelv14?tab=repositories
* LinkedIn: https://www.linkedin.com/in/josue-valdez-508b78222/

---

## Repositorio

```text
https://github.com/dome323/icc-ppw-angular21-proyecto-final
```

---

## Estado del proyecto

```text
Frontend Angular: completado
Autenticación: completada
Firestore: completado
Strapi CMS: completado en entorno local
Diseño responsive: completado
Despliegue frontend: pendiente
Despliegue Strapi: pendiente
```

---

## Licencia

Proyecto académico desarrollado para la asignatura Programación y Plataformas Web.

Universidad Politécnica Salesiana — 2026.
