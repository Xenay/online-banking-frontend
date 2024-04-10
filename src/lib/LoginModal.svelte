<script>


    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { user } from '../utils/auth';
  
  
    let username = '';
    let password = '';
    let message = writable('');
  
    async function handleLogin() {
      const response = await fetch('http://localhost:9090/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      console.log(response);
      const data = await response.json();
      if(response.status === 200) {
       
        console.log(username);
        // @ts-ignore
        user.set({ username: username, isAuthenticated: true, token: data.token });
    
      }
      console.log(data);
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