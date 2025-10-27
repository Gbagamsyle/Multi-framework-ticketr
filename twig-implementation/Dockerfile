# Use official PHP image with Apache
FROM php:8.3-apache

# Set working directory inside container
WORKDIR /var/www/html

# Install system dependencies and PHP extensions (stable, non-interactive)
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
        git \
        unzip \
        build-essential \
        pkg-config \
        libicu-dev \
        libzip-dev \
        zip \
        zlib1g-dev \
        libpng-dev \
        libjpeg62-turbo-dev \
        libfreetype6-dev \
        libonig-dev \
        default-libmysqlclient-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
        intl \
        pdo \
        pdo_mysql \
        zip \
        gd \
        opcache \
        mbstring \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache modules
RUN a2enmod rewrite headers

# Configure PHP
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini" \
    && echo "memory_limit=256M" >> "$PHP_INI_DIR/php.ini" \
    && echo "upload_max_filesize=64M" >> "$PHP_INI_DIR/php.ini" \
    && echo "post_max_size=64M" >> "$PHP_INI_DIR/php.ini"

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy only composer files first to leverage Docker cache and avoid copying host vendor dir
COPY composer.json composer.lock /var/www/html/

# Ensure storage directories exist before composer post-install scripts run
RUN mkdir -p /var/www/html/storage /var/www/html/storage/cache /var/www/html/storage/logs \
    && chown -R www-data:www-data /var/www/html/storage \
    && chmod -R 775 /var/www/html/storage

# Install dependencies (this creates the vendor directory)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Now copy the rest of the application (this won't overwrite vendor installed above unless vendor exists in repo)
COPY . /var/www/html/

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && mkdir -p /var/www/html/storage/cache /var/www/html/storage/logs \
    && chown -R www-data:www-data /var/www/html/storage \
    && chmod -R 775 /var/www/html/storage

# Configure Apache
RUN { \
    echo '<VirtualHost *:80>'; \
    echo '    DocumentRoot /var/www/html/public'; \
    echo '    DirectoryIndex index.php'; \
    echo '    <Directory /var/www/html/public>'; \
    echo '        Options Indexes FollowSymLinks'; \
    echo '        AllowOverride All'; \
    echo '        Require all granted'; \
    echo '    </Directory>'; \
    echo '</VirtualHost>'; \
} > /etc/apache2/sites-available/000-default.conf \
&& echo 'ServerName localhost' >> /etc/apache2/apache2.conf

# Create .htaccess if it doesn't exist
RUN echo 'RewriteEngine On' > /var/www/html/public/.htaccess \
    && echo 'RewriteCond %{REQUEST_FILENAME} !-f' >> /var/www/html/public/.htaccess \
    && echo 'RewriteCond %{REQUEST_FILENAME} !-d' >> /var/www/html/public/.htaccess \
    && echo 'RewriteRule ^ index.php [QSA,L]' >> /var/www/html/public/.htaccess

EXPOSE 80

CMD ["apache2-foreground"]
