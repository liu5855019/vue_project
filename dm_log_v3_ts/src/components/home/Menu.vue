<template>
    <div class="menu">
      <el-aside width="200px">
        <el-menu
          router
          active-text-color="#ffd04b"
          background-color="#2578b5"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
        >
          <template v-for="(route, index) in menus">
            <el-sub-menu :index="index + ''" :key="index" v-if="!route.meta?.hidden">
              <template #title>
                <el-icon><Location /></el-icon>
                <span>{{ route.name }}</span>
              </template>

              <el-menu-item-group v-for="(children, index1) in route.children" :key="index1">
                <el-menu-item :index="children.path">{{children.name}}</el-menu-item>
              </el-menu-item-group>
            
            </el-sub-menu>
          </template>

        </el-menu>
      </el-aside>

        
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { property } from 'lodash';



export default defineComponent({
  data() {
    return {
       menus: new Array<RouteRecordRaw>()
    }
  },
  components: {
    Location
  },
  methods: {
    handleOpen(key: string, keyPath: string[]){
      console.log(key, keyPath)
    },
    handleClose(key: string, keyPath: string[]) {
      console.log(key, keyPath)
    }
  },
  created() {
    console.log(this.$router.options.routes)
    this.menus = [...this.$router.options.routes]
  }
});
</script>

<style lang="scss" scoped>

.menu {
  background: #aaa;

  .el-aside {
    height: 100%;
    
    .el-menu {
      height: 100%;
    }
  }
}

</style>