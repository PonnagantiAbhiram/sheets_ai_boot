import React, { useState } from 'react';
import { updateStatus } from '../services/api'; // ✅ FIXED

const PRIORITY_COLORS = {
  High: { bg: 'rgba(239,68,68,0.12)', color: '#f87171', border: 'rgba(239,68,68,0.25)' },
  Medium: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.25)' },
  Low: { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.25)' },
};

export default function TaskTable({ tasks, onTaskUpdate }) {
  const [loadingId, setLoadingId] = useState(null);

  const handleAction = async (taskId, status) => {
    setLoadingId(`${taskId}-${status}`);
    try {
      await updateStatus(taskId, status); // ✅ FIXED

      // Map to UI status
      const newStatus =
        status === "start" ? "in-progress" :
          status === "done" ? "done" :
            status;

      onTaskUpdate?.(taskId, newStatus);

    } catch (err) {
      console.error('Failed to update task:', err);
    } finally {
      setLoadingId(null);
    }
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div style={styles.empty}>
        <span style={{ fontSize: '3rem' }}>📋</span>
        <p>No tasks found.</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headRow}>
              <th style={styles.th}>Task ID</th>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Assignee</th>
              <th style={styles.th}>Priority</th>
              <th style={styles.th}>Due Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <TaskRow
                key={task.id}
                task={task}
                index={i}
                loadingId={loadingId}
                onAction={handleAction}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TaskRow({ task, index, loadingId, onAction }) {
  const priority = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.Medium;

  return (
    <tr style={{ ...styles.row, animationDelay: `${index * 0.05}s` }}>
      <td style={styles.td}>
        <span style={styles.taskId}>{task.id}</span>
      </td>

      <td style={styles.td}>
        <span style={styles.taskTitle}>{task.title}</span>
      </td>

      <td style={styles.td}>
        <div style={styles.assignee}>
          <span style={styles.assigneeAvatar}>{task.assignee?.[0]}</span>
          <span style={{ color: '#cbd5e1' }}>{task.assignee}</span>
        </div>
      </td>

      <td style={styles.td}>
        <span style={{ ...styles.priorityBadge, background: priority.bg, color: priority.color }}>
          {task.priority}
        </span>
      </td>

      <td style={styles.td}>
        <span style={{ color: '#94a3b8' }}>{task.dueDate}</span>
      </td>

      <td style={styles.td}>
        <StatusBadge status={task.status} />
      </td>

      <td style={styles.td}>
        <div style={styles.actionBtns}>
          <button
            onClick={() => onAction(task.id, 'start')} // ✅ FIXED
            disabled={task.status === 'in-progress' || task.status === 'done'}
          >
            {loadingId === `${task.id}-start` ? '...' : '▶ Start'}
          </button>

          <button
            onClick={() => onAction(task.id, 'done')} // ✅ FIXED
            disabled={task.status === 'done'}
          >
            {loadingId === `${task.id}-done` ? '...' : '✓ Done'}
          </button>
        </div>
      </td>
    </tr>
  );
}

function StatusBadge({ status }) {
  const map = {
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'done': 'Done',
  };

  return <span>{map[status] || 'Pending'}</span>;
}

const styles = {
  wrapper: { width: '100%' },
  tableContainer: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: 10, textAlign: 'left' },
  td: { padding: 10 },
  row: { borderBottom: '1px solid #333' },
  taskId: { color: '#6366f1' },
  taskTitle: { color: '#fff' },
  assignee: { display: 'flex', gap: 8, alignItems: 'center' },
  assigneeAvatar: {
    width: 25,
    height: 25,
    borderRadius: '50%',
    background: '#6366f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  priorityBadge: { padding: '2px 8px', borderRadius: 10 },
  actionBtns: { display: 'flex', gap: 5 },
  empty: { textAlign: 'center', padding: 40 }
};