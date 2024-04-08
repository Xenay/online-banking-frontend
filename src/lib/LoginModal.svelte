<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    let username = '';
    let password = '';
    let message = writable('');
  
    async function handleLogin() {
    console.log(JSON.stringify({ username, password }));
      const response = await fetch('http://localhost:9090/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.text();
      message.set(data);
    }
  </script>
  
  <form on:submit|preventDefault={handleLogin}>
    <div class="">
      <label class="py-2" for="username">Username:</label>
      <input id="username" type="text" bind:value={username} style="background-color: white;"/>
    </div>
    <div class="">
      <label for="password">Password:</label>
      <input id="password" type="password" bind:value={password} style="background-color: white;" />
      
    </div>
    <br>
    <button type="submit">Login</button>
  </form>
  
  {#if $message}
    <p>{$message}</p>
  {/if}

<style>

</style>