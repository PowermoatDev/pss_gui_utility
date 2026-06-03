import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import { setupViewUI } from './plugins/view-ui';
import './style.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
setupViewUI(app);

app.mount('#app');
