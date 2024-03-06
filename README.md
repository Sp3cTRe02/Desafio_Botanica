# Desafio_Botanica

## Lanzamiento del proyecto 
Para lanzar el proyecto, se debe clonar el repositorio o descargar la release más actualizada.

Se debe tener instalado node.js 18 o superior para back.

Se debe tener instalado angular 17 o superior para front.

Se debe tener instalado el motor de base de datos de xampp

### Instalación de dependencias
Para instalar las dependencias del proyecto, se debe ejecutar el siguiente comando en la carpeta del proyecto
Primero en la carpeta de Backend y luego en la de Frontend
```bash
npm install
```

### Lanzamiento del servidor
Tendras que copiar el archivo .env.example y renombrarlo a .env y cambiar las variables de entorno a las tuyas.

Una vez hecho esto, tendras que crear una base de datos en xampp con el nombre que le pusiste en el archivo .env

Luego tendras que lanzar las migraciones con el siguiente comando
```bash
npx sequelize-cli db:migrate
```
Y luego lanzar los seeders con el siguiente comando
```bash
npx sequelize-cli db:seed:all
```
Una vez hecho esto, tendras que lanzar el servidor con el siguiente comando
```bash
nodemon
```

### Lanzamiento del cliente
Para lanzar el cliente, se debe ejecutar el siguiente comando en la carpeta del proyecto
```bash
ng serve
```
*Solamente para comprobar que funciona no sería para desplegar la aplicación*

### Crendenciales del admin
Las crendenciales para el administrador serán
admin@admin.com para el correo y admin123 para la contraseña

# Documentacion de la api


Para la selección de roles se usara la ruta /api/admin de base, a partir de esta se usaran las siguientes rutas : 


### Endpoints

#### 1. Obtener Todos los Roles

- **URL**: `/getRoles`
- **Método**: `GET`
- **Descripción**: Recupera una lista de todos los roles disponibles en la aplicación.


#### 2. Obtener Roles de Usuario

- **URL**: `/getRolesUsuario/:id`
- **Método**: `GET`
- **Parámetros de URL**: 
  - `id=[integer]`: El identificador único del usuario.
- **Descripción**: Recupera una lista de los roles asignados a un usuario específico.


Esta API proporciona información sobre árboles, incluyendo listados generales, información específica, ubicaciones y fotos de árboles individuales. La base para esta sera /api/arboles

### Endpoints

#### 1. Lista General de Árboles

- **URL**: `/lista-arboles`
- **Método**: `GET`
- **Descripción**: Obtiene un listado general de todos los árboles.

#### 2. Información de un Árbol Específico

- **URL**: `/:id`
- **Método**: `GET`
- **Parámetros de URL**:
  - `id`: El identificador único del árbol.
- **Descripción**: Obtiene la información detallada de un árbol específico.

#### 3. Ubicaciones de un Árbol

- **URL**: `/ubi/:id`
- **Método**: `GET`
- **Parámetros de URL**:
  - `id`: El identificador único del árbol.
- **Descripción**: Obtiene las ubicaciones de un árbol específico.

#### 4. Fotos de un Árbol

- **URL**: `/fotos/:id`
- **Método**: `GET`
- **Parámetros de URL**:
  - `id`: El identificador único del árbol.
- **Descripción**: Obtiene las fotos asociadas a un árbol específico.


Esta documentación describe los endpoints disponibles para la gestión de árboles, incluyendo la creación, actualización, eliminación de árboles, así como la adición de ubicaciones e imágenes. La base de esta sera /api/arbol

## Endpoints

### Obtener Árboles
- **URL**: `/`
- **Método**: `GET`
- **Autenticación**: JWT, Admin
- **Descripción**: Obtiene un listado de todos los árboles.

### Crear Árbol
- **URL**: `/`
- **Método**: `POST`
- **Autenticación**: JWT, Admin
- **Validaciones**: Nombre (obligatorio)
- **Descripción**: Crea un nuevo árbol.

### Actualizar Árbol
- **URL**: `/:id`
- **Método**: `PUT`
- **Autenticación**: JWT, Admin
- **Validaciones**: Nombre (obligatorio)
- **Descripción**: Actualiza la información de un árbol específico.

### Eliminar Árbol
- **URL**: `/:id`
- **Método**: `DELETE`
- **Autenticación**: JWT, Admin
- **Descripción**: Elimina un árbol específico.

### Añadir Ubicación al Árbol
- **URL**: `/ubicacion/:id`
- **Método**: `POST`
- **Autenticación**: JWT, Cliente
- **Validaciones**: Latitud, Longitud, Ciudad (todos obligatorios)
- **Descripción**: Añade una ubicación a un árbol específico.

### Subir Imagen del Árbol
- **URL**: `/imagen/:id`
- **Método**: `POST`
- **Autenticación**: JWT, Cliente
- **Descripción**: Sube una imagen para un árbol específico.

### Obtener Imágenes del Árbol
- **URL**: `/imagen/:id`
- **Método**: `GET`
- **Descripción**: Obtiene las imágenes asociadas a un árbol específico.

### Galería de Imágenes del Árbol
- **URL**: `/galeria/:nombre`
- **Método**: `GET`
- **Descripción**: Carga la galería de imágenes de un árbol específico por nombre.

### Obtener Ciudades Top para Árboles
- **URL**: `/ciudades/:id`
- **Método**: `GET`
- **Descripción**: Obtiene las ciudades con más árboles de una especie específica.

### Obtener Ruta
- **URL**: `/ruta`
- **Método**: `POST`
- **Descripción**: Obtiene una ruta específica (funcionalidad detallada no proporcionada).


Esta API gestiona las operaciones de autenticación, incluyendo el inicio de sesión y el registro de nuevos usuarios. La base de esta sera /api/auth

## Endpoints

### 1. Inicio de Sesión

- **URL**: `/login`
- **Método**: `POST`
- **Descripción**: Permite a un usuario iniciar sesión.
- **Cuerpo de la solicitud**: 
  - `email`: Correo electrónico del usuario.
  - `passwd`: Contraseña del usuario.

### 2. Registro

- **URL**: `/registrar`
- **Método**: `POST`
- **Descripción**: Registra un nuevo usuario en el sistema.
- **Cuerpo de la solicitud**:
  - `nombre`: Nombre del usuario.
  - `ap1`: Primer apellido del usuario.
  - `ap2`: Segundo apellido del usuario.
  - `email`: Correo electrónico del usuario. Debe ser único en el sistema.
  - `passwd`: Contraseña del usuario.
- **Validaciones**:
  - El nombre, ambos apellidos, el correo electrónico y la contraseña son obligatorios.
  - El nombre y los apellidos solo pueden contener letras.
  - El correo electrónico debe ser válido.
  - Se verifica que el correo electrónico no esté ya registrado en el sistema.

Esta documentación describe los endpoints disponibles para la gestión de clientes, incluyendo la creación, consulta, eliminación, y actualización de usuarios, además de la gestión de roles y manejo de imágenes de perfil. La base de esta sera /api/cliente

## Endpoints

### CRUD de Cliente

#### Crear Usuario
- **URL**: `/usuario`
- **Método**: `POST`
- **Autenticación**: JWT, Requiere ser Admin
- **Descripción**: Crea un nuevo usuario.

#### Obtener Usuarios
- **URL**: `/usuario`
- **Método**: `GET`
- **Autenticación**: JWT, Requiere ser Admin
- **Descripción**: Obtiene la lista de usuarios.

#### Eliminar Usuario
- **URL**: `/usuario/:id`
- **Método**: `DELETE`
- **Autenticación**: JWT, Requiere ser Admin
- **Descripción**: Elimina un usuario específico.

#### Actualizar Usuario
- **URL**: `/usuario/:id`
- **Método**: `PUT`
- **Autenticación**: JWT, Requiere ser Admin
- **Descripción**: Actualiza la información de un usuario específico.

### Gestión de Roles de Cliente

#### Añadir Rol a Usuario
- **URL**: `/addRol`
- **Método**: `PUT`
- **Autenticación**: JWT, Requiere ser Admin
- **Descripción**: Añade un rol a un usuario.

#### Eliminar Rol de Usuario
- **URL**: `/deleteRol`
- **Método**: `PUT`
- **Autenticación**: JWT, Requiere ser Admin
- **Descripción**: Elimina un rol de un usuario.

### Gestión de Imágenes de Perfil

#### Subir Imagen de Perfil
- **URL**: `/subirImagen/`
- **Método**: `POST`
- **Autenticación**: JWT
- **Descripción**: Permite a un usuario subir su imagen de perfil.

### Acceso y Gestión de Perfil

#### Obtener Perfil de Usuario
- **URL**: `/perfil`
- **Método**: `GET`
- **Autenticación**: JWT
- **Descripción**: Obtiene el perfil del usuario basado en el token proporcionado.

#### Actualizar Perfil de Usuario
- **URL**: `/perfil`
- **Método**: `POST`
- **Autenticación**: JWT
- **Descripción**: Actualiza el perfil del usuario basado en el token proporcionado.

#### Obtener Foto de Perfil
- **URL**: `/fotoPerfil/:nombre`
- **Método**: `GET`
- **Descripción**: Obtiene la foto de perfil de un usuario por nombre.

Esta API permite la gestión de contenido, incluyendo noticias e información de inicio. La base de esta sera /api/contenido

## Endpoints

### Información de Inicio

- **GET `/inicio`**
  - Obtiene la información de inicio.
- **PUT `/inicio/:id`**
  - Modifica el contenido de inicio por ID.

### Gestión de Noticias

- **GET `/`**
  - Obtiene todo el contenido disponible.
- **GET `/ultimas-noticias`**
  - Obtiene las últimas noticias.
- **GET `/:id`**
  - Obtiene información detallada de una noticia específica.
- **GET `/upload/:id`**
  - Muestra la imagen asociada a una noticia.
- **POST `/`**
  - Crea nuevo contenido. Requiere JWT y validar campos como título, resumen y descripción.
- **PUT `/:id`**
  - Modifica contenido existente por ID. Requiere JWT.
- **DELETE `/:id`**
  - Elimina contenido por ID. Requiere JWT y ser Admin.

### Validaciones

- **Título**: Obligatorio.
- **Resumen de Descripción**: Obligatorio, máximo 65 caracteres.
- **Descripción**: Obligatoria.

### Autenticación

- Algunas rutas requieren autenticación JWT y verificación de rol de administrador.

Esta API permite la gestión y participación en eventos. La base de esta sera /api/eventos

## Endpoints

### Obtener Eventos

- **GET `/`**
  - Descripción: Obtiene una lista de todos los eventos disponibles.

### Información del Evento

- **GET `/:id`**
  - Descripción: Obtiene información detallada de un evento específico.

### Mostrar Imagen del Evento

- **GET `/upload/:id`**
  - Descripción: Muestra la imagen asociada a un evento específico.

### Obtener Organizador del Evento

- **GET `/organizador/:id`**
  - Descripción: Obtiene información del organizador de un evento específico.

### Plazas Restantes

- **GET `/plazas/:id`**
  - Descripción: Obtiene las plazas restantes para un evento específico.

### Mis Eventos

- **GET `/ev/mis-eventos`**
  - Autenticación: Requiere JWT
  - Descripción: Obtiene una lista de los eventos en los que participa el usuario autenticado.

### Descargar PDF

- **GET `/pdf/descargar-pdf`**
  - Descripción: Permite descargar un PDF con información relevante del evento.

### Modificar Evento

- **PUT `/:id`**
  - Descripción: Permite modificar la información de un evento específico.

### Crear Evento

- **POST `/`**
  - Autenticación: Requiere JWT
  - Descripción: Permite la creación de un nuevo evento.

### Participar en un Evento

- **POST `/participar/:id`**
  - Autenticación: Requiere JWT
  - Descripción: Permite a un usuario participar en un evento específico.

 
 
Esta API gestiona la información de familias, permitiendo realizar operaciones CRUD. La base de esta sera /api/familia

## Endpoints

### Obtener Familias
- **URL**: `/`
- **Método**: `GET`
- **Descripción**: Obtiene todas las familias.

### Administración de Familias
- **URL**: `/familia-admin`
- **Método**: `GET`
- **Descripción**: Obtiene familias para administración con controles adicionales.

### Crear Familia
- **URL**: `/`
- **Método**: `POST`
- **Autenticación**: JWT, Admin
- **Validaciones**: Nombre (obligatorio)
- **Descripción**: Crea una nueva familia.

### Actualizar Familia
- **URL**: `/:id`
- **Método**: `PUT`
- **Autenticación**: JWT, Admin
- **Validaciones**: Nombre (obligatorio)
- **Descripción**: Actualiza una familia específica.

### Eliminar Familia
- **URL**: `/:id`
- **Método**: `DELETE`
- **Autenticación**: JWT, Admin
- **Descripción**: Elimina una familia específica.

Esta API permite el envío de correos electrónicos mediante un endpoint sencillo. La base de esta sera /api/mail

## Endpoints

### Enviar Correo Electrónico
- **URL**: `/`
- **Método**: `GET`
- **Descripción**: Envía un correo electrónico utilizando la configuración predeterminada especificada en el controlador. La implementación exacta y los parámetros necesarios para el envío del correo deberán ser consultados en el `mailController`.
