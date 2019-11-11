<template>
  <div class="Userlist">
      <li class="center box" v-for="user in users" :key="user.id">
        <div class="info">
          <p><strong>{{user.name}}</strong></p>
          <p><strong>{{user.email}}</strong></p>
          <p><strong>{{user.address}}</strong></p>
          <p><strong>{{user.birthday}}</strong></p>
        </div>      
      </li>
     
  </div>
</template>

<script>
export default {
  name: "Userlist",
  props: ["users"],
};
</script>

<style>
.Userlist{
  margin: 1%;
  grid-gap: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(20rem,1fr));
}
.info{
  word-wrap: break-word;
   
}
.Userlist li{
 border-radius: 5px;
  list-style: none;
}
.Userlist .box:hover{
    transition: transform 1s;
    transform: translateY(-10px);
}
.Userlist li:nth-child(odd){
  background-color:#ff7043;

  
}
.Userlist li:nth-child(even){
  background-color: #ffc107;

  
}


</style>