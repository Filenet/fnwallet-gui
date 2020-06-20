<template>
    <div>
        <userhead :isIndex='isIndex'></userhead>
        <section class="container-1920">
            <section class="container-1200 superNode">
                <div>
                    <div class="count">
                        <i class="updateTime icon"></i>
                        <span class="num">{{common.formatTimeM(time)}}</span>
                        <span class="counttitle">{{$t('UpdateTime')}}</span>
                    </div>
                    <div class="count">
                        <i class="contractCurrency icon"></i>
                        <span class="num">{{proxynumber}} FN</span>
                        <span class="counttitle">{{$t('AllContractCoin')}}</span>
                    </div>
                    <div class="count">
                        <i class="globalNodes icon"></i>
                        <span class="num">{{worldnode}}</span>
                        <span class="counttitle">{{$t('GlobalNodeNumber')}}</span>
                    </div>
                    <div class="count">
                        <i class="superNodes icon"></i>
                        <span class="num">{{supernodenum}}</span>
                        <span class="counttitle">{{$t('SuperNodeNumber')}}</span>
                    </div>
                    <div class="count">
                        <i class="storageSpace icon"></i>
                        <span class="num">{{storagespace}} PB</span>
                        <span class="counttitle">{{$t('EffectiveStorageSpace')}}</span> 
                    </div>
                    <div class="count">
                        <i class="yesterday icon"></i>
                        <span class="num">{{beforenumber}} FN</span>
                        <span class="counttitle">{{$t('YesterdayCoin')}}</span>
                    </div>
                    <div class="count">
                        <i class="ideal icon"></i>
                        <span class="num">{{dream}} FN</span>
                        <span class="counttitle">{{$t('Ideal4Toutput')}}
                            <span class="iconwenhao">
                                <div class="wenhaoshuoming">
                                    {{$t('shizhi')}}
                                </div>
                            </span>
                        </span>
                    </div>
                    <div class="count">
                        <i class="digging icon"></i>
                        <span class="num">{{surplusnumber}} FN</span>
                        <span class="counttitle">{{$t('SurplusCoin')}}</span>
                    </div>
                </div>
                <router-view>
                    <!-- table -->
                </router-view>
            </section>
        </section>
        <section class="index-footer container-1920" style="margin-top:50px;">
            <section class="container-1200 text-center white">
                <p>
                    ©Copyright&nbsp;&nbsp;&nbsp;2017-2020&nbsp;&nbsp;&nbsp;filenet.io
                </p>
            </section>
        </section>
    </div>
</template>
<script>
import echarts from 'echarts'
import '../../node_modules/echarts/map/js/world.js'

export default {
    data() {
        return {
            address: "",
            time: "",
            ismiwen: true,
            isfirst: true,
            isIndex: true,
            time: '',     
            proxynumber: '',
            worldnode: '',
            supernodenum: '',
            storagespace: '',
            beforenumber: '',
            dream: '',
            surplusnumber: '',
            historyData: '',
            mapdata: [],
            showTable: '',
            lang: '',
        };
    },
    watch: {
        '$i18n.locale': function (newval, oldval) {
            this.lang = newval
        },

    },
    created() {
        
    },
    computed: {
        nextPackingTime: function () {
            if (Number(new Date().getUTCMonth()) === 11) {
                if (this.lang == 'en') {
                    return 'The next time of elections: ' + '01 / 01 / ' + (Number(new Date().getUTCFullYear()) + 1)
                } else {
                    return '下一次选举打包节点时间: ' + (Number(new Date().getUTCFullYear()) + 1) + '年' + '1月1日'
                }
            } else {
                if (this.lang == 'en') {
                    return 'The next time of elections: ' + '1 / ' + (Number(new Date().getUTCMonth()) + 2) + ' / ' + (Number(new Date().getUTCFullYear()))
                } else {
                    return '下一次选举打包节点时间: ' + Number(new Date().getUTCFullYear()) + '年' + (Number(new Date().getUTCMonth()) + 2) + '月' + '1日'
                }
            }
        }
    },

    mounted() {
        this.lang = localStorage.getItem('language')
    },
    methods: {
        isfirstFn(event) {
            this.isfirst = true
        },
        history() {
            let myHistory = echarts.init(document.getElementById('history'))
            let data = this.splitData(this.historyData);
            // console.log(data)
            myHistory.setOption({
                backgroundColor: '#fff',
                animation: false,
                title: { 
                    text: '7 day FN Price History(USD)',
                    left: '2%',
                    top: 16,
                    textStyle: {
                        fontWeight: 400,
                        fontSize: 16
                    }
                },
                // hover
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    formatter: (params) => {
                        // console.log(params)
                        return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#42A0CD;"></span><b>' +
                            params[0].seriesName + '</b><br><span style="font-size:12px">' +
                            params[0].dimensionNames[1] + ': ' + params[0].value[1] + '<br>' +
                            params[0].dimensionNames[4] + ': ' + params[0].value[4] + '<br>' +
                            params[0].dimensionNames[3] + ': ' + params[0].value[3] + '<br>' +
                            params[0].dimensionNames[2] + ': ' + params[0].value[2] + '</span>'

                    },
                    backgroundColor: 'rgba(245, 245, 245, 0.8)',
                    borderWidth: 1,
                    borderColor: '#42A0CD',
                    padding: 10,
                    textStyle: {
                        color: '#000'
                    },
                    extraCssText: 'width: 120px'
                },
                axisPointer: {
                    link: { xAxisIndex: 'all' },
                    label: {
                        backgroundColor: '#fff',
                        color: 'black',
                        borderWidth: 1,
                        borderColor: '#42A0CD',
                    }
                },
                grid: [
                    {
                        left: '6%',
                        right: '10%',
                        bottom: '8%'
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        data: data.categoryData,
                        scale: true,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: { onZero: false },
                        axisLabel: {
                            interval: 11,
                            formatter: (function (params) {
                                // console.log(params)
                                return this.formatterTime(params, 'axis')
                            }).bind(this),
                        },
                        splitLine: { show: false },
                        splitNumber: 11,
                        min: 0,
                        max: 83,
                        axisPointer: {
                            z: 100,
                            label: {
                                backgroundColor: '#F8F8F8',
                                color: '#333',
                                borderWidth: 1,
                                borderColor: '#000',
                                formatter: (function (params) {
                                    // console.log(params)
                                    return this.formatterTime(params.value, 'axisPointer')
                                }).bind(this),
                            }
                        },
                    }
                ],
                yAxis: [
                    {
                        position: 'right',
                        type: 'value',
                        scale: true,
                        splitArea: {
                            show: false
                        },
                        axisTick: { show: false },
                        axisLine: { show: false },
                    }
                ],
                series: [
                    {
                        name: 'FN price',
                        type: 'custom',
                        renderItem: this.renderItem,
                        dimensions: [null, 'Open', 'Close', 'Low', 'High'],
                        encode: {
                            x: 0,
                            y: [1, 2, 3, 4],
                            tooltip: [1, 4, 3, 2]
                        },
                        data: data.values,
                        itemStyle: {
                            normal: {
                                color: '#42A0CD',
                            }
                        }
                    },
                ]
            }, true);
        },
        toTable(str) {
            this.showTable = str
            localStorage.setItem('showTable', str)
            this.$router.push({ path: str, query: {} })
        },
    },
};
</script>

<style scope>
.tabtable-contain {
    position: relative;
}
.tabtable-contain span {
    position: absolute;
    left: 20px;
    top: 49px;
    color: #ea181d;
    line-height: 11px;
    font-size: 12px;
    font-weight:400;
}
</style>