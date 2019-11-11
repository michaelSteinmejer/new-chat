import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Signup from '@/views/Signup.vue'
import Login from '@/views/Login.vue'
import About from '@/views/About.vue'
import Profile from '@/views/Profile.vue'
import ProfilePic from '@/views/ProfilePic.vue'
import Users from '@/views/users/Users.vue'
import Addchat from '@/views/chat/Addchat.vue'
import ViewChats from '@/views/chat/ViewChats.vue'
import Chat from '@/views/chat/Chat.vue'

import firebase from "firebase"
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/About',
          name: 'About',
          component: About,
          meta: {
            requiresAuth: true
          },

        },
        {
          path: '/ViewChats',
          name: 'ViewChats',
          component: ViewChats,
          meta: {
            requiresAuth: true
          },

        },
        {
          path: '/Chat',
          name: 'Chat',
          component: Chat,
          props: true,
          meta: {
            requiresAuth: true
          },

        }
        ,
        {
          path: '/Addchat',
          name: 'Addchat',
          component: Addchat,
          meta: {
            requiresAuth: true
          },

        },
        {
          path: '/Profile',
          name: 'Profile',
          component: Profile,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/ProfilePic',
          name: 'ProfilePic',
          component: ProfilePic,
          props: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/Users',
          name: 'Users',
          component: Users,
          meta: {
            requiresAuth: true
          }
        }

      ]
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup,
      meta: {
        requiresNoAuth: true
      }
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        requiresNoAuth: true
      }
    },
  ]
})

// Tjekker før den navigere til en bestemt route
router.beforeEach((to, from, next) => {
  // hvis route der navigeres til har requiresAuth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // og bruger er logged in 
    let user = firebase.auth().currentUser
    if (user) {
      // naviger videre
      next()
    } else {
      // ellers naviger tilbage til login    
      next({ name: "Login" })
    }
  }

  // hvis route der navigeres til har requiresNoAuth
  if (to.matched.some(rec => rec.meta.requiresNoAuth)) {
    // hvis bruger ikke er logged in
    let user = firebase.auth().currentUser
    if (user === null) {
      //naviger videre
      next()
    } else {
      // naviger tilbage til hvor du kom fra
      next(from)
    }
  }
})


export default router