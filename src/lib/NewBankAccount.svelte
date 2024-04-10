<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let name = '';
    let type = '';
    let minimumBalance = 0;

    let accountDetails = {
      accountNumber: '',
      balance: 0,
      currency: '',
      id: 0,
    };
  
    async function submitForm() {

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
        
      const response = await fetch('http://localhost:9090/api/bank-accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          type: type,
          minimumBalance: minimumBalance,
          accountId: accountDetails.id,
        }),
      });
  
      if (response.ok) {
        // Handle success - maybe clear form or show a success message
        dispatch('close');
      } else {
        // Handle failure - show an error message
      }
      
    }
    function closeForm() {
    dispatch('close');
  }
  </script>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="modal-content" on:click|stopPropagation>
  <form on:submit|preventDefault={submitForm}>
    <input bind:value={name} placeholder="Name" style="background-color: whitesmoke;" class="py-2" />
    <select bind:value={type} style="background-color: whitesmoke;">
      <option value="" >Select Type</option>
      <option value="CHECKING">Checking Account</option>
      <option value="SAVINGS">Savings Account</option>
      <option value="FOREIGN_CURRENCY">Foreign Currency Account</option>
      <option value="GIRO">Giro Account</option>
    </select>
    <input type="number" class="py-2" bind:value={minimumBalance} placeholder="Minimum Balance"  style="background-color: whitesmoke;"/>
    <button type="submit">Create Account</button>
    <button type="button" on:click={closeForm}>Cancel</button>
  </form>
  
</div>
  