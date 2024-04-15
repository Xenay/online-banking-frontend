<!-- src/components/AccountBalance.svelte -->
<script>
    import { onMount } from 'svelte';
    import { user } from '../utils/auth';
    import { locale, dictionary, getLocaleFromNavigator, t } from 'svelte-i18n';

    let accountDetails = {
      accountNumber: '',
      balance: 0,
      currency: ''
    };
    let user2 = {};
    
  
    onMount(async () => {
  
      user2 = $user;
      

    });
  </script>
  
  {#if $user.username}
    <div class="border-b-2 border-dotted border-red-200 shadow-sm px-2">
      <!-- <p class="py-2 font-mono">Account Number: 123456789</p> -->
      <p class="font-mono py-2">{$t("greeting")}{$user.username}</p>
      <p class="font-mono">{$t("yourAccounts")}:</p>
    </div>
  {:else}
    <p>Loading account details...</p>
  {/if}
  