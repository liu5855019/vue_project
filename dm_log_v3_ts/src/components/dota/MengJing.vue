<template>
    <div>
        <el-select v-model="device" class="device" placeholder="Select Device" size="large" :visible-change="deviceChanged()">
            <el-option v-for="(item, index) in deviceDatas" 
            :key="index" :label="item" :value="item" />
        </el-select>
        <el-select v-model="group" class="group" placeholder="Select Group" size="large" :visible-change="groupChanged()">
            <el-option v-for="(item, index) in groupDatas" 
            :key="index" :label="item.name + '--' + item.count" :value="item" />
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
import * as request from "@/assets/common/request";



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
            device: "",
            deviceDatas: [],
            group: {name:"",count:""},
            groupDatas:[{name:"",count:""}]
        }
    },
    created() {
        request.LogDotaGetDeviceList()
        .then(res => {
            console.log(res);
            if (res) {
                this.deviceDatas = res.data;
                this.device = res.data[0];
            }
        })
        .catch(err => {
            console.error(err);
        })
    },
    methods: {
        deviceChanged() {
            if (this.device.length > 0) {
                request.LogDotaGetGroupList(this.device)
                .then((res) => {
                    console.log(res.data);
                    this.groupDatas = res.data;
                    this.group = res.data[0];
                })
                .catch(err => {
                    console.error(err);
                })
            }
        },
        groupChanged() {
            console.log()
        }

    }
})

</script>