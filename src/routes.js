import Dashboard from './routes/Dashboard.svelte';
import LoginModal from './lib/LoginModal.svelte';

const routes = {
  '/': LoginModal,
  '/dashboard': Dashboard,
};

export default routes;