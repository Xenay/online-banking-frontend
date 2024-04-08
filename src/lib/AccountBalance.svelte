<!-- src/components/AccountBalance.svelte -->
<script>
    import { onMount } from 'svelte';
  
    let accountDetails = {
      accountNumber: '',
      balance: 0,
      currency: ''
    };
  
    onMount(async () => {
    try {
      const response = await fetch('http://localhost:9090/api/account');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      accountDetails = await response.json();
    } catch (error) {
      console.error("Failed to fetch account details:", error);
      // Handle the error or display a message to the user
    }
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
  