<?php

namespace Ogaba\TwigImplementation\Controllers;

class TicketController extends BaseController {
    protected static $tickets = [
        [
            'id' => 1,
            'title' => 'Login Issue',
            'description' => 'Users are reporting issues logging into the application',
            'status' => 'open',
            'priority' => 'high',
            'created_at' => '2023-10-24',
            'user_id' => 1,
            'assignee' => 'John Doe'
        ],
        [
            'id' => 2,
            'title' => 'Payment Failed',
            'description' => 'Payment transactions are failing for some users',
            'status' => 'closed',
            'priority' => 'critical',
            'created_at' => '2023-10-23',
            'user_id' => 1,
            'assignee' => 'Jane Smith'
        ],
        [
            'id' => 3,
            'title' => 'Email Notifications',
            'description' => 'Email notifications are delayed by several hours',
            'status' => 'in-progress',
            'priority' => 'medium',
            'created_at' => '2023-10-22',
            'user_id' => 2,
            'assignee' => 'John Doe'
        ],
        [
            'id' => 4,
            'title' => 'Mobile App Crash',
            'description' => 'Mobile app crashes when uploading images',
            'status' => 'open',
            'priority' => 'high',
            'created_at' => '2023-10-21',
            'user_id' => 1,
            'assignee' => 'Jane Smith'
        ]
    ];

    public function index() {
        $this->requireAuth();
        
        $userId = $_SESSION['user_id'];
        $userTickets = array_filter(self::$tickets, function($ticket) use ($userId) {
            return $ticket['user_id'] === $userId;
        });
        
        $this->render('pages/tickets.twig', [
            'tickets' => array_values($userTickets)
        ]);
    }
    
    public function create() {
        $this->requireAuth();
        
        $title = $_POST['title'] ?? '';
        $description = $_POST['description'] ?? '';
        
        if (!$title || !$description) {
            $this->render('pages/tickets.twig', [
                'error' => 'Title and description are required'
            ]);
            return;
        }
        
        $newTicket = [
            'id' => count(self::$tickets) + 1,
            'title' => $title,
            'description' => $description,
            'status' => 'open',
            'priority' => 'medium',
            'created_at' => date('Y-m-d'),
            'user_id' => $_SESSION['user_id'],
            'assignee' => 'Unassigned'
        ];
        
        // In a real application, we would save to database
        // For demo, we'll just add to our static array
        self::$tickets[] = $newTicket;
        
        $this->redirect('/tickets');
    }
    
    public function show($vars) {
        $this->requireAuth();
        
        $ticketId = (int)$vars['id'];
        $userId = $_SESSION['user_id'];
        
        $ticket = null;
        foreach (self::$tickets as $t) {
            if ($t['id'] === $ticketId && $t['user_id'] === $userId) {
                $ticket = $t;
                break;
            }
        }
        
        if (!$ticket) {
            $this->redirect('/404');
            return;
        }
        
        $this->render('pages/ticket-detail.twig', [
            'ticket' => $ticket
        ]);
    }
    
    public function update($vars) {
        $this->requireAuth();
        
        $ticketId = (int)$vars['id'];
        $status = $_POST['status'] ?? null;
        
        if (!$status) {
            $this->json(['error' => 'Status is required']);
            return;
        }
        
        $userId = $_SESSION['user_id'];
        $updated = false;
        
        foreach (self::$tickets as &$ticket) {
            if ($ticket['id'] === $ticketId && $ticket['user_id'] === $userId) {
                $ticket['status'] = $status;
                $updated = true;
                break;
            }
        }
        
        if (!$updated) {
            $this->json(['error' => 'Ticket not found']);
            return;
        }
        
        $this->json(['success' => true]);
    }
    
    public function delete($vars) {
        $this->requireAuth();
        
        $ticketId = (int)$vars['id'];
        $userId = $_SESSION['user_id'];
        
        self::$tickets = array_filter(self::$tickets, function($ticket) use ($ticketId, $userId) {
            return !($ticket['id'] === $ticketId && $ticket['user_id'] === $userId);
        });
        
        $this->redirect('/tickets');
    }

    public function getAllTickets() {
        return self::$tickets;
    }

    public function getDashboardStats() {
        $this->requireAuth();
        
        $userId = $_SESSION['user_id'];
        $userTickets = array_filter(self::$tickets, function($ticket) use ($userId) {
            return $ticket['user_id'] === $userId;
        });
        
        $total = count($userTickets);
        $open = count(array_filter($userTickets, function($ticket) {
            return $ticket['status'] === 'open';
        }));
        $inProgress = count(array_filter($userTickets, function($ticket) {
            return $ticket['status'] === 'in-progress';
        }));
        $closed = count(array_filter($userTickets, function($ticket) {
            return $ticket['status'] === 'closed';
        }));
        
        // Count high priority active tickets
        $highPriority = count(array_filter($userTickets, function($ticket) {
            return $ticket['priority'] === 'high' && $ticket['status'] !== 'closed';
        }));
        
        return [
            'total_tickets' => $total,
            'open_tickets' => $open,
            'in_progress_tickets' => $inProgress,
            'closed_tickets' => $closed,
            'high_priority_tickets' => $highPriority
        ];
    }
}