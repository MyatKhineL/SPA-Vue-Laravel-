
require('./bootstrap');

window.Vue = require('vue').default;



// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
// Vue.component('pagination', require('laravel-vue-pagination'));
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('product-component', require('./components/ProductComponent').default);


const app = new Vue({
    el: '#app',
});
