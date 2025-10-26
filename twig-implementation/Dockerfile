# Use PHP 8.2 with Apache
FROM php:8.2-apache

# Install system dependencies for Composer and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Enable Apache mod_rewrite (for clean URLs)
RUN a2enmod rewrite

# Copy app files into container
WORKDIR /var/www/html
COPY . /var/www/html

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

# Install PHP dependencies
RUN composer install --no-interaction --no-dev --optimize-autoloader || true

# Configure Apache to allow .htaccess overrides
RUN echo "<Directory /var/www/html>\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>" > /etc/apache2/conf-available/app.conf && \
    a2enconf app

# Expose port 80
EXPOSE 80

# Start Apache server
CMD ["apache2-foreground"]
