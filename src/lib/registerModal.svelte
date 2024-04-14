<script>
  import { push } from 'svelte-spa-router';
    import { writable } from 'svelte/store';

    let username = '';
    let password = '';
    let message = writable('');

    async function handleRegister() {
    console.log(JSON.stringify({ username, password }));
    try {
        const randomaccountNumber = Math.floor(Math.random() * 1000000000);

        const response = await fetch('http://localhost:9090/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, accountNumber: randomaccountNumber})
        });

        try {
            const result = await response.json();
            if (response.ok) {
                push('/login');

            }
        } catch (e) {
            // This will handle cases where the response is not in JSON format.
            message.set('An error occurred, and the server did not return a JSON response.');
        }
    } catch (e) {
        console.error('Failed to fetch:', e);
        message.set('Failed to send registration data');
    }
}
</script>

<form class="p-6 bg-white rounded-lg shadow-xl animate-scale-in max-w-xl flex flex-col justify-center m-auto" on:submit|preventDefault={handleRegister}>
    <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username:</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  id="username" type="text" bind:value={username} style="background-color: white;"/>
    </div>
    <div>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password:</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" bind:value={password} style="background-color: white;" />
    </div>
    <button type="submit" class="text-white">Register</button>
</form>

{#if $message}
    <p>{$message}</p>
{/if}
