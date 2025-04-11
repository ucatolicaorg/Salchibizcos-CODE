Archivos modificados en el proyecto
---
**Backend** 

Ubicados en la carpeta ```server```

- **server.js** Aquí, estamos importando express y cors para ser usados. ```const port = process.env.PORT``` accederá a la variable port desde el config.env que crearemos a continuación.

- **config.env** Ahora que tiene la cadena de conexión, se vuelve a la carpeta del servidor y se crea un archivo ```config.env```. Allí, se asigna la cadena de conexión a una nueva variable ```ATLAS_URI```.

- **conection.js** Creamos una carpeta bajo el directorio del servidor llamada db y dentro de ella, un archivo llamado ```connection.js```. Allí el código servirá para conectarnos a nuestra base de datos.

Ubicados en la carpeta ```routes``` dentro de la carpeta ```served```

- **record.js** Base de datos terminada. Servidor hecho. Ahora, es el momento de los endpoints de la API. Empecemos creando una carpeta de rutas y añadiendo ```record.js``` en ella.

**Fronted**

Ubicados en la carpeta ```client```

- **tailwind.config.js** Hay algunas dependencias adicionales que se utilizarán en nuestro proyecto. Empezaremos con el ```CSS``` de ```Tailwind```. Editaremos el campo de contenido en el archivo ```tailwind.config.```

- **index.html** En el archivo index.html, se realizan modificaciones en el HTML como lo puede ser el titulo del frontend.

Ubicados en la carpeta ```src``` dentro de la carpeta ```client```

- **index css** En el archivo ```src/index.css```, tenemos que añadir las directivas Tailwind y eliminar todo lo demás.

- **App.jsx** Este es nuestro componente de diseño principal. Nuestra Navbar siempre estará en la parte superior de cada página y el Outlet aceptará los componentes hijos que definimos en nuestras rutas en el archivo main.jsx anteriormente.

- **main.jsx** El archivo ```main.jsx``` configura la aplicación React con enrutamiento utilizando ```react-router-dom```.

Ubicados en la carpeta ```components``` dentro de la carpeta ```src``` dentro de la carpeta ```client```

- **Navbar.jsx** En el componente navbar.js, crearemos una barra de navegación que nos enlazará con los componentes necesarios.

- **Record.jsx** El siguiente código servirá como un componente de formulario para crear o actualizar registros. Este componente enviará un comando de creación o un comando de actualización a nuestro servidor.

- **Recordlist.jsx** Este código servirá como componente de visualización de nuestros registros. Obtendrá todos los registros de nuestra base de datos a través de un método GET.