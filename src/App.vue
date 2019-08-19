<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  data(){
    return{

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  background-blend-mode:darken;
  -moz-osx-font-smoothing: grayscale;
  background-image: linear-gradient(rgba(0, 0, 0, 0.726),rgba(0, 0, 0, 0.623)) ,url("./assets/background.jpg");
  background-repeat: no-repeat;
  background-size: 220vh;
  background-attachment:fixed;
  background-position: 50% 60%;
  min-height: 100vh;


}

</style>
