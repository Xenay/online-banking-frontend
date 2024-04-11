// src/auth.js
import { writable } from 'svelte/store';

// Represents the user's authentication state, null if not authenticated
export const user = writable({ username: null, isAuthenticated: false, id: 0});
