import React, { useEffect, useState } from 'react';
import { setPushFunction } from '../lib/toast';
import '../styles/animations.css';

const Icons = {
  success: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

const colors = {
  success: 'var(--color-success)',
  error: 'var(--color-error)',
  warning: 'var(--color-warning)',
  info: 'var(--accent)'
};

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    setPushFunction((toast) => {
      setToasts(prev => [
        ...prev,
        { 
          id: Date.now() + Math.random(), 
          type: 'info',
          ...toast 
        }
      ]);
    });
  }, []);

  useEffect(() => {
    if (toasts.length > 0) {
      const timers = toasts.map(t =>
        setTimeout(() => {
          setToasts(prev => prev.filter(p => p.id !== t.id));
        }, t.duration || 4000)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [toasts]);

  const handleDismiss = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="flex items-start gap-3 min-w-[320px] max-w-md bg-white rounded-lg shadow-lg overflow-hidden"
          style={{
            animation: 'slide-in 0.2s ease-out',
            transform: 'translateX(0)',
          }}
        >
          <div
            className="flex-none w-2 self-stretch"
            style={{ background: colors[toast.type] }}
          />
          
          <div className="flex-1 flex gap-3 p-4">
            <div 
              className="flex-none pt-1"
              style={{ color: colors[toast.type] }}
            >
              {Icons[toast.type]}
            </div>
            
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                {toast.msg}
              </div>
            </div>

            <button
              onClick={() => handleDismiss(toast.id)}
              className="flex-none pt-1 text-gray-400 hover:text-gray-500"
              aria-label="Dismiss"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;


