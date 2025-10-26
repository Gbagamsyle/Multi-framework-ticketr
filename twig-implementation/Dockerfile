# Use official PHP image
FROM php:8.2-apache

# Enable Apache mod_rewrite for pretty URLs
RUN a2enmod rewrite

# Install required system packages
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install zip pdo pdo_mysql

# Copy project files
WORKDIR /var/www/html
COPY . .

# Install Composer manually
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

# Install dependencies
RUN composer install --no-interaction --no-dev --optimize-autoloader

# Apache configuration
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
CMD ["apache2-foreground"]
