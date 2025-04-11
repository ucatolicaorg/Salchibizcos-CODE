Ejecución del proyecto
---

**Requisitos**

- Node.js

    Descarga el instalador oficial desde: https://nodejs.org/en

- npm y git

    Son complementarios, puedes comprobar si los tienes con los comandos:

        npm -v
        git -v
    
    En algunos casos ```npm``` no esta configurado como scripts de PowerShell firmados, en esos casos es necesario ejecutar la terminal como administrador para ejecutar scripts de PowerShell no firmados, mediante ```Set-ExecutionPolicy RemoteSigned```, seleccionando ```si```.
    

**Comandos**
Este conjunto de comandos configura un stack mern.

1. Backend y dependencias base

        npm install mongodb express cors

    - **mongodb**: Controlador oficial de MongoDB para Node.js (para interactuar con bases de datos MongoDB)
    - **express**: Framework web para Node.js (para crear APIs y servidores web)
    - **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing)

2. Creación de frontend con Vite + React

        npm create vite@latest client -- --template 

    - Crea un nuevo proyecto React usando Vite (herramienta de build moderna)
    - Nombre del proyecto: `client`
    - Usa la plantilla oficial de React

3. Instalar dependencias del frontend

        cd client
        npm install

    - Instala todas las dependencias del proyecto React creado por Vite:
        - react
        - react-dom
        - @vitejs/plugin-react
        - etc.

4. Configuración de Tailwind CSS

        npm install -D tailwindcss postcss autoprefixer

    - **tailwindcss**: Framework CSS utility-first
    - **postcss**: Herramienta de transformación CSS
    - **autoprefixer**: Plugin para agregar prefijos de vendedores CSS
    - ```-D```: Instala como dependencias de desarrollo

5. Inicializar Tailwind

        npx tailwindcss init -p

    - Crea archivo de configuración ```tailwind.config.js```
    - ```-p```: Crea también ```postcss.config.js```
    - Configura la integración con PostCSS

6. React Router (enrutamiento)

        npm install -D react-router-dom

    - **react-router-dom**: Biblioteca de enrutamiento para React (v6.x)
    - Permite crear navegación entre componentes/páginas
    - (Nota: Aunque se usa ```-D```, normalmente sería dependencia regular)
