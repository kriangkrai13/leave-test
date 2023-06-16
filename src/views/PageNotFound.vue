<template>
  <div class="flex justify-content-center">
    <h1>404 Page Not Found</h1> <br/>
    
  </div>
  <div class="row text-center">
    <h3>ไม่มีหน้านี้อยู่ตามที่ค้นหา</h3>
    <div class="col-12 text-center">
      <Button label="กลับหน้ากลัก" @click="$router.push('/')" icon="pi pi-home" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
