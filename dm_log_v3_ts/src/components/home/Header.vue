<template>
    <div class="header">
      <el-header>
        <div class="title">通用管理系统</div>
        <div class="name">{{ name }}</div>
      </el-header>
    </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {
    },
    data() {
      return {
        name: 'admin1'
      }
    }
  });
</script>

<style lang="scss" scoped>

  .header {
    width: 100%;
    background: #409eff;

    .el-header {
      color: #fff;
      line-height: 64px;
      display: flex;
      justify-content: space-between;

      .title {
        font-size: 24px;
      }
    }
  }

</style>