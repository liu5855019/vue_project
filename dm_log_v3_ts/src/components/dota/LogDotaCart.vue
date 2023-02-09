<template>
    <div>
        <el-select v-model="device" class="device" placeholder="Select Device" size="large" key="device"
            @change="deviceChanged()">
            <el-option 
                v-for="(item, index) in deviceDatas" 
                :key="item" 
                :label="item" 
                :value="item" />
        </el-select>

        <el-select v-model="group" class="group" placeholder="Select Group" size="large" key="group"
            @change="groupChanged()">
            <el-option v-for="(item, index) in groupDatas" 
            :key="item.name + '--' + item.count" :label="item.name + '--' + item.count" :value="item.name" />
        </el-select>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="deviceId" label="Device" width="100" />
            <el-table-column prop="groupId" label="Group" width="100" />
            <el-table-column prop="createDt" label="CreateDt" />
            <el-table-column prop="isShop" label="IsShop" />
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as request from "@/assets/common/request";
import { LogDotaRun } from "../../assets/common/models";


export default defineComponent({
    data() {
        return {
            tableData: new Array<LogDotaRun>(),
            device: "",
            deviceDatas: new Array<string>(),
            group: "",
            groupDatas:new Array<{name:string, count:number}>()
        }
    },
    created() {
        request.LogDotaGetDeviceList()
        .then(res => {
            console.log(res);
            if (res) {
                this.deviceDatas = res.data.data;
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
                    this.groupDatas = res.data.data;
                })
                .catch((err) => {
                    console.error(err);
                })
            }
        },
        groupChanged() {
            console.log(this.group)
            request.LogDotaSearchLog(this.device, this.group)
            .then(res => {
                console.log(res);
                this.tableData = res.data;
            })
            .catch(err => {
                console.error(err);
            })
        }

    }
})

</script>