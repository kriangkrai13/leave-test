<template>
  <div class="grid">
    <div class="col-12 text-center">
      <h1>โครงสร้างของระบบ</h1>
      <h3>โครงสร้างและอธิบายเกี่ยวกับการทำงานของระบบ</h3>
    </div>
  </div>
  <div class="grid">
    <div class="col-12 md:col-4">
      <Card class="border-1 shadow-none">
        <template #title>โครงสร้างไฟล์ SRC แบบคร่าวๆ</template>
        <template #content>
          <p>
            *src/ <br />
            <strong>-/assets</strong> <br />
            --/style.css <br />
            <strong>-/components</strong> <br />
            ----/template <br />
            --------/Navbar.vue <br />
            ----/AddLeave.vue <br/>
            ----/CardAmountTypeLeave.vue <br/>
            ----/DetailLeave.vue <br/>
            ----/EditLeave.vue <br/>
            <strong>-/router</strong> <br/>
            ----/index.js <br/>
            <strong>-/service</strong> <br/>
            ----/data.json  <small><em>(เก็บข้อมูลรายชื่อเดือนและเลขเดือนเป็นต้น เพื่อไว้ใช้ช่วยในการค้นหา)</em></small><br/>
            ----/leave_type.json <small><em>(เก็บข้อมูลประเภทการลา)</em></small> <br/>
            <strong>-/store</strong> <small><em>(ไม่ได้ใช้)</em></small> <br/>
            <strong>-/views</strong> <br/>
            ----/AboutView.vue <small><em>(หน้าเพจที่ไว้ใช้อธิบายโครงสร้าง)</em></small> <br/>
            ----/HomeView.vue <small><em>(หน้าแสดงผลการทำงานของแอพพลิชั่น)</em></small> <br/>
            ----/PageNotFound.vue <small><em>(หน้าแสดงผลกรณีไปลิ้งที่อยู่ไม่มีจริง)</em></small> <br/>
            <strong>-/App.vue</strong>
          </p>
        </template>
      </Card>
    </div>
    <div class="col-12 md:col-4">
      <Card class="border-1 shadow-none">
        <template #title>ตารางเก็บข้อมูล (Database)</template>
        <template #content>
          <p>เว็บแอพพลิเคชั่นนี้จะเก็บข้อมูลรายการลาต่างๆ ไว้ใน LocalStorage ใด Item ที่ชื่อว่า "data" การเก็บจะเก็บในลักษณะรูปแบบ JSON โดยเก็บก่อนเก็บจะทำการแปลง Array Object เป็น String ก่อน และการเรียกใช้งานก็จะทำการแปลงจาก String เป็น Array Object โดยโครงสร้างของตารางการเก็บข้อมูลการลามีดังนี้</p>
          <DataTable :value="item" showGridlines="">
              <Column header="ตัวแปร" field="name"/>
              <Column header="ชนิดข้อมูล" field="type" />
              <Column header="เพิ่มเติม" field="detail"/>
          </DataTable>
        </template>
      </Card>
    </div>

    <div class="col-12 md:col-4">
      <Card class="border-1 shadow-none">
        <template #title>ไฟล์ HomeView.vue</template>
        <template #content>
          <div class="grid">
            <div class="col-12">
              <p>ข้อมูลเกี่ยวกับการลาต่างๆ จะถูกเรียกใช้งานและเก็บไว้ในหน้านี้ในตัวแปร data และแสดงผลในตารางโดยกำหนดให้ตัวแปร items === data</p>
              <p>หน้านี้จะเรียกใช้งาน Component ในส่วนต่างๆ มาใช้งาน ได้แก่ </p>
              <p><strong>- CardAmountTypeLeave </strong> เป็น component สำหรับรับค่าผ่าน props เพื่อใช้แสดงผลการละประเภทต่างๆ โดยรับค่า titleName (ชื่อประเภทการลา), amount(จำนวนรายการลาประเภทนั้นๆ), className( ชื่อคลาส css เพื่อแต่ตกแต่งความสวยงาม)</p>
              <Divider/>
              <p><strong>- AddLeave.vue </strong> การเรียกใช้งานปุ่ม เพื่อเพิ่มข้อมูล ในนี้จะมีในส่วนของ Dialog ฟอร์มสำหรับการเพิ่มข้อมูล เมื่อทำการเพิ่มข้อมูลเสร็จ component นี้จะส่งค่าข้อมูลโดยผ่าน emit กลับมาเพื่อนำไปใช้งานต่อ หรือนำไป push เข้าใน data ข้อมูลการลา</p>
              <p>การเพิ่มข้อมูลจะมีการดักค่าว่างต่างๆ ของฟอร์ม  และมีการตรวจสอบว่า ช่วงเวลาที่เลือกนั้น มีรายการลาในช่วงเวลาดังกล่าวแล้วหรือยัง</p>
              <Divider/>
              <p><strong>- EditLeave.vue </strong> ปุ่มสำหรับแก้ไข ลักษณะการทำงานจะคล้ายกับ component AddLeave.vue แต่จะต่างกันที่ EditLeave.vue จะมีการส่งเข้าเข้าไปใน component นี้ก่อน ผ่านทาง prop เพื่อนำข้อมูลมาแสดงผล และทำการแก้ไข อัพเดตข้อมูล</p>
              <p>component นี้ก็จะมีการตรวจสอบค่าว่างของฟอร์มด้วยเช่นกัน และตรวจสอบช่วงเวลาที่ต้องการแก้ไข มีรายการลาในช่วงเวลาดังกล่าวแล้วหรือยัง</p>
              <Divider/>
              <p><strong>- DetailLeave.vue</strong> ปุ่มสำหรับดูรายละเอียดเกี่ยวกับข้อมูลการลา โดย component นี้จะรับค่าข้อมูลผ่าน prop และนำไปแสดงผลบน dialog</p>
            </div>
          </div>
        </template>
      </Card>
    </div>

  </div>
</template>
<script>
export default {
  data: ()=>({
    item : [
      {name : 'id', type : 'Number', detail : 'เก็บไอดีการลา (เลขไม่ซ้ำ)'},
      {name : 'type', type: 'String', detail: 'ลาป่วย, ลากิจ, ลาพักร้อน'},
      {name : 'datestart', type: 'date', detail : 'วันที่เริ่มลา'},
      {name : 'dateend', type: 'date', detail : 'วันสุดท้ายที่ลา'},
      {name : 'timestamp', type: 'date', detail : 'วันเวลาที่ทำรายการ'}
    ]
  })
}
</script>