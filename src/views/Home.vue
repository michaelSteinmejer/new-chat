<template>
  <div class="home">
    <Header class="nav"></Header>
    <div class="routed">
      <transition enter-active-class="CompEnter" leave-active-class="LeaveComp" mode="out-in">
     <router-view/>
     </transition>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'


export default {
  name: 'Home',
  components: {
     'Header': Header
  },mounted(){
    this.$store.dispatch("GetLoggedInUser")
  }
}
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas:
    "nav"
    "routed";
}
.routed {
  grid-area: routed;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
.nav {
  grid-area: nav;
  width: 100%;
  
}
.CompEnter{
  animation: EnterComp 0.5s 1 linear;
}
.CompLeave{
  animation: LeaveComp 0.5s 1 linear;
}

@keyframes EnterComp {
  0% {
   opacity: 0;
  }
 
  100% {
     opacity: 1;
  }
}
@keyframes LeaveComp {
  0% {
   opacity: 1;
  }
  
  100% {
     opacity: 0;
  }
}
</style>
