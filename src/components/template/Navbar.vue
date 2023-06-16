<template>
  <Menubar :model="items">
    <template #start>
      <img
        alt="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png"
        height="40"
        class="mr-2 ml-2"
      />
    </template>
  </Menubar>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        label: "หน้าแรก",
        to: "/",
        icon: "pi pi-home",
      },
      {
        label : "เกี่ยวกับโครงสร้าง",
        to : '/about',
        icon : "pi pi-info-circle"
      }
    ],
  }),
};
</script>

<style></style>
