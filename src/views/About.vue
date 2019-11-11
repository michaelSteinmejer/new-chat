<template>
  <div class="about">
    <div class="alignment center">
      <div
        class="alignmentSide"
        :class="hoverArticle==='aboutme'? 'SpecialColor' : 'RegularColor'"
        @mouseover="hoverArticle = 'aboutme'"
      >
        <p>
          <strong>About me</strong>
        </p>
      </div>
      <div
        :class="hoverArticle==='motivation'? 'SpecialColor' : 'RegularColor'"
        @mouseover="hoverArticle = 'motivation'"
      >
        <p>
          <strong>Motivation</strong>
        </p>
      </div>
    </div>
    <div class="trans"><div>
      <div id="aboutme" v-show="hoverArticle === 'aboutme'">
        <article>
          <h3>About me</h3>
          <p>Hello everyone, my name is Michael, im a student in computerscience.
            For a long time, i have been doing sports on high level, but i changed,
            and so did my goals, now i spend a lot of time learning programming, and secondly i of course still train. 
          </p>
        </article>
      </div>
      <div class="motivation" v-show="hoverArticle === 'motivation'">
        <article>
          <h3>Motivation</h3>
          <p>In a long time, i felt insecure about my programming skills, but as time went op i became more confident,
            it ledt to this moment. I now feel that can atleast do some decent programming,
            that also look and feel and feel nice.
          </p>
        </article>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "About",
  data() {
    return { leave: "", hoverArticle: "aboutme" };
  }
};
</script>

<style>

.about{
  margin-top:3%;
  grid-gap: 1%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
}
.about .alignment {
  display: flex;
  margin: 5%;
  animation: Enter 0.5s 1 linear;
}
.about .trans{
  
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.about .trans div{
  font-size: 1.5rem;
  animation: Enter 0.5s 1 linear;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
 width: 80%;
}
.about div {
  justify-content: center;
}
.alignment div {
  width: 200px;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 50%;
  justify-content: center;
  justify-items: center;
  align-content: center;
  border: 3px solid #ffb74d;
}
.RegularColor {
  background-color: #ffb74d;
  color: white;
 animation: animationOut 0.25s 1 linear;
 
}
.SpecialColor {
  background-color: white;
  color: #ffb74d;
  animation: name 0.25s 1 linear;
}
@keyframes Enter {
  0% {
   opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
     opacity: 1;
  }
}

@keyframes animationOut {
  0% {
   background-color: white;
    color: #ffb74d;
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(90deg);
  }
  100% {
     background-color: #ffb74d;
    color: white;
    
    transform: rotateX(0deg);
  }
}


@keyframes name {
  0% {
    background-color: #ffb74d;
    color: white;
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(90deg);
  }
  100% {
    background-color: white;
    color: #ffb74d;
    transform: rotateX(0deg);
  }
}
.alignment div p {
  font-size: 2.1rem;
}
.alignmentSide {
  margin-right: 2%;
}
</style>

