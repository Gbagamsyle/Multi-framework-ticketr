# Twig Ticket Management System

A ticket management system built with PHP and Twig templating engine.

## Live Url : https://multi-framework-ticketr.onrender.com/


## Local Development

```bash
# Install dependencies
composer install

# Start PHP development server
php -S localhost:8080 -t public
```

## Deployment on Render

This application is configured for deployment on Render. To deploy:

1. Fork or clone this repository to your GitHub account
2. Sign up for a [Render account](https://render.com)
3. Create a new Web Service on Render
4. Connect your GitHub repository
5. Select the "twig-implementation" directory
6. Render will automatically detect the configuration from `render.yaml`

### Environment Variables

The following environment variables are automatically configured in `render.yaml`:
- `APP_ENV`: Set to "production"
- `DOCUMENT_ROOT`: Set to "/var/www/html/public"
- `APP_SECRET`: Automatically generated
- `JWT_SECRET`: Automatically generated
- `DB_PATH`: Set to "/var/www/html/storage/users.json"

### Persistent Storage

The application uses Render Disk for persistent storage:
- Mount path: `/var/www/html/storage`
- Size: 1GB
- Stores: User data, cache files, and logs

### Health Checks

The application includes a health check endpoint at `/` which Render uses to monitor the application's status.

## Environment Configuration

For local development, create a `.env` file in the root directory with:

```env
APP_ENV=development
APP_SECRET=your-secret-key
JWT_SECRET=your-jwt-secret
DB_PATH=storage/users.json
```

## Directory Structure

- `public/` - Web root directory
- `src/` - Application source code
- `templates/` - Twig template files
- `storage/` - Application storage (cache, logs, data)
- `vendor/` - Composer dependencies
