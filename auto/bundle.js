var chart = null;
window.onload = function () {
    var iA = document.getElementById('a');
    var iM = document.getElementById('m');
    var iV = document.getElementById('V');
    var iN = document.getElementById('N');
    iA.value = 0.3 + '';
    iV.value = 35 + '';
    var head = document.getElementsByTagName('head')[0];
    updateChart();
    var es = document.createElement('style');
    es.innerHTML = "input:not([id=\"m\"])::-webkit-slider-thumb { box-shadow: -200px 0 0 200px #7f898b;}";
    iA.oninput = iM.oninput = iV.oninput = iN.oninput = function (e) {
        var element = e.srcElement;
        if (element.id == 'm' && +element.value == 0) {
            document.getElementById('v_a').innerText = '?';
            document.getElementById('v_m').classList.add('warning');
            iN.disabled = iV.disabled = iA.disabled = true;
            head.appendChild(es);
        }
        else if (element.id == 'm') {
            document.getElementById('v_a').innerText = iA.value;
            document.getElementById('v_a').classList.remove('warning');
            document.getElementById('v_m').classList.remove('warning');
            iN.disabled = iV.disabled = iA.disabled = false;
            if (head.contains(es))
                head.removeChild(es);
        }
        updateChart();
        document.getElementById('v_' + element.id).innerText = element.value;
    };
    iA.onfocus = iM.onfocus = iV.onfocus = iN.onfocus = function (e) {
        var element = e.srcElement;
        document.getElementById('l_' + element.id).classList.add('focus');
    };
    iA.onblur = iM.onblur = iV.onblur = iN.onblur = function (e) {
        var element = e.srcElement;
        document.getElementById('l_' + element.id).classList.remove('focus');
    };
    iA.onchange = iM.onchange = iV.onchange = iN.onchange = function () {
        updateChart();
    };
    function updateChart() {
        var data = calculateData(+iA.value, +iM.value, +iV.value, +iN.value);
        setupChart(data);
    }
    document.getElementById('imask').onmouseover = function () {
        document.getElementById('sc').classList.remove('halfOp');
        document.getElementById('bd').classList.remove('halfOp');
    };
    document.getElementById('imask').onmouseleave = function () {
        document.getElementById('sc').classList.add('halfOp');
        document.getElementById('bd').classList.add('halfOp');
    };
};
function setupChart(data) {
    var labels = [];
    var series = [{
            name: 's1',
            data: data[0]
        },
        {
            name: 's2',
            data: data[1]
        },
        {
            name: 's3',
            data: data[2]
        },
    ];
    for (var i = 0; i < data[0].length; i++) {
        labels.push("" + i);
    }
    var chartData = {
        labels: labels,
        series: series
    };
    var options = {
        width: 800,
        height: 300,
        showPoint: false,
        fullWidth: true,
        axisX: { showLabel: false },
        series: {
            's1': {
                showArea: true
            },
            's2': {
                showArea: false
            },
            's3': {
                showArea: false
            }
        }
    };
    options.axisX.showLabel = data[0].length <= 50;
    console.log(data.length);
    if (chart == null) {
        chart = new Chartist.Line('.ct-chart', chartData, options);
    }
    else {
        chart.update(chartData, options);
    }
}
function calculateData(a, m, V, N) {
    var count = V;
    var dataPk = [];
    var dataPt = [];
    var dataPb = [];
    var ptE = Pt(V, N, a);
    var pbE = Pb(V, N, a);
    for (var i = 0; i < count; i++) {
        dataPk.push(Pk(i, V, N, a));
        dataPt.push(ptE);
        dataPb.push(pbE);
    }
    return [dataPk, dataPt, dataPb];
}
function f(i) {
    if (i == 1 || i == 0)
        return 1;
    var ret = 1;
    for (var j = 1; j <= i; ++j) {
        ret *= j;
    }
    return ret;
}
function C(n, k) {
    return f(n) / (f(k) * f(n - k));
}
function a(lambda, m) {
    return (lambda / m) / (1 + lambda / m);
}
function lambda(a, m) {
    return -(a * m) / (a - 1);
}
function Pk(x, V, N, a) {
    var d = 0;
    for (var i = 0; i < V + 1; i++)
        d += C(N, i) * Math.pow(a / (1 - a), i);
    return C(N, x) * Math.pow(a / (1 - a), x) / d;
}
function Pt(V, N, a) {
    var d = 0;
    for (var i = 0; i < V + 1; i++)
        d += C(N, i) * Math.pow(a / (1 - a), i);
    return C(N, V) * Math.pow(a / (1 - a), V) / d;
}
function Pb(V, N, a) {
    var d = 0;
    for (var i = 0; i < V + 1; i++)
        d += C(N - 1, i) * Math.pow(a / (1 - a), i);
    return C(N - 1, V) * Math.pow(a / (1 - a), V) / d;
}
//# sourceMappingURL=bundle.js.map