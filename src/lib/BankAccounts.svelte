<script>
    import { onMount } from 'svelte';
    import { user } from '../utils/auth';
    import { get } from 'svelte/store';
    /**
   * @type {any[]}
   */
    let bankAccounts = [];
  
    async function fetchBankAccounts() {
      const currentUser = get(user);
      console.log(currentUser.username);
      const response = await fetch(`http://localhost:9090/api/user/bank-accounts?username=${currentUser.username}`);
      if (response.ok) {
        console.log(bankAccounts);
        bankAccounts = await response.json();
      } else {
        console.error('Failed to fetch bank accounts');
      }
    }
  
    onMount(fetchBankAccounts);
  </script>
  
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Balance</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      {#each bankAccounts as { name, balance, type }}
        <tr>
          <td>{name}</td>
          <td>${balance}</td>
          <td>{type}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  