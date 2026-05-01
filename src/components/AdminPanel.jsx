import React, { useState } from 'react';
import { addTask, deleteTask, updateStatus, updateTask } from '../services/api';
// 📂 COMMAND CONFIGURATION (Mocking a command file structure)
const COMMANDS = {
  admin: {
    add: { label: 'Add Task', icon: '➕', loading: 'Adding...' },
    delete: { label: 'Delete Task', icon: '❌', loading: 'Deleting...' },
    done: { label: 'Mark Done', icon: '✔', loading: 'Updating...' },
    start: { label: 'Start Task', icon: '🚀', loading: 'Starting...' },
  },
  core: {
    export: { label: 'Export to CSV', icon: '📥', loading: 'Exporting...' },
  },
  whatsapp: {
    broadcast: {
      label: 'Broadcast to WhatsApp',
      icon: '📢',
      alert: 'Use WhatsApp command "!broadcast <msg>"'
    },
  }
};

export default function AdminPanel({ tasks = [], refreshTasks }) {
  const [loadingBtn, setLoadingBtn] = useState(null);
  const [hoverBtn, setHoverBtn] = useState(null);

  // 📊 STATS CALCULATIONS
  const total = tasks?.length || 0;
  const doneCount = tasks?.filter((t) => t?.status === 'done').length || 0;
  const inProgress = tasks?.filter((t) => t?.status === 'in-progress').length || 0;
  const pending = tasks?.filter((t) => t?.status === 'pending').length || 0;
  const completion = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const stats = [
    { label: 'Total Tasks', value: total, icon: '📋', color: '#60a5fa' },
    { label: 'Completed', value: doneCount, icon: '✅', color: '#4ade80' },
    { label: 'In Progress', value: inProgress, icon: '⚡', color: '#fbbf24' },
    { label: 'Pending', value: pending, icon: '⏳', color: '#94a3b8' },
  ];

  // 🛠️ ACTIONS
  const handleAction = async (key, actionFn, ...args) => {
    setLoadingBtn(key);
    try {
      await actionFn(...args);
      if (refreshTasks) await refreshTasks();
    } finally {
      setLoadingBtn(null);
    }
  };

  const promptAndExecute = (key, actionFn, status) => {
    const id = prompt(`Enter Task ID for ${key}:`);
    if (id) handleAction(key, actionFn, id, status);
  };
  const handleUpdateTask = () => {
    const id = prompt("Enter Task ID to update:");
    if (!id) return;

    const title = prompt("New Title (optional):");
    const assigned = prompt("New Assigned:");
    const dueDate = prompt("New Due Date:");
    const projectType = prompt("New Project:");
    const contact = prompt("New Phone:");

    handleAction('update', updateTask, {
      taskId: id,
      title,
      assigned,
      dueDate,
      projectType,
      contact
    });
  };
  const handleExport = () => {
    setLoadingBtn('export');
    try {
      if (!tasks.length) return alert('No tasks to export!');
      const headers = ['ID', 'Title', 'Assignee', 'Status'];
      const rows = tasks.map(t => [t.id, `"${t.title}"`, t.assignee, t.status]);
      const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `admin_export_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    } finally {
      setLoadingBtn(null);
    }
  };

  const getBtnProps = (key) => ({
    disabled: loadingBtn === key,
    onMouseEnter: () => setHoverBtn(key),
    onMouseLeave: () => setHoverBtn(null),
    style: {
      ...styles.btn,
      opacity: loadingBtn === key ? 0.6 : 1,
      transform: hoverBtn === key ? 'translateY(-2px)' : 'none',
      backgroundColor: hoverBtn === key ? '#f1f5f9' : '#ffffff',
    }
  });

  return (
    <div style={styles.panel}>
      <div style={styles.statsGrid}>
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div style={styles.progressSection}>
        <div style={styles.progressHeader}>
          <span style={styles.label}>System Velocity</span>
          <span style={styles.pct}>{completion}%</span>
        </div>
        <div style={styles.track}><div style={{ ...styles.fill, width: `${completion}%` }} /></div>
      </div>

      <div style={styles.controlsSection}>
        <h3 style={styles.sectionTitle}>Command Console</h3>
        <div style={styles.controlsGrid}>
          {/* Admin Commands */}
          <button {...getBtnProps('add')} onClick={() => prompt('Task Title') && handleAction('add', addTask)}>
            {loadingBtn === 'add' ? COMMANDS.admin.add.loading : `${COMMANDS.admin.add.icon} ${COMMANDS.admin.add.label}`}
          </button>
          <button {...getBtnProps('delete')} onClick={() => promptAndExecute('delete', deleteTask)}>
            {loadingBtn === 'delete' ? COMMANDS.admin.delete.loading : `${COMMANDS.admin.delete.icon} ${COMMANDS.admin.delete.label}`}
          </button>
          <button {...getBtnProps('update')} onClick={handleUpdateTask}>
            {loadingBtn === 'update' ? 'Updating...' : '✏️ Update Task'}
          </button>
          <button {...getBtnProps('done')} onClick={() => promptAndExecute('done', updateStatus, 'done')}>
            {loadingBtn === 'done' ? COMMANDS.admin.done.loading : `${COMMANDS.admin.done.icon} ${COMMANDS.admin.done.label}`}
          </button>

          <div style={styles.divider} />

          {/* Core & WhatsApp */}
          <button {...getBtnProps('export')} onClick={handleExport}>
            {loadingBtn === 'export' ? COMMANDS.core.export.loading : `${COMMANDS.core.export.icon} ${COMMANDS.core.export.label}`}
          </button>
          <button {...getBtnProps('broadcast')} style={{ ...getBtnProps('broadcast').style, ...styles.btnSpecial }} onClick={() => alert(COMMANDS.whatsapp.broadcast.alert)}>
            {COMMANDS.whatsapp.broadcast.icon} {COMMANDS.whatsapp.broadcast.label}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div style={styles.statCard}>
      <span style={styles.statIcon}>{icon}</span>
      <span style={{ ...styles.statValue, color }}>{value}</span>
      <span style={styles.statLabel}>{label}</span>
    </div>
  );
}

const styles = {
  panel: { display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Inter, system-ui, sans-serif' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' },
  statCard: { background: '#0f172a', borderRadius: '16px', padding: '24px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  statValue: { fontSize: '32px', fontWeight: '700', display: 'block' },
  statLabel: { fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' },
  progressSection: { background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' },
  progressHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px' },
  label: { fontSize: '14px', color: '#475569', fontWeight: '600' },
  pct: { fontSize: '14px', color: '#1e293b', fontWeight: '700' },
  track: { height: '8px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' },
  fill: { height: '100%', background: 'linear-gradient(90deg, #3b82f6, #2dd4bf)', transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' },
  controlsSection: { background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' },
  sectionTitle: { fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' },
  controlsGrid: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  btn: { padding: '10px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' },
  btnSpecial: { background: '#f0f9ff', color: '#0369a1', borderColor: '#bae6fd' },
  divider: { width: '100%', height: '1px', background: '#f1f5f9', margin: '8px 0' }
};