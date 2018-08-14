
// var labels = [DATAS];
// var ideal = [{x : 0, y:{{totalTasks}}}, {x: {{dayAmount}}, y:0}]
// var remaining = [{x : 0, y:35}, {x : 1, y : 32}]
// var bugs = [{x: 0, y: 2},]

// var lines = [], id = 0;
// var linesOn = false;

// var data = {
//     datasets:[{
//         label: "Remaining tasks",
//         backgroundColor: window.chartColors.blue,
//         borderColor: window.chartColors.blue,
//         borderWidth: 2,
//         data: remaining,
//         lineTension: 0,
//         fill: false
//     }, {
//         label: "Bugs",
//         backgroundColor: window.chartColors.red,
//         borderColor: window.chartColors.red,
//         borderWidth: 2,
//         data: bugs,
//         lineTension: 0,
//         fill: false
//     }, {
//         label: "Ideal",
//         backgroundColor: window.chartColors.black,
//         borderColor: window.chartColors.black,
//         borderWidth: 1,
//         data: ideal,
//         lineTension: 0,
//         fill: false,
//     },
//     ]
// };
// addLine(0);
// var option = {
//     responsive: true,
//     title: {
//         display: true,
//     },
//     tooltips: {
//         mode: 'index',
//         intersect: false,
//         callbacks: {
//             label: function(tooltipItem, data){
//                 var label = data.datasets[tooltipItem.datasetIndex].label || '';

//                 if(label == 'Ideal'){
//                     label = null
//                 }
//                 return label
//             }
//         }
//     },
//     title: {
//         display: true,
//     },
//     annotation: {
//         drawTime: "afterDraw",
//         annotations: lines
//     },
//     scales: {
//         xAxes: [{
//             id: 'x-axis',
//             type: 'linear',
//             position: 'bottom',
//             display: true,
//             ticks:{
//                 max: {{dayAmount}},
//                 min: 0,
//                 stepSize: 1,
//                 date: DATAS,
//                 callback: function(value, index, values) {
//                     return DATAS[index]
//                 }
//             }
//         }],
//         yAxes: [{
//             id: 'y-axis',
//             type: 'linear',
//             display: true,
//             scaleLabel: {
//                 display: true,
//                 labelString: 'Tasks'
//             },

//         }],
//     },
// };

// var myLineChart = Chart.Line('myChart', {
//     data: data,
//     options: option
// });

// function addLine(value) {
//     id++;
//     var ln = {
//         id: "line" + id,
//         type: "line",
//         mode: "horizontal",
//         scaleID: "y-axis",
//         value: value,
//         borderWidth: 2,
//         borderColor: "red",
//         label: {
//             enabled: false,
//             fontColor: "red",
//         }
//     };
//     lines.push(ln);
// }

var DAYS = [];
var DATAS = [];
var day = new Date();


var dbBugs = []
var dbRemaining = []
var dbImprovements = []
var dbExtras = []



{% for item in includeDate %}
{% if !item %}
dbRemaining.push(NaN)
{% else %}
dbRemaining.push('{{item.remaining}}')
{%endif%}
{%endfor%} 
console.log(dbRemaining)

let month = day.toLocaleDateString('pt-br', {
  month: '2-digit',
})

document.getElementById("date").setAttribute('value', '{{dateMoment}}');
var i = 0
{% for item in datas %}
DATAS.push('{{item}}');
DAYS[i] = DATAS[i];
i = i+1
{%endfor%}
{% for item in config.datasets.label %}
c.push({{item.label}})
i=i++
{% endfor %}
var labels = DATAS;

var lines = [], id = 0;
var linesOn = false;

Chart.defaults.line.spanGaps = true;

Chart.scaleService.updateScaleDefaults('linear', {
  ticks: {
    min: 0
  }
});

var data = {
  labels: labels,
  datasets: [{
    label: "Remaining tasks",
    lineTension: 0,
    backgroundColor: "blue",
    borderColor: "blue",
    borderWidth: 2,
    hoverBackgroundColor: "blue",
    hoverBorderColor: "blue",
    data: dbRemaining,
    fill: false,
  },{
    label: "Ideal",
    lineTension: 0,
    backgroundColor: "black",
    borderColor: "black",
    borderWidth: 2,
    hoverBackgroundColor: "black",
    hoverBorderColor: "black",
    data: [{{ideal}}],
    fill: false
  }]
};

var option = {
  legend: false,
  title: {
    display: true,
  },
  annotation: {
    drawTime: "afterDraw",
    annotations: lines
  },
  scales: {
    xAxes: [{
      ticks: {
        max: 12,
        min: 1,
        stepSize: 1,
        callback: function(value, index, values) {
          return data.labels[index];
        }
      }
    }],
    yAxes: [{
      id: 'y-axis',
      type: 'linear',
    }],
  },
  tooltips: {
    mode: 'index',
    intersect: false,
  }
};

var myLineChart = Chart.Line('myChart', {
  data: data,
  options: option
});

function addLine(value) {
  id++;
  var ln = {
    id: "line" + id,
    type: "line",
    mode: "horizontal",
    scaleID: "y-axis",
    value: value,
    borderWidth: 2,
    borderColor: "red",
    label: {
      enabled: false,
      fontColor: "red",
    }
  };
  lines.push(ln);
}