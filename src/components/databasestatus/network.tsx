import * as React from 'react'
import {style,media} from 'typestyle'

import ReactEcharts from 'echarts-for-react'

interface MemoryProps{

}


// var xAxisData = [];
// var data1 = [];
// var data2 = [];
// var data3 = [];

// xAxisData.push('类目' + -1);
// data1.push('-');
// data2.push('-');
// data3.push('-');

// for (var i = 0; i < 5; i++) {
//     xAxisData.push('类目' + i);
//     data1.push((-Math.random() - 0.2).toFixed(3));
//     data2.push((Math.random() + 0.3).toFixed(3));
//     data3.push((Math.random() + 0.2).toFixed(3));
// }

// xAxisData.push('类目' + i);
// data1.push('-');
// data2.push('-');
// data3.push('-');

// for (; i < 10; i++) {
//     xAxisData.push('类目' + i);
//     data1.push((-Math.random() - 0.2).toFixed(3));
//     data2.push((Math.random() + 0.3).toFixed(3));
//     data3.push((Math.random() + 0.2).toFixed(3));
// }
// xAxisData.push('类目' + i);
// data1.push('-');
// data2.push('-');
// data3.push('-');

var itemStyle = {
    normal: {
        lineStyle: {
            width: 2
        },
        areaStyle: {
        }
    }
};

function getTime (){
    var now = new Date();
    var res = [];
    // var len = timenum;
    res.push(now.toLocaleTimeString());
    return res;
}

function modelData(){
    return Math.random() * 1000
}

function modelDData(){
    return -Math.random() * 1000
}

var data1 = '0' //收到的包
var data2 = '0' //发出的包
var data3 = '0' //收到的数据
var data4 = '0' //发出的数据


export default class Memory extends React.Component<MemoryProps , any>{
    SeriesData:Array<Array<string>>=[['0'],['0']]
    timeData:Array<any> = [0]
    getOption(){
        this.updateSeriesData()
        return {
            title:{
                text:'Network I/0',
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
                    show: false,
                    color:'white'
                },
                axisLine: {
                    show:false,
                    lineStyle: {
                        // type: 'solid',
                        // color: '#fff',//左边线的颜色
                        // width:'2'//坐标线的宽度
                    }
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
            },{
                data: [-820, -932, -901, -934, -1290, -1330, -1320],
                type: 'line',
                
                itemStyle:{
                    normal:{
                        color:'yellow'
                    },
                    areaStyle:{}
                }
            }]
        }
    }

    updateSeriesData(){
        this.timeData.push(getTime())
        data1 = modelData().toFixed(2)
        data2 = modelDData().toFixed(2)
        data3 = modelData().toFixed(2)
        data4 = modelDData().toFixed(2)
        this.SeriesData[0].push(data1)
        this.SeriesData[1].push(data2)
        if(this.SeriesData[0].length > 10){
            this.SeriesData[0].shift()
        }
        if(this.SeriesData[1].length > 10){
            this.SeriesData[1].shift()
        }
        if(this.timeData.length > 10){
            this.timeData.shift()
        }
    }

    getSeriesUp(){
        return {
            // name: '包接收',
            type: 'line',
            stack: 'all',
            symbolSize: 10,
            data: this.SeriesData[0],
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 2,
                        color:'green'
                    },
                    
                }
            },
            smooth: true,
            connectNulls: true,
            symbol:'none'
        }
    }

    getSeriesDown(){
        return {
            // name: '包发送',
            type: 'line',
            stack: 'all',
            symbolSize: 10,
            data: this.SeriesData[1],
            itemStyle: {
                normal: {
                    lineStyle: {
                        width: 2,
                        color:'yellow'
                    },
                    
                }
            },
            label: {
                normal: {
                    show: true
                }
            },
            connectNulls: true,
            smooth: true,
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
                width:'150px',
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
                left:'-117px',
                //   width: window.innerWidth>3800?'710px':'100%',
                zIndex: 1,
                
            }
        )

        return (
            <div className = {wholeStyle} >


                <ReactEcharts option={this.getOption()} style={{width:'540px' , height:'200px'}} />

                
            </div>
        )
    }

}