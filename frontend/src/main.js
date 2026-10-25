import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import { i18nPlugin } from './services/i18n';

const app = createApp(App);
app.use(i18nPlugin);
app.mount('#app');
