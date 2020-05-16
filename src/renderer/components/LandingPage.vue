<template>
  <header>
      <div class="header">
          <span @click="mizeShow('show')">
              <img src="../../../static/imgs/yi.png" alt="">
          </span>
          <span @click="mizeShow('max')">
              <img src="../../../static/imgs/kou.png" alt="">
          </span>
          <span @click="mizeShow('quit')">
              <img src="../../../static/imgs/shanchushaixuanxiang.png" alt="">                
          </span>
      </div>
      <div class="content">
          
      </div>
  </header>
</template>
<script>
import {ipcRenderer} from 'electron'
export default {
  data () {
    return {

    }
  },
  methods:{
        mizeShow (val) {
          ipcRenderer.send("asynchronous-show",val)
      },
  }
}
</script>
<style lang="scss" scoped>
    .header{
        height: 20px;
        background: #001529;
        text-align: right;
        padding: 0 20px;
        img{
            height: 100%;
            -webkit-app-region: no-drag; 
        }
    }
    .content{
      width: 100%;
      height: 300px;
      background: red;
    }
</style>