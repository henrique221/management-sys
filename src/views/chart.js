var DAYS = [];
var DATAS = [];
var day = new Date();


var dbBugs = []
var dbRemaining = []
var dbImprovements = []
var dbExtras = []

{% for dado in items %}
dbRemaining.push({{ dado.remaining_tasks }})
dbBugs.push({{ dado.bugs }})
dbImprovements.push({{ dado.improvements }})
dbExtras.push({{ dado.extra_tasks }})
{% endfor %}

let month = day.toLocaleDateString('pt-br', {
    month: '2-digit',
})

document.getElementById('date').setAttribute('value', '{{dateMoment}}');
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
// var labels = [DATAS];
// var ideal = [{x : 0, y:{{totalTasks}}}, {x: {{dayAmount}}, y:0}]
// var remaining = [{x : 0, y:35}, {x: 1, y:23}, {x: 2, y: 21}, {x: 3, y:15}]
// var bugs = [{x: 0, y: 2}, {x: 1, y: 2}]

// var lines = [], id = 0;
// var linesOn = false;

// var data = {
//     datasets:[{
//         label: "Ideal",
//         backgroundColor: window.chartColors.black,
//         borderColor: window.chartColors.black,
//         borderWidth: 2,
//         data: ideal,
//         lineTension: 0,
//         fill: false
//     }, {
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
//     }
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


var data_set = [{x: 1, y: 12}, {x: 2, y: 3}, {x: 3, y: 2}, {x: 4, y: 1}, {x: 5, y: 8}, {x: 6, y: 8}, {x: 7, y: 2}, {x: 8, y: 2}, {x: 9, y: 3}, {x: 10, y: 5}, {x: 11, y: 11}, {x: 12, y: 1}];
var labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

var lines = [], id = 0;
var linesOn = false;

var data = {
  labels: labels,
  datasets: [{
    label: "My First dataset",
    backgroundColor: "rgba(5,215,2,0.2)",
    borderColor: "rgba(5,215,2,1)",
    borderWidth: 2,
    hoverBackgroundColor: "rgba(5,215,2,0.4)",
    hoverBorderColor: "rgba(5,215,2,1)",
    data: data_set,
  }]
};
addLine(7);
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
  animation: {
    duration: 1,
    onComplete: function () {
      var ctx = this.chart.ctx;
      console.log("onComplete", this,Chart.defaults.global)
      ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      var line = this.chart.annotation.elements.line1,
      x = line._model.x1-15,
      y = line._model.y1+5;
      ctx.fillStyle = line.options.label.fontColor;
      ctx.fillText("Y",x,y);
		}
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