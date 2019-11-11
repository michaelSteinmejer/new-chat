<template>
  <div class="ProfilePic">
    <div class="tops">
      <div class="centered">
        <video src autoplay class="feed"></video>
        <canvas class="size"></canvas>
      </div>
    </div>
    <div class="bottoms">
      <button class="snap btn blue" @click="takePicture">
        <i class="fas fa-camera"></i>
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "@/firestore/init";
import { db } from "@/firestore/init";

var constraints = {
  audio: false,
  video: {
    width: { min: 270, max: 270 },
    height: { min: 270, max: 270 }
  }
};
var stream;
var video;

export default {
  props: ["email", "id"],
  data() {
    return {
      video: null
    };
  },
  methods: {
    init: async function() {
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        video = document.querySelector("video");
        video.srcObject = stream;
      }
    },
    takePicture() {
      let ratio = window.innerHeight > window.innerWidth ? 16 / 9 : 9 / 16;
      var picture = document.querySelector("canvas");
      picture.width = window.innerWidth < 1280 ? window.innerWidth : 1280;
      picture.height = window.innerWidth / ratio;
      const ctx = picture.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        document.querySelector("video"),
        0,
        0,
        picture.width,
        picture.height
      );
      // let storageRef = firebase.storage().ref();
      var pic = picture.toDataURL("image/png");
      let storage = firebase.storage();
      let s = firebase.storage().ref("ProfileImages/" + this.email);
      s.putString(pic, "data_url").then(e => {
        storage
          .ref(e.metadata.fullPath)
          .getDownloadURL()
          .then(e => {
            console.log(e);
            db.collection("user")
              .doc(this.id)
              .update({
                ProfilePic: e
              })
              .catch(error => {
                console.log(error);
              });
          });
      });
    }
  },
  beforeMount: function() {
    this.init();
  },
  // før jeg forlader denne route stop video stream
  beforeRouteLeave(to, from, next) {
    stream.getTracks().forEach(function(track) {
      track.stop();
    });
    video.srcObject = null;
    next();
  }
};
</script>

<style>
.ProfilePic {
  margin: 5%;
  width: 100vw;
  height: 100vh;
}
.ProfilePic .feed {
  width: 270px;
  height: 270px;
  border-width: 12px;
  box-shadow: 4px 4px 4px 4px black;
  margin-right: 5%;
}

.centered {
  align-items: center;
  justify-self: center;
}

.size {
  width: 270px;
  height: 270px;
}
.snap {
  margin-top: 5%;
  justify-self: center;
  align-self: center;
}
</style>
