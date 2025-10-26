# Use the official PHP 8.2 image with Apache
FROM php:8.2-apache

# Enable needed PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Copy project files into the container
COPY . /var/www/html/

# Set working directory
WORKDIR /var/www/html/

# Install Composer and dependencies
RUN curl -sS https://getcomposer.org/installer | php -- \
    && mv composer.phar /usr/local/bin/composer \
    && composer install --no-interaction --no-dev --optimize-autoloader

# Enable Apache rewrite module (needed for clean URLs)
RUN a2enmod rewrite

# Configure Apache
RUN echo "<Directory /var/www/html>\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>" > /etc/apache2/conf-available/app.conf \
    && a2enconf app

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
