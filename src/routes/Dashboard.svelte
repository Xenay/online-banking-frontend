<script>
  import { user } from "../utils/auth";
  import { onMount } from "svelte";
  import AccountBalance from "../lib/AccountBalance.svelte";
  import PaymentForm from "../lib/PaymentForm.svelte"; // Import the PaymentModal component
  import TransactionsList from "../lib/TransactionsList.svelte";
  import NewBankAccount from "../lib/NewBankAccount.svelte";
  import BankAccounts from "../lib/BankAccounts.svelte";
  let showConfirmLogout = false;
  let showPaymentModal = false; // State to control the visibility of the PaymentModal
  let showBankAccountForm = false; // State to control the visibility of the CreateAccountModal
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

  function closeBankCreationModal() {
    showBankAccountForm = false;
  }
  function handleNewAccountClick() {
    showBankAccountForm = true;
  }
</script>

<div class="">
  <h1 class="py-10">Account Overview</h1>
  <div class="py-10">
    <AccountBalance />
  </div>

  {#if !showConfirmLogout}
    <div>
      <p class="p-5">Select an option:</p>
      <div class="flex justify-center">
        <div class="px-5">
          <button on:click={() => handleMenuSelection("logout")}>Logout</button>
        </div>
        <div class="">
          <button on:click={() => handleMenuSelection("payment")}
            >Make a Payment</button
          >
        </div>
        <!-- Payment button -->
        <!-- Additional menu options will be added here -->
      </div>
    </div>
  {:else}
    <div>
      <p>Are you sure you want to logout?</p>
      <button on:click={() => confirmLogout(true)}>Yes</button>
      <button on:click={() => confirmLogout(false)}>No</button>
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

  <button on:click={handleNewAccountClick} class="mt-5"
    >Open New Account Form</button
  >

  {#if showBankAccountForm}
    <div class="modal-overlay">
      <button class="modal-content" on:click={closeBankCreationModal}>
        <NewBankAccount on:close={closeBankCreationModal} />
      </button>
    </div>
  {/if}
</div>
<div class="py-10 flex justify-center">
  <BankAccounts />
</div>

<div class="py-10 flex justify-center">
  <TransactionsList />
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
