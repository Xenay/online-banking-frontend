// src/i18n.js
import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('../locales/en.json'));
register('hr', () => import('../locales/hr.json'));

function setupLocale() {
    const navigatorLocale = getLocaleFromNavigator();

    let initialLocale = 'en'; // Default to English
    if (navigatorLocale.startsWith('hr')) {
        initialLocale = 'hr'; // Use Croatian if the navigator locale starts with 'hr'
    }

    init({
        fallbackLocale: 'en',
        initialLocale: initialLocale,
    });
}
setupLocale();
import { locale } from 'svelte-i18n';

locale.subscribe(value => {
  console.log('Current locale set to:', value); // This should output 'en' or the navigator's locale
});
