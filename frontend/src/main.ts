import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import primeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Ripple from 'primevue/ripple';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.directive('ripple', Ripple);
app.use(createPinia())
app.use(router)
app.use(primeVue, {
    theme: {
        preset: Aura
    },
    ripple: true 
});

app.mount('#app')



