// import './assets/styles/main.scss'
import '@/assets/styles/scss/main.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createApp } from 'vue'
import App from './App.vue'
import i18n from "@/translations/i18n";

const app = createApp(App)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.use(i18n)
app.mount('#app')
