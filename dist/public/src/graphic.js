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

//let globalContext = document.getElementById("globalGraph").getContext("2d");
let co2Context = document.getElementById("co2Graph").getContext("2d");
let radiationContext = document.getElementById("radGraph").getContext("2d");
let pressureContext = document.getElementById("pressGraph").getContext("2d");
let temperatureContext = document.getElementById("tempGraph").getContext("2d");
let heightContext = document.getElementById("heigGraph").getContext("2d");



//FUNCTIONALITIES

class Data{
    labels = [];
    datasets = [];

    static Update(){
        if (data.labels.length > 10) {
            data.labels.shift();
            data.datasets.forEach(d => {
                d.data.shift();
            }); 
        }

        let timeInSeconds = new Date().getSeconds();
        data.labels.push(timeInSeconds);
        
        data.datasets.forEach(d => {
            d.data.push( (f(timeInSeconds)+Math.random()*2-1) );
        }); 
    }
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

const MakeNewGraph = (ctx,data) => {
    var Gp = new GraphParams(ctx,data,OPTIONS,"line");

    var GRAPH = new Chart(ctx, Gp);

    return {g:GRAPH,gp:Gp};
}

function f(x){
    return x;
}




//GRAPHICS

let data = new Data();
data.datasets = [
    new DataSet("CO2","#f00"),
    new DataSet("Radiación","#0f0"),
    new DataSet("Presión","#00f"), 
    new DataSet("Temperatura","#fa0"),
    new DataSet("Altura","#0ff")
];

//let GlobalGRAPH = MakeNewGraph(globalContext, data);
let Co2GRAPH = MakeNewGraph(co2Context, {
    labels: data.labels,
    datasets: [data.datasets[0]]
});
let RadiationGRAPH = MakeNewGraph(radiationContext, {
    labels: data.labels,
    datasets: [data.datasets[1]]
});
let PressureGRAPH = MakeNewGraph(pressureContext, {
    labels: data.labels,
    datasets: [data.datasets[2]]
});
let TemperatureGRAPH = MakeNewGraph(temperatureContext, {
    labels: data.labels,
    datasets: [data.datasets[3]]
});
let HeightGRAPH = MakeNewGraph(heightContext, {
    labels: data.labels,
    datasets: [data.datasets[4]]
});

//-------------------------------------------------------------------------------------------------UPDATE

setInterval(function () {
    Data.Update();

    Co2GRAPH.g.update();
    //GlobalGRAPH.g.update();
    RadiationGRAPH.g.update();
    PressureGRAPH.g.update();
    TemperatureGRAPH.g.update();
    HeightGRAPH.g.update();
}, 1000);