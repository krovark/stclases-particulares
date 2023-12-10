¡Hola a todos! Bienvenidos **tuClaseYA**, el lugar en internet donde vamos a conectar a profesionales y usuarios de todo tipo. Acá, si tenés algo para enseñar, compartir o un servicio para ofrecer, este es tu lugar. Y si estás buscando aprender algo nuevo, también llegaste al punto indicado. ¡Vamos a desglosar de qué va todo esto!

## 🚀 Descripción del Proyecto

**tuClaseYA** es la herramienta que busca simplificar la conexión entre quienes ofrecen servicios de cualquier índole (tutorías, clases de música, cuidado de niños, etc.) y quienes los necesitan. La idea es que los proveedores de servicios puedan registrarse, publicar sus servicios y ser contactados por los usuarios que, a su vez, pueden buscar servicios según distintos criterios, ver detalles y contratarlos directamente desde la plataforma.

**Principales Features:**
- **Búsqueda Avanzada:** Permite a los usuarios encontrar lo que necesitan de manera eficiente.
- **Gestión de Servicios:** Los proveedores pueden administrar sus servicios de forma simple.
- **Contratación Online:** Los usuarios pueden contratar servicios directamente desde su detalle.
- **

## 📸 Diseños y Mockups

![image](https://github.com/krovark/stclases-particulares/assets/76181681/d4106fd2-191d-46aa-bc32-c9d59e943608)  
![image](https://github.com/krovark/stclases-particulares/assets/76181681/61d5d0d2-8c6d-41d0-b186-8bc1a3917d24)  
![image](https://github.com/krovark/stclases-particulares/assets/76181681/74e45016-3d91-4ef9-a839-07491731d11b)  
![image](https://github.com/krovark/stclases-particulares/assets/76181681/ea9b9131-dd0f-49f8-8576-738d1a9c4270)  
![image](https://github.com/krovark/stclases-particulares/assets/76181681/589e937d-62a4-4ff5-b659-b6b536db42e5)  








## 🛠️ Desarrollo

### Tecnologías Implementadas
- **Frontend:** React
  
- **Backend:** NodeJS
  
- **Base de Datos:** Atlas MongoDB
  
DbSchema de la base de datos
![image](https://github.com/krovark/stclases-particulares/assets/76181681/8610f2ea-4de5-4970-b365-2870c9be6ac6)
  
Documentación del back-end : https://documenter.getpostman.com/view/8407295/2s9Ykhg4M5


### Instalación y Ejecución Local ###
Tener instalada la ultima version de Node.js ---> https://nodejs.org/en  

git clone https://github.com/krovark/stclases-particulares.git  

--- Para levantar el front-end ---  
**CLIENTE**  
cd .\Cliente\  
npm install  
npm run start  

--- Para levantar el back-end ---  
**SERVIDOR**  
cd .\Servidor\  
npm install  
nodemon app.js  
  
--------------------------------

Estructura de Carpetas  
//Cliente:  
/src: Todo el código fuente.  
/public: Assets y index.html.  
/node_modules: Modulos utilizados.  
  
//Servidor:  
/auth: Contiene middlewares de multer, jws y la configuración de cloudinary  
/controller: Contiene los controlladores  
/models: Contiene los model de las colleciones de la base de datos  
/routes: Contiene las rutas de acceso  
/services: Contiene la logica de los servicios  
/uploads: N/A  
/node_modules: Modulos utilizados.  

Scripts Básicos  
npm start: Levantar el servidor de desarrollo.  
npm test: Correr los tests.  
npm build: Generar build para producción.  
npm install: Instala los   
npm run start: Instala todas las dependencias listadas en package.json  
cd : Cambia directorio  

📘 Historias de Usuario y Casos de Uso
Historias de Usuario:

1) Como usuario quiero ver detalles de un servicio para entender completamente lo que se ofrece.

2) Como proveedor quiero bloquear comentarios no deseados para mantener una imagen profesional en mi perfil.

3) Como usuario quiero contratar un servicio para confirmar y asegurar la disponibilidad del proveedor.

4) Como proveedor quiero visualizar todas mis contrataciones para gestionarlas adecuadamente.

5) Como usuario quiero buscar servicios según diversos criterios para hallar lo que necesito fácilmente.

6) Como proveedor quiero gestionar mis servicios para ofrecer mis habilidades y conocimientos.

Casos de Uso

Caso de Uso 1: Registro de Proveedores

Actor: Proveedor
Precondiciones: El mail no debe estar previamente registrado.
Flujo Principal:
El proveedor ingresa sus datos personales.
Completa su perfil con título y experiencia.
La aplicación valida y guarda la info.


Caso de Uso 2: Comentar un Servicio

Actor: Usuario
Precondiciones: El usuario debe estar registrado y haber iniciado sesión.

Flujo Principal:
4.1 El usuario busca y selecciona un servicio.
4.2 En la sección de comentarios, escribe su opinión y la envía.
4.3 El comentario queda pendiente de aprobación por el proveedor del servicio.

Postcondiciones: El comentario se visualiza en la interfaz del proveedor para su revisión.


Caso de Uso 3: Contratación de un Servicio

Actor: Usuario
Precondiciones: El usuario debe estar registrado y haber iniciado sesión.

Flujo Principal:
4.1 El usuario busca y selecciona un servicio.
4.2 Ingresa la información solicitada (teléfono, mail, horario preferido de contacto y mensaje al proveedor).
4.3 Envía la solicitud de contratación.
4.4 La solicitud de contratación aparece en el perfil del proveedor.

Postcondiciones: La solicitud se encuentra en estado "solicitada" hasta que el proveedor la modifica.

Caso de Uso 4: Bloquear Comentarios

Actor: Proveedor
Precondiciones: El proveedor debe haber iniciado sesión y tener al menos un comentario pendiente de revisión.

Flujo Principal:
4.1 Elproveedor accede a su perfil y visualiza los comentarios pendientes de revisión.
4.2 Sel ecciona un comentario y opta por bloquearlo.
4.3 La aplicación elimina el comentario sin publicarlo.

Postcondiciones: El comentario bloqueado ya no es visible para el proveedor ni los usuarios.

📋 Planificación y Pendientes

 ✅ Armar Mockups

 ✅ Crear Repositorio

 ✅ Primer commit

 ✅ Landing page 

 ✅ Menu inicial

 ✅ Sitio del Perfil

 ✅ Creacion de publicaciones

 ✅ Historial de pedidos

 ✅ Entregar el FrontEnd

 ✅ Definir DB

 ✅ Entregar aplicación

 ✅ Terminar documentación

 ⬜ Deployar en algun hosting gratuito
