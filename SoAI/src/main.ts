import Vue from 'vue';
import App from './App.vue';
// import d3 from 'd3'

import Tooltip from './Directives/Tooltip.js';

Vue.config.productionTip = false;
Vue.directive('tooltip', Tooltip);

// (window as any).d3 = d3
const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

new Vue({
  render: (h) => h(App),
}).$mount('#app');
