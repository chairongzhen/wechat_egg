// type A  时间=>指标
// 图表类型：柱状图、折线图
var bar = [
  { dimension: '2010', GDP: 43.3, CPI: 85.8, PPI: 93.7 },
  { dimension: '2011', GDP: 83.1, CPI: 73.4, PPI: 55.1 },
  { dimension: '2012', GDP: 86.4, CPI: 65.2, PPI: 82.5 },
  { dimension: '2013', GDP: 72.4, CPI: 53.9, PPI: 39.1 },
];

// type B  地区=>指标
// 图表类型：地图
var map = [
  { dimension: '苏州的code', GDP: 43.3, CPI: 85.8, PPI: 93.7 },
  { dimension: '无锡的code', GDP: 83.1, CPI: 73.4, PPI: 55.1 },
  { dimension: '扬州的code', GDP: 86.4, CPI: 65.2, PPI: 82.5 },
  { dimension: '镇江的code', GDP: 72.4, CPI: 53.9, PPI: 39.1 },
];

/**
 *  type A、B中， dimension为主要的key，其他key为需要的指标
 */

// type C 时间*地区=>指标, 同原来PC端
// 图表类型：原来PC端图形
var data = [];

// type D 类目，无时间序列，无地区列表，带有children
// 图表类型：饼图、环图、旭日图、树图
var tree = [
  {
    name: '制造业',
    value: '65152.21',
    children: [
      {
        name: '制造业子项1',
        value: '60014.44',
        children: [{ name: '制造业子项11', value: '60014.44' }],
      },
    ],
  },
  { name: '金融、保险业', value: '60014.44' },
  { name: '交通运输、仓储业', value: '42872.28' },
  { name: '房地产业', value: '19197.78' },
  { name: '信息技术业', value: '9317.44' },
  { name: '批发和零售贸易', value: '9120.20' },
  { name: '社会服务业', value: '7601.34' },
  { name: '其它行业', value: '7109.88' },
  { name: '综合类', value: '6809.59' },
  { name: '建筑业', value: '4823.25' },
  { name: '采掘业', value: '1147.90' },
  { name: '传播与文化产业', value: '549.50' },
  { name: '农、林、牧、渔业', value: '295.30' },
];

var ring_bar = [
  { name: '金融1', value: '30' },
  { name: '金融2', value: '40' },
  { name: '金融3', value: '30' },
];

// type E 时间=>地区=>指标
// 图表类型：地图动图、柱状图动图
data = {
  2016: ['{type B}'], //type B
  2017: ['{type B}'], //type B
  2018: ['{type B}'], //type B
  2019: ['{type B}'], //type B
};

// type F 地区=>时间=>指标
data = {
  苏州的code: ['{type A}'], //type A
  无锡的code: ['{type A}'], //type A
  扬州的code: ['{type A}'], //type A
  镇江的code: ['{type A}'], //type A
};
