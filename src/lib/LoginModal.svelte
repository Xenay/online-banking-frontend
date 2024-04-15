<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { user } from '../utils/auth';
  import { push } from 'svelte-spa-router';
  import { getLocaleFromNavigator, t } from 'svelte-i18n';
  import { locale } from 'svelte-i18n';

  let username = '';
  let password = '';
  let message = writable('');

  
  function changeLanguage(e) {
    console.log('Changing locale to:', e);  // Debugging log
    locale.set(e);
  }
  

  locale.set(getLocaleFromNavigator());

  async function handleLogin(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:9090/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (response.status === 200) {
      user.set({ username: data.username, isAuthenticated: true, id: data.userId });
    }
  }

  async function handleRegister() {
    push('/register');
  }
</script>

<form class="p-6 bg-white rounded-lg shadow-xl animate-scale-in max-w-xl flex flex-col justify-center m-auto" on:submit={handleLogin}>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">{$t("username")}:</label>
    <input id="username" type="text" bind:value={username}
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" style="background-color: white;"/>
  </div>

  <div class="mb-6">
    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">{$t("password")}:</label>
    <input id="password" type="password" bind:value={password} style="background-color: white;"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="flex items-center justify-between">
    <button type="submit" class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      {$t("login")}
    </button>
    <button type="button" on:click={handleRegister} class="inline-block align-baseline font-bold text-sm text-white hover:text-blue-800 " >
      {$t("register?")}
    </button>
  </div>
  <select on:change="{e => changeLanguage(e.target.value)}" style="background-color: white;" class="w-full mt-20 justify-center">
    <option value="hr">Hrvatski</option>
    <option value="en">English</option>
    
  </select>
</form>



{#if $message}
  <p class="text-red-500 text-xs italic">{$message}</p>
{/if}

<style>
  @keyframes scale-in {
    0% {
      transform: scale(0.9);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .animate-scale-in {
    animation: scale-in 0.3s ease-out forwards;
  }
</style>
