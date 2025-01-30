# API Baby Functions

## Descripción
Esta API permite la gestión de información de bebés dentro de la plataforma. Incluye funcionalidades para registrar, actualizar y mostrar datos de bebés tanto para los padres como para los cuidadores. Está desplegada en AWS Lambda y utiliza Amazon API Gateway para su comunicación.

## Tecnologías Utilizadas
- **AWS Lambda** para la ejecución de funciones sin servidor.
- **Amazon API Gateway** para la gestión de endpoints.
- **MongoDB** como base de datos.
- **Express.js** como framework de backend.
- **JWT (JSON Web Token)** para la autenticación.

## Instalación y Configuración
### Prerequisitos
1. Node.js instalado en el sistema.
2. Cuenta y configuración en AWS con permisos para Lambda y API Gateway.
3. MongoDB Atlas o una instancia de MongoDB local.
4. Configuración de variables de entorno en AWS Lambda:
   - `MONGO_URI`: URL de conexión a MongoDB.
   - `JWT_SECRET`: Clave secreta para la generación de tokens.

### Instalación Local
1. Clonar el repositorio:
   ```sh
   git clone <url del repositorio>
   cd <nombre del repositorio>
   ```
2. Instalar dependencias
  ```sh
  npm install
  ```
## Despliegue en AWS Lambda

1. Configurar Serverless Framework:
    ```sh
    npm install -g serverless
    ```
2. Autenticarse con AWS:
    ```sh
    serverless config credentials --provider aws --key <AWS_KEY> --secret <AWS_SECRET>
     ```
3. Desplegar la API: 
     ```sh
     serverless deploy
     ```
