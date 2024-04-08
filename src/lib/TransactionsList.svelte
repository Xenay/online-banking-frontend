<script>
    import { onMount } from 'svelte';
    /**
   * @type {any[]}
   */
    let transactions = [];
  
    async function fetchTransactions() {
    try {
        const response = await fetch('http://localhost:9090/api/transactions');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Ensure the response is of type JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Oops, we haven't got JSON!");
        }
        transactions = await response.json(); // Assign the fetched data to the transactions variable
    } catch (error) {
        console.error("Failed to fetch transactions:", error);
    }
}
  
    onMount(() => {
      fetchTransactions();
    });
  </script>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Recipient</th>
        <th>Amount</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {#each transactions as transaction}
        <tr>
          <td>{transaction.transactionDate}</td>
          <td>{transaction.recipientName}</td>
          <td class="{transaction.amount < 0 ? 'negative' : ''}">
            ${transaction.amount}
          </td>
          <td>{transaction.paymentDescription}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  <style>
    .negative {
      color: red;
    }
  </style>
  