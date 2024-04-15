<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { user } from '../utils/auth';
    import { get } from 'svelte/store';
    import { refreshTrigger } from '../stores/refreshStore';
    import { locale, dictionary, getLocaleFromNavigator, t } from 'svelte-i18n';

    
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
    <div class="w-full px-4 bg-white rounded-lg shadow-xl animate-scale-in">
      <div class="mb-4 ">
        <label class="block  px-40 text-gray-700 text-sm font-bold mb-2" for="from-account">{$t("fromAccount")}</label>
        <select bind:value={fromAccountId} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="from-account">
          <option disabled value={undefined}>{$t("selectSourceAccount")}</option>
          {#each accounts as account, index}
            <option value={account.id}>{account.name} - {$t("balance")} ${account.balance}</option>
          {/each}
        </select>
      </div>
      <div class="mb-4">
        <label class="block  px-40 text-gray-700 text-sm font-bold mb-2" for="to-account">{$t("toAccount")}</label>
        <select bind:value={toAccountId} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="to-account">
          <option disabled value={undefined}>{$t("selectDestinationAccount")}</option>
          {#each accounts as account}
            {#if account.id !== fromAccountId}
              <option class=" px-40" value={account.id}>{account.name} - {$t("balance")}: ${account.balance}</option>
            {/if}
          {/each}
        </select>
      </div>
  
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="amount">{$t("amount")}</label>
        <input type="number" style="background-color: white;" bind:value={amount} placeholder="Amount" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amount" />
      </div>
      
      <div class="mb-10">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">{$t("description")}</label>
        <input type="text" style="background-color: white;" bind:value={description} placeholder="Description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" />
      </div>
  
    <div class="flex items-center justify-between py-10">
      <button on:click={submitTransfer} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{$t("submitTransfer")}</button>
      <button on:click={() => dispatch('close')} class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{$t("cancelTransfer")}</button>
    </div>
  </div>
  