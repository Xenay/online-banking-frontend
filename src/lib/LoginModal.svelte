<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { user } from '../utils/auth';
    import { push } from 'svelte-spa-router';
  
  
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
      
      
      const data = await response.json();
      console.log(data);
      if(response.status === 200) {
       
        // @ts-ignore
        
        

      }
      // const response2 = await fetch('http://localhost:9090/api/accountByAccountNumber',{
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ username, password })
      // });
      // const accountDetails = await response.json();
      user.set({ username: data.username, isAuthenticated: true, id: data.userId });
      // console.log(user.id);
      // console.log(data);
      // message.set(data);
    
  }
  async function handleRegister() {
      push('/register');
      
    }
  
  </script>
  
  <form class="" on:submit|preventDefault={handleLogin}>
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
    <button on:click={handleRegister}>Don't have an account? Register</button>
  </form>
  
  {#if $message}
    <p>{$message}</p>
  {/if}

<style>

</style>