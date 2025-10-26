// Toast notification system
const toastContainer = document.getElementById('toast-container');

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} animate-slide-in`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('animate-slide-out');
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Handle alert dismissal
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.display = 'none';
        }, 5000);
    });

    // Handle ticket form validation
    const ticketForm = document.querySelector('form[action="/tickets"]');
    if (ticketForm) {
        ticketForm.addEventListener('submit', function(e) {
            const title = this.querySelector('#title').value.trim();
            const description = this.querySelector('#description').value.trim();
            
            if (!title || !description) {
                e.preventDefault();
                showToast('Please fill in all required fields', 'error');
            }
        });
    }

    // Handle ticket status updates
    document.addEventListener('click', function(e) {
        if (e.target.matches('.update-status')) {
            const ticketId = e.target.dataset.ticketId;
            const status = e.target.dataset.status;
            
            fetch(`/tickets/${ticketId}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showToast('Ticket status updated successfully');
                    // Refresh the page to show updated status
                    window.location.reload();
                } else {
                    showToast(data.error || 'Failed to update ticket status', 'error');
                }
            })
            .catch(error => {
                showToast('An error occurred', 'error');
                console.error('Error:', error);
            });
        }
    });

    // Handle modals
    const showModalBtns = document.querySelectorAll('[data-modal]');
    showModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const hideModalBtns = document.querySelectorAll('[data-dismiss="modal"]');
    hideModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Initialize any tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', (e) => {
            const text = e.target.dataset.tooltip;
            const tip = document.createElement('div');
            tip.className = 'tooltip';
            tip.textContent = text;
            document.body.appendChild(tip);
            
            const rect = e.target.getBoundingClientRect();
            tip.style.top = rect.bottom + 5 + 'px';
            tip.style.left = rect.left + (rect.width - tip.offsetWidth) / 2 + 'px';
        });
        
        tooltip.addEventListener('mouseleave', () => {
            const tip = document.querySelector('.tooltip');
            if (tip) {
                tip.remove();
            }
        });
    });
});