import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importer le routeur

createApp(App)
  .use(router) // Appliquer le routeur
  .mount('#app');
