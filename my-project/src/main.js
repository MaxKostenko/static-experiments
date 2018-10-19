import Vue from 'vue'
import App from './App.vue'
import Counter from './Counter'

Vue.config.productionTip = false;

Vue.component('custom-counter', Counter);

new Vue({
  render: h => h(App)
}).$mount('#app');
