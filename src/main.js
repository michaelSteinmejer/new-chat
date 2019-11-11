import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'

//import firebase from "firebase"

Vue.config.productionTip = false
// let app = null;
export const bus = new Vue();

// // venter på at firebase intialisere før at appen bliver lavet
// firebase.auth().onAuthStateChanged(() => {

//   // intialiser hvis app ikke allerede er lavet
//   if (!app) {
//     setTimeout(() => {
//      app =
      new Vue({
         router,
         store,
         render: h => h(App)
       }).$mount('#app') 
//    }, 1000);
//   }

// })


