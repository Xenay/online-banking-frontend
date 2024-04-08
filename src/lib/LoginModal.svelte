<script>


    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { user } from '../utils/auth';
  
  
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
      if(response.status === 200) {
        // @ts-ignore
        user.set({ username: username, isAuthenticated: true });
    
      }
      message.set(data);
    }
  </script>
  
  <form on:submit|preventDefault={handleLogin}>
    <div class="">
      <label class="py-2" for="username" style="">Username:</label>
      <input id="username" type="text" bind:value={username} class = "border-2 border-red-200 bg-red-200"/>
    </div>
  
    <div class="">
      <label for="password">Password:</label>
      <input id="password" type="password" bind:value={password} class = "border-2 border-red-200 bg-red-200" />
     
    </div>
    <br>
    <button type="submit">Login</button>
  </form>
  
  {#if $message}
    <p>{$message}</p>
  {/if}

<style>

</style>