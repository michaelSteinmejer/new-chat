<template>
    <div id="Search">
        <input placeholder="Search..." type="text" @input="(e)=>SearchTerm(e.target.value)" id="search">
    </div>
</template>

<script>

export default {
name: 'Usersearch',
methods:{
 SearchTerm(term){
     this.$emit('Search',term)
 }   
}
}
</script>

<style>
#Search{
    margin-top:3%;
    display: flex;
    justify-content: center;
}
#Search input{
    width: 40%;
}
</style>
