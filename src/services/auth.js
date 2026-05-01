/**
 * auth.js
 * Firebase authentication placeholder.
 * Replace these stubs with real Firebase SDK calls when ready.
 */

// ─── Placeholder Firebase Config ─────────────────────────
// Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: 'YOUR_FIREBASE_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// ─── Auth State (in-memory placeholder) ──────────────────
let currentUser = null;

/**
 * Signs in a user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ uid: string, email: string, displayName: string }>}
 */
export async function signIn(email, password) {
  // PLACEHOLDER — simulate network delay
  await delay(800);

  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  // Accept any non-empty credentials in placeholder mode
  currentUser = {
    uid: 'placeholder-uid-001',
    email,
    displayName: email.split('@')[0],
    role: email === 'admin@example.com' ? 'admin' : 'user'
  };

  localStorage.setItem('authToken', 'placeholder-token-001');
  localStorage.setItem('user', JSON.stringify(currentUser));

  return currentUser;
}

/**
 * Creates a new user with email and password (placeholder).
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ uid: string, email: string, displayName: string }>}
 */
export async function signUp(email, password) {
  // PLACEHOLDER — simulate network delay
  await delay(1000);

  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  currentUser = {
    uid: 'placeholder-uid-' + Math.random().toString(36).substr(2, 9),
    email,
    displayName: email.split('@')[0],
    role: email === 'admin@example.com' ? 'admin' : 'user'
  };

  localStorage.setItem('authToken', 'placeholder-token-001');
  localStorage.setItem('user', JSON.stringify(currentUser));

  return currentUser;
}

/**
 * Signs out the current user.
 * @returns {Promise<void>}
 */
export async function signOut() {
  await delay(300);
  currentUser = null;
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
}

/**
 * Returns the currently authenticated user from local storage.
 * @returns {{ uid: string, email: string, displayName: string } | null}
 */
export function getCurrentUser() {
  if (currentUser) return currentUser;
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
}

/**
 * Returns true if a user is authenticated.
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!localStorage.getItem('authToken');
}

// Helper
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { firebaseConfig };
