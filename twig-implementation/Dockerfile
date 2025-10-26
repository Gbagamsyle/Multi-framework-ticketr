# Use official PHP image with Apache
FROM php:8.2-apache

# Install unzip and enable PHP extensions
RUN apt-get update && apt-get install -y unzip zip && docker-php-ext-install pdo pdo_mysql

# Enable Apache mod_rewrite (for clean URLs)
RUN a2enmod rewrite

# Copy project files into the container
COPY . /var/www/html/

# Set working directory
WORKDIR /var/www/html/

# Install composer dependencies
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-interaction --no-dev --optimize-autoloader

# Expose port 80
EXPOSE 80
