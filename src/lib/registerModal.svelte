<script>
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

<form on:submit|preventDefault={handleRegister}>
    <div>
        <label for="username">Username:</label>
        <input id="username" type="text" bind:value={username} />
    </div>
    <div>
        <label for="password">Password:</label>
        <input id="password" type="password" bind:value={password} />
    </div>
    <button type="submit">Register</button>
</form>

{#if $message}
    <p>{$message}</p>
{/if}
