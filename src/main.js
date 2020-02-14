import Vue from 'vue';
import App from './App.vue';
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import VueAlertify from 'vue-alertify';
import { LoaderPlugin } from 'vue-google-login';

Vue.use(LoaderPlugin, {
  client_id: "176024940848-oq1flsps09gkdlg95216avrlp7ivtrro.apps.googleusercontent.com"
});
Vue.use(VueSweetalert2)
Vue.use(VueAlertify);

new Vue({
  render: h => h(App),
}).$mount('#app');