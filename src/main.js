import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// event bus
import eventBus from './utils/eventBus'
app.config.globalProperties.$eventBus = eventBus
// store
import store from './store'
app.use(store)
// router
import router from './router'
app.use(router)
// i18n
import i18n from './utils/language'
app.use(i18n)
window.t = i18n.global.t

app.mount('#app')
