import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import '@/styles/custom.scss'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const firebaseConfig = {
  apiKey: "AIzaSyBQ6rhw_YqDV00L-YW_-8hrpf6v9YWLC38",
  authDomain: "trackpense.firebaseapp.com",
  databaseURL: "https://trackpense-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "trackpense",
  storageBucket: "trackpense.appspot.com",
  messagingSenderId: "620403238614",
  appId: "1:620403238614:web:64906020de0a001a130b77",
  measurementId: "G-GWBY0T8MSP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app = null;

firebase.auth().onAuthStateChanged(() => {
  if (!app)
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
})
