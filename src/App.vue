<template>
  <Navbar />
  <router-view />
  <Toast />
  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import Navbar from "./components/template/Navbar.vue";
export default {
  components: {
    Navbar,
  },
  beforeCreate() {
    document.title = "ระบบการลางาน";
  },
  created() {
    if (localStorage.getItem("data") === null) {
      localStorage.setItem("data", JSON.stringify([]));
    }
  },
};
</script>

<style></style>
