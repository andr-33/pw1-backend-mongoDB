# Entrega final Programación Web 1

Este documento resume el trabajo realizado durante las dos entregas, como parte del proyecto final de la asignatura, buscando dar una visión general de las tecnologías empleadas y de la estructura tanto para del **BackEnd**, **FrontEnd** y las diferentes **Bases de datos** empleadas.

## Backend

Se desarrollaron dos servidores, ambos fueron desarrollados en NodeJS/Express usando el ejemplo de [BezKoder](https://www.bezkoder.com/node-js-jwt-authentication-mysql/) con modificaciones personales que, en base a mi experiencia, me parecían más acertadas o más cómodas de usar.

* Tecnologías en común

Autenticación usando Json Web Token
Cifrado de contraseñas con Bcrypt
Variables de entorno con Dotenv

* Estructura en común

Para ambos proyectos se realizaron 2 archivos de rutas, una para usuarios y otras para la autenticación. La primera permite crear usuarios y retornar información según el rol de cada uno y la segunda únicamente se asegura de autenticar al usuario y retornar un token.

Comparten los mismos middlewares y controladores, cada uno realizando consultas o queries según la base de datos a utilizar, pero la lógica de programación es la misma.

### Backend con MySQL

La primera entrega consistió en realizar un servidor que permitiera crear y autenticar usuarios, llevando su registro en una base de datos MySQL. Para interactuar con la base de datos desde el servidor se utilizó el ORM **Sequelize**, el cual permite hacer consultas SQL sin necesidad de escribirlas como tal.

Este proyecto maneja dos entidades: **Usuarios** y **Roles**, las cuales usan una relación many-to-many para relacionar a cada uno de los usuarios con sus roles.

### Backend con MongoDB

La segunda entrega consistió en realizar un servidor que permitiera crear y autenticar usuario, llevando sus registros a una base de datos NoSQL. Para interactuar con la base de datos desde el servidor se utilizó el ORM **Mongoose**, el cual permite realizar queries de MongoDB de forma sencilla.

Este proyecto maneja dos esquemas: **Usuarios** y **Roles**. No existe una relación entre esquemas; los usuarios registran sus roles en un array donde se especifica qué roles tiene cada uno y el registro de roles sirve únicamente para validar qué roles existen y no tener esos valores quemados en el código.

## Frontend

Para la parte del cliente se realizó una aplicación web bastante sencilla, la cual consta únicamente de dos páginas. La primera combina el registro de nuevos usuarios como la autenticación y la segunda muestra información al usuario ya autenticado según su rol.

Las tecnologías a usar fueron **HTML** para la estructura de la web, **CSS** para estilar la aplicación, añadir transiciones, efectos, etc. Y por último, se utilizó **JavaScript** para la parte lógica, hacer peticiones a cada uno de los servidores, manejar eventos y restringir el acceso a usuarios no autenticados.
