import { createApp } from 'vue'
import './style.css'
import Xinyue from 'xinyue'
import App from './App.vue'
console.log(Xinyue)

const app = createApp(App)
app.use(Xinyue)
app.mount('#app')
