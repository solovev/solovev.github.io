/// <reference path="../node_modules/@types/raphaeljs/index.d.ts" />

import * as Raphael from "raphael"

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class ChartPiece {
    index: RaphaelElement;
    line: RaphaelElement;
    trigger: RaphaelElement;
    circle: RaphaelElement;

    a: number;
    b: number;

    i: number;
    
    constructor(i: number, index: RaphaelElement, line: RaphaelElement, trigger: RaphaelElement, circle: RaphaelElement, a: number, b: number) {
        this.i = i;

        this.index = index;
        this.line = line;
        this.trigger = trigger;
        this.circle = circle;

        this.a = a;
        this.b = b;
    }

    init() {
        var label = this.b == 0 ? '0' : (Math.round(this.a / this.b * 100) / 100).toString();
        var fontSize = 6;
        switch (label.length) {
            case 3:
                fontSize = 12;
                break;
            case 4:
                fontSize = 10;
                break;
            case 5:
                fontSize = 8;
                break;
        }
        var labelElement = this.line.paper.text(this.circle.attr('cx'), this.circle.attr('cy'), label).attr({fill: "#fff", "font-family": "consolas", "font-size": fontSize, opacity : 0});
        this.trigger.mouseover(() => {
            this.index.animate({ fill: 'white' }, 200);
            this.line.animate({ fill: 'white' }, 200);
            this.circle.animate({ r : 14, "stroke": "#ccc", "stroke-width": "1.5" }, 200);
            labelElement.animate({ opacity: 1 }, 200);
        });
        this.trigger.mouseout(() => {
            this.index.animate({ fill: '#48484e' }, 200);
            this.line.animate({ fill: '#48484e' }, 200);
            this.circle.animate({ r : 4, "stroke": "#fff", "stroke-width": "2" }, 200);
            labelElement.animate({ opacity: 0 }, 200);
        });
    }
}

export class Chart {
    viewLocked: boolean;
    uiSet: RaphaelSet;

    constructor() {
        this.viewLocked = false;
    }

    randomPath(width: number, height: number, count: number, points: Array<Point>) {
        var step = width/ count;
        var path = "";
        var x = 0, y = 0;
        var heightSlice = height - 50;

        for (var i = 0; i < count; i++) {
            if (i)
                x += step + (step / count);
            if (width - x < step)
                x = width;
            y = heightSlice - Math.round(Math.random() * (height - 100));
            points.push(new Point(x, y));
            path = i > 0 ? path + ("," + [x, y]) : path + ("M" + [0, y] + "R");
        }
        return path;
    }
    
    render() {
        var chartElement = document.getElementById('chart');
        var width = 801, height = 300, count = 15;
        var r = Raphael(chartElement, width, height);
        var color = "#212121";
        // var t = r.text(width - 5, 111, 'This is Raphaël.')
        //var c = r.path("M0,0").attr({fill: "none", "stroke-width": 1, "stroke-linecap": "round"});
        var bg = r.path("M0,0").attr({stroke: "none", opacity: 1});
        
        var points: Array<Point> = [];
        var path = this.randomPath(width, height, count, points);

        r.setStart();

        var index: RaphaelElement, 
            line: RaphaelElement,
            triggerField: RaphaelElement,
            circle: RaphaelElement;
        var pieces: Array<ChartPiece> = [];
        for (var i = 0; i < points.length; i++) {
            var x = points[i].x,
                y = points[i].y;
            if (i != 0 && i < points.length - 1) {
                index = r.text(x, height - 15, i.toString()).attr({fill: "#48484e", "font-family": "consolas", "font-size": 12, opacity : 0});
                line = r.rect(x, y, 0.5, height - y - 25).attr({fill: "#48484e", "stroke": "transparent", "stroke-width": "0", opacity : 0});
                triggerField = r.rect(x - 15, 0, 30, height).attr({fill: "transparent", "stroke-width": "0", opacity : 0});
                circle = r.circle(x, y, 4).attr({fill: "#212121", "stroke": "#fff", "stroke-width": "2", opacity : 0});
                pieces.push(new ChartPiece(i, index, line, triggerField, circle, Math.random() * 100, Math.random() * 100));
            } 
            else
                circle = r.circle(x, y, 4).attr({fill: "#212121", "stroke": "#fff", "stroke-width": "2", opacity : 0});

            var top_arrow = r.path("M5 286L5 265").attr({stroke:'#48484e', 'stroke-width': 1, 'arrow-end':'classic-wide-long', opacity : 0});
            var top_label = r.text(6, 258, "P").attr({fill: "#48484e", "font-family": "consolas", "font-size": 10, opacity : 0});
            
            var right_arrow = r.path("M5 286L25 286").attr({stroke:'#48484e', 'stroke-width': 1, 'arrow-end':'classic-wide-long', opacity : 0});
            var right_label = r.text(30, height - 15, "t").attr({fill: "#48484e", "font-family": "consolas", "font-size": 10, opacity : 0});
        
            x = width - 25;
            for (var j = 0; j < 3; j++) {
                r.rect(x, height - 15, 2.5, 2.5).attr({fill: "#44444e", "stroke-width": "0", opacity : 0});
                x += 6;
            }
        }
        //c.attr({path: path, stroke: color});.shadow(18, 11, 31);;
        this.uiSet = r.setFinish();

        for (var i = 0; i < pieces.length; i++)
            pieces[i].init();

        chartElement.onmouseover = () => { 
        
            //var animation = Raphael.animation({ opacity : 0 }, 1000,  () => { this.hide() });
            this.uiSet.animate({ opacity : 1 }, 300);
        };

        chartElement.onmouseout = () => {
            if (!this.viewLocked)
                this.uiSet.animate({ opacity : 0 }, 300);
        };

        bg.attr({path: path + "L" + (width) + "," + height + " 0," + height + "z", fill: color}).shadow(31, 11, 28);
    }
}