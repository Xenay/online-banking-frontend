<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { user } from "../utils/auth";
  import { get } from "svelte/store";

  let recipientName = "";
  let recipientIban = "";
  let amount = "";
  let paymentDescription = "";
  let accounts = [];
  let senderIban = "";
  recipientName = "";
  let paymentType = "PAYMENT";

  let accountDetails = {
    id: 0,
    accountNumber: "",
    balance: 0,
    currency: "",
   
  };
  const dispatch = createEventDispatcher();
  
  async function fetchBankAccounts() {
      const currentUser = $user;
      const response = await fetch(`http://localhost:9090/api/user/bank-accounts?username=${currentUser.username}`);
      if (response.ok) {
        accounts = await response.json();
        console.log("accounts", accounts);
        // Correctly initialize fromAccountId and toAccountId
      } else {
        console.error('Failed to fetch bank accounts');
      }
    }
  
    onMount(() => {
      fetchBankAccounts();
    });
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
    console.log(accountDetails);
    console.log(recipientName, senderIban, recipientIban, amount, paymentDescription, accountDetails.id);
    let transactionDate = Date.now();
    const response = await fetch("http://localhost:9090/api/payment-orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipientName: recipientName,
        senderIban: senderIban,
        recipientIban: recipientIban,
        amount: amount,
        paymentDescription,
        accountId: $user.id,
        paymentType: paymentType,
       
 // Add the user ID to the payment order
      }),
    });

    if (response.ok) {
      // Handle success
      console.log("Payment order created successfully");
    } else {
      // Handle error
      console.error("Failed to create payment order");
    }
  }
  /**
   * @param {{ stopPropagation: () => void; }} event
   */
  function stopPropagation(event) {
    event.stopPropagation();
  }
  /**
   * @param {{ key: string; preventDefault: () => void; }} event
   */
  function handleKeyDown(event) {
    // Close modal on Enter or Space key press
    if (event.key === "Enter" || event.key === " ") {
      handleClose();
      event.preventDefault(); // Prevent scrolling when using Space
    }
  }

  function handleClose() {
    dispatch("close");
  } // Function passed down from the parent
  
</script>

<div class="px-20">
<div>
    <p class="py-10 text-lg">Make a Payment</p>
</div>  
  <form on:submit|preventDefault={submitForm} class=" grid grid-flow-row p-4 py-2 w-full">
    <p class="text-left text-sm py-2">Ime Primatelja</p>
    <input
      type="text"
      bind:value={recipientName}
      placeholder="Recipient Name"
      required
      class="py-4 mb-8 rounded-md"
      style="background-color: #fcd4d4;"
    />
    <p class="text-left text-sm py-2">Sa računa</p>
<select bind:value={senderIban} required class="py-4 mb-8 rounded-md" style="background-color: #fcd4d4;">
  <!-- Assuming `userAccounts` is an array of the user's accounts -->
  {#each accounts as account}
    <option value={account.iban}>IBAN - {account.iban} - Balance: {account.balance}</option>
  {/each}
</select>
    <p class="text-left text-sm py-2">IBAN Primatelja</p>
    <input
      type="text"
      bind:value={recipientIban}
      placeholder="Recipient IBAN"
      required
      class="py-4 mb-8 rounded-md"
      style="background-color: #fcd4d4;"
    />
    <p class="text-left text-sm py-2">Iznos (u EUR)</p>
    <input
      type="number"
      bind:value={amount}
      placeholder="Amount"
      required
      step="0.01"
      class="py-4 mb-8 rounded-md"
      style="background-color: #fcd4d4;"
    />
    <p class="text-left text-sm py-2">Opis Plaćanja</p>
    <textarea
      bind:value={paymentDescription}
      placeholder="Payment Description"
      class="py-4 mb-8 rounded-md"
      style="background-color: #fcd4d4;"
    ></textarea>
    <button type="submit" class="py-4">Submit Payment Order</button>
  </form>
</div>

<button type="button" on:click={handleClose} class="close-button">Close</button>

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
    z-index: 999;
  }

  .close-button {
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: white;
    border: 1px solid black;
    padding: 5px 10px;
    cursor: pointer;
  }
</style>
