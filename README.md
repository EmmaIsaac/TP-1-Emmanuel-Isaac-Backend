# Aplicacion de Gestión de Usuarios

Esta es una aplicación de administración de usuarios construida con Node.js. La aplicación te permite gestionar usuarios mediante argumentos desde la línea de comandos. A continuación, se detallan las funcionalidades y cómo usarlas.

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/EmmaIsaac/TP-1-Emmanuel-Isaac-Backend.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd TP-1-Emmanuel-Isaac-Backend
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

## Comandos

La aplicación proporciona varios comandos para gestionar usuarios:

### `list`

Lista todos los usuarios en el sistema.

```bash
node index.js list
```

### `search`

Busca un usuario por su ID.

```bash
node index.js search <id>
```

Reemplaza `<id>` con el ID del usuario que deseas buscar.

### `add`

Añade un nuevo usuario.

```bash
node index.js add <nombre> <apellido> <email> <password>
```

Reemplaza `<nombre>`, `<apellido>`, `<email>` y `<password>` con los datos del nuevo usuario.

### `update`

Actualiza la información de un usuario existente.

```bash
node index.js update <id> <nombre> <apellido> <email> <password>
```

Reemplaza `<id>` con el ID del usuario que deseas actualizar, y `<nombre>`, `<apellido>`, `<email>` y `<password>` con la nueva información del usuario.

### `delete`

Elimina un usuario por su ID.

```bash
node index.js delete <id>
```

Reemplaza `<id>` con el ID del usuario que deseas eliminar.

### `help`

Muestra una lista de todos los comandos disponibles y cómo usarlos.

```bash
node index.js help
```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
