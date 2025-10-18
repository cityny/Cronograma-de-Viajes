FROM nginx:alpine

# 1. Copia el archivo personalizado de tipos MIME
COPY mime.types.custom /etc/nginx/mime.types.custom

# 2. Copia el archivo principal de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# 3. Limpieza y copia de archivos del sitio
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html

EXPOSE 80

# 4. Inicia Nginx usando el archivo de configuración personalizado
CMD ["nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]
