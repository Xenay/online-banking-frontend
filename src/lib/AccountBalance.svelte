<!-- src/components/AccountBalance.svelte -->
<script>
    import { onMount } from 'svelte';
  
    let accountDetails = {
      accountNumber: '',
      balance: 0,
      currency: ''
    };
  
    onMount(async () => {
      const response = await fetch('http://localhost:9090/api/account');
      console.log(response);
      accountDetails = await response.json();
      console.log(accountDetails);
    });
  </script>
  
  {#if accountDetails.accountNumber}
    <div>
      <p>Account Number: {accountDetails.accountNumber}</p>
      <p>Balance: {accountDetails.balance} {accountDetails.currency}</p>
    </div>
  {:else}
    <p>Loading account details...</p>
  {/if}
  