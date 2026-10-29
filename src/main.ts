import { createApp } from 'vue';
import App from './App.vue';

import '@/assets/styles/fonts.css';
import '@/assets/styles/variables.css';
import '@/assets/styles/normalize.css';
import '@/assets/styles/main.css';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(createPinia());
app.mount('#app');
