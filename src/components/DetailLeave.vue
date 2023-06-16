<template>
  <Button
    label="รายละเอียด"
    icon="pi pi-list"
    class="m-1"
    @click="dialog = true" />
  <Dialog
    header="รายละเอียด"
    v-model:visible="dialog"
    modal
    :style="{width: '35vw'}"
    :breakpoints="{'960px': '75vw', '641px': '100vw'}">
    <div class="grid">
      <div class="col-12">
        <p class="mb-0 mt-0"><strong>ประเภท : </strong> {{ item.type }}</p>
      </div>
      <div class="col-12">
        <p class="mb-0 mt-0"><strong>จำนวนวันลา : </strong> {{ item.amount_day}} <strong>วัน</strong></p>
      </div>
      <div class="col-12">
        <p class="mb-0 mt-0"><strong>ช่วงเวลาวันที่ลา : </strong> {{ dateFormat(item.datestart) }} ถึง {{ dateFormat(item.dateend) }}</p>
      </div>
      <div class="col-12">
        <p class="mb-0 mt-0"><strong>รายละเอียด : </strong></p>
        <p v-html="item.detail"></p>
      </div>
    </div>
    <template #footer>
      <Button
        label="ปิด"
        class="p-button-secondary mr-2"
        @click="dialog = false" />
    </template>
  </Dialog>
</template>

<script>
import dayjs from 'dayjs';
export default {
  props: {
    item: Object,
  },
  data: () => ({
    dialog: false,
  }),
  methods : {
    dateFormat(item){
        return dayjs(item).format('DD/MM/YYYY')
    },
    datetimeFormat(item){
        return dayjs(item).format('DD/MM/YYYY เวลา HH:mm:ss')
    }
  }
};
</script>

<style></style>
