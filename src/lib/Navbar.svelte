<script>
    let isOpen = false; // State for the hamburger menu

    function toggleMenu() {
      isOpen = !isOpen;
      console.log(isOpen);
    }
</script>

<nav class="bg-red-300 text-white py-2 px-10 mb-4 flex justify-between items-center shadow-md ">
    <div class="flex items-center space-x-2">
      <img src="src/assets/logoHiRes.png" alt="logo" class="h-8 w-auto">
      <span class="text-xl font-semibold mt-3">.</span>
      <span class="text-lg font-medium mt-3">Banking</span>
    </div>
    <button class="flex justify-end appearance-none target:bg-none hover: bg-red-300 " on:click={toggleMenu} >
      <div class={`hamburger hamburger-11 ${isOpen ? 'is-active' : ''}`}>
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>
    </button>
    
    <div class={`nav-dropdown ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <a href="/" class="p-2 block text-white">Home</a>
        <a href="/transactions" class="p-2 block text-white">Transactions</a>
        <a href="/payments" class="p-2 block text-white">Payments</a>
        <a href="/accounts" class="p-2 block text-white">Accounts</a>
      </div>
</nav>

<style>

.hamburger {
  cursor: pointer;
  display: flex;
  position: relative;
  width: 30px; /* Control the width of the icon */
  height: 24px; /* Control the height of the icon */
}
/* Ensure the dropdown is not affecting the layout of the navbar */
.nav-dropdown {
  position: absolute; /* Change to fixed if you need it to be relative to the viewport */
  top: 100%; /* Adjust as necessary */
  right: 0;
  transform: translateX(100%); /* Hide off the right side */
  transition: transform 300ms ease-in-out;
  display: flex;
  flex-direction: column;
  background: #f56565; /* Example background color */
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  width: 200px; /* Adjust width as necessary */
}

.hamburger .line {
  display: block;
  width: 100%;
  height: 3px;
  background-color: #fff;
  position: absolute;
  transition: all 0.3s ease-in-out;
}

.hamburger .line:nth-child(1) { top: 0; }
.hamburger .line:nth-child(2) { top: 50%; transform: translateY(-50%); }
.hamburger .line:nth-child(3) { bottom: 0; }

/* Animation when active */
.hamburger-11.is-active .line:nth-child(1) {
  transform: translateY(11px) rotate(45deg);
}

.hamburger-11.is-active .line:nth-child(2) {
  opacity: 0;
}

.hamburger-11.is-active .line:nth-child(3) {
  transform: translateY(-11px) rotate(-45deg);
}

</style>
