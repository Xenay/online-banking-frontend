<script>
  import { locale, dictionary, getLocaleFromNavigator, t } from 'svelte-i18n';
    let isOpen = false; // State for the hamburger menu

    function toggleMenu() {
      isOpen = !isOpen;
      console.log(isOpen);
    }
    function changeLanguage(e) {
    console.log('Changing locale to:', e);  // Debugging log
    locale.set(e);
  };
</script>

<nav class="bg-red-300 text-white py-2 px-10 mb-4 items-center shadow-md flex flex-row justify-between">
  <div class="flex justify-start">
    <div class="flex items-center space-x-2">
      <img src="src/assets/logoHiRes.png" alt="logo" class="h-8 w-auto">
      <span class="text-xl font-semibold mt-3">.</span>
      <span class="text-lg font-medium mt-3">Banking</span>
    </div>
  </div>
  <div class="flex justify-end items-center">
    <select on:change="{e => changeLanguage(e.target.value)}" class="text-black focus:outline-none justify-center bg-red-300" style="outline: none;">
      <option value="hr">HR</option>
      <option value="en">EN</option>
    </select>
    <button class="flex appearance-none target:bg-none hover: bg-red-300 focus:outline-none bg-none hover:outline-none" on:click={toggleMenu} style="outline: none; hover:outline-none">
      <div class={`hamburger hamburger-11 ${isOpen ? 'is-active' : ''}`}>
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>
    </button>
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
select:focus, button:focus {
  outline: none;  /* Removes the outline */
}
select:focus {
  box-shadow: 0 0 0 2px rgba(245, 101, 101, 0.5); /* Example of adding a subtle shadow instead */
}

</style>
