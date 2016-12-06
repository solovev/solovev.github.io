import * as React from "react";

interface CircularRangeInputProps extends React.Props<CircularRangeInput> {
    label: string,
    tmin: number;
    tmax: number;
    min: number;
    max: number;
    defaultValue: number;
    setValue: (value: number) => void;
}

interface CircularRangeInputState {
    value: number;
    active: boolean;
}

export class CircularRangeInput extends React.Component<CircularRangeInputProps, CircularRangeInputState> {
    refsHolder: { canvas?: HTMLCanvasElement; } = {};

    startAngleDegrees = -70;
    startAngle = this.startAngleDegrees * (Math.PI / 180);
    endAngleDegrees = 250;
    endAngle = this.endAngleDegrees * (Math.PI / 180);

    minThresholdAngle = 0;
    maxThresholdAngle = 0;

    size = 150;
    primaryColor = '#d70048';
    commonColor = '#2f2f2f';
    textColor = '#777';
    textFocusColor = 'rgba(255, 255, 255, 0.87)';
    font = 'Raleway';
    commonFont = 'Titillium Web';

    min = 0;
    max = 0;

    public static defaultProps: CircularRangeInputProps = {
        label: '-',
        min: 0,
        max: 100,
        tmin: 0,
        tmax: 100,
        defaultValue: 50,
        setValue: null
    };

    public static propTypes = {
        label: React.PropTypes.string.isRequired,
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        defaultValue: React.PropTypes.number.isRequired,
        setValue: React.PropTypes.func.isRequired
    };

    constructor(props: CircularRangeInputProps) {
        super(props);

        this.state = {
            value: props.defaultValue,
            active: false
        };

        this.min = this.props.min < this.props.tmin ? this.props.tmin : this.props.min;
        this.max = this.props.max > this.props.tmax ? this.props.tmax : this.props.max;

        this.minThresholdAngle = this.valueToAngle(this.min);
        this.maxThresholdAngle = this.valueToAngle(this.max);

        setTimeout(_ => { this.forceUpdate(); }, 250);
    }

    componentWillReceiveProps(nextProps: CircularRangeInputProps) {
        if (this.min != nextProps.min) {
            this.min = nextProps.min < this.props.tmin ? this.props.tmin : nextProps.min;
            this.minThresholdAngle = this.valueToAngle(this.min);
        }
        if (this.max != nextProps.max) {
            this.max = nextProps.max > this.props.tmax ? this.props.tmax : nextProps.max;
            this.maxThresholdAngle = this.valueToAngle(this.max);
        }
        if (nextProps.defaultValue != this.state.value)
            this.setState({
                value: nextProps.defaultValue,
                active: this.state.active
            })
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    valueToAngle(value: number): number {
        var field = this.props.tmax - this.props.tmin;
        var step = (this.endAngle + Math.abs(this.startAngle)) / field;
        var angle = step * value;

        var result = this.startAngle + angle;
        if (result > this.endAngle)
            return this.endAngle;
        return result;
    }

    angleToValue(angle: number): number {
        var field = this.props.tmax - this.props.tmin;
        var step = (this.endAngle + Math.abs(this.startAngle)) / field;

        if (angle < -Math.PI / 2)
            angle += Math.PI * 2;

        var value = (-this.startAngle + angle) / step;
        var result = this.max <= 1 ? +value.toPrecision(2) : Math.round(value);

        return result;
    }

    updateCanvas() {
        const ctx = this.refsHolder.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.size, this.size);

        ctx.strokeStyle = this.primaryColor;
        ctx.beginPath();
        ctx.setLineDash([0, 0]);
        var radius = this.size * 0.30;
        ctx.arc(this.size / 2, this.size / 2, radius, this.minThresholdAngle, this.maxThresholdAngle);
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.strokeStyle = this.commonColor;
        ctx.beginPath();
        //ctx.setLineDash([5, 3]);
        radius = this.size * 0.37;
        var startAngle = this.startAngle + 0.05;
        var endAngle = this.endAngle - Math.PI / 135;
        ctx.arc(this.size / 2, this.size / 2, radius - 1, startAngle, endAngle);
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.strokeStyle = this.primaryColor;
        ctx.beginPath();
        //ctx.setLineDash([2, 1]);
        radius = radius - 5;
        startAngle = this.minThresholdAngle;
        endAngle = this.valueToAngle(this.state.value);
        ctx.arc(this.size / 2, this.size / 2, radius, startAngle, endAngle);
        ctx.lineWidth = 10;
        ctx.stroke();

        radius += 15;
        var x = Math.round(Math.cos(this.maxThresholdAngle) * radius);
        var y = Math.round(Math.sin(this.maxThresholdAngle) * radius);
        ctx.fillStyle = this.state.active && this.state.value == this.max ? this.textFocusColor : this.textColor;
        ctx.font = "12px " + this.commonFont;
        var text = this.max + '';
        var width = ctx.measureText(text).width;
        ctx.fillText(text, this.size / 2 + x - width / 2, this.size / 2 + y + 5);

        x = Math.round(Math.cos(this.minThresholdAngle) * radius);
        y = Math.round(Math.sin(this.minThresholdAngle) * radius);
        ctx.fillStyle = this.state.active && this.state.value == this.min ? this.textFocusColor : this.textColor;
        ctx.font = "12px " + this.commonFont;
        var text = this.min + '';
        var width = ctx.measureText(text).width;
        ctx.fillText(text, this.size / 2 + x - width / 2, this.size / 2 + y + 3);

        radius -= 30;
        ctx.font = "11px " + this.commonFont;

        if (this.min != this.props.tmin) {
            x = Math.round(Math.cos(this.startAngle) * radius);
            y = Math.round(Math.sin(this.startAngle) * radius);
            ctx.fillStyle = this.state.active && this.state.value == this.props.tmin ? this.textFocusColor : this.textColor;
            text = this.props.tmin + '';
            width = ctx.measureText(text).width;
            ctx.fillText(text, this.size / 2 + x - width / 2, this.size / 2 + y + 5);
        }

        if (this.max != this.props.tmax) {
            x = Math.round(Math.cos(this.endAngle) * radius);
            y = Math.round(Math.sin(this.endAngle) * radius);
            ctx.fillStyle = this.state.active && this.state.value == this.props.tmax ? this.textFocusColor : this.textColor;
            text = this.props.tmax + '';
            width = ctx.measureText(text).width;
            ctx.fillText(text, this.size / 2 + x - width / 2, this.size / 2 + y + 5);
        }

        ctx.fillStyle = this.state.active ? this.textFocusColor : this.textColor;
        ctx.font = this.size / 3 + 'px ' + this.font;
        text = this.state.value + '';
        if (text.length > 2)
            ctx.font = this.size * (1 / (text.length + 1)) + 'px ' + this.font;
        width = ctx.measureText(text).width;
        ctx.fillText(text, this.size / 2 - width / 2, this.size - this.size * 0.4);

        radius = this.size / 3;
        var angle = Math.PI / -2 + 0.05;
        x = Math.round(Math.cos(angle) * radius);
        y = Math.round(Math.sin(angle) * radius);
        ctx.fillStyle = this.state.active ? 'white' : this.textFocusColor;
        ctx.font = '16px monospace';
        text = this.props.label;
        width = ctx.measureText(text).width;
        var offset = this.size * 0.225;
        ctx.fillText(text, this.size / 2 + x - width / 2, this.size / 2 + y);
    }

    render() {
        return (
            <canvas
                ref={canvas => this.refsHolder.canvas = canvas}
                width={this.size}
                height={this.size}
                onMouseMove={e => this.handleMove(e)}
                onMouseDown={e => this.handleMouseButton(e)}
                onMouseUp={e => this.handleMouseButton(e)}
                onMouseLeave={_ => this.handleMouseLeave()}
                className="pointer"
                />
        );
    }

    handleMouseLeave() {
        this.setState({
            value: this.state.value,
            active: false
        });
    }
    handleMouseButton(event: React.MouseEvent<HTMLCanvasElement>) {
        var x = event.nativeEvent.offsetX;
        var y = event.nativeEvent.offsetY;

        var value = this.changeValue(x, y);

        if (event.type === 'mouseup')
            this.props.setValue(value);

        this.setState({
            value: value,
            active: event.type === 'mousedown'
        });
    }

    handleMove(event: React.MouseEvent<HTMLCanvasElement>) {
        if (!this.state.active)
            return;

        var x = event.nativeEvent.offsetX;
        var y = event.nativeEvent.offsetY;

        var value = this.changeValue(x, y);

        this.props.setValue(value);

        this.setState({
            value: value,
            active: this.state.active
        });
    }

    changeValue(x: number, y: number): number {
        var center = this.size / 2;
        var angle = Math.atan2(y - center, x - center);

        if (angle > this.maxThresholdAngle - (Math.PI * 2) && angle < this.minThresholdAngle)
            return angle > -Math.PI / 2 ? this.min : this.max;
        else if (angle > this.maxThresholdAngle)
            return this.max;
        else
            return this.angleToValue(angle);
    }
}