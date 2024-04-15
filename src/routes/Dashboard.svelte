<script>
  import { user } from "../utils/auth";
  import { onMount } from "svelte";
  import AccountBalance from "../lib/AccountBalance.svelte";
  import PaymentForm from "../lib/PaymentForm.svelte"; // Import the PaymentModal component
  import TransactionsList from "../lib/TransactionsList.svelte";
  import NewBankAccount from "../lib/NewBankAccount.svelte";
  import BankAccounts from "../lib/BankAccounts.svelte";
  import InternalTransferForm from "../lib/InternalTransferForm.svelte";
  import Navbar from "../lib/Navbar.svelte";
  import { locale, dictionary, getLocaleFromNavigator, t } from 'svelte-i18n';

  let showConfirmLogout = false;
  let showPaymentModal = false; // State to control the visibility of the PaymentModal
  let showBankAccountForm = false;
  let showTransferModal = false; // State to control the visibility of the CreateAccountModal

  locale.set(getLocaleFromNavigator());
  
  /**
   * @param {string} option
   */
  function handleMenuSelection(option) {
    switch (option) {
      case "logout":
        showConfirmLogout = true;
        break;
      case "payment": // Case to handle payment button click
        showPaymentModal = true;
        break;
      // Add cases for other menu options here
    
      // Existing cases remain unchanged
      case "transfer":
        showTransferModal = true;
        break;
    }
  }

  /**
   * @param {boolean} confirm
   */
  function confirmLogout(confirm) {
    if (confirm) {
      // @ts-ignore
      user.set({ username: null, isAuthenticated: false });
      window.location.href = "/"; // Redirect to the login or home page
    } else {
      showConfirmLogout = false;
    }
  }

  // Optional: Function to close the PaymentModal
  function closePaymentModal() {
    showPaymentModal = false;
  }
  function closeTransferModal() {
    showTransferModal = false;
  }
  function closeBankCreationModal() {
    showBankAccountForm = false;
  }
  function handleNewAccountClick() {
    showBankAccountForm = true;
  }
</script>

<div class="">
  <!-- <div class=" bg-gradient-to-b from-red-300 to-red-300">
  <h1 class="py-1 flex justify-start border-2 border-dotted border-red-200 text-lg">Account Overview</h1>
</div> -->
<Navbar />
<div class="px-10">
  <div class="py-0 flex justify-left">
    <AccountBalance />
  </div>
  <div class="flex">
  <div class="py-10 flex flex-col justify-start">
    <BankAccounts />
    <button  on:click={handleNewAccountClick} class="mt-5 flex justify-start max-w-sm bg-red-200 border-2 border-dashed border-red-300"
>{$t("openNewAccount")}</button
>
{#if !showConfirmLogout}
    <div class="flex justify-start">
      
      <div class="flex justify-center pt-4">
        <div class="mr-4">
          <button class="bg-red-200 border-2 border-dashed border-red-300" on:click={() => handleMenuSelection("logout")}>{$t("logout")}</button>
        </div>
        <div class="">
          <button class="bg-red-200 border-2 border-dashed border-red-300" on:click={() => handleMenuSelection("payment")}
            >{$t("makePayment")}</button
          >
        </div>
        <div class="px-5">
          <button class="bg-red-200 border-2 border-dashed border-red-300" on:click={() => handleMenuSelection("transfer")}>{$t("internalTransfer")}</button>
        </div>
        <!-- Payment button -->
        <!-- Additional menu options will be added here -->
      </div>
    </div>
  {:else}
    <div>
      <p>{$t("logout")}</p>
      <button on:click={() => confirmLogout(true)}>{$t("yes")}</button>
      <button on:click={() => confirmLogout(false)}>{$t("no")}</button>
    </div>
  {/if}
  </div>
  
  <div class="py-0 ml-20  flex justify-center">
    <TransactionsList />
  </div>
</div>

</div>
 

  {#if showTransferModal}
  <div class="modal-overlay">
    <div class="modal-content">
      <InternalTransferForm on:close={closeTransferModal} />
    </div>
  </div>
  
{/if}

  {#if showPaymentModal}
    <!-- Modal overlay and content container -->
    <div class="modal-overlay">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="modal-content">
        <PaymentForm on:close={closePaymentModal} />
      </div>
    </div>
  {/if}

  
  {#if showBankAccountForm}
    <div class="modal-overlay">
      <button class="modal-content" on:click={closeBankCreationModal}>
        <NewBankAccount on:close={closeBankCreationModal} />
      </button>
    </div>
  {/if}


</div>




<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    /* Styles for the modal content to ensure it's visually distinct and centered */
    background: white;
    padding: 20px;
    border-radius: 5px;
    /* Add more styling as needed */
  }
</style>
