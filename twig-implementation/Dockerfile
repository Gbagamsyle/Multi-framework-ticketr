# Use official PHP image with Apache
FROM php:8.3-apache

# Set working directory inside container
WORKDIR /var/www/html

# Install required system packages
RUN apt-get update && apt-get install -y \
    git unzip libicu-dev libzip-dev zip \
    && docker-php-ext-install intl pdo pdo_sqlite zip

# Enable Apache rewrite module
RUN a2enmod rewrite

# Copy project files into the container
COPY . /var/www/html

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install PHP dependencies (without dev packages)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Set permissions for storage directory
RUN mkdir -p /var/www/html/storage && chmod -R 777 /var/www/html/storage

# Expose port 80 for the web service
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
