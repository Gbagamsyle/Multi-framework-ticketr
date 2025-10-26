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
