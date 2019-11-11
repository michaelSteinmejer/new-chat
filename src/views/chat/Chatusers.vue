<template>
  <div class="Chatusers center-align">
    <li class="boxs" v-for="user in users" :key="user.id">
      <div class="info">
        <p id="asd">
          <label>
            <input type="checkbox" class="Corner filled-in" @change="(e)=>onChange(e,user)">
            <span></span>
          </label>
        </p>
        <img id="Pic" v-show="user.profilepic" :src="user.profilepic" class="circle" alt="" width="40" height="40">
        <p>
          <strong>{{user.name}}</strong>
        </p>
        <p>
          <strong>{{user.email}}</strong>
        </p>
        
      </div>
    </li>
  </div>
</template>

<script>
import { bus } from "@/main.js";
export default {
  name: "Chatusers",
  props: ["users"],
  methods: {
    onChange(e, user) {
      bus.$emit("UserCheck", { checked: e.target.checked, user: user });
    }
  }
};
</script>

<style>
.Chatusers {
  margin: 1%;
  padding: 1%;
  grid-gap: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  cursor: pointer;
}
.Chatusers .info {
  word-wrap: break-word;
}
.Chatusers .boxs {
  list-style: none;
  border-radius: 5px;
}
.Chatusers #asd{
  position: relative;
  float: right;
  top:0;
  margin-top: 2%;
}
.Chatusers #Pic{
  position: relative;
  float: left;
  margin-top: 1%;
  padding: 1% 1% 1% 1%;
  
}
</style>
