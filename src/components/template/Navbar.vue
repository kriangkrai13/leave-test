<template>
  <Menubar :model="items">
    <template #start>
      <img
        alt="logo"
        src="https://cdn-icons-png.flaticon.com/512/3387/3387188.png"
        height="50"
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
    ],
  }),
};
</script>

<style></style>
