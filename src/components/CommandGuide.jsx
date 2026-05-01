import React, { useState } from 'react';

export default function CommandGuide({ role }) {

    const [open, setOpen] = useState(false); // 🔥 toggle state

    const adminCommands = [
        'add "title" name YYYY-MM-DD project phone',
        'start <taskId>',
        'done <taskId>',
        'delete <taskId>',
        'all',
        'pending',
        'overdue',
        'summary',
        'reminders',
        'my <phone>',
        'status <taskId>',
        'broadcast <message>'
    ];

    const userCommands = [
        'start <taskId>',
        'done <taskId>',
        'my <phone>',
        'status <taskId>'
    ];

    const commands = role === "admin" ? adminCommands : userCommands;

    return (
        <div style={styles.container}>

            {/* 🔥 TOGGLE BUTTON */}
            <button onClick={() => setOpen(!open)} style={styles.toggleBtn}>
                📱 WhatsApp Commands {open ? "▲" : "▼"}
            </button>

            {/* 🔥 EXPAND AREA */}
            {open && (
                <div style={styles.box}>
                    <ul style={styles.list}>
                        {commands.map((cmd, i) => (
                            <li key={i} style={styles.item}>
                                <code style={styles.code}>{cmd}</code>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
}

const styles = {
    container: {
        marginBottom: 20
    },

    toggleBtn: {
        padding: '10px 15px',
        background: '#6366f1',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer'
    },

    box: {
        marginTop: 10,
        padding: 15,
        background: '#111',
        borderRadius: 10,
        animation: 'fadeIn 0.3s ease'
    },

    list: {
        listStyle: 'none',
        padding: 0
    },

    item: {
        marginBottom: 8,
        color: '#ccc'
    },

    code: {
        background: '#222',
        padding: '5px 8px',
        borderRadius: 5
    }
};