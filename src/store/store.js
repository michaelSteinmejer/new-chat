import Vue from 'vue'
import Vuex from 'vuex'

import auth from "@/store/modules/auth/auth.js";
import chat from "@/store/modules/chat/chat.js";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules:{
    auth,
    chat
  }
});
