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
dbBugs.push(NaN)
dbExtras.push(NaN)
dbImprovements.push(NaN)
{% else %}
dbRemaining.push('{{item.remaining}}')
dbBugs.push('{{item.bugs}}')
dbExtras.push('{{item.extra}}')
dbImprovements.push('{{item.improvements}}')
{%endif%}

{%endfor%} 

let month = day.toLocaleDateString('pt-br', {
  month: '2-digit',
})

document.getElementById("date").setAttribute('value', '{{dateMoment}}');
var i = 0
{% for item in datas %}
DATAS.push('{{item}}');
DAYS[i] = DATAS[i];
i = i++
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
    label: "Bugs",
    lineTension: 0,
    backgroundColor: "red",
    borderColor: "red",
    borderWidth: 2,
    hoverBackgroundColor: "red",
    hoverBorderColor: "red",
    data: dbBugs,
    fill: false,
  },{
    label: "Improvements",
    lineTension: 0,
    backgroundColor: "green",
    borderColor: "green",
    borderWidth: 2,
    hoverBackgroundColor: "green",
    hoverBorderColor: "green",
    data: dbImprovements,
    fill: false,
  },{
    label: "Extra",
    lineTension: 0,
    backgroundColor: "yellow",
    borderColor: "yellow",
    borderWidth: 2,
    hoverBackgroundColor: "yellow",
    hoverBorderColor: "yellow",
    data: dbExtras,
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