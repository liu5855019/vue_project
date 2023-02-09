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
            <el-option 
                v-for="(item, index) in groupDatas" 
                :key="item.name + '--' + item.count" 
                :label="item.name + '--' + item.count" 
                :value="item.name" />
        </el-select>

        <div class="chart">
            <el-card>
                <div class="chart1" id="chart1"></div>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as request from "@/assets/common/request";
import { LogDotaRun } from "../../assets/common/models";
import * as echarts from 'echarts';

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
    mounted() {
        let myChart = echarts.init(document.getElementById("chart1")!);
        myChart.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
                }
            ]
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

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: auto;
    justify-content: space-between;

    .chart1 {
            width: 100%;
            height: 500px;
    }
    
}
</style>