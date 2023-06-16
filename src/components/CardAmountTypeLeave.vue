<template>
    <Card :class="className" style="width: 250px;">
        <template #content>
            <div class="text-center">
                <h3 class="mt-0 mb-0">{{ titleName }}</h3>
                <h1 class="mt-0 mb-0">{{ numberFormat(amount) }}</h1>
                <p class="mt-0 mb-0">รายการ</p>
            </div>
        </template>
    </Card>
</template>

<script>
export default {
    props:{
        className : String,
        amount : Number,
        titleName : String
    },
    methods: {
        numberFormat(num){
            return num.toLocaleString("en-US", { maximumFractionDigits: 0, minimumFractionDigits: 0 });
        }
    }
}
</script>

<style>

</style>