<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { user } from '../utils/auth';
    import { get } from 'svelte/store';
    import { refreshTrigger } from '../stores/refreshStore';

    
    const dispatch = createEventDispatcher();
    let accounts = [];
    let fromAccountId;
    let toAccountId;
    let amount = 0;
    let description = '';
  
    async function fetchBankAccounts() {
      const currentUser = get(user);
      const response = await fetch(`http://localhost:9090/api/user/bank-accounts?username=${currentUser.username}`);
      if (response.ok) {
        accounts = await response.json();
        console.log("accounts", accounts);
        // Correctly initialize fromAccountId and toAccountId
        if (!fromAccountId && accounts.length > 0) {
          fromAccountId = accounts[0].id; // Corrected
        }
        if (!toAccountId && accounts.length > 1) {
          toAccountId = accounts.find(account => account.id !== fromAccountId)?.id || '';
        }
      } else {
        console.error('Failed to fetch bank accounts');
      }
    }
  
    onMount(() => {
      fetchBankAccounts();
    });
  
    // Reactively update toAccountId when fromAccountId changes
    $: if (fromAccountId !== undefined) {
    const filteredAccounts = accounts.filter((_, index) => index !== fromAccountId);
    if (filteredAccounts.length > 0 && toAccountId === undefined) {
      toAccountId = filteredAccounts[0].id; // Default to first not-from account
    }
  }

    async function submitTransfer() {
      if (fromAccountId === toAccountId) {
        alert("Source and destination accounts can't be the same.");
        return;
      }
     
      const payload = { fromAccountId, toAccountId, amount, description };
      console.log(JSON.stringify(payload));
      const response = await fetch('http://localhost:9090/api/bank-accounts/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log(response);

      refreshTrigger.update(n => n + 1);

      dispatch('close');
    }

    
  </script>
  
  <div>
    <select bind:value={fromAccountId}>
        <option disabled value={undefined}>Select source account</option>
        {#each accounts as account, index}
          <option value={account.id}>{account.name} - Balance: ${account.balance}</option>
        {/each}
      </select>
      
      <select bind:value={toAccountId}>
        <option disabled value={undefined}>Select destination account</option>
        {#each accounts as account, index}
          {#if account.id !== fromAccountId}
            <option value={account.id}>{account.name} - Balance: ${account.balance}</option>
          {/if}
        {/each}
      </select>
  
    <input type="number" bind:value={amount} placeholder="Amount" />
    <input type="text" bind:value={description} placeholder="Description" />
  
    <button on:click={submitTransfer}>Submit Transfer</button>
    <button on:click={() => dispatch('close')}>Cancel</button>
  </div>
  