//---------------------------------------------------------------------------------------------CONFIG


let OPTIONS = {
    scales: {
        "tiempo (s)": {
            type: 'linear',
            position: 'bottom',
        },
        "variables": {
            type: 'linear',
            position: 'left',
        },
    },
};



//CANVASES

let globalContext = document.getElementById("globalGraph").getContext("2d");
let co2Context = document.getElementById("globalGraph").getContext("2d");
let radiationContext = document.getElementById("globalGraph").getContext("2d");
let pressureContext = document.getElementById("globalGraph").getContext("2d");
let temperatureContext = document.getElementById("globalGraph").getContext("2d");



//FUNCTIONALITIES

class Data{
    labels = [];
    datasets = [];
}

class DataSet{
    label = "";
    borderColor = "#fff";
    data = [];

    constructor(l,c){
        this.label = l;
        this.borderColor = c;
        this.data = [];
    }
}

class GraphParams{
    ctx = 0;
    data = 0;
    options = 0;
    type = 0;

    constructor(ctx,data,options,type){
        this.ctx = ctx;
        this.data = data;
        this.options = options;
        this.type = type;
    }
}

const MakeNewGraph = () => {
    var data = new Data();
    data.datasets = [
        new DataSet("CO2","#f00"),
        new DataSet("Radiación","#0f0"),
        new DataSet("Pesión","#00f"),
        new DataSet("Temperatura","#fa0"),
        new DataSet("Altura","#0ff")
    ];

    graphParams = new GraphParams(globalContext,data,OPTIONS,"line");

    var GRAPH = new Chart(globalContext, graphParams);

    return GRAPH;
}

function f(x){
    return x;
}

let GlobalGRAPH = MakeNewGraph();

setInterval(function () {
    if (graphParams.data.labels.length > 10) {
        graphParams.data.labels.shift();
        graphParams.data.datasets.forEach(d => {
            d.data.shift();
        }); 
    }

    let timeInSeconds = new Date().getSeconds();
    graphParams.data.labels.push(timeInSeconds);
    
    graphParams.data.datasets.forEach(d => {
        d.data.push( (f(timeInSeconds)+Math.random()*2-1) );
    }); 

    GlobalGRAPH.update();
}, 1000);