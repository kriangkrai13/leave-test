<template>
  <div class="grid">
    <div class="col-4 col-offset-4">
      <Card class="border-1 shadow-none border-primary">
        <template #title>
          <p class="text-center">เข้าสู่ระบบ</p>
        </template>
        <template #content>
          <div class="row">
            <div class="col-12">
              <div class="field">
                <span class="p-float-label">
                  <InputText
                    v-model="username"
                    placeholder="ชื่อผู้ใช้งาน"
                    class="w-full"
                    @keyup.enter="checklogin" />
                  <label>ชื่อผู้ใช้งาน (Username) :</label>
                </span>
              </div>
            </div>
            <div class="col-12">
              <span class="p-float-label">
                <InputText
                  v-model="password"
                  type="password"
                  placeholder="รหัสผ่าน"
                  class="w-full"
                  @keyup.enter="checklogin" />
                <label>รหัสผ่าน (Password) :</label>
              </span>
            </div>
            <div class="col-12">
              <Button
                @click="checklogin"
                label="เข้าสู่ระบบ"
                icon="pi pi-sign-in"
                class="w-full" />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import database from "@/service/database";
export default {
  setup() {
    return {database};
  },
  created() {
    if(localStorage.getItem('logedIn')==="true"){
        this.$router.push('/');
    }
  },
  data: () => ({
    username: "",
    password: "",
  }),
  methods: {
    checklogin() {
      if (this.username === "" || this.password === "") {
        this.$toast.add({
          severity: "info",
          summary: "ชื่อผู้ใช้งานและรหัสผ่าน",
          detail: "กรุณากรอกชื่อผู้ใช้งานและรหัสผ่านให้ครบถ้วน",
          life: 3000,
        });
        return false;
      }

      const check = this.database.users.find(
        (el) => el.username === this.username && el.password === this.password
      );
      if (check) {
        console.log("user : ", check);
        this.$toast.add({
          severity: "success",
          summary: "เข้าสู่ระบบสำเร็จ",
          detail: `ยินดีต้อนรับคุณ ${check.name}`,
          life: 3000,
        });
        localStorage.setItem('user', JSON.stringify({id : check.id, emp_number: check.emp_number, name : check.name}));
        // localStorage.setItem('user', check);
        localStorage.setItem('logedIn', true);
        window.location.reload();
      } else {
        this.$toast.add({
          severity: "error",
          summary: "ไม่สำเร็จ",
          detail: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
          life: 3000,
        });
      }
    },
  },
};
</script>

<style></style>
