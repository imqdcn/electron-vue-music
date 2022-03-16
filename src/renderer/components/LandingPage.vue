<template>
  <div id="wrapper">
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
    <input
      type="text"
      placeholder="搜索点东西"
      v-model="ipt"
      @keyup.enter="searchFun"
    />
    <!-- 显示搜索列表 -->
    <div id="searchBox">
      <div class="count">为您找到{{ searchCount }}首歌曲</div>
      <ul class="searchList">
        <li v-for="item in searchList" :key="item.id">
          <h4>{{ item.name }}</h4>
        </li>
      </ul>
    </div>
    <system-information></system-information>
    <!-- <div class="doc">
      <div class="title alt">Other Documentation</div>
      <button class="alt" @click="open('https://electron.atom.io/docs/')">
        Electron
      </button>
      <button class="alt" @click="open('https://vuejs.org/v2/guide/')">
        Vue.js
      </button>
    </div> -->
  </div>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";

export default {
  name: "landing-page",
  components: { SystemInformation },
  data() {
    return {
      dev: {
        electron: process.versions.electron,
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require("os").platform(),
        vue: require("vue/package.json").version,
      },
      ipt: "",
      // 搜索列表
      searchList: [],
      // 数量：
      searchCount: 0,
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    searchFun() {
      this.$http.get("/search?keywords=" + this.ipt).then((res) => {
        console.log(res);
        this.searchList = res.data.result.songs;
        this.searchCount = res.data.result.songCount;
      });
    },
  },
  mounted() {
    // 打印系统环境
    console.log(this.dev);
    // 直接测试接口地址
    // 如果用的是https://vercel.com/kouok/netease-cloud-music-api
    // 要添加这个参数，但是发现不添加也没问题：&realIP=116.25.146.177
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
