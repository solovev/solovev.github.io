import * as React from 'react';

import { CircularRangeInput } from "./circularRangeInput";
import { AppState } from "../interfaces";

interface ControlsProps {
    currentModelId: number;
    a: number;
    m: number;
    V: number;
    N: number;
    y: number;
    setY: (value: number) => void;
    setM: (value: number) => void;
    setA: (value: number) => void;
    setN: (value: number) => void;
    setV: (value: number) => void;
}

export class Controls extends React.Component<ControlsProps, {}> {
    constructor(props: AppState) {
        super(props);
    }

    render() {
        const {currentModelId, a, m, V, N, y} = this.props;

        var result = <div></div>;
        switch (currentModelId) {
            case 0:
            case 1:
                result = (
                    <div className="controls">
                        <CircularRangeInput key="y" label="λ" defaultValue={y} min={1} max={currentModelId == 0 ? m : 100} tmin={1} tmax={100} setValue={this.props.setY} />
                        <CircularRangeInput key="m" label="μ" defaultValue={m} min={currentModelId == 0 ? y : 1} max={100} tmin={1} tmax={100} setValue={this.props.setM} />
                    </div>
                );
                break;
            case 2:
            case 3:
                var cond = y / (m * V);
                result = (
                    <div className="controls">
                        <CircularRangeInput key="y" label="λ" defaultValue={y} min={1} max={m * V} tmin={1} tmax={100} setValue={this.props.setY} />
                        <CircularRangeInput key="m" label="μ" defaultValue={m} min={Math.ceil(y / V)} max={100} tmin={1} tmax={100} setValue={this.props.setM} />
                        <CircularRangeInput key="V" label="V" defaultValue={V} min={Math.ceil(y / m)} max={100} tmin={1} tmax={100} setValue={this.props.setV} />
                    </div>
                );
                break;
            case 4:
                result = (
                    <div className="controls">
                        <CircularRangeInput key="m" label="μ" defaultValue={m} min={1} max={100} tmin={1} tmax={100} setValue={this.props.setM} />
                        <CircularRangeInput key="a" label="α" defaultValue={a} min={0.01} max={0.99} tmin={0.01} tmax={0.99} setValue={this.props.setA} />
                        <CircularRangeInput key="V" label="V" defaultValue={V} min={1} max={100} tmin={1} tmax={100} setValue={this.props.setV} />
                        <CircularRangeInput key="N" label="N" defaultValue={N} min={1} max={100} tmin={1} tmax={100} setValue={this.props.setN} />
                    </div>
                );
                break;
        }
        return result;
    }
}