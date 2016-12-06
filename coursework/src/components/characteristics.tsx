import * as React from 'react';

import { CharacteristicRange } from "./characteristicRange";
import { AppState } from '../interfaces'
import { f, C } from '../math';

interface CharacteristicsProps {
    currentModelId: number;
    a: number;
    m: number;
    V: number;
    N: number;
    y: number;
}
interface CharacteristicsState { }

export class Characteristics extends React.Component<CharacteristicsProps, CharacteristicsState> {
    constructor(props: CharacteristicsProps) {
        super(props);
    }


    render() {
        const { currentModelId, a, m, V, N, y } = this.props;

        let result = <div></div>;

        switch (currentModelId) {
            case 0:
            case 1:
                {
                    let d = y / m;
                    let k = currentModelId == 0 ? d / (1 - d) : d;
                    let t = currentModelId == 0 ? (1 / m) / (1 - d) : 1 / m;

                    result = (
                        <div className="characteristics">
                            <div className="item text" id="k">
                                <div className="label inline">K<sub>ср</sub> = {k === Infinity ? '∞' : parseFloat(k.toFixed(5))}&nbsp;&nbsp;</div>
                            </div>
                            <div className="item text" id="t">
                                <div className="label inline">T<sub>ср</sub> = {t === Infinity ? '∞' : parseFloat(t.toFixed(5))}&nbsp;&nbsp;</div>
                            </div>
                        </div>
                    );
                }
                break;
            case 2:
                {
                    let ro = y / m;
                    let s = 1 / (m * (V - ro));
                    let j = y * s;

                    let u = (Math.pow(ro, V) / f(V)) * (V / (V - ro));
                    let sum = 0;
                    for (let x = 0; x < V - 1; x++) {
                        sum += Math.pow(ro, x) / f(x);
                    }
                    sum += (Math.pow(ro, V) / f(V)) * (V / (V - ro));
                    let Pt = u / sum;

                    result = (
                        <div className="characteristics">
                            <div className="item" id="pt">
                                <div className="label b-round">P<sub>t</sub></div>
                                <CharacteristicRange value={Pt} width={155} height={30} min={0} max={1} />
                            </div>
                            <div className="item text" id="s">
                                <div className="label inline">Ϫ<sub>ср</sub> = {parseFloat(s.toFixed(5))}&nbsp;&nbsp;</div>
                            </div>
                            <div className="item text" id="j">
                                <div className="label inline">j<sub>ср</sub> = {parseFloat(j.toFixed(5))}&nbsp;&nbsp;</div>
                            </div>
                        </div>
                    );
                }
                break;
            case 3:
                {
                    let ro = y / m;
                    let u = Math.pow(ro, V) / f(V);
                    let d = 0;
                    for (let x = 0; x <= V; x++)
                        d += Math.pow(ro, x) / f(x);
                    let Pt = u / d;

                    result = (
                        <div className="characteristics">
                            <div className="item" id="pt">
                                <div className="label b">P<sub>t/b</sub></div>
                                <CharacteristicRange value={Pt} width={140} height={30} min={0} max={1} />
                            </div>
                        </div>
                    );
                }
                break;
            case 4:
                {
                    let dt = 0, db = 0;
                    let p = a / (1 - a);
                    for (let i = 0; i < V + 1; i++)
                        dt += C(N, i) * Math.pow(p, i);
                    let Pt = C(N, V) * Math.pow(p, V) / dt;

                    let d = 0;
                    for (let i = 0; i < V + 1; i++)
                        d += C(N - 1, i) * Math.pow(a / (1 - a), i);
                    let Pb = C(N - 1, V) * Math.pow(a / (1 - a), V) / d;

                    result = (
                        <div className="characteristics">
                            <div className="item" id="pb">
                                <div className="label b-round">P<sub>b</sub></div>
                                <CharacteristicRange value={Pb} width={155} height={30} min={0} max={1} />
                            </div>
                            <div className="item" id="pt">
                                <div className="label a">P<sub>t</sub></div>
                                <CharacteristicRange value={Pt} width={155} height={30} min={0} max={1} />
                            </div>
                        </div>
                    );
                }
                break;
        }

        return result;
    }
}