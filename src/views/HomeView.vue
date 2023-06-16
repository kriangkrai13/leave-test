<template>
  <div class="grid">
    <div class="col-12 text-center">
      <h1>ยินดีต้อนรับ</h1>
      <h2>บันทึกการลาต่างๆ</h2>
    </div>
  </div>
  <div class="flex flex-wrap justify-content-center gap-3">
    <card-amount-type-leave className="bg-red-400 text-white" titleName="ลาป่วย" :amount="amountType('ลาป่วย')"/>
    <card-amount-type-leave className="bg-yellow-500 text-white" titleName="ลากิจ" :amount="amountType('ลากิจ')"/>
    <card-amount-type-leave className="bg-blue-400 text-white" titleName="ลาพักร้อน" :amount="amountType('ลาพักร้อน')"/>
  </div>
  <div class="grid mt-2">
    <div class="col-12">
      <AddLeave @add-leave-data="addData" />
    </div>
    <div class="col-12 md:col-2">
      <div class="field">
        <label><strong>ปี : </strong></label>
        <Calendar
          v-model="year"
          view="year"
          dateFormat="yy"
          showIcon
          class="w-full"
          @date-select="filterYear()" />
      </div>
    </div>
    <div class="col-12 md:col-2">
      <div class="field">
        <label><strong>เดือน: </strong></label><br />
        <Dropdown
          v-model="month"
          :options="item_month"
          optionLabel="name"
          optionValue="number"
          class="w-full"
          placeholder="เลือกเดือน"
          showClear
          @change="filterMonth" />
      </div>
    </div>
  </div>
  <div class="grid">
    <div class="col-12">
      <DataTable :value="items" rowHover showGridlines paginator :rows="10">
        <template #empty>
          <p class="text-center"><em>-- ไม่พบข้อมูล --</em></p>
        </template>
        <Column header="#" class="text-center" style="width: 5%">
          <template #body="item">
            {{ item.index + 1 }}
          </template>
        </Column>
        <Column header="ประเภท" style="width: 8%">
          <template #body="item">
            <Chip :label="item.data.type" class="bg-primary white-text" />
          </template>
        </Column>
        <Column header="จำนวนวันลา" style="width: 10%">
          <template #body="item">
            <strong style="color: darkblue"
              >{{ calDateAmount(item.data) }} <small>วัน</small></strong
            >
          </template>
        </Column>
        <Column header="วันที่เริ่มลา">
          <template #body="item"
            ><strong>{{ dateFormat(item.data.datestart) }}</strong></template
          >
        </Column>
        <Column header="วันลาวันสุดท้าย">
          <template #body="item"
            ><strong>{{ dateFormat(item.data.dateend) }}</strong></template
          >
        </Column>
        <Column header="วันที่ทำรายการ">
          <template #body="item">
            {{ datetimeFormat(item.data.timestamp) }}
          </template>
        </Column>
        <Column header="เพิ่มเติม" style="width: 25%">
          <template #body="item">
            <detail-leave
              :item="{...item.data, amount_day: calDateAmount(item.data)}" />
            <EditLeave :item="item.data" @edit="updateData" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import AddLeave from "../components/AddLeave.vue";
import data from "../service/data.json";
import EditLeave from "../components/EditLeave.vue";
import DetailLeave from "../components/DetailLeave.vue";
import CardAmountTypeLeave from '../components/CardAmountTypeLeave.vue';
export default {
  components: {AddLeave, EditLeave, DetailLeave, CardAmountTypeLeave},
  setup() {
    return {data};
  },
  created() {
    this.item_month = data.months;
    this.getData();
    this.items = this.data.filter(
      (el) =>
        dayjs(el.datestart).format("YYYY") === dayjs(Date.now()).format("YYYY")
    );
  },
  data: () => ({
    data: [],
    item_month: [],
    items: [],
    month: null,
    year: dayjs(new Date(Date.now())).format("YYYY"),
  }),
  methods: {
    getData() {
      const data = JSON.parse(localStorage.getItem("data"));
      this.data = data.reverse();
    },
    addData() {
      this.getData();
      this.filterMonth();
    },
    updateData(res) {
      const position = this.items.findIndex((el) => el.id === res.id);
      this.items.splice(position, 1, res);
    },
    calDateAmount(item) {
      const date1 = dayjs(item.datestart);
      const date2 = dayjs(item.dateend);
      return date2.diff(date1, "day") + 1;
    },
    dateFormat(item) {
      return dayjs(item).format("DD/MM/YYYY");
    },
    datetimeFormat(item) {
      return dayjs(item).format("DD/MM/YYYY เวลา HH:mm:ss");
    },
    filterYear() {
      this.getData();
      this.month = null;
      this.items = this.data.filter(
        (el) =>
          dayjs(el.datestart).format("YYYY") === dayjs(this.year).format("YYYY")
      );
    },
    filterMonth() {
      this.getData();
      if (this.month === null) {
        this.filterYear();
      } else {
        this.items = this.data.filter(
          (el) =>
            dayjs(el.datestart).format("YYYY") ===
              dayjs(this.year).format("YYYY") &&
            dayjs(el.datestart).format("MM") === this.month
        );
      }
    },
    amountType(type){
      const data_type = this.data.filter((el)=>el.type===type);
      return data_type.length;
    }
  },
};
</script>

<style></style>
