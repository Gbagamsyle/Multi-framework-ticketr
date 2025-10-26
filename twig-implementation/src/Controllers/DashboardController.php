<?php

namespace Ogaba\TwigImplementation\Controllers;

class DashboardController extends BaseController {
    public function index() {
        $this->requireAuth();
        
        // Get ticket controller to access ticket data and stats
        $ticketController = new TicketController($this->twig);
        $stats = $ticketController->getDashboardStats();
        
        // Get recent tickets (last 5)
        $userId = $_SESSION['user_id'];
        // Use the instance method to get tickets
        $allTickets = $ticketController->getAllTickets();
        $userTickets = array_filter($allTickets, function($ticket) use ($userId) {
            return $ticket['user_id'] === $userId;
        });
        
        // Sort tickets by created_at desc and take the first 5
        usort($userTickets, function($a, $b) {
            return strtotime($b['created_at']) - strtotime($a['created_at']);
        });
        $recent_tickets = array_slice($userTickets, 0, 5);
        
        $this->render('pages/dashboard.twig', [
            'stats' => $stats,
            'recent_tickets' => $recent_tickets,
            'user' => [
                'name' => $_SESSION['user_name'],
                'email' => $_SESSION['user_email']
            ]
        ]);
    }
}