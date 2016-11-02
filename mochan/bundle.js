window.addEventListener('load', function () {
    var goB = document.getElementById('go');
    var dataT = document.getElementById('data');
    goB.onclick = function () {
        if (dataT.value == "") {
            dataT.value = "1709, 7497, 5753, 6065, 8048, 2404, 3425, 1700";
        }
        var msg = document.getElementById('dsc');
        msg.style.color = 'red';
        msg.style.fontSize = '1rem';
        var value = dataT.value;
        var split = value.split(",");
        if (value == "" || split.length != 8) {
            msg.innerText = 'Восемь значений, плиз.';
            return;
        }
        var data = [0, 0, 0, 0, 0, 0, 0, 0];
        var sum = 0;
        for (var i = 0; i < split.length; i++) {
            var n = parseInt(split[i]);
            if (isNaN(n)) {
                msg.innerText = 'Шо-то не так введено! Только цифры через запятую, не вые.';
                return;
            }
            sum += n;
            data[i] = n;
        }
        var elems = document.querySelectorAll(".hidden");
        [].forEach.call(elems, function (el) {
            el.className = el.className.replace(/\bhidden\b/, "");
        });
        msg.style.color = 'black';
        msg.style.fontSize = '0.7rem';
        msg.innerText = 'SeemsGood.';
        var K = [0, 0, 0, 0, 0, 0, 0, 0];
        (function () {
            document.getElementById('nSum').innerText = sum.toString();
            for (var i = 0; i < data.length; i++) {
                var k = data[i] / sum;
                K[i] = k;
                document.getElementById('k' + (i + 1)).innerHTML = "<b>" + k.toFixed(2).toString() + "</b>";
            }
        })();
        var Y = [[0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]];
        (function () {
            var y0 = 0.05;
            var yA = [0, 0, 0, 0, 0, 0, 0, 0];
            for (var i = 0; i < data.length; i++) {
                var y = data[i] * y0;
                yA[i] = y;
                document.getElementById('y' + (i + 1)).innerHTML = "<b>" + y.toFixed(2).toString() + "</b>";
            }
            for (var i = 0; i < yA.length; i++) {
                var Yn = document.getElementById('n2_' + i);
                for (var j = 0; j < K.length; j++) {
                    Y[i][j] = K[j] * yA[i];
                    var e = document.createElement('td');
                    e.id = "2_" + i + "*" + j;
                    e.style.fontSize = '0.8rem';
                    e.innerText = Y[i][j].toFixed(2).toString();
                    Yn.appendChild(e);
                }
            }
        })();
        (function () {
            for (var i = 0; i < 12; i++) {
                var str = "";
                for (var j = 0; j < 12; j++) {
                    str += document.getElementById("5_" + i + "*" + j).innerText + ", ";
                }
                console.log(str);
            }
            five();
            function five() {
                for (var i = 0; i < 8; i++) {
                    for (var k = 0; k < 8; k++) {
                        var it = i;
                        do {
                            var t = nextStop(it, k);
                            var e = document.getElementById("f" + it + "*" + t);
                            e.innerText = ((+e.innerText) + Y[i][k]).toFixed(2).toString();
                            it = t;
                        } while (it != k);
                    }
                }
            }
            function nextStop(beg, end) {
                if (beg == end)
                    return end;
                return (+document.getElementById("5_" + beg + "*" + end).innerText) - 1;
            }
        })();
        (function () {
            for (var y = 0; y < 12; y++) {
                for (var x = 0; x < 12; x++) {
                    var e = document.getElementById("f" + y + "*" + x);
                    if (+e.innerText == 0) {
                        document.getElementById("n6_" + y + "*" + x).innerText = '0';
                        continue;
                    }
                    var lambda = +e.innerText;
                    var p = 0.02;
                    var error = 0.001;
                    var result = 0;
                    for (var i = 1; i < 1000; i++) {
                        var r = erlang(lambda, i);
                        result = i;
                        if (Math.abs(p - r) <= error)
                            break;
                    }
                    document.getElementById("n6_" + y + "*" + x).innerText = result.toString();
                }
            }
            function erlang(y, v) {
                var p = 0;
                for (var i = 1; i <= v; i++) {
                    if (i == 1)
                        p = y / (1 + y);
                    else
                        p = y * p / (i + y * p);
                }
                return p;
            }
        })();
        (function () {
            var a0 = 85.6;
            for (var y = 0; y < 12; y++) {
                for (var x = 0; x < 12; x++) {
                    var e = +document.getElementById("n6_" + y + "*" + x).innerText;
                    if (e == 0)
                        continue;
                    document.getElementById("n7_" + y + "*" + x).innerText = (e * a0).toFixed(2).toString();
                }
            }
        })();
        (function () {
            var L = 1.6;
            var T0 = 0.05;
            var d = L / T0;
            for (var y = 0; y < 12; y++) {
                for (var x = 0; x < 12; x++) {
                    var e = +document.getElementById("n7_" + y + "*" + x).innerText;
                    if (e == 0)
                        continue;
                    document.getElementById("n8_" + y + "*" + x).innerText = (e + d).toFixed(2).toString();
                }
            }
        })();
    };
});
var TableEdge = (function () {
    function TableEdge(count, r, c) {
        var e = document.createElement('td');
        e.id = r + "*" + c;
        e.innerHTML = r === c ? '0' : '∞';
        e.setAttribute('contenteditable', r !== c ? 'true' : 'false');
        e.onblur = function () {
            if (!/^\d+$/.test(e.innerHTML))
                e.innerHTML = '∞';
            if (c !== r) {
                var mE = document.getElementById(c + '*' + r);
                mE.innerHTML = e.innerHTML;
                mE.style.background = 'white';
            }
            e.style.background = 'white';
        };
        e.onfocus = function () {
            if (window.getSelection) {
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(e);
                selection.removeAllRanges();
                selection.addRange(range);
            }
            var r0 = document.getElementById('n');
            for (var i = 1; i < count + 1; i++) {
                var rE = document.getElementById(i + '');
                rE.style.background = 'lightblue';
                var cE = document.getElementById('r' + i);
                cE.style.background = 'lightblue';
                if (cE.innerHTML === '' + (r + 1))
                    cE.style.background = 'pink';
                if (rE.innerHTML === '' + (c + 1))
                    rE.style.background = 'pink';
            }
            if (c !== r) {
                var mE = document.getElementById(c + '*' + r);
                mE.style.background = 'wheat';
            }
            e.style.background = 'wheat';
        };
        this.td = e;
    }
    return TableEdge;
}());
//# sourceMappingURL=bundle.js.map