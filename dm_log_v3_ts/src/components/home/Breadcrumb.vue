<template>
    <div>
        <el-card>
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="{path: item.path
                }">
                    {{ item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-card>
    </div>
</template>

<script lang="ts" >

import { ArrowRight } from '@element-plus/icons-vue'
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            ArrowRight: ArrowRight
        }
    },
    setup() {
        //const { ArrowLeft } = ArrowLeft
    },
    components: {
    },
})





</script>