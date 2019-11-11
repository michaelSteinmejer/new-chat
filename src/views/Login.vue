<template>
  <div class="Login container">
    <form class="card-panel" @submit.prevent="Login">
      <h2 class="center purple-text">Login</h2>
      <div class="field">
        <label for="email">enter your email</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">enter your password</label>
        <input type="password" name="password" v-model="password">
      </div>
      <p class="red-text center" v-if="feedback">{{feedback}}</p>
      <div class="field center">
        <button class="btn purple scale-btn">
          <i class="fas fa-key"></i>
        </button>
      </div>
      <p @click="SignUp" class="field2 purple-text center">Sign up here!!</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      feedback: "",
      users: []
    };
  },
  mounted() {},
  methods: {
    SignUp() {
      this.$router.push({ name: "Signup" });
    },
    Login() {
      if ((!this.email.length !== 0) & (this.password.length !== 0)) {
        this.$store
          .dispatch("Login", { email: this.email, password: this.password })
          .then(user => {
            console.log(user);
            this.$router.push({ name: "About" });
          })
          .catch(error => {
            this.feedback = error;
          });
      } else {
        this.feedback = "please fill in both fields";
      }
    }
  }
};
</script>

<style>
.Login {
  max-width: 40%;
  margin-top: 3%;
}
.Login h2 {
  font-size: 2.4em;
}
.Login .field {
  margin-bottom: 3%;
}
.Login .field2 {
  cursor: pointer;
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
