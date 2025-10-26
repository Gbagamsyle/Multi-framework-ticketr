<?php
session_start();

require_once __DIR__ . '/../vendor/autoload.php';

use FastRoute\RouteCollector;
use function FastRoute\simpleDispatcher;

// Initialize Twig
$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/../templates');
$twig = new \Twig\Environment($loader, [
    'cache' => false,
    'debug' => true,
]);
$twig->addExtension(new \Twig\Extension\DebugExtension());

// Add global variables to Twig
$twig->addGlobal('session', $_SESSION);
$twig->addGlobal('is_authenticated', isset($_SESSION['user_id']));

// Create the router
$dispatcher = simpleDispatcher(function(RouteCollector $r) {
    // Public routes
    $r->addRoute('GET', '/', 'Ogaba\TwigImplementation\Controllers\HomeController@index');
    $r->addRoute('GET', '/auth/login', 'Ogaba\TwigImplementation\Controllers\AuthController@loginPage');
    $r->addRoute('POST', '/auth/login', 'Ogaba\TwigImplementation\Controllers\AuthController@login');
    $r->addRoute('GET', '/auth/signup', 'Ogaba\TwigImplementation\Controllers\AuthController@signupPage');
    $r->addRoute('POST', '/auth/signup', 'Ogaba\TwigImplementation\Controllers\AuthController@signup');
    $r->addRoute('GET', '/auth/logout', 'Ogaba\TwigImplementation\Controllers\AuthController@logout');
    
    // Protected routes
    $r->addRoute('GET', '/dashboard', 'Ogaba\TwigImplementation\Controllers\DashboardController@index');
    $r->addRoute('GET', '/tickets', 'Ogaba\TwigImplementation\Controllers\TicketController@index');
    $r->addRoute('POST', '/tickets', 'Ogaba\TwigImplementation\Controllers\TicketController@create');
    $r->addRoute('GET', '/tickets/{id:\d+}', 'Ogaba\TwigImplementation\Controllers\TicketController@show');
    // Ticket actions (update/delete) used by JS
    $r->addRoute('POST', '/tickets/{id:\\d+}/update', 'Ogaba\TwigImplementation\Controllers\TicketController@update');
    $r->addRoute('POST', '/tickets/{id:\\d+}/delete', 'Ogaba\TwigImplementation\Controllers\TicketController@delete');
});

// Get the request method and URI
$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Strip query string and decode URI
if (false !== $pos = strpos($uri, '?')) {
    $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);

// Dispatch the request
$routeInfo = $dispatcher->dispatch($httpMethod, $uri);
switch ($routeInfo[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        http_response_code(404);
        echo $twig->render('pages/404.twig');
        break;
        
    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        http_response_code(405);
        echo $twig->render('error.twig', [
            'message' => 'Method not allowed'
        ]);
        break;
        
    case FastRoute\Dispatcher::FOUND:
        $handler = $routeInfo[1];
        $vars = $routeInfo[2];
        
        // Parse handler into controller and method
        list($controller, $method) = explode('@', $handler);
        
        // Create controller instance and call method
        $controllerInstance = new $controller($twig);
        $controllerInstance->$method($vars);
        break;
}
