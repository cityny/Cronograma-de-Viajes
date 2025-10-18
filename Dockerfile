# Dockerfile para servir sitios estáticos (SPAs)
FROM nginx:alpine

# 1. Copia tu configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# 2. LIMPIEZA: Elimina archivos preexistentes de Nginx
RUN rm -rf /usr/share/nginx/html/*

# 3. Copia TODO el contenido del repositorio al directorio raíz de Nginx
COPY . /usr/share/nginx/html

EXPOSE 80

# 4. Inicia Nginx usando tu archivo de configuración personalizado
CMD ["nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]
