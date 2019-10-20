import * as React from 'react'
import {style,media} from 'typestyle'

import ReactEcharts from 'echarts-for-react'

interface NetworkProps{

}

function getTime (){
    var now = new Date();
    var res = [];
    // var len = timenum;
    res.push(now.toLocaleTimeString());
    return res;
}

function modelData(){
    return Math.random() * 100
}

var data1 = '0' //CPU
var data2 = '0' //内存
var data3 = '0' //线程
var data4 = '0' //进程
// var data3 = 0
// var data4 = 0

export default class Network extends React.Component<NetworkProps , any> {
    SeriesData : Array<Array<string>> = [['0'],['0']]
    timeData: Array<any> = [0]
    getOption(){
        this.updateSeriesData()
        return {
            title:{
                text:'Memory-%',
                left:'center',
                textStyle:{
                    color:'white'
                }
            },
            grid:{
                bottom:'14%'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                splitLine:{show: false},//去除网格线
                // splitArea : {show : true}//保留网格区域
                axisTick: {
                    show: true,
                    color:'white'
                },
                axisLabel: {
                    textStyle: {
                        color: 'white',//坐标值得具体的颜色
 
                    }
                }
            },
            yAxis: {
                type: 'value',
                splitLine:{show: false},//去除网格线
                // splitArea : {show : true}//保留网格区域
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: 'white',//坐标值得具体的颜色
 
                    }
                }
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                
                itemStyle:{
                    normal:{
                        color:'green'
                    },
                    areaStyle:{}
                }
            }]
        }
    }

    updateSeriesData(){
        this.timeData.push(getTime())
        data1 = modelData().toFixed(2)
        data2 = modelData().toFixed(2)
        data3 = modelData().toFixed(2)
        data4 = modelData().toFixed(2)
        this.SeriesData[0].push(data1)
        this.SeriesData[1].push(data2)
        if(this.SeriesData[0].length > 7){
            this.SeriesData[0].shift()
        }
        if(this.SeriesData[1].length > 7){
            this.SeriesData[1].shift()
        }
        if(this.timeData.length > 7){
            this.timeData.shift()
        }
    }

    getSeriesCPU(){
        return {
            // name:'CPU',
            // type:'bar',
            // xAxisIndex: 1,
            // yAxisIndex: 1,
            // // color:'#e3edcd',
            // data:this.SeriesData[0]
            name:'CPU',
            type:'line',
            stack: '%',
            areaStyle: {normal: {}},
            data:this.SeriesData[0],
            itemStyle:{
                normal:{
                    color:'#000080'
                }
            },
            symbol:'none'
        }
    }

    getSeriesMemory(){
        return {
            // name:'内存',
            // type:'line',
            
            // data:this.SeriesData[1]
            name:'内存',
            type:'line',
            stack: '%',
            areaStyle: {normal: {}},
            data:this.SeriesData[1],
            itemStyle:{
                normal:{
                    color:'#2E8B57'
                }
            },
            symbol:'none'
        }
    }

    render(){
        const wholeStyle = style(
            {
                width:'100%',
                height:'100%'
            }
        )

        const TableStyle = style(
            {
                top:'-221px',
                width:'160px',
                color:'black',
                // marginLeft:'170px'
                // border:'1' ,
                // cellspacing:'0'
                // padding:'5px'
                // padding:'10px',
                // margin:'10px'
                // border:'solid 1px black',
                borderSpacing: 0,
                position: 'relative',   
                left:'-122px',
                //   width: window.innerWidth>3800?'710px':'100%',
                zIndex: 1,
                
            }
        )

        return (
            <div className = {wholeStyle} >
              <ReactEcharts option = {this.getOption()} style = {{height : '200px' , width : '540px'}} />
              
            </div>
        )

    }


}