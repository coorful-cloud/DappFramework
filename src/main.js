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

app.mount('#app')
