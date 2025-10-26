# Use an official PHP + Apache base image
FROM php:8.2-apache

# Install system dependencies and PHP extensions required by Twig and Composer
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    libzip-dev \
    libonig-dev \
    && docker-php-ext-install zip mbstring

# Enable Apache mod_rewrite (important for routing)
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy the application files into the container
COPY . .

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Install PHP dependencies
RUN composer install --no-interaction --no-dev --optimize-autoloader

# Configure Apache to use public directory as the web root
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>\n\
\n\
DocumentRoot /var/www/html/public\n' > /etc/apache2/sites-available/000-default.conf

# Expose port 80
EXPOSE 80

# Start Apache server
CMD ["apache2-foreground"]

