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

    var Gp = new GraphParams(globalContext,data,OPTIONS,"line");

    var GRAPH = new Chart(globalContext, Gp);

    return {g:GRAPH,gp:Gp};
}

function f(x){
    return x;
}




//GRAPHICS

let GlobalGRAPH = MakeNewGraph();


//-------------------------------------------------------------------------------------------------UPDATE

function Update(GRAPH){
    if (GRAPH.gp.data.labels.length > 10) {
        GRAPH.gp.data.labels.shift();
        GRAPH.gp.data.datasets.forEach(d => {
            d.data.shift();
        }); 
    }

    let timeInSeconds = new Date().getSeconds();
    GRAPH.gp.data.labels.push(timeInSeconds);
    
    GRAPH.gp.data.datasets.forEach(d => {
        d.data.push( (f(timeInSeconds)+Math.random()*2-1) );
    }); 

    GRAPH.g.update();
}

setInterval(function () {
    Update(GlobalGRAPH);
}, 1000);