# 1. Usamos una imagen base de Nginx muy ligera
FROM nginx:alpine

# 2. ELIMINAR todo lo que haya en la carpeta de contenido web predeterminada de Nginx.
# Esto garantiza que la página de bienvenida de Nginx no interfiera.
RUN rm -rf /usr/share/nginx/html/*

# 3. Copiamos todos los archivos de tu repositorio (el "." es la raíz)
# al directorio web de Nginx.
COPY . /usr/share/nginx/html

# 4. Asegúrate de que Nginx use la configuración por defecto
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
