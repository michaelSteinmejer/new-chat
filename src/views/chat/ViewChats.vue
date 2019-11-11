<template>
  <div class="ViewChats">
    <div class="Chat">
       <h5>
        hatch your chat
      </h5>
      <li class="boxs" v-for="chat in Chats" :key="chat.id" @click.stop="GoChat(chat.id)">
        <div class="info">
          <p>
            <strong>{{chat.title}}</strong>
          </p>
          <p>
            <strong>{{chat.createdby}}</strong>
          </p>
          <p>
            <strong>{{chat.date}}</strong>
          </p>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("GetUserChatInfo");
    this.$store.dispatch("GetChats");
    this.$store.dispatch("GetLoggedInUser");
    //console.log(this.MyChats);
    console.log(this.Chats);
    
  },
  methods: {
    GoChat(id) {
      this.$router.push({ name: "Chat", params: { id: id } });
    }
  },
  computed: {
    MyChats: function() {
      return this.$store.getters.GetYourChatInfo.filter(
        user => user.userId === this.$store.getters.GetLoggedInUser.id
      );
    },
    Chats: function() {
      return this.$store.getters.GetYourChats.filter(el => {
        return this.MyChats.find(chat => {
         return el.id === chat.chatId
        });
      });
    }
  }
};
</script>

<style>

.Chat {
  display: block;
  width: 40%;
  align-self: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  border-style: solid;
  border-radius: 5px;
  border-color:#ef5350;
  padding: 1%;
}
.info {
  word-wrap: break-word;
}
.ViewChats li {
  border-radius: 5px;
  list-style: none; 
  margin-top: 5%;
  cursor: pointer;
}
.ViewChats{
  margin-top:5%;
  display: flex;
  align-self: center;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
}
.ViewChats li:nth-child(odd) {
  background-color: #ff7043;
}
.ViewChats li:nth-child(even) {
  background-color: #ffc107;
}
.ViewChats h5{
   text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffa000;
}

</style>
