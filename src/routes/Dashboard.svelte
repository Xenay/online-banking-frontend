<script>
    import { user } from '../utils/auth';
    import { onMount } from 'svelte';
    import AccountBalance from '../lib/AccountBalance.svelte';
    let showConfirmLogout = false;
    /**
   * @param {string} option
   */
    function handleMenuSelection(option) {
      switch (option) {
        case 'logout':
          showConfirmLogout = true;
          break;
        // Add cases for other menu options here
      }
    }
  
    /**
   * @param {boolean} confirm
   */
    function confirmLogout(confirm) {
      if (confirm) {
        user.set({ username: null, isAuthenticated: false });
        window.location.href = '/'; // Redirect to the login or home page
      } else {
        showConfirmLogout = false;
      }
    }
  </script>
  
  <div class="">
  <h1 class="py-10">Account Overview</h1>
    <div class="py-10">
  <AccountBalance />
    </div>

  {#if !showConfirmLogout}
    <div>
      <p class="p-5">Select an option:</p>
      <ul>
        <li><button on:click={() => handleMenuSelection('logout')}>Logout</button></li>
        <!-- Additional menu options will be added here -->
      </ul>
    </div>
  {:else}
    <div>
      <p>Are you sure you want to logout?</p>
      <button on:click={() => confirmLogout(true)}>Yes</button>
      <button on:click={() => confirmLogout(false)}>No</button>
    </div>
  {/if}
</div>
  