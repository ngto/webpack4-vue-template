<template>
  <div class="main">
    <!-- <div class="icon"></div>
    <div class="icon"></div>
    <div class="icon"></div>
    <router-view></router-view>
    <div class="bg-box"></div>
    <img src="~assets/images/timg.jpeg" />-->
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>

    <el-color-picker class="theme-picker" popper-class="theme-picker-dropdown" v-model="theme"></el-color-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        theme: ''
      }
    },
   watch: {
     theme(newValue, oldValue) {
       console.log(oldValue,newValue);
     }
   },
  }
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  height: 100vh;
  img {
    width: 200px;
    height: 100px;
  }
  .bg-box {
    width: 100px;
    height: 100px;
    background: url('~assets/images/timg.jpeg');
  }
  .icon {
    width: 100px;
    height: 100px;
    background: url('~assets/images/degree-icon.png') no-repeat;
  }
}
</style>