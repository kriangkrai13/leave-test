<template>
  <Menubar :model="items">
    <template #start>
      <img
        alt="logo"
        src="https://primefaces.org/cdn/primevue/images/logo.svg"
        height="40"
        class="mr-2" />
    </template>
    <template #end>
      <Button @click="logout"  label="ออกจากระบบ" icon="pi pi-sign-out" class="p-button-danger p-button-sm" />
    </template>
  </Menubar>
</template>

<script>
export default {
    data: ()=>({
        items:[
            {
                label: "หน้าแรก",
                to : '/',
                icon : 'pi pi-home'
            }
        ]
    }),
    methods : {
        logout(){
            localStorage.clear();
            window.location.reload();
        }
    }
};
</script>

<style></style>
