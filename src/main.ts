import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import {createPinia} from 'pinia'
import PersistedState from 'pinia-plugin-persistedstate'
import './index.css'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)


const app = createApp(App)
const pinia = createPinia().use(PersistedState)
app.use(pinia)
  .use(router)
router.isReady().then(() => {
  app.mount("#app");
});
