<template>
  <Button label="เพิ่มข้อมูลการลา" icon="pi pi-plus" @click="dialog=true"/>

  <Dialog header="เพิ่มข้อมูลการลา" v-model:visible="dialog" modal :style="{ width: '30vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
    <div class="row">
        <div class="col-12 lg:col-6 mt-3">
            <div class="field">
                <span class="p-float-label">
                    <Dropdown v-model="type" :options="leave_type.data" class="w-full"/>
                    <label>ประเภทการลา :</label>
                </span>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <Calendar v-model="dates" selectionMode="range" :manualInput="false" :minDate="dayjs(Date.now()).format()"/>
        </div>
    </div>
    <div class="row">
        <div class="col-12 text-right">
            <Button label="ยกเลิก" class="p-button-secondary mr-2" @click="dialog=false"/>
            <Button label="บันทึก" @click="save()"/>
        </div>
    </div>
  </Dialog>
</template>

<script>
import leave_type from '../service/leave_type.json'
export default {
    setup(){
        return {leave_type}
    },
    data: ()=>({
        type: '',
        dates : null,
        dialog : false,
    }),
    methods: {
        save(){
            console.log(this.type);
            console.log('dates', this.dates);
        }
    }
}
</script>

<style>

</style>