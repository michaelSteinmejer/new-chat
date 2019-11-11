<template>
  <div class="SignUp container">
    <form class="card-panel" @submit.prevent="Signup">
      <h2 class="center purple-text">Signup</h2>
      <div class="field">
        <label for="name">enter name</label>
        <input type="text" name="name" v-model="name">
      </div>
      <div class="field">
        <label for="address">enter address</label>
        <input type="text" name="address" v-model="address">
      </div>
      <div class="field">
        <label for="birthday">enter birthday</label>
        <input type="date" name="birthday" v-model="birthday">
      </div>
      <div class="field">
        <label for="email">enter email</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">enter password</label>
        <input type="password" name="password" v-model="password">
      </div>
      <p class="red-text center" v-if="feedback">{{feedback}}</p>
      <div class="field center">
        <button class="btn scale-btn purple">
          <i class="fas fa-user-plus"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { db } from "@/firestore/init";
import firebase from "firebase";

export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      birthday: "",
      address: "",
      email: "",
      password: "",
      feedback: ""
    };
  },
  beforeDestroy() {
    this.name = "";
    this.birthday = "";
    this.address = "";
    this.email = "";
    this.password = "";
    this.feedback = "";
  },
  methods: {
    Signup() {
      if (
        (this.name.length !== 0) &
        (this.birthday.length !== 0) &
        (this.address.length !== 0) &
        (this.email.length !== 0) &
        (this.password.length !== 0)
      ) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log(cred.user.email);
            db.collection("user")
              .doc(cred.user.uid)
              .set({
                name: this.name,
                email: cred.user.email,
                address: this.address,
                birthday: this.birthday
              })
              .catch(error => {
                console.log(error);
              })
              .then(() => {
                this.$router.push({ name: "About" });
              });
          }).catch(error => {
            console.log(error.message);
            this.feedback = error.message;
          })
      } else {
        this.feedback = "all fields is required";
      }
    }
  }
};
</script>

<style>
.SignUp {
  max-width: 40%;
  margin-top: 3%;
}
.SignUp h2 {
  font-size: 2.4em;
}
.SignUp .field {
  margin-bottom: 3%;
}

.Login .fas {
  margin: 1%;
}
.scale-btn {
  margin-top: 2%;
  border-radius: 0.5em;
  transform: scale(1.2);
  transition: transform 300ms ease-in-out;
}
.scale-btn:hover {
  transform: scale(1.5);
  transition: transform 300ms ease-in-out;
}
</style>
