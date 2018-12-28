import '@/common/logit'
import Vue from 'vue'
import App from '@/App'

import Toast from '@/components/toast'
import Loading from '@/components/loading'
import Dialog from '@/components/dialog'

import Mask from '@/components/mask'

import router from '@/router'

import '@/common/djcell.less'
import '@/common/global.less'
import '@/common/root'
import Vconsole from 'vconsole'

const config = require('config')

Vue.config.productionTip = false
// Vue.config.devtools = true
/* eslint-disable no-new */

//自定义插件全局安装
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Mask);
Vue.use(Dialog)

if (config.env != 'pro') {
  new Vconsole()
}

export default (() => {
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
    async created() {
    },
    destroyed() {
      localStorage.clear()
      sessionStorage.clear()
    }
  })
})()
