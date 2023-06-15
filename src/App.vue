<template>
  <div v-if="logedIn === 'true'">
    <Navbar />
    <router-view />
  </div>
  <div v-else>
    <router-view />
  </div>
  <Toast />
</template>

<script>
import Navbar from "./components/template/Navbar.vue";
import checklogin from "./service/checklogin";
export default {
  components: {
    Navbar,
  },
  beforeCreate(){
    document.title = "ระบบการลางาน"; 
  },
  created() {
    checklogin();
  },
  data: () => ({
    logedIn: localStorage.getItem("logedIn"),
  }),
};
</script>

<style></style>
