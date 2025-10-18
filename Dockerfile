FROM nginx:alpine

# 1. Copy the custom MIME types file to the expected path
COPY mime.types.custom /etc/nginx/mime.types.custom

# 2. Copy the main configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# 3. Cleanup and copy website files
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html

EXPOSE 80

# 4. Start Nginx using the custom configuration file
CMD ["nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;"]
