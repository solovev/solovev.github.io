import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from "react-redux";

import { Controls } from "./components/controls";
import { Navigation } from "./components/navigation";
import { Characteristics } from './components/characteristics';
import { UpperBlock } from './components/upperBlock';
import { Schemes } from './components/schemes';
import { Formulas } from './components/formulas';

import { AppState } from "./interfaces";

import { setCurrentModelAction, setY, setM, setA, setV, setN, setSelectedValue } from './actions';

interface AppProps {
    currentModelId: number;
    selectedValue: number;
    a: number;
    m: number;
    V: number;
    N: number;
    y: number;
    dispatch: Dispatch<any>;
}

interface AppState {
    selectedExpression: string;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {selectedExpression: 'pk'};
    }

    render() {
        const {selectedValue, currentModelId, a, m, V, N, y, dispatch } = this.props;
        return (
            <div className="container" onMouseOver={e => this.onMouseOverSidebar(e)}>
                <div className="sidebar">
                    <Navigation
                        setModel={(id: number) => dispatch(setCurrentModelAction(id))}
                        />
                    <Characteristics
                        currentModelId={currentModelId}
                        a={a} m={m} V={V} N={N} y={y}
                        />
                    <Formulas modelId={currentModelId+1} for={this.state.selectedExpression}/>
                </div>
                <div id="content">
                    <UpperBlock
                        currentModelId={currentModelId}
                        selectedValue={selectedValue}
                        a={a} m={m} V={V} N={N} y={y}
                        setSelectedValue={(value: number) => dispatch(setSelectedValue(value))}
                        />
                    <div id="bottom">
                        <Controls
                            currentModelId={currentModelId}
                            a={a} setA={(value: number) => dispatch(setA(value))}
                            m={m} setM={(value: number) => dispatch(setM(value))}
                            V={V} setV={(value: number) => dispatch(setV(value))}
                            N={N} setN={(value: number) => dispatch(setN(value))}
                            y={y} setY={(value: number) => dispatch(setY(value))}
                            />
                        <Schemes modelId={currentModelId + 1}/>
                    </div>
                </div>
            </div>
        );
    }

    onMouseOverSidebar(event: React.MouseEvent<HTMLElement>) {
        const target = event.target as HTMLElement;

        if (target.parentElement.id.length > 0 || target.id.length > 0) {
            let newExpr = target.id.length > 0 ? target.id : target.parentElement.id;
            if (newExpr != this.state.selectedExpression && newExpr.length <= 2) {
                this.setState({
                    selectedExpression: newExpr
                });
            }
        }
    }
}

export default connect(
    (state: AppState) => Object.assign({}, state)
)(App);