import Dashboard from './routes/Dashboard.svelte';
import LoginModal from './lib/LoginModal.svelte';
import RegisterModal from './lib/registerModal.svelte';

const routes = {
  '/': LoginModal,
  '/dashboard': Dashboard,
  '/register': RegisterModal
};

export default routes;