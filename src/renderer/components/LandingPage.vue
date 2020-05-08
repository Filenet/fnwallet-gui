<template>
  <div>
      <header>
          <div class="header">
            <span @click="Interface('show')">
                <img src="../../../static/imgs/yi.png" alt="">
            </span>
            <span @click="Interface('expand')">
                <img src="../../../static/imgs/kou.png" alt="">
            </span>
            <span @click="Interface('quit')">
                <img src="../../../static/imgs/shanchushaixuanxiang.png" alt="">                
            </span>
        </div>
      </header>
  </div>
</template>
<script>
import {ipcRenderer} from 'electron'
export default {
  data () {
    return {

    }
  },
  methods:{
      Interface (val) {
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
</style>