<?php

namespace Ogaba\TwigImplementation\Controllers;

use Twig\Environment;

class BaseController {
    protected $twig;

    public function __construct(Environment $twig) {
        $this->twig = $twig;
    }

    protected function render(string $template, array $data = []) {
        echo $this->twig->render($template, $data);
    }

    protected function json($data) {
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    protected function redirect($path) {
        header("Location: $path");
        exit;
    }

    protected function isAuthenticated() {
        return isset($_SESSION['user_id']);
    }

    protected function requireAuth() {
        if (!$this->isAuthenticated()) {
            $this->redirect('/auth/login');
        }
    }
}