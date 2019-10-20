import * as React from 'react'

// import fs from 'file-saver'
// import XLSX from 'xlsx'
declare function require(path: string): any
const XLSX = require('xlsx')
const fs = require('file-saver')
// const s = require('xlsx-style')

// var jsono = [{ //测试数据
//     "保质期临期预警(天)": "adventLifecycle",
//     "商品标题": "title",
//     "建议零售价": "defaultPrice",
//     "高(cm)": "height",
//     "商品描述": "Description",
//     "保质期禁售(天)": "lockupLifecycle",
//     "商品名称": "skuName",
//     "商品简介": "brief",
//     "宽(cm)": "width",
//     "阿达": "asdz",
//     "货号": "goodsNo",
//     "商品条码": "skuNo",
//     "商品品牌": "brand",
//     "净容积(cm^3)": "netVolume",
//     "是否保质期管理": "isShelfLifeMgmt",
//     "是否串号管理": "isSNMgmt",
//     "商品颜色": "color",
//     "尺码": "size",
//     "是否批次管理": "isBatchMgmt",
//     "商品编号": "skuCode",
//     "商品简称": "shortName",
//     "毛重(g)": "grossWeight",
//     "长(cm)": "length",
//     "英文名称": "englishName",
//     "净重(g)": "netWeight",
//     "商品分类": "categoryId",
//     "这里超过了": 1111.0,
//     "保质期(天)": "expDate"
// }];
var jsono = [{
    "水质报告": "", "水质报告8": "", "合并的列头2": "", "合并的列头3": "", "合并的列头4": "","合并的列头5": "","合并的列头6": "","合并的列头7": "",
}]
var tmpDown; //导出的二进制对象
var time = 0;

export default class Exceler {
    // downloadExl(json, type) {
    //     const wb = { SheetNames: ['水质报告'], Sheets: {}, Props: {} };
    //     const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };//这里的数据是用来定义导出的格式类型
    //     // console.log(json);
    //     wb.Sheets['水质报告'] = XLSX.utils.json_to_sheet(json);//通过json_to_sheet转成单页(Sheet)数据
    //     fs.saveAs(new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" }), "水质报告" + '.' + (wopts.bookType=="biff2"?"xls":wopts.bookType));
    //     // json.unshift({});
    //     // var keyMap = []; //获取keys
    //     // for (var k in tmpdata) {
    //     //     keyMap.push(k);
    //     //     json[0][k] = k;
    //     // }
    //     // var tmpdata = [];//用来保存转换好的json 
    //     // json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
    //     //     v: v[k],
    //     //     position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    //     // }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
    //     //     v: v.v
    //     // });
    //     // var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10

    //     // var tmpWB = {
    //     //     SheetNames: ['mySheet'], //保存的表标题
    //     //     Sheets: {
    //     //         'mySheet': Object.assign({},
    //     //             tmpdata, //内容
    //     //             {
    //     //                 '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
    //     //             })
    //     //     }
    //     // };
    //     // tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
    //     //     { bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }//这里的数据是用来定义导出的格式类型
    //     // ))], {
    //     //         type: ""
    //     //     });
    //     // fs.saveAs(tmpDown, "这里是下载的文件名" + '.' + (wopts.bookType == "biff2" ? "xls" : wopts.bookType));

    // }
   

    downloadExl(json, type) {
        var tmpdata;
        tmpdata = json[0];
        // if(time == 0 ){
        //     json.unshift({});
        //     time++;
        // } else {
        //     for(var i = 0; i < time ;i++){
        //         json.shift({})
        //     }
        //     time++;
        // }
        json.unshift({})
        // console.log(json);
        var keyMap = []; //获取keys
        for (var k in tmpdata) {
            keyMap.push(k);
            json[0][k] = k;
        }
        // json[0][k] = "水质报告"
        // console.log(keyMap)
        // console.log(json)
        tmpdata = [];//用来保存转换好的json 
        json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
            v: v[k],
            position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
        }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
            v: v.v
        });
        // console.log(json)
        json.shift();
        json.pop();
        // console.log(json)
        // console.log(tmpdata)
        var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
        tmpdata["A1"].s = { font: { sz: 14, bold: true, color: { rgb: "FFFFAA00" } }, fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" } } };//<====设置xlsx单元格样式
        tmpdata["!merges"] = [{
            s: { c: 0, r: 0 },
            e: { c: 7, r: 0 }
        }];//<====合并单元格 
        var tmpWB = {
            SheetNames: ['水质报告'], //保存的表标题
            Sheets: {
                '水质报告': Object.assign({},
                    tmpdata, //内容
                    {
                        '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                    })
            }
        };
        // console.log(tmpWB)
        tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
            { bookType: (type == undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }//这里的数据是用来定义导出的格式类型
        ))], {
                type: ""
            });
        fs.saveAs(tmpDown, "水质报告" + '.' + "xlsx");
        // saveAs(tmpDown, "这里是下载的文件名" + '.' + (wopts.bookType == "biff2" ? "xls" : wopts.bookType));
    }

    // s2ab(s) { //字符串转字符流
    //     var buf = new ArrayBuffer(s.length);
    //     var view = new Uint8Array(buf);
    //     for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    //     return buf;
    // }
    //  // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    // getCharCol(n) {
    //     let temCol = '',
    //     s = '',
    //     m = 0
    //     while (n > 0) {
    //         m = n % 26 + 1
    //         s = String.fromCharCode(m + 64) + s
    //         n = (n - m) / 26
    //     }
    //     return s
    // }
     getCharCol(n) {
        let temCol = '',
            s = '',
            m = 0
        while (n > 0) {
            m = n % 26 + 1
            s = String.fromCharCode(m + 64) + s
            n = (n - m) / 26
        }
        return s
    }
    s2ab(s) {
        var buf;
        if (typeof ArrayBuffer !== 'undefined') {
            buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        } else {
            buf = new Array(s.length);
            for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
    }

}