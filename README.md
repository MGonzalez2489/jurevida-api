# jurevida-api

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Tue May 24 2022 08:01:55 GMT-0600 (Mexican Pacific Daylight Time) using Sails v1.5.2.

<!-- Internally, Sails used [`sails-generate@2.0.6`](https://github.com/balderdashy/sails-generate/tree/v2.0.6/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->


Pasos para ejecutar localmente jurevida/jurevida api/ Database

—> Base de datos

1.- Instalar mysql y generar la instancia en donde vivirá la base de datos
2.- Crear la base de datos  “jurevidaDB” (sin las comillas)


—> API

1.- Clona el coding a una carpeta local e instalar los paquetes requeridos por el package.json
2.- Crear el archivo “local.js” adentro de la carpeta config (nombre del archivo sin comillas)
3.- el archivo contendrá la siguiente estructura

module.exports = {
  datastores: {
    default: {
      adapter: require('sails-mysql'),
      url: 'mysql://root:Amarillo12.@localhost:3306/jurevidaDB',
    },
  },
  models: {
    migrate: 'drop',
  },
  custom: {
    JWT_SECRET: '',
  },
};


5.- Este archivo contiene las siguientes propiedades que necesitan ser reemplazadas

	A) La cadena de conexión contiene:
		-dbuser (en este caso es “root” y necesita ser reemplazado por el usuario que configuraste en mysql)
		-password (en este caso es “Amarillo12.” Y necesita ser reemplazado por la contraseña que configuraste en tu mysql)
		-server name (en este caso es “localhost” Y necesita ser reemplazado por la contraseña que configuraste en tu mysql)
		-Puerto (en este caso es 3306 Y necesita ser reemplazado por la contraseña que configuraste en tu mysql)
		-database name (en este caso es “jurevidaDB” y necesita ser reemplazado por el nombre de la base de datos que creaste)

	B) JWT_SECRET: esta es una llave que sera generada para seguridad, casi creo que puede estar en blanco por ahora y funcionara bien pero en caso de que no puedes setearle un valor cualquiera

6.- Una vez configurado todo y si todo salió bien, ejecutar el siguiente comando en la carpeta del proyecto : “sails lift” (sin comillas).. si todo esta bien podrás ver como se levanta el servicio y una vez que corra esto bien la estructura de la base de datos sera creada y puede ser comprobada.

7.- Descargar el proyecto web en una carpeta diferente
8.- Instalar las dependencias necesarias del package.json
9.- Si el api corral satisfactoriamente, solo resta ejecutar la aplicación web (ya que la ruta del api por default que se usa en el app web es la ruta default del api). Solo queda ejecutar “ng serve” (sin comillas) y teóricamente tu arquitectura estará corriendo bien.


NOTA 1: todos los usuarios actuales en la base de datos y tabla “user” pueden foguearse a la aplicación y la contraseña para todos los usuarios es “12345” (sin comillas)
NOTA 2: Para ambos repositorios el código actualizado esta en la rama de dev

