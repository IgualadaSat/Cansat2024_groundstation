//CONFIG
let ctx = document.getElementById("graphic").getContext("2d");

let options = {
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

//DO
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

let data = {
    labels: [],
    datasets: [
        new DataSet("CO2","#f00"),
        new DataSet("Radiación","#0f0"),
        new DataSet("Pesión","#00f"),
        new DataSet("Temperatura","#fa0"),
        new DataSet("Altura","#0ff"),
    ],
};

function f(x){
    return 1000/x;
}

let THEGRAPHIC = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options,
});

setInterval(function () {
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

    THEGRAPHIC.update();
}, 1000);