# CUENTI Forms - Formulario de Registro

## Descripción del Proyecto

CUENTI Forms es una aplicación web desarrollada en Next.js con el objetivo de gestionar el proceso de registro de usuarios en la plataforma CUENTI. Esta aplicación permite a los usuarios crear una cuenta de manera sencilla, guiada y paso a paso, recolectando la información necesaria para configurar su perfil en el sistema de gestión financiera de CUENTI.

El proyecto consiste en un formulario de registro multi-paso que valida la información del usuario en tiempo real, gestiona su autenticación, y envía los datos procesados a los servicios de CUENTI para la creación de cuentas. La interfaz está diseñada para ser intuitiva, con validaciones claras y un diseño atractivo que refleja la identidad de marca de CUENTI.

## Características Principales

- **Formulario de Registro Multi-paso**: Proceso de registro dividido en etapas para mejor experiencia de usuario
- **Validación en Tiempo Real**: Validación de campos con mensajes de error claros
- **Integración con API de CUENTI**: Comunicación con servicios de backend para validar y registrar usuarios
- **Autenticación Segura**: Gestión de credenciales y encriptación de contraseñas
- **Diseño Responsivo**: Interfaz adaptada a dispositivos móviles y de escritorio
- **Verificación de Correo Electrónico**: Sistema de verificación por email
- **Integración con Aliados**: Soporte para códigos de vendedores/aliados

## Tecnologías Utilizadas

- **Framework**: Next.js (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: HeroUI/React, NextUI
- **Validación de Formularios**: Zod
- **Base de Datos**: Prisma ORM / (MySQL)
- **Autenticación**: Auth.js v5.0 BETA / NextAuth
- **Gestión de Estado**: React Hooks

## Estructura del Proyecto

## Flujo de Registro

1. **Entrada Inicial**: El usuario ingresa su correo electrónico y contraseña
2. **Validación**: Se verifica que el usuario no exista previamente en CUENTI
3. **Formulario Multi-paso**: El usuario completa información adicional como:
   - Datos personales (nombre, apellido)
   - Información del negocio (tipo, tamaño)
   - Datos de contacto (teléfono, dirección)
   - País y ciudad de operación
4. **Verificación**: Se envía un correo de verificación
5. **Registro en CUENTI**: Los datos se envían a la API de CUENTI para crear la cuenta
6. **Confirmación**: El usuario recibe confirmación de registro exitoso

## Componentes Principales

### Formularios

- `CuentiForm`: Formulario principal de ingreso de credenciales
- `CuentiInput`: Componente de input personalizado con validación
- `CuentiPassword`: Input especializado para contraseñas con toggle de visibilidad
- `MultiStepWrapper`: Componente ecargado de la gestión de los distintos pasos del formulario

### Servicios

- `authService`: Gestiona la autenticación y verificación de usuarios
- `sendDataToCuenti`: Envía los datos procesados a la API de CUENTI
- `countyCuenti`: Normaliza información geográfica (países, ciudades)

## Integración con API de CUENTI

La aplicación se comunica con diversos endpoints de CUENTI para:

1. Validar la existencia previa de usuarios
2. Registrar nuevos usuarios en el sistema
3. Verificar códigos de referidos/aliados
4. Enviar información normalizada de ubicación geográfica

## Configuración para Desarrollo

### Requisitos Previos

- Node.js (v18 o superior)
- PNPM (gestor de paquetes)
- Base de datos MySQL (configurada en Prisma)

### Instalación

1. Clonar el repositorio:
`git clone https://github.com/Cuenti/register-form.git cd cuenti-forms`

2. Instalar dependencias:
`pnpm install`

3. Configurar variables de entorno:
### Variables de Entorno Requeridas
- `DATABASE_URL`: URL de conexión a la base de datos
- `AUTH_SECRET`: Clave secreta para NextAuth
- `NEXT_URL`: URL base de la aplicación
- `SECRET_KEY`: Clave para encriptación de datos sensibles
- `CDN_URL`: CDN con los recursos estáticos de la aplicación

4. Ejecutar migraciones de base de datos:
`pnpm prisma migrate dev`

5. Ejecutar la seed de la base de datos (crea los steps en en el esquema `Step`)
`pnpm primsa db seed`

6. Iniciar entorno de desarrollo:
`pnpm run dev`


