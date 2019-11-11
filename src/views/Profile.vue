<template>
  <div class="Profil"> 
    <div class="box Margin-top center-align">
      <img class="circle" v-if="checked==true" @click="TakeProfilePic" width="270" height="270" :src="LoggedInUser.profilepic">
      <img class="rounded" v-else @click="TakeProfilePic" width="270" height="270" src="@/assets/profile.png">
      <h5 class="margin">id: {{ LoggedInUser.id}}</h5>
      <h5 class=" margin">name: {{ LoggedInUser.name}}</h5>
      <h5 class=" margin">Email: {{ LoggedInUser.email}}</h5>
      <button class="btn indigo margin" @click.prevent="Delete">DELETE</button>
    </div>
  </div> 
</template>
<script>
import { isUndefined } from "util";

import {db} from "@/firestore/init";
import firebase from "firebase";

export default {
  name: "Profile",
  data() {
    return {
      checked: false,
    };
  },
  beforeMount() {},
  created() {
    this.$store.dispatch("GetLoggedInUser");
    console.log(this.LoggedInUser.profilepic);
    
  },
  computed: {
    LoggedInUser: function() {
      let LoggedInUser = this.$store.getters.GetLoggedInUser;
      if (isUndefined(LoggedInUser)) {
        return "";
      } else {
        if (isUndefined(LoggedInUser.profilepic)) {
          console.log(this.checked);
          
        }else{
          this.checked= true
          }
        return LoggedInUser;
      }
    }
  },
  methods: {
    TakeProfilePic(){
      this.$router.push({ name: "ProfilePic", params:{email: this.LoggedInUser.email, id: this.LoggedInUser.id}});
    },
    Delete() {
      var user = firebase.auth().currentUser;

      db.collection("user")
        .doc(user.uid)
        .delete()
        .then(() => {
          user
            .delete()
            .then(() => {
              this.$router.push({
                name: "Login"
              });
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
.margin {
  margin: 1%;
}
.Margin-top {
  margin-top: 5%;
}
.box {
  margin-left: 20%;
  margin-right: 20%;

}
.profile div img{
  border-radius: 50%;
}

</style>
