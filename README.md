# Recetario - App de Gestión de Recetas e Ingredientes

Esta aplicación permite gestionar recetas e ingredientes, así como registrar compras de ingredientes. Está construida con **React.js** en el frontend y **Node.js / Express** con **MySQL** en el backend y consultas **SQL**. Coloqué un archivo `data.js` en la carpeta data para simular datos en el frontend para poder probar la lógica de cada componente.

---

## Funcionalidades

### Ingredientes
- Listar todos los ingredientes disponibles.
- Agregar nuevos ingredientes a la base de datos.
- Editar ingredientes existentes.
- Eliminar ingredientes (también elimina relaciones con recetas lo tuve que hacer para poder eliminar, ya que con las `fk` no primero hay que eliminar la relación y luego el elemento).

### Recetas
- Crear y editar recetas con:
  - Nombre
  - Categoría
  - Descripción
  - Selección de ingredientes con cantidad haciendo click en el checkbox y se desbloquea el input de la cantidad
- Los ingredientes para las recetas se cargan dinámicamente desde la base de datos.

### Compras
- Registrar compras de ingredientes indicando:
  - Ingrediente
  - Cantidad
  - Fecha de compra

---

## Base de Datos

La base de datos `recetario` contiene las siguientes tablas principales:

- `ingredientes`  
- `recetas` 
- `ingredientes_recetas` (relación entre recetas e ingredientes)  
- `compras`   (relación entre recetas e ingredientes) 

Se utiliza **FOREIGN KEY** para mantener la integridad entre ingredientes, recetas y compras.

---

## Backend

- **Tecnologías:** Node.js, Express, MySQL, mysql2  
- **Rutas principales:**
  - `/ingredientes` 
  - `/recetas` 
  - `/compras` 

---

## Frontend

- **Tecnologías:** React.js, Bootstrap
- Formularios para crear y editar ingredientes y recetas.
- Lista de ingredientes con checkboxes en el formulario de recetas.
- Actualización dinámica de ingredientes al agregarlos o editarse.

- ## NOTA: El formato de fecha en el frontend no está correcto aún en formato dd/mm/aaaa y en recetas disponibles faltó integrar el backend con el frontend para buscar las recetas, está incompleto


---

## Instalación

1. Configurar la base de datos MySQL (`recetario`) y ejecutar las consultas de creación en la carpeta `SQL`
2. Configurar `.env` con los datos de conexión a la base de datos.
3. Instalar dependencias:
   ```bash
   npm install (En frontend como en backend)
4. Ejecutar backend con `npm start`
5. Ejecutar frontend con `npm run dev`
