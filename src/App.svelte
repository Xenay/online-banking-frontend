<script lang="ts">

  import LoginForm from './lib/LoginModal.svelte'
  import { user } from './utils/auth.js';
  import {push} from 'svelte-spa-router';
  import Router from "svelte-spa-router"
  import Route from 'svelte-spa-router';
  import Dashboard from './routes/Dashboard.svelte';
  import routes from './routes.js'; // Assuming you defined your routes here

 
 // Auto-subscription method to get the latest value of the user store
let isLoggedIn = $user?.isAuthenticated || false;

// Using a reactive statement to perform actions when the store's value changes
$: if ($user && $user.isAuthenticated) {
  console.log('User is authenticated', $user);
  push('/dashboard');
}
</script>



<main class="" style="">
  <Router {routes} />

</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
  
</style>
