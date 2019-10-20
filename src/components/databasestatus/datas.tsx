import * as React from 'react'
import {style , media } from 'typestyle'

import ReactEcharts from 'echarts-for-react'

import {DatabaseState} from '../../models/databasestatus/index'
import Exceler from './excel';

function getTime (){
    var now = new Date();
    // var res = [];
    // var len = timenum;
    // res.push(now.toLocaleTimeString());
    return now.toLocaleTimeString();
}

var legends = {
    '速度':false,
    '航向角':false,
    '通信链路质量':false,
    '电池':false,
    '工作半径':false,
    '预估时间':false,
    'ph':false,
    '电导率':false,
    '浊度':false,
    '溶解氧':false,
    '工作时间':false,
    '氨氮':false,
    '温度':false
}

var jsono =[{
    "水质报告": "时间", "水质报告2": "温度(℃)", "水质报告3": "ph", "水质报告4": "电导率(mS/cm)", "水质报告5": "浊度(FNU)","水质报告6": "溶解氧(mg/L)","水质报告7": "经度","水质报告8": "纬度",
}];
var time = 0;

//params : 控件代表名称 checked:是否选中
export function updateLegeng(params,checked){
    
    legends[params] = checked
}

export default class Datas extends React.Component<DatabaseState , any > {
    seriesData : Array<Array<any>> = [[0] , [0] , [0] , [0],[0]]
    timeData : Array<any> = [0]
    getOption(){
        this.updateSeriesData()
        return {
            title: {
                // text: '后台数据',
                // left: 0
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                formatter: function (param) {
                    var arr = param;
                    var result = "";
                    // console.log(arr);
                    for(var i = 0;i < arr.length;i++){
                        var temp = arr[i];
                        if(temp.data[0] != undefined){

                        } else {
                            result += temp.seriesName + ':' + temp.data + '<br/>';
                        }
                    }
                    result += '';
                    return result;
                }
            },
            legend: {
                show:false,
                data: [
                {
                    name:'ph',
                    textStyle:{
                        fontSize : 20
                    },
                }, {
                    name:'浊度',
                    textStyle:{
                        fontSize : 20
                    },
                }, {                
                    name:'溶解氧',
                    textStyle:{
                        fontSize : 20
                    },
                },{
                    name:'电导率',
                    textStyle:{
                        fontSize : 20
                    }
                },{
                    name:'温度',
                    textStyle:{
                        fontSize : 20
                    }
                }],
                selected:{
                    'ph':legends['ph'],
                    '浊度':legends['浊度'],
                    '溶解氧':legends['溶解氧'],
                    '电导率' :legends['电导率'],
                    '温度':legends['温度'],
                }
            },
            grid: {
                left: '2%',
            },
            xAxis: {
                type: 'category',
                data: this.timeData,
                scale: false,
                boundaryGap : false,
                axisLine: {onZero: false},
                splitLine: {show: false},
                // splitNumber: 20,
                // min: 'dataMin',
                // max: 'dataMax'
            },
            yAxis: {
                scale: false,
                splitArea: {
                    show: false
                }
            },
            dataZoom: [
                {
                    type: 'inside',

                },
                {
                    show: true,
                    type: 'slider',
                    y: '96%',

                }
            ],
            series: [
                this.getSerierPh(),
                this.getSeriesDas(),
                this.getSeriesOxy(),
                this.getSeriesTur(),
                this.getSeriesTem()
        
            ]
        }
    }

    updateSeriesData(){
        this.seriesData[0].push(this.props.ph.toFixed(2)) //ph
        this.seriesData[1].push(this.props.turbidity.toFixed(2)) //浊度
        this.seriesData[2].push(this.props.oxygen.toFixed(2)) //容氧
        this.seriesData[3].push(this.props.conductivity.toFixed(2)) //电导率
        this.seriesData[4].push(this.props.temperature.toFixed(2))   //温度
        this.timeData.push(getTime())
    }

    getSerierPh(){
        return {
            name: 'ph',
            type: 'line',
            data: this.seriesData[0],
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5,
                width:8}
            },
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    fontSize:25
                }
            },
        }
    }
    
    getSeriesTur(){
        return {
            name: '浊度',
            type: 'line',
            data: this.seriesData[1],
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5,
                width:8}
            },
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    fontSize:25
                }
            },
        }
    }

    getSeriesOxy(){
        return {
            name: '溶解氧',
            type: 'line',
            data: this.seriesData[2],
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5,
                width:8}
            },
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    fontSize:25
                }
            },
        }
    }

    getSeriesDas(){
        return {
            name: '电导率',
            type: 'line',
            data: this.seriesData[3],
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5,
                width:8}
            },
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    fontSize:25
                }
            },
        }
    }

    getSeriesTem(){
        return {
            name:'温度',
            type:'line',
            data: this.seriesData[4],
            smooth:true,
            lineStyle:{
                normal:{
                    opacity:0.5,
                width:8}
            },
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    fontSize:25
                }
            },
        }
    }

    downonloadFilt(){

        // var json = { //测试数据
        //     "时间":new Date().toLocaleTimeString(),
        //     "温度(℃)":this.props.radius,
        //     "ph":this.props.ph,
        //     "电导率(mS/cm)":this.props.conductivity,
        //     "浊度(FNU)":this.props.turbidity,
        //     "溶解氧(mg/L)":this.props.oxygen,
        //     "经度":this.props.lng,
        //     "纬度":this.props.lat
        // };

        

        var sign = { //测试数据
            "水质报告":"",
            "水质报告2":"",
            "水质报告3":"",
            "水质报告4":"",
            "水质报告5":"时间",
            "水质报告6":new Date().toLocaleTimeString(),
            "水质报告7":"负责人",
            "水质报告8":"王海博"
        };

        jsono.push(sign);


        const exceler = new Exceler
        // exceler.getFunc()
        exceler.downloadExl(jsono,'xlsx')
        // jsono = [{
        //     "水质报告": "时间", "水质报告2": "温度(℃)", "水质报告3": "ph", "水质报告4": "电导率(mS/cm)", "水质报告5": "浊度(FNU)","水质报告6": "溶解氧(mg/L)","水质报告7": "经度","水质报告8": "纬度",
        // }]
    }

    render(){
        const wholeStyle = style(
            {
                width : '100%',
                height: ' 100%'
            }
        )

        var json = { //测试数据
            "水质报告":new Date().toLocaleTimeString(),
            "水质报告2":this.props.temperature.toString(),
            "水质报告3":this.props.ph.toString(),
            "水质报告4":this.props.conductivity.toString(),
            "水质报告5":this.props.turbidity.toString(),
            "水质报告6":this.props.oxygen.toString(),
            "水质报告7":this.props.lng.toString(),
            "水质报告8":this.props.lat.toString()
        };

        jsono.push(json);

        return (
            <div className = {wholeStyle} onClick={()=>this.downonloadFilt()}>
              <ReactEcharts option = {this.getOption()} style = {{width:'1130px' , height:'920px'}} />
            </div>
        )

    }


}