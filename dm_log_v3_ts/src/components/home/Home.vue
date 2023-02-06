<template>
  <div class="home">
    <el-container>
      <Header></Header>

      <el-container class="content">
        <Menu></Menu>
        <el-container>
          <el-main>
            <Breadcrumb></Breadcrumb>
            <div class="main">
              <router-view></router-view>
            </div>
          </el-main>
          
          <el-footer>
            <Footer></Footer>
          </el-footer>
        </el-container>
      </el-container>

    </el-container>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import Header from '@/components/home/Header.vue';
import Menu from '@/components/home/Menu.vue'
import Footer from '@/components/home/Footer.vue';
import Breadcrumb from '@/components/home/Breadcrumb.vue'


export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    Header,
    Menu,
    Footer,
    Breadcrumb
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.home {
  width: 100%;
  height: 100%;
  background: #eef;

  .content {
    position: absolute;
    width: 100%;
    top: 64px;
    bottom: 0;

    .main {
      background: white;
      margin: 20px 0;
    }
  }
}


</style>
