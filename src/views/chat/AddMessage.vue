<template>
  <div class="send AddMessage grey lighten-3">
    <button
        :class="toggle ?(speaking ? 'btn-floating float btn green darken-3' : ' btn green float btn-floating ')  : 'btn float btn-floating red'"
        @click.stop="toggle ? endSpeechRecognition() : startSpeechRecognition()"
      >
        <i :class="toggle ? 'fas fa-microphone' : 'red fas fa-microphone-slash'"></i>
      </button>
    <form @submit.prevent="SendMessage()" id="form1">
      <div class="field">
      <label for="new-message">New message (enter to add)</label>
      <input class="inputMargin" type="text" name="new-message" v-model="newMessage">
      </div>
      <p class="red-text" v-if="feedback">{{feedback}}</p>
    </form>
    <div class="center-align">
            <button form="form1" class="btn BtnStyle">
             <i class="fas fa-comment-dots"></i>
            </button>
          </div>
  </div>
</template>

<script>
let SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : false;

export default {
  name: "AddMessage",
  props: ["id"],
  data() {
    return {
      recognition: recognition,
      text: "",
      error: false,
      speaking: false,
      toggle: false,
      runtimeTranscription: "",
      sentences: [],
      feedback: null,
      newMessage: ""
    };
  },
  mounted() {
    this.checkCompatibility();
  },
  destroyed() {
    this.endSpeechRecognition();
  },
  methods: {
    SendMessage() {
      if (this.newMessage) {
        this.$store
          .dispatch("SendMessage", {
            id: this.id,
            content: this.newMessage,
            date: Date.now(),
            email: this.$store.getters.GetLoggedInUser.email
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            this.feedback = error;
          });
        this.newMessage = null;
        this.feedback = null;
      } else {
        this.feedback = "you need to enter a message when submitting";
      }
    },
    checkCompatibility() {
      if (!this.recognition) {
        this.error =
          "Speech Recognition is not available on this browser. Please use Chrome or Firefox";
      }
    },
    endSpeechRecognition() {
      this.recognition.stop();
      this.toggle = false;
    },
    startSpeechRecognition() {
      if (!this.recognition) {
        this.error =
          "Speech Recognition is not available on this browser. Please use Chrome or Firefox";
        return false;
      }
      this.toggle = true;
      this.recognition.interimResults = true;

      this.recognition.addEventListener("speechstart", event => {
        this.speaking = true;
      });

      this.recognition.addEventListener("speechend", event => {
        this.speaking = false;
      });

      this.recognition.addEventListener("result", event => {
        const text = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join("");
        this.runtimeTranscription = text;
      });

      this.recognition.addEventListener("end", () => {
        if (this.runtimeTranscription !== "") {
          this.sentences.push(this.runtimeTranscription);
          this.newMessage = this.newMessage + this.sentences.join(". ");
          this.sentences = [];
        }
        this.runtimeTranscription = "";
      });
      this.recognition.start();
    }
  }
};
</script>

<style>
.send {
  justify-self: center;
  border-radius: 5px;
}
.float{
  justify-self:end;
  float: right;
}
.AddMessage .field{
  justify-self:auto;
  width: 95%;
  margin-left: 2.5%;
}
</style>
