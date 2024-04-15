<script>
  import { createEventDispatcher } from 'svelte';
  import { user } from '../utils/auth';
  import { locale, dictionary, getLocaleFromNavigator, t } from 'svelte-i18n';

  const dispatch = createEventDispatcher();

  let name = '';
  let type = '';
  let minimumBalance = 0;

  let accountDetails = {
    accountNumber: '',
    balance: 0,
    currency: '',
    IBAN: "", // This will be replaced with a random number
    id: 1,
  };

  // Function to generate a random 16-digit number
  function generateRandomId() {
    // Generate a random number between 1e15 (inclusive) and 1e16 (exclusive)
  
    const randomId = Math.floor(Math.random() * 10000000000000000);
    return randomId.toString().padStart(16, '0');
  }


  async function submitForm() {
    // Assign a random ID to accountDetails.id
    accountDetails.IBAN = generateRandomId();
    console.log(JSON.stringify({
          name: name,
          type: type,
          minimumBalance: minimumBalance,
          IBAN: accountDetails.IBAN,
          accountId: accountDetails.id,
        }),);
    // Proceed with your existing logic to submit the account details
    try {
      const response = await fetch('http://localhost:9090/api/bank-accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          type: type,
          minimumBalance: minimumBalance,
          iban: accountDetails.IBAN,
          accountId: $user.id,
 // Use the generated random ID
        }),
      });

      if (response.ok) {
        // Handle success
        dispatch('close');
      } else {
        // Handle failure
      }
    } catch (error) {
      console.error("Failed to create bank account:", error);
    }
  }

  function closeForm() {
    dispatch('close');
  }

</script>

  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="flex shadow-xl animate-scale-in" on:click|stopPropagation>
  <form on:submit|preventDefault={submitForm}>
    <p class="text-center text-sm font-mono mb-4 border-b-2 border-red-200">{$t("newAccount")}</p>
    <p class="text-start text-sm font-mono mb-4">{$t("newAccount")}</p>
    <input bind:value={name} placeholder="Name" style="background-color: whitesmoke;" class="py-3 flex w-full" />
    <p class="text-start text-sm font-mono py-4">{$t("accountType")}</p>
    <select bind:value={type} style="background-color: whitesmoke;" class="flex mb-5 py-3 justify-center w-full">
      <option value="" >{$t("optionType")}</option>
      <option value="CHECKING">{$t("checking")}</option>
      <option value="SAVINGS">{$t("savings")}</option>
      <option value="FOREIGN_CURRENCY">{$t("foreignCurrency")}</option>
      <option value="GIRO">{$t("giro")}</option>
    </select>
    <p class="text-start text-sm font-mono py-4">{$t("minBalance")}</p>
    <input type="number" class="flex mt-5 mb-5 py-3 w-full" bind:value={minimumBalance} placeholder="Minimum Balance"  style="background-color: whitesmoke;"/>
    <button type="submit">{$t("createAccount")}</button>
    <button type="button" on:click={closeForm}>{$t("cancel")}</button>
  </form>
  
</div>
  