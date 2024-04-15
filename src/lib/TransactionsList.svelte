<script>
    import { onMount } from 'svelte';
    import { user } from '../utils/auth';
    import { locale, dictionary, getLocaleFromNavigator, t } from 'svelte-i18n';
    /**
   * @type {any[]}
   */
    let transactions = [];
    let startDate = '';
    let endDate = '';
    let transactionType = ''; // "deposit" or "withdrawal" for example
    let partyName = ''; // Sender or receiver name
    let minAmount = '';
    let maxAmount = '';
    let url = '';
  
    async function fetchTransactions() {
    let queryParams = [];
    // Add startDate and endDate to the query params if they are not empty
    if (startDate) queryParams.push(`startDate=${startDate}`);
    if (endDate) queryParams.push(`endDate=${endDate}`);
    if (transactionType) queryParams.push(`payment_type=${transactionType}`);
    if (partyName) queryParams.push(`recipientName=${partyName}`);
    if (minAmount) queryParams.push(`minAmount=${minAmount}`);
    if (maxAmount) queryParams.push(`maxAmount=${maxAmount}`);
    queryParams.push(`accountId=${$user.id}`)
    
    // Construct the query string
    let queryString = queryParams.join('&');
    
    try {
       // Adjusted to include query parameters
        if(startDate && endDate) {
          url = `http://localhost:9090/api/payment-orders/filter/by-period?${queryString}`;
        } else if (transactionType) {
          url = `http://localhost:9090/api/payment-orders/filter/by-type?${queryString}`;
        } else if (partyName) {
          url = `http://localhost:9090/api/payment-orders/filter/by-sender?${queryString}`;
        } else if (minAmount && maxAmount) {
          url = `http://localhost:9090/api/payment-orders/filter/by-amount?${queryString}`;
        } 
        else{
          url = `http://localhost:9090/api/transactions/user?${queryString}`;
        } // Adjusted to include query parameters
        console.log(url);
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Oops, we haven't got JSON!");
        }
        transactions = await response.json();
        console.log(transactions);
    } catch (error) {
        console.error("Failed to fetch transactions:", error);
    }
}
  
    onMount(() => {
      fetchTransactions();
    });
     // Function to determine the transaction amount sign
     function determineAmountSign(transaction) {
        // Assuming `transaction.senderId` and `transaction.recipientId` are available
        // Adjust the property names as per your actual data structure
        if (transaction.recieverId === $user.id) {
            
            return `+${transaction.amount}`; // Positive amount for incoming transactions
        } else if (transaction.account.id === $user.id) {
            return `-${transaction.amount}`; // Negative amount for outgoing transactions
        } else {
            return `${transaction.amount}`; // Neutral (should not happen if the user is always sender or recipient)
        }
    }
  </script>
  <div>
 <div class="px-4 sm:px-0"> 
  <h1 class="text-lg leading-0 mb-2 font-medium text-gray-900 border-b-2 border-red-200 border-dashed font-mono">{$t("recentTransactions")}</h1>
</div>
<div class="px-4 sm:px-0"> 
  <h1 class="text-lg font-medium text-gray-900 font-mono">{$t("Filters")}:</h1>
</div>
<div>
  <input type="date" style="background-color: white;" class=" border-2 border-dashed border-red-200" bind:value={startDate} placeholder="Start Date">
  <input type="date" style="background-color: white;" class=" border-2 border-dashed border-red-200" bind:value={endDate} placeholder="End Date">
  <select bind:value={transactionType} style="background-color: white;" class=" border-2 border-dashed border-red-200">
    <option value="" >{$t("allTransactions")}</option>
    <option value="deposit">{$t("deposit")}</option>
    <option value="withdrawal">{$t("withdrawal")}</option>
    <option value="PAYMENT">{$t("payment")}</option>
  </select>
  <input type="text" bind:value={partyName} placeholder="Party Name" style="background-color: white;" class=" border-2 border-dashed border-red-200">
  <input type="number" bind:value={minAmount} placeholder="Minimum Amount" style="background-color: white;" class=" border-2 border-dashed border-red-200">
  <input type="number" bind:value={maxAmount} placeholder="Maximum Amount" style="background-color: white;" class=" border-2 border-dashed border-red-200">
  <button class="py-2 mt-4 ml-0 bg-red-200 border-2 border-dashed border-red-300" on:click={fetchTransactions}>{$t("applyFilters")}</button>
</div>
<div class="table-container">

  <table class="w-full table-auto shadow-md mt-4 overflow-auto">
    <thead class="bg-red-100 text-black uppercase text-sm leading-normal">
        <tr>
            <th class="py-3 px-6 text-left">{$t("date")}</th>
            <th class="py-3 px-6 text-left">{$t("recipient")}</th>
            <th class="py-3 px-6 text-left">{$t("recipientIban")}</th>
            <th class="py-3 px-6 text-left">{$t("senderIban")}</th>
            <th class="py-3 px-6 text-left">{$t("amount")}</th>
            <th class="py-3 px-6 text-left">{$t("descrition")}</th>
            <th class="py-3 px-6 text-left">{$t("transactionType")}</th>
        </tr>
    </thead>
    <tbody class="text-gray-600 text-sm font-light ">
        {#each transactions as transaction}
            <tr class="border-b border-gray-200 hover:bg-gray-100 ">
                <td class="py-3 px-6 text-left whitespace-nowrap">{transaction.transactionDate}</td>
                <td class="py-3 px-6 text-left">{transaction.recipientName}</td>
                <td class="py-3 px-6 text-left">{transaction.recipientIban}</td>
                <td class="py-3 px-6 text-left">{transaction.senderIban}</td>
                <td class="py-3 px-6 text-left {determineAmountSign(transaction)[0] === '-' ? 'text-red-500' : 'text-green-500'}">
                    {determineAmountSign(transaction)}
                </td>
                <td class="py-3 px-6 text-left">{transaction.paymentDescription}</td>
                <td class="py-3 px-6 text-left">{transaction.paymenType}</td>
            </tr>
        {/each}
    </tbody>
</table>
</div>
  </div>
<style>
  .table-container {
    /* Adjust width and height as needed */
    width: 100%; /* Adjust width to fit your layout */
    height: 1000px; /* Set a fixed height or use max-height */
    overflow-x: auto; /* Horizontal scrollbar if the table exceeds the container width */
    overflow-y: auto; /* Vertical scrollbar if the table exceeds the container height */
  }
  .table {
    width: 100%; /* Ensure the table takes up the width it needs */
    min-width: 600px; /* Minimum width of the table, adjust based on content */
  }
    .negative {
        color: red;
    }
    .positive {
        color: green;
    }


  

    .negative {
      color: red;
    }
  </style>
  