import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import { fetchTasks } from '../services/api';
import AdminPanel from '../components/AdminPanel';
import TaskTable from '../components/TaskTable';
import CommandGuide from '../components/CommandGuide';
export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // 🔄 Wrapped in useCallback to allow children components to trigger reloads seamlessly
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    } else {
      loadData();
    }
  }, [navigate, loadData]);

  // ⚡ Optimistic UI update for the table rows
  const handleTaskUpdate = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? { ...t, status: newStatus }
          : t
      )
    );
  };
  const filteredTasks = tasks.filter((t) => {
    const matchStatus = filter === 'all' || t.status === filter;
    const matchSearch = !search || (t.title || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="page" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>Dashboard ({role})</h1>

      <CommandGuide role={role} />

      {!loading && role === "admin" && (
        <AdminPanel
          tasks={tasks}
          refreshTasks={loadData}
          onTaskUpdate={handleTaskUpdate}
        />
      )}

      {/* FILTER & SEARCH BAR */}
      <div style={styles.toolbar}>
        <div style={styles.filters}>
          {['all', 'pending', 'in-progress', 'done'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                background: filter === f ? '#3b82f6' : '#fff',
                color: filter === f ? '#fff' : '#333'
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        <input
          placeholder="🔍 Search tasks..."
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* TABLE */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', fontSize: '1.2rem' }}>
          ⏳ Loading tasks from Google Sheets...
        </div>
      ) : (
        <TaskTable tasks={filteredTasks} onTaskUpdate={handleTaskUpdate} />
      )}
    </div>
  );
}

const styles = {
  toolbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' },
  filters: { display: 'flex', gap: '10px' },
  filterBtn: { padding: '8px 16px', borderRadius: '20px', border: '1px solid #30bfe0ff', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500 },
  searchInput: { padding: '10px 16px', borderRadius: '8px', border: '1px solid #2592b7ff', minWidth: '250px' }
};