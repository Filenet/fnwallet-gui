<template>
    <div>
        <userhead :isIndex='isIndex'></userhead>
        <section class="container container-1920">
            <div class="container-1200">
                <div class="container-header">
                    <ul >
                        <li class="ctner-hidden" >
                            <div class="ctner-hidden-title">
                                <div class="ctner-hidden-title-img">
                                    <img :src="imgUrl">
                                </div>
                                <div class="ctner-hidden-title-size">
                                    <p class="ctner-hidden-title-size-p">
                                        <i v-if="lang == 'zh'" style="font-style:normal">
                                        <span class="ctner-hidden-title-size-pSpan" >{{name}}</span><span >{{$t('rank')}}：No.{{Rank}}</span>  
                                        </i>
                                    <i v-else style="font-style:normal">
                                        <span class="ctner-hidden-title-size-pSpan" >{{english}}</span><span >{{$t('rank')}}：No.{{Rank}}</span>
                                    </i>
                                    </p>
                                    <p><span class="ctner-hidden-title-size-pSpan" >Address</span><span>{{da.blockFrom.address}}</span>  
                                    </p>
                                </div>  
                            </div>
                            <div class="ctner-hidden-img" :style="{backgroundImage:'url('+qrcode+')'}">
                                <p></p><p></p><p></p><p></p>
                            </div>
                        </li>
                        <li class="ctner-totest">
                            <div>   
                                <p><span class="ctner-totest-span">{{$t('AccountBalance')}}：</span>{{da.blockFrom.balance || 0}} FN</p>
                                <p><span class="ctner-totest-span">{{$t('DailyNumber')}}：</span>{{da.sunBlock || 0}}</p>
                            </div>
                            <div class="border-right"></div>
                            <div>
                                <p><span class="ctner-totest-span">{{$t('ThisMonthVotes')}}：</span>{{da.voteNumber|| 0}} FN</p> 
                                <p><span class="ctner-totest-span">{{$t('AccountingMonth')}}：</span>{{da.accounted || 0}}</p> 
                            </div>
                            <div class="border-right"></div>
                            <div>
                                <p><span class="ctner-totest-span">{{$t('lastMonthVotes')}}：</span>{{da.lastMonthVote || 0}} FN</p>
                                <p><span class="ctner-totest-span">{{$t('preparedCount')}}:</span>{{da.preparedCount || 0}} FN</p>
                            </div>
                        </li>
                    </ul>                       
                </div>
             
            </div>
        </section>
        <section class="container-1920">
            <section class="container-1200">
                <div class="blocktable">
                    <div class="nav">
                        <a href="javaScript:void(0);" @click="switchTab('vote',0)"
                            class="totest router-link-active">{{$t('voteDetail')}}</a>
                        
                        <a href="javaScript:void(0);" @click="switchTab('addblock',1)"
                            class="totest">{{$t('outputDetail')}}</a>
                       
                        <a href="javaScript:void(0);" @click="switchTab('statistics',2)"
                            class="totest">{{$t('statistics')}}</a>
                    </div>
                   
                    <div class="routerviewContainer">
                        <router-view :address=txid>
                            <!-- table -->
                        </router-view>
                    </div>

                </div>
            </section>
        </section>
        <section class="index-footer container-1920" style="margin-top:50px;">
            <section class="container-1200 text-center white">
                <p>© Copyright&nbsp;&nbsp;&nbsp;2017-2020&nbsp;&nbsp;&nbsp;filenet.io
                </p>
            </section>
        </section>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                da: {
                    blockFrom: {
                        address: 0,
                        balance: 0,
                        approvebalance: 0,
                        proxybalance: 0
                    }
                },
                txid: '',
                info: '',
                isIndex: false,
                qrcode: '',
                imgUrl: '',
                name:'',
                english:'',
                lang:'',
                Rank:''
            }
        },
        methods: {
            switchTab(str, index) {
                localStorage.setItem('packingnode_tab_index', index)    
                this.$router.push({
                    path: str,
                    query: {
                        search: this.txid
                    }
                })
                this.switchCss(index)
            },
            switchCss(index) {  
                var length = document.getElementsByClassName('totest').length
                for (var i = 0; i < length; i++) {
                    if (index == i) {
                        document.getElementsByClassName('totest')[index].classList.add('router-link-active')
                    } else {
                        document.getElementsByClassName('totest')[i].classList.remove('router-link-active')
                    }
                }
            }
        },
        created() {
            this.txid = this.$route.query.search
            this.info = this.$route.query.info
            this.imgUrl = this.$route.query.imgUrl
            this.name= this.$route.query.name
            this.english= this.$route.query.english
            this.Rank=this.$route.query.Rank            
            this.lang = localStorage.getItem('language')
        },
        mounted() {
            if (localStorage.getItem('packingnode_tab_index') !== undefined) {

                this.switchCss(localStorage.getItem('packingnode_tab_index'))
            }
        },
        watch: {
            '$i18n.locale': function (newval, oldval) {
                this.lang = newval
            },
        },
        beforeRouteEnter(to, from, next) {      
            if (from.path === '/packagingNodeTable') {
                localStorage.setItem('packingnode_tab_index', 0)
            }
            next()
        }
    }
</script>
<style scoped>
    .nav {
        border-bottom: 1px solid #edf0ff;
    }
    
    .routerviewContainer {
        padding: 20px 30px;
        background: #fff;
        position: relative;
    }
    
    .container {
        max-width: 1920px;
        margin: 0 auto;
        position: relative;
        left: -15px;
        padding: 31px 0;
        box-sizing: border-box;
    }
    
    .container-header {
        width: 1200px;
        overflow: auto;
        margin: 0 auto; 
        padding: 31px 50px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 1px 5px 0px rgba(168, 168, 168, 0.06);
    }

    
    .container .ctner-hidden {
        display: flex;
    }
    @media (max-width: 1200px) and (min-width: 1024px){
        .container-header {
            width: 994px;
            overflow: auto;
            margin: 0 auto;
            margin-left: 30px;
        }
        .container-header > ul {
            width: 1200px;
        }
    }
    @media (max-width: 1023px) and (min-width: 768px){
         .container-header {
            width: 738px;
            overflow: auto;
            margin: 0 auto;
            margin-left: 30px;
        }
        .container-header > ul {
            width: 1200px;
        }
    }
    @media (max-width: 425px){
        .container-header {
            width: 345px;
            overflow: auto;
            margin: 0 auto;
            margin-left: 30px;
        }
        .container-header > ul {
            width: 1200px;
        }
}
    
    .container .ctner-hidden .ctner-hidden-title {
        width: 721px;
        display: flex;
    }
    
    .container .ctner-hidden-title-size {
        width: 588px;
        height: 68px;
        padding: 5px 0 5px 18px;
    }
    
    .container .ctner-hidden-title-size P {
        line-height: 28px;
        font-size: 14px;
        font-weight: 400;
        color: #333;
    }
    
    .container .ctner-hidden-title-size P span:last-child {
        display: inline-block;
        margin-left: 20px;
    }
    
    .container .ctner-hidden-title-size .ctner-hidden-title-size-p {
        font-size: 16px;
        font-weight: bold;
        color: #444;
    }
    
    .container .ctner-hidden-title-size .ctner-hidden-title-size-p span:last-child {
        font-size: 14px;
        font-weight: 400;
    }
    
    .container .ctner-hidden-title-size .ctner-hidden-title-size-pSpan {
        display: inline-block;
        height: 16px;
    }
    
    .container .ctner-hidden .ctner-hidden-title-img {
        width: 68px;
        height: 68px;
        border-radius: 50%;
    }
    
    .container .ctner-hidden .ctner-hidden-title-img>img {
        width: 100%;
    }
    
     .container .ctner-hidden-img {
        width: 71px;
        height: 71px;
        border: 1px solid #42a0cd;
        position: relative;
        left: 44px;
        background: center;
        background-size: 85px;
        box-sizing: content-box;
    } 
    .container .ctner-hidden-img p{
        position: absolute;
        background: #fff;
    }
    .container .ctner-hidden-img p:nth-child(1){
        width: 61px;
        height: 1px;
        left: 5px;
        top: -1px;
        z-index: 1;
    }
    .container .ctner-hidden-img p:nth-child(2){
        width: 61px;
        height: 1px;
        left: 5px;
        bottom: -1px;
        z-index: 1;
    }
    .container .ctner-hidden-img p:nth-child(3){
        width: 1px;
        height: 61px;
        left: -1px;
        bottom: 5px;
        z-index: 1;
    }
    .container .ctner-hidden-img p:nth-child(4){
        width: 1px;
        height: 61px;
        right: -1px;
        bottom: 5px;
        z-index: 1;
    }

    .container .ctner-totest {
        height: 87px;
        padding-top: 31px;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        font-size: 14px;
        font-weight: 400;
        color: #333;
    }
    
    .container .ctner-totest .border-right {
        width: 1px;
        height: 34px;
        background: rgba(84, 177, 222, 1);
        opacity: 0.4;
    }
    
    .container .ctner-totest div:nth-child(1) .ctner-totest-span {
        display: inline-block;
        width: 110px;
    }
    
    .container .ctner-totest div:nth-child(3) .ctner-totest-span {
        display: inline-block;
        width: 120px;
    }
    
    .container .ctner-totest div:nth-child(5) .ctner-totest-span {
        display: inline-block;
        width: 112px;
    }
    
    .container .ctner-totest div:nth-child(1) {
        width: 354px;
    }
    
    .container .ctner-totest div:nth-child(3) {
        width: 346px;
        padding-left: 60px;
    }
    
    .container .ctner-totest div:nth-child(5) {
        width: 499px;
        padding-left: 60px;
    }
    
    .ctner-totest>div>p:last-child {
        margin-top: 19px;
    }
    
    .row {
        position: relative;
    }
    /**/
    
    .row .qrcode {
        width: 86px;
        height: 86px;
        border: 1px solid #42a0cd;
        position: absolute;
        left: 533px;
        top: 35px;
        right: 0;
    }
    
    .row .qrcode::before {
        content: '';
        position: absolute;
        background: #fff;
        width: 86px;
        height: 68px;
        left: -1px;
        top: 8px;
        z-index: 1;
    }
    
    .row .qrcode::before,
    .row .qrcode::after {
        content: '';
        position: absolute;
        background: #fff;
        width: 68px;
        height: 86px;
    }
    
    .row .qrcode::after {
        left: 8px;
        top: -1px;
        z-index: 1;
    }
    
    .row .qrcode img {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 100;
        object-fit: cover;
    }
</style>