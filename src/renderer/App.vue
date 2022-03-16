<template>
  <div id="app">
    <h3>hello，electron！</h3>
    <p>看看我修改了代码是否需要手动刷新electron</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "electron-vue-music",
};
</script>

<style>
/* CSS */
h3 {
  color: red;
  background-color: pink;
}
</style>
