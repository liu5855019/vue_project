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
import { anyTypeAnnotation } from '@babel/types';

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
        this.resetOption();
        var chart = echarts.init(document.getElementById("chart1")!);
        chart.setOption(this.option);
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
            console.log(this.group)
            request.LogDotaSearchLog(this.device, this.group)
            .then(res => {
                console.log(res);
                let datas: Array<LogDotaRun> = res.data;
                
                var data1 = new Array<string>();
                var data2 = new Array<number>();
                for (let index = 0; index < datas.length; index++) {
                    const pre = datas[index -1];
                    const element = datas[index];
                    data1.push(element.createDt?.toString() ?? "");
                    if (pre == null) {
                        data2.push(0);
                    } else {
                        data2.push(1);
                    }
                }
                console.log(data1);
                console.log(data2);
                this.xData = data1;
                this.yData = data2;
                this.resetOption();
        var myChart = echarts.init(document.getElementById("chart1")!);
        myChart.setOption(this.option);
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