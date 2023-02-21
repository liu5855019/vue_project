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
import * as echarts from 'echarts';

import { LogDotaRun } from "../../assets/common/models";
import * as tools from "../../assets/common/tools"


let chart : echarts.ECharts;

export default defineComponent({
    data() {
        return {
            device: "",
            deviceDatas: new Array<string>(),
            group: "",
            groupDatas:new Array<{name:string, count:number}>(),
            xData: ["1","2","3"], //new Array<string>(),
            yData: [2, 1, 2], //new Array<number>(),
            option: {}
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
        chart = echarts.init(document.getElementById("chart1")!);
        this.resetOption();
    },
    methods: {
        resetOption() {
            console.log("resetOption");
            console.log(this.xData);
            console.log(this.yData);
            this.option = {
                xAxis: {
                    type: 'category',
                    data: this.xData //['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'aaa']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    type: 'line',
                    smooth: true,
                    data: this.yData //[820, 932, 901, 934, 1290, 1330, 1320, 111],
                    }
                ]
            };
            chart.setOption(this.option);
        },
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
            request.LogDotaSearchLog(this.device, this.group)
            .then(res => {
                console.log(res);
                let datas = new Array<LogDotaRun>();
                res.data.forEach(element => {
                    let item = new LogDotaRun().copy(element);
                    datas.push(item);
                });
                
                var data1 = new Array<string>();
                var data2 = new Array<number>();
                for (let index = 0; index < datas.length; index++) {
                    const pre = datas[index -1];
                    const element = datas[index];
                    data1.push(element.createDt?.toTimeString() ?? "");
                    if (pre == null) {
                        data2.push(0);
                    } else {
                        data2.push(tools.CompareDate(element.createDt!, pre.createDt!));
                    }
                }
                this.xData = data1;
                this.yData = data2;
                this.resetOption();
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