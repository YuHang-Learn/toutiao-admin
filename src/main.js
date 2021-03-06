import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

require('../mock/index')

Vue.config.productionTip = false

Vue.use(ElementUi)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
