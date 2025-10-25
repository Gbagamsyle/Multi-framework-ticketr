<?php
// Simple PHP front controller for Twig templates.
require_once __DIR__ . '/../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/../templates');
$twig = new \Twig\Environment($loader, ['cache' => false]);

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($path === '/' || $path === '/index.php') {
    echo $twig->render('landing.twig');
    exit;
}

if ($path === '/auth/login') {
    echo $twig->render('auth/login.twig');
    exit;
}

// fallback
http_response_code(404);
echo $twig->render('404.twig');
