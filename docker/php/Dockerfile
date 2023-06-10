FROM alpine:3.14

RUN apk add --no-cache php8 \
    php8-fpm \
    php8-opcache \
    php8-mysqli \
    php8-pdo_mysql \
    php8-mbstring \
    php8-xml \
    php8-xmlwriter \ 
    php8-zip \
    php8-gd \
    php8-redis \
    php8-phar \
    php8-curl \ 
    php8-fileinfo \
    php8-dom \
    php8-tokenizer \
    php8-exif \
    curl \
    nano \
    libjpeg-turbo \
    libpng \
    freetype \
    && rm -rf /var/cache/apk/*


# Tạo liên kết đến binary php8 với tên php
RUN ln -s /usr/bin/php8 /usr/bin/php

# Install Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && php -r "unlink('composer-setup.php');" 


WORKDIR /var/www/html/BE

EXPOSE 8000 8001 9000

CMD ["php-fpm8", "-F"]
