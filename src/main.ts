import { createApp } from "vue";
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import router from './router'
import App from "./App.vue"

import 'element-plus/es/components/message/style/css'
import '@/sass/style.sass';
import 'virtual:svg-icons-register'

const pinia = createPinia()
pinia.use(piniaPersist)

createApp(App)
    .use(pinia)
    .use(router)
    .mount("#app");
