Archivos modificados en el proyecto
---
**Backend** 

Ubicados en la carpeta ```server```

- **server.js** Aquí, estamos importando express y cors para ser usados. ```const port = process.env.PORT``` accederá a la variable port desde el config.env que crearemos a continuación.

- **config.env** Ahora que tiene la cadena de conexión, se vuelve a la carpeta del servidor y se crea un archivo ```config.env```. Allí, se asigna la cadena de conexión a una nueva variable ```ATLAS_URI```.

- **conection.js** Creamos una carpeta bajo el directorio del servidor llamada db y dentro de ella, un archivo llamado ```connection.js```. Allí el código servirá para conectarnos a nuestra base de datos.

**Fronted**

Ubicados en la carpeta ```client```

Ubicados en la carpeta ```src``` dentro de la carpeta ```client```

Ubicados en la carpeta ```components``` dentro de la carpeta ```src``` dentro de la carpeta ```client```
