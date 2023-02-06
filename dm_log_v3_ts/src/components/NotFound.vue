<template>
  <div class="home">
    <div class="header"> 
      <div class="system_name">管理系统</div>
      <div class="username">admin</div>
    </div>
    <div> menu</div>
    <div>content</div>
    <div>footer</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.home {
  width: 100%;
  height: 100%;
  background: #eef;
  .header {
    width: 100%;
    height: 64px;
    background: #ee9;
    position: relative;
    .system_name{
      position: relative;
      padding-left: 50px ;
      background: #eeb;
    }
    .username{
      position: relative;
      padding-right: 50px auto ;
      background: #eeb;
    }
  }
}


</style>
