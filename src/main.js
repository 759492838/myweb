import { createApp } from 'vue'
import './style.css'
import AntDesignVue from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './components/Home.vue'
const app = createApp(App)
app.use(AntDesignVue)
app.mount('#app')
