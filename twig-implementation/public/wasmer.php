<?php
require __DIR__ . '/../vendor/autoload.php';

use FastRoute\RouteCollector;
use Dotenv\Dotenv;
use Twig\Loader\FilesystemLoader;
use Twig\Environment;

// Health check (for Wasmer)
if (isset($_GET['action']) && $_GET['action'] === 'liveconfig') {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'ok']);
    exit;
}

// Load environment
$dotenv = Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->safeLoad();

// Error reporting
if (getenv('APP_ENV') === 'production') {
    error_reporting(E_ALL & ~E_DEPRECATED & ~E_STRICT);
    ini_set('display_errors', '0');
} else {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
}

// Session
session_start();

// Initialize Twig
$loader = new FilesystemLoader(__DIR__ . '/../templates');
$twig = new Environment($loader, [
    'cache' => __DIR__ . '/../storage/cache',
    'auto_reload' => true,
]);

// Routing
$dispatcher = FastRoute\simpleDispatcher(function(RouteCollector $r) {
    require __DIR__ . '/../routes.php';
});

$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

if (false !== $pos = strpos($uri, '?')) {
    $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);

// Dispatch
$routeInfo = $dispatcher->dispatch($httpMethod, $uri);
switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        http_response_code(404);
        echo $twig->render('pages/404.twig', ['message' => 'Page not found']);
        break;

    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        http_response_code(405);
        echo $twig->render('pages/405.twig', [
            'allowed' => implode(', ', $routeInfo[1])
        ]);
        break;

    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        call_user_func_array($handler, [$twig, $vars]);
        break;
}
