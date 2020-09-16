import Vue from 'vue'
import App from '@/App.vue'
import router from '@/index.routing'
import {store} from '@/store'
import axios from 'axios';
import VueAxios from 'vue-axios';
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import i18n from './i18n'

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
