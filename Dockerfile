# Usamos una imagen de Nginx muy ligera y eficiente
FROM nginx:alpine

# Copiamos todos los archivos del repositorio (HTML, CSS, JS, etc.)
# al directorio predeterminado de Nginx para servir contenido estático.
COPY . /usr/share/nginx/html

# Nginx por defecto expone el puerto 80, que EasyPanel puede detectar.
EXPOSE 80
