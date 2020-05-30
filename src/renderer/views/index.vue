<template>
    <div class="packingnodetable">
        <section class="container-1200">
            <div class="allpacking" style="min-height:900px;">
                <div class="allpackingTitle">
                    <ul>
                        <li>{{$t('rank')}}</li>
                        <li>{{$t('packingNodeName')}}</li>
                        <li>{{$t('status')}}</li>
                        <li>{{$t('countryRegion')}}</li>
                        <li>{{$t('walletAddress')}}</li>
                        <li class="ticketCount">
                            {{$t('SameMonthVotes')}} 
                            <img v-show="sortType === 0" @click="changeSort(2)" src="../../../static/imgs/default.png"
                                alt="">
                            <img v-show="sortType === 2" @click="changeSort(1)" src="../../../static/imgs/desc.png" alt="">
                            <img v-show="sortType === 1" @click="changeSort(2)" src="../../../static/imgs/asc.png" alt="">
                        </li>
                        <li>{{$t('GTMProportion')}}</li>
                         <li class="ticketCount">
                            {{$t('lastMonthVotes')}} 
                            <img v-show="nextSortType === 0"  @click="nextChangeSort(4)" src="../../../static/imgs/default.png"
                                alt="">
                            <img v-show="nextSortType === 4"  @click="nextChangeSort(3)" src="../../../static/imgs/desc.png" >
                            <img v-show="nextSortType === 3"  @click="nextChangeSort(4)" src="../../../static/imgs/asc.png" >
                        </li>
                        <li>{{$t('dailyBlock')}}</li>
                        <li>{{$t('operation')}}</li>
                    </ul>
                </div>
                <div class="allpackingTable" style="position:relative">
                    <!-- ********************************** -->
                    <div class="lili" v-for="(info,index) in da" :key="index">
                        <span >
                            {{info.rank}}
                        </span>
                        <span class="canclick short long" >
                           <img @click="go(info.address)" :src="info.url"
                                style="width: 30px; height: 30px; border-radius: 20px; float: left; margin: 22px 8px 22px 0;">
                            <b  v-if="lang == 'en'" class="allpackingTable-canclick-title">{{info.english}}
                                <i v-show="info.english.length>12">{{info.english}}</i>
                            </b>
                            <b  v-else class="allpackingTable-canclick-title">{{info.name}}
                                 <i v-show="info.name.length>5">{{info.name}}</i>    
                            </b>
                        </span>
                        <span class="state">
                            <i v-if="info.state === 0">
                                 <i  v-if="info.lastMonthVote === 0">{{$t('top105')}}</i>
                                 <div v-else>
                                    <img v-show="lang==='en'" src="../../../static/imgs/ENtop105.png">                                      
                                    <img v-show="lang==='zh'" src="../../../static/imgs/CHtop105.png">                                      
                                 </div>
                            </i>
                            <i v-else-if="info.state === 1" >
                                <i  v-if="info.lastMonthVote === 0">{{$t('Failed')}}</i>
                                <i v-else-if="info.lastMonthVote !== 0 && info.voteNumber===0" >
                                    {{$t('Candidate')}}
                                </i>
                                <div v-else>
                                    <img v-show="lang==='en'" src="../../../static/imgs/ENfail.png">                                      
                                    <img v-show="lang==='zh'" src="../../../static/imgs/CHfail.png">                                      
                                 </div>                                
                            </i>

                            <i v-else-if="info.state === 3">
                                <i class="backup">{{$t('Expired')}}</i>                                
                            </i>

                        </span>
                        <span >
                            <img  :src="require(`../../../static/imgs/${(info.location)+'.png'}`)" style="width:25px;height:16px;margin-right:10px"><span>{{info.location}}</span>
                        </span>
                        <span class="canclick short long" @click="toPackingnodeDetail(info.address,info.no,info.url,info.name,info.english,info.rank)">
                            {{common.middleEllipsisLong(info.address)}}
                            <i @click="prevent">{{info.address}}</i>
                        </span>
                        <span>
                            {{info.voteNumber}}
                        </span>
                        <span>
                            {{info.accounted}}
                        </span>
                        <span>
                            {{info.lastMonthVote}}
                        </span>
                        <span>
                            {{info.sunBlock === null ? 0 : info.sunBlock}}
                            <!-- ... -->
                        </span>
                        <span class='vote'>
                            <a href="javascript:;" @click="toPackingnodeDetail(info.address,info.no,info.url,info.name,info.english,info.rank)">{{$t('vote')}}>{{$t('vote')}}
                                <div class="qrcode">
                                    <img :src="info.src" alt="">
                                </div>
                            </a>
                        </span>
                    </div>
                    
                    <div class="search-input">
                        <div class="search-input-border"></div>
                        <input type="text" :placeholder= "$t('PackingNodeAddress')" v-model="searchValue"  ref="deltInput">
                        <i class="iconfont icon-sousuo-copy"></i>
                        
                        <div class="search-input-delete" >
                            <img :src="imgsUrl">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div style="height:0;position: relative;z-index:100;" v-show="showloading">
            <i class="iconfont icon-loading xuanzhuan"
            style="color:#cdcdcd;font-size:100px;position: absolute;top:-650px;left:50%;"></i>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            da: [
                {
                    address: "5qfCCyMV8pRdBBVXz6n8rL64P2LExBQ6MuAmU2CdX7SUaSXCCVAk73G",
                    voteNumber: 594792,
                    accounted: "6.8983%",
                    sunBlock: 51,
                    state: 0,
                    name: "dfadf",
                    english: "Xing Chi IoT",
                    url: "http://filenet.io/profile/upload/images/1216981709484990464.jpg",
                    lastMonthVote: 339,
                    location: "China",
                    rank: 1,
                    urlLocation: null
                },
                {
                    address: "3k8sJXumTA3JrXi7nTXzUEBpQbKnwqvaeni8UpMEBSyYpP6QVX9po3o",
                    voteNumber: 594568,
                    accounted: "6.8957%",
                    sunBlock: 55,
                    state: 0,
                    name: "fafsdf",
                    english: "Happiness Community",
                    url: "http://filenet.io/profile/upload/images/1211679688133529600.png",
                    lastMonthVote: 1,
                    location: "China",
                    rank: 2,
                    urlLocation: null,
                },
            ],
            current_page: 1,
            pages: "", 
            changePage: '',
            pageSize: 10,
            nowIndex: 0,
            search: "",
            showInfo: true,
            showloading: false,
            lang:'',
            sortType: 0,
            nextSortType: 0,
            lian: '',
            pageShow: {display:"block"},
            imgsUrl: require("../../../static/imgs/delete.png"),
            searchValue: '',
       }
    },
    watch: {
        '$i18n.locale': function (newval, oldval) {
            this.lang = newval
        },
    },
    computed: {

    },
    methods: {	
        changeSort (val) {
            this.sortType = val
        },
        nextChangeSort (val) {
            this.nextSortType = val
        },
        prevent(e) {
            window.event ? window.event.cancelBubble = true : e.stopPropagation();
        },
        jumpPage(page) {
            if (page) {
                this.da = []
                this.showloading = true
                this.current_page = page;
                this.changePage = ''
            }
			else{
				
			}
        },       
        nextPage() {
            this.current_page++
            this.jumpPage(this.current_page)
        },
        toPackingnodeDetail(value,info,imgUrl,name,english,rank) {
            this.$router.push({ path: '/filenet_packagingnode_info', query: { search: value,info,imgUrl,name,english,Rank:rank} })
        },
    },
    created() {
        this.lang = localStorage.getItem('language')
    },
}
</script>

<style scoped>
span.state {
    padding: 20px 0;
}
.allpackingTable-canclick-title{
    float: left;
    width: 70px;
    font-weight: 500;
    font-style:normal;    
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.allpackingTable-canclick-title:hover{
    text-decoration: underline;
}
.allpackingTable-canclick-title i{
    left: 17px;
}
span.state>i i{
    display: block;
    /* width: 71px; */
    height: 26px;
    border: 1px solid #1319ad;
    border-radius: 4px;
    line-height: 26px;
    text-align: left;
    font-style: normal;
    color: #1319ad;
    padding-left: 10px;
    padding-right: 10px;
    float: left;
}
span.state>i>.backup {
    border-color: #3d3d3d;
    color: #3d3d3d;
}
span.state>i div {
    height: 26px;
    line-height: 26px;
    padding-right: 10px;
    float: left;
}

.ticketCount img {
    width: 8px;
    height: 11px;
    cursor: pointer;
}
.superNode .lili:hover{
    background: #EFF5FF;
}

 .search-input{
    width: 318px;
    height: 33px;
    display: flex;
    align-items: center;  
    position: absolute;
    right:0;
    top:-100px;
}
.search-input> input{
    width:296px;
    height:33px;
    padding-left:35px;
    padding-right:50px;
    background:rgba(245,249,253,1);
    border-radius:4px; 
    border:0;
    box-sizing: border-box;
    outline: none;
}
.search-input .search-input-border{
    margin-right: 26px;
    width: 2px;
    height: 26px;
    background:rgba(225,225,225,1);
}
.search-input .search-input-delete{
    width: 33px;
    height: 33px;
    line-height: 33px;
    position: absolute;
    right: 0px;
}
.search-input .search-input-delete>img{
    width:8px;
    height:8px;  
}
.search-input .icon-sousuo-copy{
    color:#999;
    width: 14px;
    height: 14px;
    position: absolute;
    top: 7px;
    left: 38px;
} 
</style>