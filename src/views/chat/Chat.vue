<template>
  <div class="AddMessage">
    <div class="Messages">
      <ul class="mes" v-chat-scroll="{always: false, smooth: true}">
        <li class="width" v-for="mes in messages" :key="mes.id">
          <div class="width sleft orange lighten-2 center-align" v-if="mes.email === email">
            <p class>
              <strong>{{mes.content}}</strong>
            </p>
            <p class="Size text-lighten-3 grey-text">{{mes.date}}</p>
            <p class="Size text-lighten-3 grey-text">{{mes.email}}</p>
          </div>
          <div v-else class="sright width green lighten-2 center-align">
            <p class>
              <strong>{{mes.content}}</strong>
            </p>
            <p class="Size text-lighten-3 grey-text">{{mes.date}}</p>
            <p class="Size text-lighten-3 grey-text">{{mes.email}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="NewMessages">
      <AddMessage v-bind:id="id"></AddMessage>
    </div>
  </div>
</template>

<script>
import AddMessage from "./AddMessage.vue";
export default {
  props: ["id"],
  components: {
    AddMessage: AddMessage
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("GetMessages", { id: this.id });
  },
  computed: {
    messages: function() {
      return this.$store.getters.GetYourMessages;
    },
    email: function() {
      return this.$store.getters.GetLoggedInUser.email;
    }
  }
};
</script>

<style>
.AddMessage {
  margin-top: 2%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas:
    "Messages"
    "NewMessages";
}
.Messages {
  grid-area: Messages;
  border-radius: 5px;
  border-width: 2px;
  border-color: #ff7043;
  border-style: solid;
  width: 80%;
  height: 26rem;
  justify-self: center;
}
.NewMessages {
  margin: 1%;
  grid-area: NewMessages;
  width: 50%;
  justify-self: center;
}
.Messages ul {
   
  width: 100%;
  height: 100%;
  overflow: auto;
  justify-self: center;
}
.AddMessage .width {
  margin: 1.5%;
   word-wrap: break-word;
}
.AddMessage ul li {
  width: 95%;
}
.Size {
  font-size: 0.8em;
}
.AddMessage .sleft{
  
  float: left;
  clear: both;
  width: 45%;
  border-radius: 5px;
}
.AddMessage .sright{
  border-radius: 5px;
  float: right;
  clear: both;
  width: 45%;
}
.mes::-webkit-scrollbar {
  width: 0.7%;
}
.mes::-webkit-scrollbar-track {
  background: #81c784;
  border-radius: 3px;
}
.mes::-webkit-scrollbar-thumb {
  background: #4caf50;
  border-radius: 3px;
}
</style>
