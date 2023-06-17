<template>
  <Button
    label="แก้ไข"
    icon="pi pi-pencil"
    class="p-button-success m-1"
    @click="openDialog" />

  <Dialog
    header="แก้ไขข้อมูลการลา"
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
            touchUI
            v-model="dates"
            showIcon
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
  emits: ["edit"],
  props: {
    item: Object,
  },
  data: () => ({
    type: "",
    dates: [],
    dialog: false,
    minDate: new Date(Date.now()),
    detail: "",
  }),
  methods: {
    openDialog() {
      this.dates[0] = new Date(dayjs(this.item.datestart).format());
      this.dates[1] = new Date(dayjs(this.item.dateend).format());
      this.detail = this.item.detail;
      this.type = this.item.type;
      this.dialog = true;
    },
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
      if (this.dates === null || this.dates[1] === null) {
        this.$toast.add({
          severity: "warn",
          summary: "ช่วงเวลาที่ลา",
          detail: "กรุณาเลือกช่วงเวลาที่ต้องการลา",
          life: 3000,
        });
        return false;
      }

      if (this.detail === "") {
        this.$toast.add({
          severity: "warn",
          summary: "ข้อมูลรายละเอียด",
          detail: "กรุณากรอกข้อมูลรายละเอียดการลา",
        });
        return false;
      }

      const data = JSON.parse(localStorage.getItem("data"));
      //check วันที่การลา
      const data_for_check = data.filter((el) => el.id !== this.item.id);
      const check_leave = data_for_check.filter(
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
        rejectLabel: "ยกเลิก",
        acceptLabel: "ตกลง",
        accept: () => {
          const position = data.findIndex((el) => el.id === this.item.id);
          const new_data = {
            ...this.item,
            type: this.type,
            datestart: dayjs(this.dates[0]).format("YYYY-MM-DD"),
            dateend: dayjs(this.dates[1]).format("YYYY-MM-DD"),
            detail: this.detail,
          };
          data.splice(position, 1, new_data);
          localStorage.setItem("data", JSON.stringify(data));
          this.$emit("edit", new_data);
          this.$toast.add({
            severity: "success",
            summary: "อัพเดตสำเร็จ",
            detail: "แก้ไขข้อมูลการลาเรียบร้อยแล้ว",
            life: 3000,
          });
          this.dialog = false;
        },
      });
    },
  },
};
</script>

<style></style>
