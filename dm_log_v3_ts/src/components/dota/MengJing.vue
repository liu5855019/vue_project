<template>
    <div>
        <el-select v-model="value" class="m-2" placeholder="Select" size="large" :visible-change="changed()">
            <el-option v-for="(item, index) in selectData" 
            :key="index" :label="item" :value="item" />
        </el-select>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LogDotaGetDeviceList } from "@/assets/common/request";



export default defineComponent({
    data() {
        return {
            tableData: [
                {
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
            ],
            value: "",
            selectData: ["1","2"]
        }
    },
    created() {
        LogDotaGetDeviceList()
        .then(res => {
            console.log(res);
            if (res.status == 200) {
                this.selectData = res.data;
                this.value = this.selectData[0];
            }
        })
        .catch(err => {
            console.error(err);
        })
    },
    methods: {
        changed() {
            console.log(this.value + "changed");
        }
    }
})

</script>