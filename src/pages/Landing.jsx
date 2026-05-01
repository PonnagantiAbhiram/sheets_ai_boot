import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  { icon: '🤖', title: 'WhatsApp Bot', desc: 'Control tasks directly from WhatsApp with simple commands like done and start.' },
  { icon: '📊', title: 'Real-Time Dashboard', desc: 'View all tasks, assignees, and statuses from a clean, unified dashboard.' },
  { icon: '🔐', title: 'Secure Access', desc: 'Admin-only bot commands. Firebase authentication for the web panel.' },
  { icon: '⚡', title: 'Instant Updates', desc: 'Mark tasks done or in-progress with one tap — bot or browser, your choice.' },
];

export default function Landing() {
  return (
    <div style={styles.page}>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroGlow} />
        <div style={styles.heroContent} className="animate-fade-in-up">
          <div style={styles.heroBadge}>⚡ Task Automation System</div>
          <h1 style={styles.heroTitle}>
            Automate your workflow with{' '}
            <span className="gradient-text">WhatsApp & React</span>
          </h1>
          <p style={styles.heroSub}>
            Manage team tasks seamlessly — update statuses via WhatsApp bot commands or the
            web dashboard. Fast, minimal, and always in sync.
          </p>
          <div style={styles.heroActions}>
            <Link id="cta-get-started" className="btn btn-primary" to="/login">
              Get Started →
            </Link>
            <Link id="cta-dashboard" className="btn btn-secondary" to="/dashboard">
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Hero visual card */}
        <div style={styles.heroCard} className="animate-fade-in-up glass">
          <div style={styles.terminalBar}>
            <span style={styles.dot} /><span style={styles.dot} /><span style={styles.dot} />
            <span style={styles.terminalTitle}>WhatsApp Bot — Terminal</span>
          </div>
          <div style={styles.terminalBody}>
            <p style={styles.termLine}><span style={{ color: '#22d3ee' }}>Bot:</span> ✅ QR code ready. Scan to connect.</p>
            <p style={styles.termLine}><span style={{ color: '#10b981' }}>Bot:</span> 🚀 Ready! Listening for commands...</p>
            <p style={styles.termLine}><span style={{ color: '#f59e0b' }}>Admin:</span> done TASK-002</p>
            <p style={styles.termLine}><span style={{ color: '#10b981' }}>Bot:</span> ✅ Task TASK-002 marked as <strong>done</strong>.</p>
            <p style={styles.termLine}><span style={{ color: '#f59e0b' }}>Admin:</span> start TASK-003</p>
            <p style={styles.termLine}><span style={{ color: '#10b981' }}>Bot:</span> ✅ Task TASK-003 marked as <strong>in-progress</strong>.</p>
            <p style={{ ...styles.termLine, opacity: 0.4 }}>█</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={styles.features}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Everything you need</h2>
          <p style={styles.sectionSub}>Built for small teams who want automation without complexity.</p>
          <div style={styles.featureGrid}>
            {features.map((f, i) => (
              <div
                key={f.title}
                className="card animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div style={styles.featureIcon}>{f.icon}</div>
                <h3 style={styles.featureTitle}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={styles.sectionTitle}>Ready to automate?</h2>
          <p style={styles.sectionSub}>Set up in minutes. No backend server required for local use.</p>
          <Link id="cta-bottom" className="btn btn-primary" to="/login" style={{ marginTop: 16 }}>
            Start Now →
          </Link>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', paddingTop: 64 },
  hero: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 48,
    padding: '80px 24px 80px',
    maxWidth: 1100,
    margin: '0 auto',
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: -100,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 600,
    height: 400,
    background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: 680,
    zIndex: 1,
  },
  heroBadge: {
    display: 'inline-block',
    padding: '6px 16px',
    background: 'rgba(99,102,241,0.12)',
    border: '1px solid rgba(99,102,241,0.3)',
    borderRadius: 999,
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#818cf8',
    marginBottom: 20,
    letterSpacing: '0.03em',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.25rem)',
    fontWeight: 800,
    lineHeight: 1.15,
    marginBottom: 20,
    color: '#f1f5f9',
  },
  heroSub: {
    fontSize: '1.05rem',
    color: '#94a3b8',
    lineHeight: 1.7,
    marginBottom: 32,
  },
  heroActions: {
    display: 'flex',
    gap: 12,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  heroCard: {
    width: '100%',
    maxWidth: 540,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 1,
  },
  terminalBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '10px 16px',
    background: 'rgba(0,0,0,0.4)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.2)',
    display: 'inline-block',
  },
  terminalTitle: {
    marginLeft: 8,
    fontSize: '0.75rem',
    color: '#64748b',
    fontFamily: 'monospace',
  },
  terminalBody: {
    padding: '16px 20px',
    fontFamily: 'monospace',
    fontSize: '0.82rem',
    background: 'rgba(0,0,0,0.25)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  termLine: {
    color: '#cbd5e1',
    lineHeight: 1.5,
  },
  features: {
    padding: '60px 0',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
  sectionTitle: {
    fontSize: '1.75rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSub: {
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 40,
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 20,
  },
  featureIcon: { fontSize: '2rem', marginBottom: 12 },
  featureTitle: { fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: '#e2e8f0' },
  featureDesc: { fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 },
  ctaSection: {
    padding: '60px 24px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
};
