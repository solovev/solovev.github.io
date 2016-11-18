/// <reference path="../lib/chartist.d.ts" />
var chart: Chartist.IChartistLineChart = null;
var currentModel = 5;

var iA: HTMLInputElement, iM: HTMLInputElement, iN: HTMLInputElement, iY: HTMLInputElement, iV: HTMLInputElement;

var es = document.createElement('style');
es.innerHTML = `input:not([id="m"])::-webkit-slider-thumb { box-shadow: -200px 0 0 200px #7f898b;}`;

var esY = document.createElement('style');
esY.innerHTML = `input:not([id="Y"])::-webkit-slider-thumb { box-shadow: -200px 0 0 200px #7f898b;}`;

var esV = document.createElement('style');
esV.innerHTML = `input:not([id="V"])::-webkit-slider-thumb { box-shadow: -200px 0 0 200px #7f898b;}`;

var eStyleYWrong = document.createElement('style');
eStyleYWrong.innerHTML = `input[id="Y"]::-webkit-slider-thumb { box-shadow: -200px 0 0 200px red;}`;

var eStyleMWrong = document.createElement('style');
eStyleMWrong.innerHTML = `input[id="m"]::-webkit-slider-thumb { box-shadow: -200px 0 0 200px red;}`;

var eStyleVWrong = document.createElement('style');
eStyleVWrong.innerHTML = `input[id="V"]::-webkit-slider-thumb { box-shadow: -200px 0 0 200px red;}`;

var head = document.getElementsByTagName('head')[0];
var dataG: Array<Array<number>> = [];
function setModel() {
    var lines = document.getElementsByClassName('ct-grid ct-horizontal');
    for (var i = 0; i < lines.length; i++) {
        lines[i].style.stroke = 'rgba(0, 0, 0, .2)';
        lines[i].style.strokeWidth = '1px';
    }

    iM.value = '5';
    iY.value = '1';
    iA.value = '0.3';
    iV.value = '35';
    iN.value = '50';
    document.getElementById('v_m').innerText = iM.value;
    document.getElementById('v_Y').innerText = iY.value;
    document.getElementById('v_a').innerText = iA.value;
    document.getElementById('v_V').innerText = iV.value;
    document.getElementById('v_N').innerText = iN.value;

    iN.disabled = iV.disabled = iA.disabled = iY.disabled = iM.disabled = false;
    document.getElementById('v_a').classList.remove('warning');
    document.getElementById('v_m').classList.remove('warning');
    document.getElementById('v_N').classList.remove('warning');
    document.getElementById('v_V').classList.remove('warning');
    document.getElementById('v_Y').classList.remove('warning');
    if (head.contains(es))
        head.removeChild(es);
    if (head.contains(esY))
        head.removeChild(esY);
    if (head.contains(esV))
        head.removeChild(esV);
    if (head.contains(eStyleYWrong))
        head.removeChild(eStyleYWrong);
    if (head.contains(eStyleMWrong))
        head.removeChild(eStyleMWrong);
    if (head.contains(eStyleVWrong))
        head.removeChild(eStyleVWrong);
    var controls = document.getElementsByClassName('control');
    for (var j = 0; j < controls.length; j++)
        controls[j].classList.add('none');

    var stats = document.getElementsByClassName('stats');
    for (var j = 0; j < stats.length; j++)
        stats[j].classList.add('none');

    var buttons = document.getElementsByClassName('button');
    for (var j = 0; j < buttons.length; j++)
        buttons[j].classList.remove('active');

    document.getElementById('legendPt').classList.add('none');
    document.getElementById('legendPk').classList.add('none');
    document.getElementById('legendPb').classList.add('none');

    switch (currentModel) {
        case 1:
            document.getElementById('controlY').classList.remove('none');
            document.getElementById('controlM').classList.remove('none');

            document.getElementById('stats1').classList.remove('none');
            document.getElementById('legendPk').classList.remove('none');

            iM.min = '1.0';

            break;
        case 2:
            document.getElementById('controlY').classList.remove('none');
            document.getElementById('controlM').classList.remove('none');

            document.getElementById('stats2').classList.remove('none');
            document.getElementById('legendPk').classList.remove('none');

            iM.min = '1.0';
            break;
        case 3:
            document.getElementById('controlY').classList.remove('none');
            document.getElementById('controlM').classList.remove('none');
            document.getElementById('controlV').classList.remove('none');
            document.getElementById('stats3').classList.remove('none');
            document.getElementById('legendPk').classList.remove('none');

            iM.min = '1.0';
            break;
        case 4:
            document.getElementById('controlY').classList.remove('none');
            document.getElementById('controlM').classList.remove('none');
            document.getElementById('controlV').classList.remove('none');
            document.getElementById('stats4').classList.remove('none');
            document.getElementById('legendPk').classList.remove('none');

            iM.min = '1.0';
            break;
        case 5:
            document.getElementById('controlY').classList.remove('none');
            document.getElementById('controlM').classList.remove('none');
            document.getElementById('controlV').classList.remove('none');
            document.getElementById('controlA').classList.remove('none');
            document.getElementById('stats5').classList.remove('none');
            document.getElementById('legendPk').classList.remove('none');

            iM.min = '0.0';
            break;
    }

    document.getElementById('b' + currentModel).classList.add('active');

    var BD = document.getElementById('bd') as HTMLImageElement;
    BD.src = './images/' + currentModel + '.png';

    var SC = document.getElementById('sc') as HTMLImageElement;
    SC.src = './images/' + currentModel + 'sc.png';

    updateChart();
}

window.onload = () => {
    iA = document.getElementById('a') as HTMLInputElement;
    iM = document.getElementById('m') as HTMLInputElement;
    iV = document.getElementById('V') as HTMLInputElement;
    iN = document.getElementById('N') as HTMLInputElement;
    iY = document.getElementById('Y') as HTMLInputElement;

    iA.value = 0.3 + '';
    iV.value = 35 + '';
    iY.value = 1 + '';
    iM.value = 5 + '';

    updateChart();

    var buttons = document.getElementsByClassName('button');
    for (let j = 0; j < buttons.length; j++) {
        var button = buttons[j] as HTMLElement;
        button.onclick = (e) => {
            currentModel = +e.srcElement.id[1];
            setModel();
        };
    }

    iA.oninput = iM.oninput = iV.oninput = iN.oninput = iY.oninput = (e) => {
        var element = e.srcElement as HTMLInputElement;
        if (currentModel == 1) {
            if (+iY.value >= +iM.value && element.id == 'Y') {
                document.getElementById('v_Y').classList.add('warning');
                head.appendChild(eStyleYWrong);
                head.appendChild(esY);
                iM.disabled = true;
            }
            else if (+iY.value >= +iM.value && element.id == 'm') {
                document.getElementById('v_m').classList.add('warning');
                head.appendChild(eStyleMWrong);
                head.appendChild(es);
                iY.disabled = true;
            }
            else {
                document.getElementById('v_Y').classList.remove('warning');
                document.getElementById('v_m').classList.remove('warning');
                if (head.contains(esY))
                    head.removeChild(esY);
                if (head.contains(es))
                    head.removeChild(es);
                iM.disabled = false;
                iY.disabled = false;
                if (head.contains(eStyleYWrong))
                    head.removeChild(eStyleYWrong);
                if (head.contains(eStyleMWrong))
                    head.removeChild(eStyleMWrong);
                updateChart();
            }
        }

        if (currentModel == 2) {
            updateChart();
        }

        if (currentModel == 4 || currentModel == 3) {
            var lambda = +iY.value;
            var mu = +iM.value;
            var V = +iV.value;

            var cond = lambda / (mu * V);
            if (cond > 1) {
                document.getElementById('v_' + element.id).classList.add('warning');
                iY.disabled = iM.disabled = iV.disabled = true;
                element.disabled = false;

                if (element.id == 'm') {
                    head.appendChild(eStyleMWrong);
                    head.appendChild(es);
                }
                else if (element.id == 'Y') {
                    head.appendChild(eStyleYWrong);
                    head.appendChild(esY);
                }
                else {
                    head.appendChild(eStyleVWrong);
                    head.appendChild(esV);
                }
            }
            else {
                document.getElementById('v_' + element.id).classList.remove('warning');
                iY.disabled = iM.disabled = iV.disabled = false;

                if (head.contains(es))
                    head.removeChild(es);
                if (head.contains(esY))
                    head.removeChild(esY);
                if (head.contains(esV))
                    head.removeChild(esV);
                if (head.contains(eStyleYWrong))
                    head.removeChild(eStyleYWrong);
                if (head.contains(eStyleMWrong))
                    head.removeChild(eStyleMWrong);
                if (head.contains(eStyleVWrong))
                    head.removeChild(eStyleVWrong);

                updateChart();
            }
        }

        if (currentModel == 5) {
            if (element.id == 'm' && +element.value == 0) {
                document.getElementById('v_a').innerText = '?';

                document.getElementById('v_m').classList.add('warning');

                iN.disabled = iV.disabled = iA.disabled = iY.disabled = true;

                head.appendChild(es);
                head.appendChild(eStyleMWrong);
            }
            else if (element.id == 'm') {
                document.getElementById('v_a').innerText = iA.value;
                document.getElementById('v_a').classList.remove('warning');
                document.getElementById('v_m').classList.remove('warning');

                iN.disabled = iV.disabled = iA.disabled = iY.disabled = false;

                if (head.contains(es))
                    head.removeChild(es);
                if (head.contains(eStyleMWrong))
                    head.removeChild(eStyleMWrong);
                updateChart();
            }
            else
                updateChart();
        }
        document.getElementById('v_' + element.id).innerText = element.value;
    }

    iA.onfocus = iM.onfocus = iV.onfocus = iN.onfocus = iY.onfocus = (e) => {
        var element = e.srcElement as HTMLInputElement;
        document.getElementById('l_' + element.id).classList.add('focus');
    }

    iA.onblur = iM.onblur = iV.onblur = iN.onblur = iY.onblur = (e) => {
        var element = e.srcElement as HTMLInputElement;
        document.getElementById('l_' + element.id).classList.remove('focus');
    }

    iA.onchange = iM.onchange = iV.onchange = iN.onchange = iY.onchange = () => {

        
        updateChart();
    }


    document.getElementById('imask').onmouseover = () => {
        document.getElementById('sc').classList.remove('halfOp');
        document.getElementById('bd').classList.remove('halfOp');
    }
    document.getElementById('imask').onmouseleave = () => {
        document.getElementById('sc').classList.add('halfOp');
        document.getElementById('bd').classList.add('halfOp');
    }

    var millisecondsToWait = 500;
    setTimeout(function () {
        var grid = document.getElementsByClassName('ct-grids')[0] as HTMLElement;
        var x = grid.getBoundingClientRect().left;
        var y = grid.getBoundingClientRect().top;
        var width = grid.getBoundingClientRect().width;
        var height = grid.getBoundingClientRect().height;

        var element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        element.style.width = width + 'px';
        element.style.height = height + 'px';
        document.getElementsByClassName('ct-grid ct-horizontal')[0]
        element.onmousemove = (e) => {
            var lines = document.getElementsByClassName('ct-grid ct-horizontal');
            var labels = document.getElementsByClassName('ct-label ct-horizontal ct-end');

            for (var i = 0; i < lines.length; i++) {
                lines[i].style.stroke = 'rgba(0, 0, 0, .2)';
                lines[i].style.strokeWidth = '1px';
                if (labels.length > 0)
                    labels[i].style.color = 'rgba(0, 0, 0, .4)';
            }

            if (currentModel == 3 && +iV.value > 0)
            {
                lines[+iV.value].style.stroke = 'rgba(0, 0, 0, 1)';
                lines[+iV.value].style.strokeWidth = '2px';
            }
            var nLines = lines.length - 1;

            var step = width / nLines;

            let currentX = e.offsetX;

            let id = Math.round(currentX / step);
            lines[id].style.stroke = '#00a8e9';
            lines[id].style.strokeWidth = '2px';
            if (labels.length > 0)
                labels[id].style.color = '#000';


            document.getElementById('k' + currentModel).innerText = id + '';
            document.getElementById('statK' + currentModel).innerText = dataG[0][id] + '';
        };

        console.log(document.getElementsByClassName('ct-grid ct-horizontal').length);

        document.body.appendChild(element);
    }, millisecondsToWait);
}

function updateChart() {
    if (currentModel == 5) {
        dataG = calculateData5(+iA.value, +iM.value, +iV.value, +iN.value);
        setupChart(dataG);

        document.getElementById('statT').innerText = dataG[1][0] + '';
        document.getElementById('statB').innerText = dataG[2][0] + '';
        document.getElementById('statK5').innerText = dataG[0][0] + '';
        document.getElementById('k5').innerText = '0';

    }
    else if (currentModel == 1) {
        dataG = calculateData1(+iM.value, +iY.value);
        setupChart(dataG);

        document.getElementById('statK1').innerText = dataG[0][0] + '';
        document.getElementById('k1').innerText = '0';

        var d = (+iY.value / +iM.value);
        var statKsr1 = d / (1 - d);

        var statTsr1 = (1 / (+iM.value)) / (1 - d);

        document.getElementById('statKsr1').innerText = statKsr1 + '';
        document.getElementById('statTsr1').innerText = statTsr1 + '';
    }
    else if (currentModel == 2) {
        dataG = calculateData2(+iM.value, +iY.value);
        setupChart(dataG);

        document.getElementById('statK2').innerText = dataG[0][0] + '';
        document.getElementById('k2').innerText = '0';

        var d = (+iY.value / +iM.value);
        var statKsr2 = d;

        var statTsr2 = 1 / (+iM.value);

        document.getElementById('statKsr2').innerText = statKsr2 + '';
        document.getElementById('statTsr2').innerText = statTsr2 + '';
    }
    else if (currentModel == 3) {
        dataG = calculateData3(+iM.value, +iY.value, +iV.value);
        setupChart(dataG);

        document.getElementById('statT3').innerText = dataG[1][0] + '';
        document.getElementById('statK3').innerText = dataG[0][0] + '';
        document.getElementById('k3').innerText = '0';

        var mu = +iM.value;
        var V = +iV.value;
        var y = +iY.value;
        var ro = y / mu;
        var statS = 1 / (mu * (V - ro));
        document.getElementById('statS').innerText = statS.toPrecision(5) + '';

        var statJ = y * statS;
        document.getElementById('statJ').innerText = statJ.toPrecision(5) + '';

        var lines = document.getElementsByClassName('ct-grid ct-horizontal');
        if (lines.length > V && V > 0)
        {
            lines[V].style.stroke = 'rgba(0, 0, 0, 1)';
            lines[V].style.strokeWidth = '2px';
        }
    }
    else if (currentModel == 4) {
        dataG = calculateData4(+iM.value, +iY.value, +iV.value);
        setupChart(dataG);

        document.getElementById('statT4').innerText = dataG[1][0] + '';
        document.getElementById('statK4').innerText = dataG[0][0] + '';
        document.getElementById('k4').innerText = '0';

    }
}

function setupChart(data: Array<Array<number>>) {
    var labels: Array<string> = [];
    var series: any = [];

    for (var i = 0; i < data.length; i++) {
        series.push({ name: 's' + (i + 1), data: data[i] });
    }
    for (var i = 0; i < data[0].length; i++) {
        labels.push(`${i}`);
    }

    var chartData = {
        labels: labels,
        series: series
    };

    var options = {
        width: 800,
        height: 300,

        showPoint: true,
        fullWidth: true,
        axisX: { showLabel: false },
        series: {
            's1': {
                showPoint: true,
                showArea: false
            },
            's2': {
                showPoint: false,
                showArea: false
            },
            's3': {
                showPoint: false,
                showArea: false
            }
        }
    }
    options.axisX.showLabel = data[0].length <= 50;
    options.series.s1.showPoint = data[0].length <= 50;
    if (chart == null) {
        chart = new Chartist.Line('.ct-chart', chartData, options);
    }
    else {
        chart.update(chartData, options);
    }
}

function calculateData5(a: number, m: number, V: number, N: number): Array<Array<number>> {
    let count = V;
    var dataPk: Array<number> = [];
    var dataPt: Array<number> = [];
    var dataPb: Array<number> = [];

    var ptE = Pt(V, N, a);
    var pbE = Pb(V, N, a);

    for (let i = 0; i < count; i++) {
        dataPk.push(Pk(i, V, N, a));
        dataPt.push(ptE);
        dataPb.push(pbE);
    }
    return [dataPk, dataPt, dataPb];
}

function calculateData1(m: number, y: number): Array<Array<number>> {
    var ro = y / m;

    var dataPk = calcPk();

    function calcPk(): Array<number> {
        var result: Array<number> = [];
        for (var i = 0; i < 20; i++) {
            var v = (1 - ro) * Math.pow(ro, i);
            result.push(v);
        }
        return result;
    }

    return [dataPk];
}

function calculateData2(m: number, y: number): Array<Array<number>> {
    var ro = y / m;

    var dataPk = calcPk();

    function calcPk(): Array<number> {
        var result: Array<number> = [];
        for (var i = 0; i < 20; i++) {
            var v = (Math.pow(ro, i) / f(i)) * Math.pow(Math.E, -ro);
            result.push(v);
        }
        return result;
    }

    return [dataPk];
}

function calculateData3(m: number, y: number, V: number): Array<Array<number>> {
    var ro = y / m;

    var dataPk = calcPk();
    var dataPt = calcPt();

    function calcPt(): Array<number> {
        var Pt = 0;
        var result: Array<number> = [];
        var u = (Math.pow(ro, V) / f(V)) * (V / (V - ro));
        var s = 0;
        for (var x = 0; x < V - 1; x++) {
            s += Math.pow(ro, x) / f(x);
        }
        s += (Math.pow(ro, V) / f(V)) * (V / (V - ro));

        Pt = u / s;

        for (var i = 0; i <= V * 2; i++) {
            result.push(Pt);
        }
        return result;
    }

    function calcPk(): Array<number> {
        var ro = y / m;
        var result: Array<number> = [];
        for (var i = 0; i <= V * 2; i++) {
            var v = 0;
            if (i <= V) {
                var u = Math.pow(ro, i) / f(i);
                var s = 0;
                for (var j = 0; j < V - 1; j++) {
                    s += Math.pow(ro, j) / f(j);
                }
                var d = s + (Math.pow(ro, V) / f(V)) * (V / (V - ro));

                v = u / d;
            }
            else {
                var j = i - V;
                var u = (Math.pow(ro, V) / f(V)) * Math.pow(ro / V, j);
                var s = 0;
                for (var x = 0; x < V - 1; x++) {
                    s += Math.pow(ro, x) / f(x);
                }
                var d = s + (Math.pow(ro, V) / f(V)) * (V / (V - ro));

                v = u / d;
            }
            result.push(v);
        }
        return result;
    }

    return [dataPk, dataPt];
}

function calculateData4(m: number, y: number, V: number): Array<Array<number>> {
    var ro = y / m;

    var dataPk = calcPk();
    var dataPt = calcPt();

    function calcPt(): Array<number> {
        var result: Array<number> = [];
        var Pt = 0;

        var u = Math.pow(ro, V) / f(V);
        var d = 0;
        for (var x = 0; x <= V; x++) 
            d += Math.pow(ro, x) / f(x);
        Pt = u / d;
        
        for (var i = 0; i <= V; i++) {
            result.push(Pt);
        }
        return result;
    }

    function calcPk(): Array<number> {
        var result: Array<number> = [];
        for (var i = 0; i <= V; i++) {
            var u = Math.pow(ro, i) / f(i);
            var d = 0;
            for (var x = 0; x <= V; x++) {
                d += Math.pow(ro, x) / f(x);
            }
            result.push(u / d);
        }
        return result;
    }
    return [dataPk, dataPt];
}

function f(i: number): number {
    if (i == 1 || i == 0) return 1;
    var ret = 1;
    for (var j = 1; j <= i; ++j) {
        ret *= j;
    }
    return ret;
}

function C(n: number, k: number): number {
    return f(n) / (f(k) * f(n - k));
}

function a(lambda: number, m: number): number {
    return (lambda / m) / (1 + lambda / m);
}

function lambda(a: number, m: number): number {
    return - (a * m) / (a - 1);
}

function Pk(x: number, V: number, N: number, a: number) {
    let d = 0;
    for (let i = 0; i < V + 1; i++)
        d += C(N, i) * Math.pow(a / (1 - a), i);

    return C(N, x) * Math.pow(a / (1 - a), x) / d;
}

function Pt(V: number, N: number, a: number) {
    let d = 0;
    for (let i = 0; i < V + 1; i++)
        d += C(N, i) * Math.pow(a / (1 - a), i);

    return C(N, V) * Math.pow(a / (1 - a), V) / d;
}

function Pb(V: number, N: number, a: number) {
    let d = 0;
    for (let i = 0; i < V + 1; i++)
        d += C(N - 1, i) * Math.pow(a / (1 - a), i);

    return C(N - 1, V) * Math.pow(a / (1 - a), V) / d;
}