<?php

namespace Ogaba\TwigImplementation\Controllers;

class AuthController extends BaseController {
    private $usersFile;

    public function __construct($twig) {
        parent::__construct($twig);
        $this->usersFile = __DIR__ . '/../../storage/users.json';
    }

    // ==========================
    // Render Login Page
    // ==========================
    public function loginPage() {
        if ($this->isAuthenticated()) {
            $this->redirect('/dashboard');
        }
        $this->render('auth/login.twig');
    }

    // ==========================
    // Handle Login
    // ==========================
    public function login() {
        $email = trim($_POST['email'] ?? '');
        $password = trim($_POST['password'] ?? '');

        if (!$email || !$password) {
            $this->render('auth/login.twig', [
                'error' => 'Please fill in both email and password.'
            ]);
            return;
        }

        $users = $this->getUsers();

        foreach ($users as $user) {
            if ($user['email'] === $email && password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_email'] = $user['email'];
                $this->redirect('/dashboard');
                return;
            }
        }

        $this->render('auth/login.twig', [
            'error' => 'Invalid email or password'
        ]);
    }

    // ==========================
    // Render Signup Page
    // ==========================
    public function signupPage() {
        if ($this->isAuthenticated()) {
            $this->redirect('/dashboard');
        }
        $this->render('auth/signup.twig');
    }

    // ==========================
    // Handle Signup
    // ==========================
    public function signup() {
        $email = trim($_POST['email'] ?? '');
        $password = trim($_POST['password'] ?? '');
        $name = trim($_POST['name'] ?? '');

        if (!$email || !$password || !$name) {
            $this->render('auth/signup.twig', [
                'error' => 'All fields are required.'
            ]);
            return;
        }

        $users = $this->getUsers();

        // Check if email already exists
        foreach ($users as $user) {
            if ($user['email'] === $email) {
                $this->render('auth/signup.twig', [
                    'error' => 'Email already exists.'
                ]);
                return;
            }
        }

        // Create new user
        $newUser = [
            'id' => count($users) + 1,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'name' => $name
        ];

        $users[] = $newUser;
        $this->saveUsers($users);

        // Log in user
        $_SESSION['user_id'] = $newUser['id'];
        $_SESSION['user_name'] = $newUser['name'];
        $_SESSION['user_email'] = $newUser['email'];

        $this->redirect('/dashboard');
    }

    // ==========================
    // Logout
    // ==========================
    public function logout() {
        session_destroy();
        $this->redirect('/');
    }

    // ==========================
    // Helper Functions
    // ==========================
    private function getUsers() {
        if (!file_exists($this->usersFile)) {
            return [];
        }

        $json = file_get_contents($this->usersFile);
        $users = json_decode($json, true);
        return is_array($users) ? $users : [];
    }

    private function saveUsers($users) {
        $dir = dirname($this->usersFile);
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }

        file_put_contents(
            $this->usersFile,
            json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );
    }
}