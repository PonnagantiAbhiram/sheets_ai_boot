import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../services/auth';

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (form.password.length < 8) {
      return setError('Password must be at least 8 characters long');
    }

    setLoading(true);
    try {
      await signUp(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-glow" />
      
      <div className="auth-card glass animate-fade-in-up">
        <div className="auth-header">
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✨</div>
          <h2>Create Account</h2>
          <p>Join TaskBot to automate your workflow</p>
        </div>

        {error && (
          <div className="auth-error">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Repeat password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: '10px' }}
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                Creating Account...
              </span>
            ) : (
              'Sign Up →'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
        
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" style={{ color: '#64748b', fontSize: '0.85rem' }}>
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
