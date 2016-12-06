import * as React from 'react';

import { AppState } from "../interfaces";

import { Chart } from './chart';

interface UpperBlockProps {
    currentModelId: number;
    selectedValue: number;
    a: number;
    m: number;
    V: number;
    N: number;
    y: number;

    setSelectedValue: (value: number) => void;
}

interface UpperBlockState {
    hiddenOptions: boolean;
    hiddenStateInfo: boolean;

    isChartCurvy: boolean;
    isChartCutted: boolean;
    showSubcharts: boolean;
    selectedChartItem: number
}

export class UpperBlock extends React.Component<UpperBlockProps, UpperBlockState> {
    refsHolder: { stateInfo?: HTMLElement } = {};

    stateInfoX = 100;

    constructor(props: UpperBlockProps) {
        super(props);

        this.state = {
            hiddenStateInfo: true,
            hiddenOptions: false,
            isChartCurvy: true,
            isChartCutted: true,
            showSubcharts: false,
            selectedChartItem: -1
        };
    }

    render() {
        const { currentModelId, a, m, V, N, y, setSelectedValue, selectedValue } = this.props;
        const { hiddenStateInfo, hiddenOptions, isChartCurvy, isChartCutted, showSubcharts, selectedChartItem } = this.state;

        let key = <div id="key">P<sub>{selectedChartItem}</sub></div>;
        if (currentModelId == 2 && selectedChartItem >= V)
            key = <div id="key">W<sub>{selectedChartItem - V}</sub></div>;

        return (
            <div id="upper">
                <div className="header">
                    <div id="state"
                        ref={element => this.refsHolder.stateInfo = element}
                        style={{ 'transform': 'translate(' + this.stateInfoX + 'px, 0)' }}
                        className={hiddenStateInfo ? 'hidden' : ''}>
                        {key}
                        <div id="value">{selectedValue}</div>
                    </div>
                    <div className={hiddenOptions ? 'hidden' : ''} id="options">
                        <div id="oLineChart" className="svg-line-chart" onClick={e => this.onOptionClicked(e)}></div>
                        <div id="oScissors" className="svg-scissors active" onClick={e => this.onOptionClicked(e)}></div>
                        <div id="oCurve" className="svg-curve active" onClick={e => this.onOptionClicked(e)}></div>
                    </div>
                </div>
                <div id="pk" className="chart-holder"
                    onMouseEnter={e => this.handleMouseEnterLeave(e)}
                    onMouseLeave={e => this.handleMouseEnterLeave(e)}
                    onMouseMove={e => this.handleMouseMove(e)}>
                    <Chart
                        width={824}
                        height={260}
                        currentModelId={currentModelId}
                        a={a} m={m} V={V} N={N} y={y}
                        isCurvy={isChartCurvy}
                        isCutted={isChartCutted}
                        showSubcharts={showSubcharts}
                        selectedItem={selectedChartItem}
                        setSelectedValue={setSelectedValue}
                        />
                </div>
            </div>
        );
    }

    handleMouseMove(event: React.MouseEvent<HTMLElement>) {
        const { currentModelId, V } = this.props;

        let count = V + 1;
        switch (currentModelId) {
            case 0:
            case 1:
                count = V + 6;
                break;
            case 2:
                count = V * 2 + 1;
                break;
        }

        let target = event.currentTarget;
        let x = event.nativeEvent.offsetX;
        let width = target.clientWidth;

        let step = width / (count - 1);
        let id = Math.round(x / step);

        let selectedX = id * step;
        let stateWidth = this.refsHolder.stateInfo.clientWidth;

        this.stateInfoX = selectedX - stateWidth / 2;
        let minOffset = 10;
        let maxOffset = width - stateWidth - minOffset;
        if (this.stateInfoX < minOffset)
            this.stateInfoX = minOffset;
        if (this.stateInfoX > maxOffset)
            this.stateInfoX = maxOffset;

        if (id != this.state.selectedChartItem) {
            this.setState({
                hiddenStateInfo: this.state.hiddenStateInfo,
                hiddenOptions: this.state.hiddenOptions,
                isChartCurvy: this.state.isChartCurvy,
                isChartCutted: this.state.isChartCutted,
                showSubcharts: this.state.showSubcharts,
                selectedChartItem: id
            });
        }
    }

    onOptionClicked(event: React.MouseEvent<HTMLElement>) {
        let curvy = this.state.isChartCurvy;
        let cutted = this.state.isChartCutted;
        let subcharts = this.state.showSubcharts;

        let target = event.currentTarget;
        switch (target.id) {
            case 'oLineChart':
                subcharts = !subcharts;
                break;
            case 'oScissors':
                cutted = !cutted;
                break;
            case 'oCurve':
                curvy = !curvy;
                break;
        }

        target.classList.toggle('active');

        this.setState({
            hiddenStateInfo: this.state.hiddenStateInfo,
            hiddenOptions: this.state.hiddenOptions,
            isChartCurvy: curvy,
            isChartCutted: cutted,
            showSubcharts: subcharts,
            selectedChartItem: this.state.selectedChartItem
        });
    }

    handleMouseEnterLeave(event: React.MouseEvent<HTMLElement>) {
        this.setState({
            hiddenStateInfo: !this.state.hiddenStateInfo,
            hiddenOptions: !this.state.hiddenOptions,
            isChartCurvy: this.state.isChartCurvy,
            isChartCutted: this.state.isChartCutted,
            showSubcharts: this.state.showSubcharts,
            selectedChartItem: event.type == 'mouseleave' ? -1 : this.state.selectedChartItem
        });
    }
}