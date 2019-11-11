<template>
  <div class="Header">
    <div class="menu-bar">
      <div class="logo">Chatify</div>
      <ul>
        <li>
          <a>
            <i class="fas fa-comment"></i>Chat
          </a>
          <div class="sub-menu-1">
            <ul>
              <li @click.stop="addchat">
                <i class="fas fa-comment-medical"></i>Add
              </li>
              <li @click.stop="ViewChats">
                <i class="fas fa-folder"></i>View
              </li>
            </ul>
          </div>
        </li>
        <li>
          <router-link to="/About">
            <i class="fas fa-question"></i>About
          </router-link>
        </li>
        <li>
          <router-link to="/Users">
            <i class="fas fa-users"></i>Users
          </router-link>
        </li>
        <li>
          <a>
            <img
              class="circle"
              width="40"
              height="40"
              v-show="checked===true"
              :src="LoggedInUser.profilepic"
            >
            <img class="btn-floating" v-show="checked === false" src="@/assets/profile.png">
           
          </a>
           <div class="sub-menu-1">
            <ul>
              <li>
          <router-link to="/Profile">
            <i class="fas fa-user"></i>Profile
          </router-link>
            </li>
               <li @click.stop="Logout">
                <a>
            <i class="fas fa-user-lock"></i>Logout
          </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { isUndefined } from "util";
import firebase from "firebase";

export default {
  name: "Header",
  data() {
    return {
      checked: false
    };
  },
  methods: {
    Logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.state.LoggedInUser = {};
          this.$router.push({ name: "Login" });
          console.log(firebase.auth().currentUser);
        });
    },
    addchat() {
      this.$router.push({ name: "Addchat" });
    },
    ViewChats() {
      this.$router.push({ name: "ViewChats" });
    }
  },
  computed: {
    LoggedInUser: function() {
      let LoggedInUser = this.$store.getters.GetLoggedInUser;
      if (isUndefined(LoggedInUser)) {
        return "";
      } else {
        if (isUndefined(LoggedInUser.profilepic)) {
          this.checked = false;
        } else {
          this.checked = true;
        }
        return LoggedInUser;
      }
    }
  },
  created() {
    this.$store.dispatch("GetLoggedInUser");
    console.log(this.LoggedInUser.profilepic);
  }
};
</script>

<style>
.Header {
  background: #ff7043;
}
.logo {
  color: whitesmoke;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1.5rem;
  font-weight: bold;
}
.menu-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  
}
.menu-bar ul {
  
  display: flex;
  list-style: none;
  color: whitesmoke;
}
.menu-bar i {
  color: whitesmoke;
}
.menu-bar ul li {
  width: 40%;
  margin: 1rem;
  padding: 1rem;
  border-width: 1px;
  border-style: solid;
   border-radius: 5%;
  text-align: center;
  cursor: pointer;
}
.menu-bar ul li a {
  width: 100%;
  height: 100%;
  letter-spacing: 1px;
  text-decoration: none;
  color: whitesmoke;
}
.menu-bar ul li:hover {
  background-color: #ff8a65;
 
}
.menu-bar .fas {
  margin-right: 5%;
}
.sub-menu-1 .fas {
  margin-right: 5%;
  color: whitesmoke;
}
.sub-menu-1 {
  display: none;
  
}
.menu-bar ul li:hover .sub-menu-1 {
  display: block;
  position: absolute;
  margin-top: 1%;
  margin-left: -1%;
}
.menu-bar ul li:hover .sub-menu-1 ul {
  display: block;
  border-width: 1px;
  border-style: solid;
  background: #ff9800;
  border-radius: 5%;
  width: 9rem;
}
.menu-bar ul li:hover .sub-menu-1 ul li {
  width: 80%;
  text-align: center;
}
.menu-bar ul li:hover .sub-menu-1 ul li:hover {
  display: block;
  background-color: #ffa726;
}
</style>
