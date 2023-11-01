
¡Hola a todos! Bienvenidos al proyecto **tuClaseYA**, el lugar en internet donde vamos a conectar a profesionales y usuarios de todo tipo. Acá, si tenés algo para enseñar, compartir o un servicio para ofrecer, este es tu lugar. Y si estás buscando aprender algo nuevo, también llegaste al punto indicado. ¡Vamos a desglosar de qué va todo esto!

## 🚀 Descripción del Proyecto

**tuClaseYA** es la herramienta que busca simplificar la conexión entre quienes ofrecen servicios de cualquier índole (tutorías, clases de música, cuidado de niños, etc.) y quienes los necesitan. La idea es que los proveedores de servicios puedan registrarse, publicar sus servicios y ser contactados por los usuarios que, a su vez, pueden buscar servicios según distintos criterios, ver detalles y contratarlos directamente desde la plataforma.

**Principales Features:**
- **Búsqueda Avanzada:** Permite a los usuarios encontrar lo que necesitan de manera eficiente.
- **Gestión de Servicios:** Los proveedores pueden administrar sus servicios de forma simple.
- **Contratación Online:** Los usuarios pueden contratar servicios directamente desde su detalle.

🔗 [Enlace a tuClaseYA](#) (En cuanto esté online, actualizamos el link)

## 📸 Diseños y Mockups

[//]: # (Acá van a ir todos los diseños y mockups una vez que los tengamos listos.)

## 🛠️ Desarrollo

### Tecnologías Implementadas
- **Frontend:** React
- **Backend:** NodeJS
- **Base de Datos:** A definir [SQL Server o MongoDB]

### Instalación y Ejecución Local

git clone https://github.com/krovark/stclases-particulares.git
cd Clases-particulares-new
npm install
npm run start


Estructura de Carpetas

/src: Todo el código fuente.
/public: Assets y index.html.
/node_modules: Modulos utilizados.


Scripts Básicos
npm start: Levantar el servidor de desarrollo.
npm test: Correr los tests.
npm build: Generar build para producción.


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

 ⬜ Definir DB

 ⬜ Entregar aplicación mobile

 ⬜ Deployar en algun hosting gratuito

 ⬜ Terminar documentación
 
 🙋‍♂️ Contribuciones

Si te interesa colaborar, ¡bienvenido! 



Nota: Sigue siendo una estructura básica y el contenido debe ser adaptado y ampliado de acuerdo a las necesidades y evolución del proyecto. ¡Espero que te sirva para empezar.

