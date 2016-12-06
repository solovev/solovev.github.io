import * as React from 'react';
import * as d3 from 'd3';

import { AppState } from '../interfaces';
import { f, C } from '../math';

interface ChartProps {
    currentModelId: number;
    a: number;
    m: number;
    V: number;
    N: number;
    y: number;

    width: number;
    height: number;

    isCurvy: boolean;
    isCutted: boolean;
    showSubcharts: boolean;

    selectedItem: number;
    setSelectedValue: (value: number) => void;
}
interface ChartState { }

export class Chart extends React.Component<ChartProps, ChartState> {
    primaryColor = '#212121';
    curve = d3.curveMonotoneX;

    constructor(props: ChartProps) {
        super(props);
    }

    componentWillReceiveProps(nextProps: ChartProps) {

    }

    render() {
        const { setSelectedValue, currentModelId, width, height, isCurvy, isCutted, showSubcharts, selectedItem } = this.props;
        this.curve = isCurvy ? d3.curveMonotoneX : d3.curveLinear;

        let data = this.calculate();
        let y = d3.scaleLinear()
            .domain([0, isCutted ? this.max(data) : 1.0])
            .range([height - 15, 10]);

        let subchartsData: [number, number][] = [];
        if (currentModelId == 2 || currentModelId == 3)
            subchartsData.push(data.pop());
        else if (currentModelId == 4) {
            subchartsData.push(data.pop());
            subchartsData.push(data.pop());
        }
        let x = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, width]);

        if (selectedItem >= 0 && selectedItem < data.length)
            setSelectedValue(data[selectedItem][1]);

        let circles: Array<JSX.Element> = [];
        let circleRadius = Math.max(Math.min(4 * 10 / data.length, 4), 2);
        let circleFill = data.length >= 35 ? '#fff' : '#212121';
        let circleStroke = data.length >= 35 ? 'none' : '#fff';
        const circleStrokeWidth = 2;

        let captions: Array<JSX.Element> = [];
        let captionFontSize = Math.min(12 * 50 / data.length, 12);
        let captionFill = 'rgb(72, 72, 78)';
        const captionFont = 'consolas';

        let lines: Array<JSX.Element> = [];
        let lineColor = captionFill;
        let lineWidth = 0.5;

        let additional: JSX.Element = null;
        let subcharts: JSX.Element = null;

        if (currentModelId == 2) {
            let pt = subchartsData[0];
            let line = d3.line().curve(this.curve)
                .x(d => { return x(d[0]); })
                .y(d => { return y(d[1]); });

            const middleIndex = data.length / 2 + 1;
            let pathB = line(data.slice(0, middleIndex));
            let pathA = line(data.slice(middleIndex - 1, data.length));

            const strokeColor = 'rgba(255, 255, 255, 0.7)';
            const strokeDash = circleRadius * 2;

            additional = (
                <g>
                    <path d={pathA} strokeDasharray={strokeDash + ', ' + strokeDash} fill='none' stroke={strokeColor} strokeWidth={3} />
                    <path d={pathB} fill='none' stroke={strokeColor} strokeWidth={3} />
                </g>
            );

            let ptY = y(pt[1]);
            subcharts = (
                <line x1={0} x2={width} y1={ptY} y2={ptY} strokeDasharray='5, 5' stroke='#eee' strokeWidth='1' />
            );
        }
        else if (currentModelId == 3) {
            let pt = subchartsData[0];
            let ptY = y(pt[1]);
            subcharts = (
                <line x1={0} x2={width} y1={ptY} y2={ptY} strokeDasharray='5, 5' stroke='#eee' strokeWidth='1' />
            );
        }
        else if (currentModelId == 4) {
            let pb = subchartsData[0];
            let pt = subchartsData[1];
            let ptB = y(pb[1]);
            let ptY = y(pt[1]);
            subcharts = (
                <g>
                    <line x1={0} x2={width} y1={ptB} y2={ptB} strokeDasharray='5, 5' stroke='#eee' strokeWidth='1' />
                    <line x1={0} x2={width} y1={ptY} y2={ptY} stroke='#eee' strokeWidth='1' />
                </g>
            );
        }

        let area = d3.area().curve(this.curve)
            .x(d => { return x(d[0]); })
            .y0(height)
            .y1(d => { return y(d[1]); });
        let areaPath = area(data);

        for (let i = 0; i < data.length; i++) {
            let d = data[i];
            let _x = x(d[0]);
            let _y = y(d[1]);

            circles.push(<circle r={circleRadius} cx={_x} cy={_y} />)
            if (data.length <= 70) {
                if (i == selectedItem)
                    captions.push(<text fill='rgba(255, 255, 255, 0.87)' x={_x} y={height}>{d[0]}</text>);
                else
                    captions.push(<text x={_x} y={height}>{d[0]}</text>);

                if (_y <= height - 20) {
                    if (i == selectedItem)
                        lines.push(<line stroke='white' x1={_x} y1={_y + circleRadius * 2} x2={_x} y2={height - captionFontSize} />);
                    else
                        lines.push(<line x1={_x} y1={_y + circleRadius * 2} x2={_x} y2={height - captionFontSize} />);
                }
            }
        }

        captions.pop();
        captions.shift();
        lines.shift();

        return (
            <svg width={width} height={height}>
                {additional}
                <g>
                    <path d={areaPath} fill={this.primaryColor} stroke='none' strokeWidth={3}/>
                </g>
                <g fill={circleFill} stroke={circleStroke} strokeWidth={circleStrokeWidth}>
                    {circles}
                </g>
                <g textAnchor='middle' fontFamily={captionFont} fontSize={captionFontSize} fill={captionFill}>
                    {captions}
                </g>
                <g stroke={lineColor} strokeWidth={lineWidth}>
                    {lines}
                </g>
                {showSubcharts ? subcharts : []}
            </svg>
        );
    }

    max(data: [number, number][]): number {
        let max = 0;
        for (let d of data) {
            if (d[1] > max)
                max = d[1];
        }
        return max;
    }

    calculate(): [number, number][] {
        const {currentModelId, a, m, V, N, y} = this.props;

        switch (currentModelId) {
            case 0: // M/M/1
                {
                    let ro = y / m;
                    let result: [number, number][] = [];
                    for (let i = 0; i <= V + 5; i++)
                        result.push([i, (1 - ro) * Math.pow(ro, i)]);
                    return result;
                }
            case 1: // M/M/∞
                {
                    let ro = y / m;
                    let result: [number, number][] = [];
                    for (let i = 0; i <= V + 5; i++)
                        result.push([i, (Math.pow(ro, i) / f(i)) * Math.pow(Math.E, -ro)]);
                    return result;
                }
            case 2: // M/M/V
                {
                    let ro = y / m;
                    let result: [number, number][] = [];
                    for (let i = 0; i <= V * 2; i++) {
                        let v = 0;
                        if (i <= V) {
                            let u = Math.pow(ro, i) / f(i);
                            let s = 0;
                            for (let j = 0; j < V - 1; j++) {
                                s += Math.pow(ro, j) / f(j);
                            }
                            let d = s + (Math.pow(ro, V) / f(V)) * (V / (V - ro));

                            v = u / d;
                        }
                        else {
                            let j = i - V;
                            let u = (Math.pow(ro, V) / f(V)) * Math.pow(ro / V, j);
                            let s = 0;
                            for (let x = 0; x < V - 1; x++) {
                                s += Math.pow(ro, x) / f(x);
                            }
                            let d = s + (Math.pow(ro, V) / f(V)) * (V / (V - ro));

                            v = u / d;
                        }
                        result.push([i, v]);
                    }

                    let dt = 0;
                    for (let x = 0; x < V - 1; x++) {
                        dt += Math.pow(ro, x) / f(x);
                    }
                    dt += (Math.pow(ro, V) / f(V)) * (V / (V - ro));
                    result.push([0, (Math.pow(ro, V) / f(V)) * (V / (V - ro)) / dt]);

                    return result;
                }
            case 3: //M/M/V/K
                {
                    let ro = y / m;
                    let result: [number, number][] = [];

                    let dt = 0;
                    for (let i = 0; i <= V; i++) {
                        let u = Math.pow(ro, i) / f(i);
                        dt += u;

                        let d = 0;
                        for (let x = 0; x <= V; x++) {
                            d += Math.pow(ro, x) / f(x);
                        }
                        result.push([i, u / d]);
                    }
                    result.push([0, (Math.pow(ro, V) / f(V)) / dt]);

                    return result;
                }
            case 4: // M/M/V/K/N
                {
                    let result: [number, number][] = [];

                    let dt = 0, db = 0;
                    for (let i = 0; i <= V; i++) {
                        let d = 0;
                        dt += C(N, i) * Math.pow(a / (1 - a), i);
                        db += C(N - 1, i) * Math.pow(a / (1 - a), i);

                        for (let j = 0; j <= V; j++)
                            d += C(N, j) * Math.pow(a / (1 - a), j);
                        result.push([i, C(N, i) * Math.pow(a / (1 - a), i) / d]);
                    }
                    result.push([0, C(N, V) * Math.pow(a / (1 - a), V) / dt]);
                    result.push([0, C(N - 1, V) * Math.pow(a / (1 - a), V) / db]);

                    return result;
                }
            default:
                return null;
        }
    }
}

class ChartInstance {
    constructor(parent: string, props: ChartProps) {

    }
}