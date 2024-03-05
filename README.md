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

