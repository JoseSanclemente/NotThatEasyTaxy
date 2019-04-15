# NotThatEasyTaxy

Proyecto de Bases de Datos

## ¡Atención!

Esta aplicación se encuentra aún en desarrollo. Las funcionalidades disponibles son limitadas debido a que no se ha implementado una conexión entre el Frontend y el Backend. Podrá ingresar a la plataforma
usando los valores de ejemplo de este documento. Toda la información mostrada en la página es meramente ilustrativa y tiene como finalidad proporcionar un ejemplo de cómo se verá el servicio web en producción. Para conocer las funcionalidades disponibles, consulte el Manual de Usuario.

La API utilizada para la comunicación entre el Frontend y el Backend se encuentra totalmente
en funcionamiento. Consulte la documentación de la API para saber cómo utilizarla.

## Inicializar la Base de datos

1. Ejecutar el comando `sudo docker build -t database` en NotThatEasyTaxi/docker/postgresql
2. Ejecutar `sudo docker run -it --name database_container database` en la misma carpeta
3. Ejecutar `sudo docker build -t server` en NotThatEasyTaxi/docker/node
4. Ejecutar `sudo docker run --name server_container --link database_container:database -p 8080:8080 server` en la misma carpeta.

## Inicializar la plataforma

1. Ejecutar `npm install` en /NotThatEasyTaxi/newclient
2. Ejectar `npm run dev` en /NotThatEasyTaxi/newclient

## Datos de prueba

Conductor:
  * Cédula: 987654321
  * Contraseña: abc

Pasajero:
  * Número de teléfono: 571112223344
  * Contraseña: abc

## Tecnologías utilizadas

- NodeJS
- Vue (anteriormente React)
- Google Maps API
- Docker
- PostgreSQL
- Material UI
- Creative Tim Vue Dashboard
- GitHub
