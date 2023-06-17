<template>
  <Button label="เพิ่มข้อมูลการลา" icon="pi pi-plus" @click="dialog = true" />

  <Dialog
    header="เพิ่มข้อมูลการลา"
    v-model:visible="dialog"
    modal
    :style="{width: '35vw'}"
    :breakpoints="{'960px': '75vw', '641px': '100vw'}">
    <div class="grid mt-3">
      <div class="col-12 lg:col-6">
        <div class="field">
          <span class="p-float-label">
            <Dropdown
              v-model="type"
              :options="leave_type.data"
              class="w-full" />
            <label>ประเภทการลา :</label>
          </span>
        </div>
      </div>
      <div class="col-12 lg:col-6">
        <span class="p-float-label">
          <Calendar
            hideOnRangeSelection
            v-model="dates"
            showIcon
            touchUI
            showButtonBar
            class="w-full"
            selectionMode="range"
            :manualInput="false"
            dateFormat="dd/mm/yy"
            :minDate="minDate" />
          <label>ช่วงเวลาที่ลา</label>
        </span>
      </div>
    </div>
    <div class="grid mt-1">
      <div class="col-12">
        <div class="field">
          <span class="p-float-label">
            <Textarea v-model="detail" class="w-full" autoResize />
            <label>รายละเอียด :</label>
          </span>
        </div>
      </div>
    </div>
    <template #footer>
      <Button
        label="ยกเลิก"
        class="p-button-secondary mr-2"
        @click="dialog = false" />
      <Button label="บันทึก" @click="save()" />
    </template>
  </Dialog>
</template>

<script>
import dayjs from "dayjs";
import leave_type from "../service/leave_type.json";
export default {
  setup() {
    return {leave_type};
  },
  emits: ["add-leave-data"],
  data: () => ({
    type: "",
    dates: null,
    dialog: false,
    minDate: new Date(Date.now()),
    detail: "",
  }),
  methods: {
    save() {
      if (this.type === "") {
        this.$toast.add({
          severity: "warn",
          summary: "ประเภทการลา",
          detail: "กรุณาเลือกประเภทการลา",
          life: 3000,
        });
        return false;
      }

      if (this.dates === null) {
        this.$toast.add({
          severity: "warn",
          summary: "ช่วงเวลาที่ลา",
          detail: "กรุณาเลือกช่วงเวลาที่ต้องการลา",
          life: 3000,
        });
        return false;
      }
      if (this.dates[1] === null) {
        this.dates[1] === this.dates[0];
      }

      if (this.detail === "") {
        this.$toast.add({
          severity: "warn",
          summary: "ข้อมูลรายละเอียด",
          detail: "กรุณากรอกข้อมูลรายละเอียดการลา",
          life: 3000,
        });
        return false;
      }

      //กำหนด id โดยไม่ซ้ำ
      const data = JSON.parse(localStorage.getItem("data"));

      //check ช่วงเวลาที่ลา
      const check_leave = data.filter(
        (el) =>
          dayjs(el.datestart).format("YYYY-MM-DD") >=
            dayjs(this.dates[0]).format("YYYY-MM-DD") &&
          dayjs(el.dateend).format("YYYY-MM-DD") <=
            dayjs(this.dates[1]).format("YYYY-MM-DD")
      );
      if (check_leave.length > 0) {
        this.$toast.add({
          severity: "warn",
          summary: "วันลาซ้ำ",
          detail: "คุณได้มีวันลาแล้วในช่วงวันนั้นแล้ว",
          life: 3000,
        });
        return false;
      }

      this.$confirm.require({
        message: "คุณต้องการเพิ่มข้อมูลการลานี้?",
        header: "เพิ่มข้อมูลการลา",
        icon: "pi pi-exclamation-triangle",
        rejectLabel : 'ยกเลิก', 
        acceptLabel : 'ตกลง',
        accept: () => {
          const id = data.length + 1;
          const new_data = {
            id: id,
            type: this.type,
            datestart: dayjs(this.dates[0]).format("YYYY-MM-DD"),
            dateend: dayjs(this.dates[1]).format("YYYY-MM-DD"),
            detail: this.detail,
            timestamp: dayjs(Date.now()).format(),
          };
          data.push(new_data);
          localStorage.setItem("data", JSON.stringify(data));
          this.$toast.add({
            severity: "success",
            summary: "เพิ่มสำเร็จ",
            detail: "เพิ่มข้อมูลการลาเรียบร้อยแล้ว",
            life: 3000,
          });
          this.clear();
          this.dialog = false;
          this.$emit("add-leave-data", new_data);
        },
      });
    },
    clear() {
      this.detail = "";
      this.type = "";
      this.dates = null;
    },
  },
};
</script>

<style></style>
