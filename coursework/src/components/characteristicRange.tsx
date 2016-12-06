import * as React from 'react';

interface CharacteristicRangeProps {
    value: number;
    width: number;
    height: number;
    min: number;
    max: number;
}
interface CharacteristicRangeState { }

export class CharacteristicRange extends React.Component<CharacteristicRangeProps, CharacteristicRangeState> {
    refsHolder: { canvas?: HTMLCanvasElement; } = {};

    constructor(props: CharacteristicRangeProps) {
        super(props);

        setTimeout(_ => { this.forceUpdate(); }, 250);
    }

    componentWillReceiveProps(nextProps: CharacteristicRangeProps) {
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {


        const {value, width, height, min, max} = this.props;
        const ctx = this.refsHolder.canvas.getContext('2d');

        ctx.clearRect(0, 0, width, height);

        let barHeight = 4;
        let barWidth = width - 15;
        let y = height / 2 - barHeight / 2;

        ctx.fillStyle = '#2f2f2f';
        this.roundRect(ctx, 10, y, barWidth, barHeight, 2.5, true, false);

        ctx.fillStyle = '#d70048';
        let trackFactor = Math.max(min, Math.min(value / max, max));
        if (trackFactor > max / barWidth)
        this.roundRect(ctx, 10, y, barWidth * trackFactor, barHeight, 2.5, true, false);

        ctx.strokeStyle = '#666';
        ctx.font = '12px Titillium Web';
        let text = value.toPrecision(7) + '';
        let textWidth = ctx.measureText(text).width;
        let textX = Math.round(width / 2 - textWidth / 2);
        ctx.strokeText(text, textX, 8);

        ctx.strokeStyle = '#666';
        ctx.font = '10px consolas';
        text = min + '.0';
        textWidth = ctx.measureText(text).width;
        textX = 7;
        ctx.strokeText(text, textX, height / 2 + 13);

        ctx.strokeStyle = '#666';
        ctx.font = '10px consolas';
        text = max + '.0';
        textWidth = ctx.measureText(text).width;
        textX = width - textWidth;
        ctx.strokeText(text, textX, height / 2 + 13);
    }

    roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, r: number, fill: boolean, stroke: boolean) {

        let radius = { tl: r, tr: r, br: r, bl: r };

        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();

        if (fill)
            ctx.fill();
        if (stroke)
            ctx.stroke();
    }

    render() {
        const { width, height } = this.props;
        return (
            <canvas
                ref={canvas => this.refsHolder.canvas = canvas}
                width={width}
                height={height}
                ></canvas>
        );
    }
}