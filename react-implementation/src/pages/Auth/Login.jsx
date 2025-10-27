import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { pushToast } from '../../lib/toast';
import AuthLayout from '../../components/AuthLayout';

const EmailIcon = () => (
  <svg width="20" height="20" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" fill="none" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const Spinner = ({ size = 16 }) => (
  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={size} height={size}>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const validate = () => {
    const errors = {};
    if (!email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Please enter a valid email';
    if (!password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setIsLoading(true);
    try {
      const result = await login({ email, password });
      pushToast({ msg: `Welcome back, ${result.username}!`, type: 'success' });
      navigate(from, { replace: true });
    } catch (err) {
      const message = err.code === 400 
        ? 'Invalid email or password' 
        : 'Failed to sign in. Please try again.';
      pushToast({ msg: message, type: 'error' });
      setErrors({ form: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Please sign in to your account to continue"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {errors.form && (
          <div className="auth-alert error" role="alert">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{errors.form}</span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <div className="input-with-icon">
            <input
              id="email"
              type="email"
              className={`with-icon-left ${errors.email ? 'error' : ''}`}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
              autoFocus
            />
            <span className="input-icon left" aria-hidden="true">
              <EmailIcon />
            </span>
          </div>
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <div className="flex justify-between items-center">
            <label htmlFor="password">Password</label>
            <Link to="/auth/forgot-password" className="text-sm text-accent hover:text-accent-hover">
              Forgot password?
            </Link>
          </div>
          <div className="input-with-icon">
            <input
              id="password"
              type="password"
              className={`with-icon-left ${errors.password ? 'error' : ''}`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="current-password"
            />
            <span className="input-icon left" aria-hidden="true">
              <LockIcon />
            </span>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button 
          type="submit" 
          className="btn-submit"
          disabled={isLoading}
        >
          <span className="flex items-center justify-center gap-2">
            {isLoading ? <Spinner /> : 'Sign in'}
          </span>
        </button>

        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/auth/signup">Sign up for free</Link>
        </div>
      </form>
    </AuthLayout>
  );
}