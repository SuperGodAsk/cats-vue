import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import sassStyles from './assets/scss/freelancer.scss'

import VueFire from 'vuefire'
import firebase from 'firebase'
// Required for side-effects
import "firebase/firestore";
Vue.use(VueFire)

let config = {
    apiKey: "AIzaSyBP2UroTOkPXDKkssvi8yw2hs0J2fvuAEQ",
    authDomain: "cats-2-30908.firebaseapp.com",
    databaseURL: "https://cats-2-30908.firebaseio.com",
    projectId: "cats-2-30908",
    storageBucket: "cats-2-30908.appspot.com",
    messagingSenderId: "476331547370"
};
firebase.initializeApp(config)
const settings = {timestampsInSnapshots: true};
export const db = firebase.firestore()
db.settings(settings);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('body')
