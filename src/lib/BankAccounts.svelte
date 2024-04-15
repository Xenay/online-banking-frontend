<script>
    import { onMount } from 'svelte';
    import { user } from '../utils/auth';
    import { get } from 'svelte/store';
    import { refreshTrigger } from '../stores/refreshStore';
    import { locale, dictionary, getLocaleFromNavigator, t } from 'svelte-i18n';


    /**
   * @type {any[]}
   */
    let bankAccounts = [];
  
    async function fetchBankAccounts() {
      const currentUser = $user;
      console.log(currentUser.username);
      const response = await fetch(`http://localhost:9090/api/user/bank-accounts?username=${currentUser.username}`);
      if (response.ok) {
        console.log(bankAccounts);
        bankAccounts = await response.json();
      } else {
        console.error('Failed to fetch bank accounts');
      }
    }
    $: $refreshTrigger, fetchBankAccounts();

    onMount(fetchBankAccounts);
  </script>
  
  
  <div class="mt-0" style="">
    <div class="grid grid-flow-col grid-cols-4 md:flex-row justify-between items-center  md:space-y-0 p-5 border-2 border-red-200 hover:bg-red-300">
      <h3 class="text-2xl font-semibold text-red-600">{$t("type")}</h3>
      <h1 class="text-xl font-semibold text-red-600">{$t("name")}</h1>
      <h1 class="text-xl font-semibold text-red-600">{$t("balance")}</h1>
      <h1 class="text-xl font-semibold text-red-600">{$t("iban")}</h1>
    </div>
    {#each bankAccounts as {id, name, balance, type, iban}}
        <div class=" py-2 " >
            <div class="grid grid-flow-col grid-cols-4 md:flex-row justify-between items-center  md:space-y-0 p-5 border-2 border-red-200 hover:bg-red-300">
                <h2 class="text-lg font-medium text-red-600">{type}</h2>
                <h1 class="text-xl font-semibold">{name}</h1>
                <p class="text-md">${balance}</p>
                <p class="text-md">{iban}</p>
            </div>
        </div>
    {/each}
</div>
  