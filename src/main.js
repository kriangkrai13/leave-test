import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


// primevue css
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';

//prime theme
import "primevue/resources/themes/lara-light-indigo/theme.css"; 
import "primevue/resources/primevue.min.css";

//prime component
import Button from "primevue/button"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);

app.component('Button', Button);

app.mount('#app')
