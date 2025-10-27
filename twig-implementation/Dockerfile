FROM php:8.1-apache

# Install system packages and PHP extensions commonly required
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    zlib1g-dev \
    libpng-dev \
    && docker-php-ext-install zip intl pdo pdo_mysql mbstring opcache

# Enable Apache rewrite
RUN a2enmod rewrite

# Install Composer (copy from official composer image)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy app
WORKDIR /var/www/html
COPY . /var/www/html

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction || true

# Ensure storage folders exist with correct permissions
RUN mkdir -p storage/cache storage/logs \
    && chown -R www-data:www-data storage \
    && chmod -R 775 storage

EXPOSE 80

CMD ["apache2-foreground"]
FROM composer:2 AS vendor

WORKDIR /app

# Copy only composer files first for better caching
COPY composer.json composer.lock* /app/

# Install PHP dependencies into /app/vendor
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist || true

FROM php:8.2-apache

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

# Copy application code
WORKDIR /var/www/html
COPY --chown=www-data:www-data . /var/www/html

# Copy vendor from the composer stage (if exists)
COPY --from=vendor /app/vendor /var/www/html/vendor

# Configure Apache to use the public folder as DocumentRoot
RUN sed -ri -e "s!/var/www/html!${APACHE_DOCUMENT_ROOT}!g" /etc/apache2/sites-available/*.conf \
 && sed -ri -e "s!<Directory /var/www/>!<Directory ${APACHE_DOCUMENT_ROOT}/>!g" /etc/apache2/apache2.conf \
 && a2enmod rewrite

EXPOSE 80

CMD ["apache2-foreground"]
# Use PHP with Apache
FROM php:8.2-apache

# Set working directory
WORKDIR /var/www/html

# Install unzip and other utilities
RUN apt-get update && apt-get install -y unzip zip git libzip-dev && docker-php-ext-install zip

# Copy composer from the Composer image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy project files
COPY . /var/www/html

# Run composer install
RUN composer install --no-interaction --no-dev --optimize-autoloader || true

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]