import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut, getCurrentUser } from '../services/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>⚡</span>
          <span className="gradient-text" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
            TaskBot
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={styles.links}>
          <NavLink to="/" label="Home" active={isActive('/')} />
          {user && <NavLink to="/dashboard" label="Dashboard" active={isActive('/dashboard')} />}
        </div>

        {/* Right Side */}
        <div style={styles.actions}>
          {user ? (
            <>
              <div style={styles.userBadge}>
                <span style={styles.userAvatar}>{user.displayName?.[0]?.toUpperCase() || 'U'}</span>
                <span style={styles.userName}>{user.displayName}</span>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="btn btn-primary btn-sm" to="/login">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      style={{
        ...styles.navLink,
        color: active ? '#818cf8' : '#94a3b8',
        borderBottom: active ? '2px solid #6366f1' : '2px solid transparent',
      }}
    >
      {label}
    </Link>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: 'rgba(10, 14, 26, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    height: 64,
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    textDecoration: 'none',
  },
  logoIcon: {
    fontSize: '1.3rem',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    paddingLeft: 32,
  },
  navLink: {
    padding: '4px 12px',
    fontSize: '0.9rem',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    paddingBottom: 6,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  userBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'white',
  },
  userName: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#cbd5e1',
  },
};
