<?php

namespace Ogaba\TwigImplementation\Controllers;

class AuthController extends BaseController {
    private $users = [
        [
            'id' => 1,
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'name' => 'Demo User'
        ],
        [
            'id' => 2,
            'email' => 'admin',
            'password' => 'admin123',
            'name' => 'Admin User'
        ]
    ];

    public function loginPage() {
        if ($this->isAuthenticated()) {
            $this->redirect('/dashboard');
        }
        $this->render('auth/login.twig');
    }

    public function login() {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';

        foreach ($this->users as $user) {
            if ($user['email'] === $email && $user['password'] === $password) {
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

    public function signupPage() {
        if ($this->isAuthenticated()) {
            $this->redirect('/dashboard');
        }
        $this->render('auth/signup.twig');
    }

    public function signup() {
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        $name = $_POST['name'] ?? '';

        if (!$email || !$password || !$name) {
            $this->render('auth/signup.twig', [
                'error' => 'All fields are required'
            ]);
            return;
        }

        // Check if email already exists
        foreach ($this->users as $user) {
            if ($user['email'] === $email) {
                $this->render('auth/signup.twig', [
                    'error' => 'Email already exists'
                ]);
                return;
            }
        }

        // Create new user
        $newUser = [
            'id' => count($this->users) + 1,
            'email' => $email,
            'password' => $password,
            'name' => $name
        ];

        // In a real application, we would save this to a database
        // For demo, we'll just log in the user
        $_SESSION['user_id'] = $newUser['id'];
        $_SESSION['user_name'] = $newUser['name'];
        $_SESSION['user_email'] = $newUser['email'];
        
        $this->redirect('/dashboard');
    }

    public function logout() {
        session_destroy();
        $this->redirect('/');
    }
}