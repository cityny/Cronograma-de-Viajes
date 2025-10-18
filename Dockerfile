# (Opcional, pero más limpio) Usa una imagen base limpia (scratch) y añade Nginx después.

# Stage 1: Imagen de Nginx Alpine
FROM nginx:alpine

# ELIMINA los archivos de configuración predeterminados de Nginx
# que a veces causan problemas o sirven archivos no deseados.
# ¡Esto es la clave para sitios estáticos simples!
RUN rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copiamos todos los archivos de tu repositorio al directorio web de Nginx
COPY . /usr/share/nginx/html

# Asegúrate de que Nginx use la configuración por defecto
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
