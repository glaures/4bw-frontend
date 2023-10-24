import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import '@/assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {createI18n} from 'vue-i18n'
import messages from '@/i18n/messages'
import getBrowserLocale from '@/utils/get-browser-locale'

import App from './App.vue'
import router from './router'
import {Cloudinary} from "@cloudinary/url-gen";
import Toast, {POSITION} from 'vue-toastification';
import "vue-toastification/dist/index.css";

const i18n = createI18n({
    locale: getBrowserLocale({countryCodeOnly: true}),
    fallbackLocale: 'en',
    messages
})

const app = createApp(App);

const cld = new Cloudinary({
    cloud: {
        cloudName: "dj5k3njbs",
    },
});
app.config.globalProperties.$cld = cld

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Toast, {
    position: POSITION.BOTTOM_RIGHT
});

app.mount('#app')
