<template>
  <div class="addchat margin">
    <div class="FormInfo">
      <h5 class="center-align">Chat info</h5>
      <div>
        <br>
        <form @submit.prevent="addChat()">
          <label class="orange-text text-lighten-1" for="new-title">Enter chat title</label>
          <input class="orange-text" type="text" name="new-title" v-model="title">
          <label
            class="orange-text text-lighten-1"
            for="new-content"
          >Enter your first welcome message</label>
          <input class="orange-text" type="text" name="new-content" v-model="content">
          <br>
          <div class="center-align">
            <button class="btn BtnStyle">
              <i class="fas fa-comment-medical"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="list">
      <Chatusers v-bind:users="users"></Chatusers>
    </div>
  </div>
</template>

<script>
import Chatusers from "./Chatusers.vue";
import { bus } from "@/main.js";

export default {
  name: "Addchat",
  components: {
    Chatusers: Chatusers
  },
  data() {
    return {
      allowedusers: [],
      userslist: [],
      title: "",
      content: ""
    };
  },
  mounted() {
    this.$store.dispatch("GetLoggedInUser");
    this.$store.dispatch("GetUsers");
    bus.$on("UserCheck", data => {
      this.onChange(data.checked, data.user);
    });
  },
  methods: {
    arrayRemove(arr, value) {
      return arr.filter(function(ele) {
        return ele != value;
      });
    },
    addChat() {
      let data = {
        title: this.title,
        loggedinuser: this.loggedinuser.email,
        date: Date.now()
      };
      this.$store
        .dispatch("AddChat", data)
        .then(response => {
          //console.log(response.id)
          this.$store
            .dispatch("UserChatInfo", {
              allowedusers: this.allowedusers,
              chatId: response.id
            })
            .then(() => {
              this.$store
                .dispatch("OwnerChatInfo", {
                  loggedinuser: this.loggedinuser,
                  chatId: response.id
                })
                .then(() => {
                  this.$store.dispatch("ChatMessages", {
                    content: this.content,
                    date: Date.now(),
                    email: this.loggedinuser.email,
                    chatId: response.id
                  });
                });
            });
        })
        .catch(error => console.log(error));
    },
    onChange(e, user) {
      if (e === true) {
        this.allowedusers.push(user);
      } else {
        this.allowedusers = this.arrayRemove(this.allowedusers, user);
      }
      console.log(this.allowedusers);
    }
  },
  computed: {
    loggedinuser: function() {
      return this.$store.getters.GetLoggedInUser;
    },
    users: function() {
      return this.$store.getters.GetAllUser.filter(
        user => user.email != this.loggedinuser.email
      );
    }
  }
};
</script>

<style>
.addchat li:nth-child(odd) {
  background-color: #ffc107;
}
.addchat li {
  border-radius: 5px;
}
.addchat li:nth-child(even) {
  background-color: #ff7043;
}
.addchat {
  display: grid;
  grid-template-columns: auto, auto;
  grid-template-rows: auto, auto;
  grid-template-areas:
    "list FormInfo"
    "list FormInfo";
  margin-top: 5%;
}
.FormInfo {
  grid-area: FormInfo;
  width: 80%;
  justify-self: center;
  border-style: solid;
  border-radius: 5px;
  border-color: #ef5350;
  padding: 1%;
}
.list {
  grid-area: list;
  width: 100%;
}
.addchat h5 {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ef5350;
}
</style>
