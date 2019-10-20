import * as React from 'react'
import * as Redux from 'redux'
import {style,media} from 'typestyle'

import ReactEcharts from 'echarts-for-react'

interface dataProps {
    ph:number   //ph
    oxygen:number   //溶解氧
    temperature:number  //温度
    turbidity:number    //浊度
    conductivity:number //电导率
}

var showName = "ph" //默认显示ph

export function changeShow(params){
    showName = params
}

export default class fivePropsTable extends React.Component<dataProps , any>{
    seriesData : Array<Array<any>> = [[0] , [0] , [0] , [0],[0]]
    getOption(){
        this.updateSeriesData()
        return {
            grid:{
                left:'5%',
                top:'7%',
                width:'92%',
                // height:'100%'
            },
            xAxis: {
                show:false,
                type: 'category',
                data: [1,2,3,4,5,6,7,8,9,10,11]
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    // formatter: '{value} ℃',
                    color:'#e3e3e3',
                    formatter: '{value} ' + this.getUnit()
                },
                // itemStyle:{
                //     normal:{
                //         color:'#e3e3e3'
                //     }
                // }
            },
            series: [{
                // data: [820, 932, 901, 934, 1290, 1330, 1320,0,100,300,500],
                data: this.getData(),
                type: 'line',
                lineStyle:{
                    normal:{
                        color:'#2298ff',
                        width:5,
                    }
                },
                itemStyle:{
                    normal:{
                        color:'#46c9ff',
                    }
                },
                symbolSize: 12,
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
            }]
        }

    }

    updateSeriesData(){
        this.seriesData[0].push(this.props.ph.toFixed(2)) //ph
        this.seriesData[1].push(this.props.turbidity.toFixed(2)) //浊度
        this.seriesData[2].push(this.props.oxygen.toFixed(2)) //容氧
        this.seriesData[3].push(this.props.conductivity.toFixed(2)) //电导率
        this.seriesData[4].push(this.props.temperature.toFixed(2))   //温度
        if(this.seriesData[0].length > 11){
            this.seriesData[0].shift();
            this.seriesData[1].shift();
            this.seriesData[2].shift();
            this.seriesData[3].shift();
            this.seriesData[4].shift();
        }
    }

    getData(){
        switch(showName){
            case "ph":return this.seriesData[0];
            case "浊度":return this.seriesData[1];
            case "溶解氧":return this.seriesData[2];
            case "电导率":return this.seriesData[3];
            case "温度":return this.seriesData[4];
            default:return this.seriesData[0];
        }
    }

    getUnit(){
        switch(showName){
            case "ph":return "";
            case "浊度":return "FNU";
            case "溶解氧":return "mg/L";
            case "电导率":return "mS/cm";
            case "温度":return "℃";
            default:return "";
        }
    }

    render() {
        const wholeStyle = style(
            {
                width:'100%',
                height:'100%'
            }
        )
  
        const tableStyle = style ({
            width:'1168px',
            height:'485px',
          },
          media({minWidth:1700},
            {
              width:'1635px',
              height:'440px'
            }
          ))
  
        return (
            <div className = {wholeStyle}>
              <ReactEcharts option = {this.getOption()} style = {{width:window.innerWidth>1700?'1597.4px':'1168px' , height:window.innerWidth>1700?'354.2px':'422px'}}/>
            </div>
        )
    }

}