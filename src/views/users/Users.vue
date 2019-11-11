<template>
  <div class="Users">
    <Usersearch v-on:Search="UpdateSearch($event)"></Usersearch>
    <Userlist v-bind:users="users"></Userlist>
  </div>
</template>

<script>
import Userlist from "@/views/users/Userlist.vue";
import Usersearch from "@/views/users/Usersearch.vue";

export default {
  name: "Users",
  components: {
    Userlist: Userlist,
    Usersearch: Usersearch
  },
  mounted() {
    this.$store.dispatch("GetUsers");
    //console.log(this.search);
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    UpdateSearch(term) {
      this.search = term
     },
    searchFor :function(term) {
      return function(user) {
        return user.name.toLowerCase().includes(term.toLowerCase()) || !term;
      };
    }
  },
  
  computed: {
    users: function() {
      
      return this.$store.getters.GetAllUser.filter(this.searchFor(this.search))
      //return this.$store.getters.GetAllUser.filter(user =>{ return user.name.tolowerCase().match(this.search.tolowerCase())});
    }
  }
};
</script>

<style>

</style>
