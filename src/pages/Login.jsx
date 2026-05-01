import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../services/auth';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(form.email, form.password);

      // 🔥 ROLE CONTROL LOGIC
      const ADMIN_EMAIL = "admin@example.com";
      localStorage.setItem("role", form.email === ADMIN_EMAIL ? "admin" : "user");
      localStorage.setItem("userEmail", form.email);

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow} />
      <div style={styles.card} className="glass animate-fade-in-up">

        <div style={styles.header}>
          <div style={styles.logoMark}>⚡</div>
          <h1 style={styles.title}>Welcome back</h1>
          <p style={styles.subtitle}>Sign in to access your task dashboard</p>
        </div>

        <div style={styles.placeholderBadge}>
          🔒 Firebase Auth (Placeholder) — any email/password works
        </div>

        <form onSubmit={handleSubmit} style={styles.form} noValidate>
          <div className="input-group">
            <label htmlFor="email" style={{ marginBottom: '5px', display: 'block', color: '#cbd5e1' }}>Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password" style={{ marginBottom: '5px', display: 'block', color: '#cbd5e1' }}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {error && <div style={styles.errorMsg}>⚠️ {error}</div>}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', borderRadius: '8px', background: '#6366f1', color: '#fff', border: 'none', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px' }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <p style={styles.registerPrompt}>
          Don't have an account? <Link to="/register" style={styles.link}>Sign Up</Link>
        </p>

        <p style={styles.backLink}>
          <Link to="/" style={{ color: '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 40px', position: 'relative', overflow: 'hidden', background: '#0f172a' },
  glow: { position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 400, background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)', zIndex: 0 },
  card: { width: '100%', maxWidth: 420, borderRadius: 20, padding: '40px 32px', position: 'relative', zIndex: 1, background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' },
  header: { textAlign: 'center', marginBottom: 24 },
  logoMark: { fontSize: '2.5rem', marginBottom: 12 },
  title: { fontSize: '1.8rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 8 },
  subtitle: { color: '#94a3b8', fontSize: '0.95rem' },
  placeholderBadge: { background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 8, padding: '10px', fontSize: '0.8rem', color: '#67e8f9', textAlign: 'center', marginBottom: 24 },
  form: { display: 'flex', flexDirection: 'column', gap: 16 },
  input: { width: '100%', padding: '12px 14px', borderRadius: '8px', background: '#0f172a', border: '1px solid #334155', color: '#fff', boxSizing: 'border-box' },
  errorMsg: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '12px', fontSize: '0.85rem', color: '#f87171' },
  backLink: { textAlign: 'center', marginTop: 24 },
  registerPrompt: { textAlign: 'center', marginTop: 24, color: '#94a3b8', fontSize: '0.9rem' },
  link: { color: '#818cf8', fontWeight: 600, textDecoration: 'none' },
};