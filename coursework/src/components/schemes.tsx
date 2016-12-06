import * as React from 'react';

interface SchemesProps {
    modelId: number;
}
interface SchemesState {
    schemeHovered: boolean;
    diagramHovered: boolean;
}

export class Schemes extends React.Component<SchemesProps, SchemesState> {
    constructor(props: SchemesProps) {
        super(props);

        this.state = { schemeHovered: false, diagramHovered: false };
    }

    render() {
        const { modelId } = this.props;
        const { diagramHovered, schemeHovered } = this.state;

        const textColor = ['#555', '#777'];
        const shapeColor = ['#393939', '#494949'];

        const diagramColorIdx = diagramHovered ? 1 : 0;
        const schemeColorIdx = schemeHovered ? 1 : 0;

        let diagramWidth = '472.8px';
        let schemeWidth = '159px';
        switch (modelId) {
            case 1:
            case 2:
            case 3:
                diagramWidth = '492.8px';
                schemeWidth = '215px';
                break;
        }

        return (
            <div className="schemes">
                <svg width={diagramWidth} height="123.6px" id="diagram" 
                    onMouseLeave={e => this.onMouseLeave(e)} 
                    onMouseEnter={e => this.onMouseEnter(e)}>
                    {this.renderDiagram(textColor[diagramColorIdx], shapeColor[diagramColorIdx])}
                </svg>
                <svg width={schemeWidth} height="94px" id="scheme"                    
                    onMouseLeave={e => this.onMouseLeave(e)} 
                    onMouseEnter={e => this.onMouseEnter(e)}>
                    {this.renderScheme(textColor[schemeColorIdx], shapeColor[schemeColorIdx])}
                </svg>
            </div>
        );
    }

    renderScheme(textColor: string, shapeColor: string): JSX.Element {
        switch (this.props.modelId) {
            case 1:
                return (
                    <g transform="translate(0.5,0.5)">
                        <g fill={textColor} textAnchor="middle" fontSize="12px" fontFamily="consolas">
                            <g transform="translate(80, 0)">
                                <text x="123" y="30" fontSize="13px">μ</text>
                            </g>
                            <text x="161" y="16">M</text>
                            <text x="161" y="70">1</text>  
                            <text x="23" y="32" fontSize="13px">λ</text>                               
                            <text x="80" y="73" fontSize="15px">∞</text>
                        </g>
                        <g fill={shapeColor} stroke={shapeColor} strokeWidth="2" strokeMiterlimit="10">
                            <path d="M 8 41 L 37.76 41" fill="none" />
                            <path d="M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z" />

                            <g transform="translate(87, 0)">
                                <path d="M 24 41 L 37.76 41" fill="none" />
                                <path d="M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z" />
                            </g>
                            <rect x="53" y="20" width="10.5" height="40.5" fill="none" />
                            <rect x="64" y="20" width="10.5" height="40.5" fill="none" />
                            <rect x="75" y="20" width="10.5" height="40.5" fill="none" />
                            <rect x="86" y="20" width="10.5" height="40.5" fill="none" />
                            <rect x="97" y="20" width="10.5" height="40.5" fill="none" />
                            <g transform="translate(80, 0)">
                                <path d="M 108 41 L 137.76 41" fill="none" />
                                <path d="M 145.76 41 L 137.76 43.67 L 137.76 38.33 Z" />
                                <g transform="translate(10, 27)">
                                    <ellipse cx="71" cy="13" rx="18" ry="18" fill="none" />
                                    <path d="M 58.32 0.32 L 83.68 25.68" fill="none" />
                                    <path d="M 83.68 0.32 L 58.32 26" fill="none" />
                                </g>
                            </g>
                        </g>
                    </g>
                );
            case 2:
                return (
                    <g transform="translate(0.5,0.5)">
                        <g fill={textColor} textAnchor="middle" fontSize="12px" fontFamily="consolas">
                            <g transform="translate(80, 0)">
                                <text x="87" y="16.5">1</text>
                                <text x="87" y="36.5">2</text>
                                <text x="87" y="56.5">3</text>
                                <text x="123" y="30" fontSize="13px">μ</text>
                                <text x="128" y="56">B(t)-M</text>
                            </g>
                            <text x="157" y="93">V→∞</text>  
                            <text x="23" y="32" fontSize="13px">λ</text>                               
                            <text x="28" y="56">A(t)-M</text>
                            <text x="80" y="73">l→∞</text>
                        </g>
                        <g fill={shapeColor} stroke={shapeColor} strokeWidth="2" strokeMiterlimit="10">
                            <path d="M 8 41 L 37.76 41" fill="none" />
                            <path d="M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z" />

                            <g transform="translate(87, 0)">
                                <path d="M 24 41 L 37.76 41" fill="none" />
                                <path d="M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z" />
                            </g>
                            <rect x="53" y="20" width="10.5" height="40.5" fill="none" />
                            <rect x="64" y="20" width="10.5" height="40.5" fill="none" />
                            <rect x="75" y="20" width="10.5" height="40.5" fill="none" />
                            <rect x="86" y="20" width="10.5" height="40.5" fill="none" />
                            <rect x="97" y="20" width="10.5" height="40.5" fill="none" />
                            <g transform="translate(80, 0)">
                                <rect x="58" y="1" width="40" height="80" rx="6" ry="6" fill="none" />
                                <path d="M 108 41 L 137.76 41" fill="none" />
                                <path d="M 145.76 41 L 137.76 43.67 L 137.76 38.33 Z" />
                                <ellipse cx="71" cy="13" rx="8" ry="8" fill="none" />
                                <path d="M 65.32 7.32 L 76.68 18.68" fill="none" />
                                <path d="M 76.68 7.32 L 65.32 18.68" fill="none" />
                                <ellipse cx="71" cy="33" rx="8" ry="8" fill="none" />
                                <path d="M 65.32 27.32 L 76.68 38.68" fill="none" />
                                <path d="M 76.68 27.32 L 65.32 38.68" fill="none" />

                                <g transform="translate(0, 20)">
                                    <ellipse cx="71" cy="33" rx="8" ry="8" fill="none" />
                                    <path d="M 65.32 27.32 L 76.68 38.68" fill="none" />
                                    <path d="M 76.68 27.32 L 65.32 38.68" fill="none" />
                                    <ellipse cx="71" cy="47" rx="0.5" ry="0.5" />
                                    <ellipse cx="71" cy="51" rx="0.5" ry="0.5" />
                                    <ellipse cx="71" cy="55" rx="0.5" ry="0.5" />
                                </g>
                            </g>
                        </g>
                    </g>
                );
            case 3:
                return (
                    <g transform="translate(0.5,10.5)">
                        <g fill={textColor} textAnchor="middle" fontSize="12px" fontFamily="consolas">
                            <g transform="translate(80, 0)">
                                <text x="87" y="16.5">1</text>
                                <text x="87" y="36.5">2</text>
                                <text x="87" y="73">V</text>
                                <text x="123" y="30" fontSize="13px">μ</text>
                                <text x="128" y="56">B(t)-M</text>
                            </g>  
                            <text x="23" y="32" fontSize="13px">λ</text>                               
                            <text x="28" y="56">A(t)-M</text>
                            <text x="80" y="73">l→∞</text>
                        </g>
                        <g fill={shapeColor} stroke={shapeColor} strokeWidth="2" strokeMiterlimit="10">
                            <path d="M 8 41 L 37.76 41" fill="none" />
                            <path d="M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z" />

                            <g transform="translate(87, 0)">
                                <path d="M 24 41 L 37.76 41" fill="none" />
                                <path d="M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z" />
                            </g>
                            <rect x="53" y="20" width="10.5" height="40.5" fill="none" />
                            <rect x="64" y="20" width="10.5" height="40.5" fill="none" />
                            <rect x="75" y="20" width="10.5" height="40.5" fill="none" />
                            <rect x="86" y="20" width="10.5" height="40.5" fill="none" />
                            <rect x="97" y="20" width="10.5" height="40.5" fill="none" />
                            <g transform="translate(80, 0)">
                                <rect x="58" y="1" width="40" height="80" rx="6" ry="6" fill="none" />
                                <path d="M 108 41 L 137.76 41" fill="none" />
                                <path d="M 145.76 41 L 137.76 43.67 L 137.76 38.33 Z" />
                                <ellipse cx="71" cy="13" rx="8" ry="8" fill="none" />
                                <path d="M 65.32 7.32 L 76.68 18.68" fill="none" />
                                <path d="M 76.68 7.32 L 65.32 18.68" fill="none" />
                                <ellipse cx="71" cy="33" rx="8" ry="8" fill="none" />
                                <path d="M 65.32 27.32 L 76.68 38.68" fill="none" />
                                <path d="M 76.68 27.32 L 65.32 38.68" fill="none" />
                                <ellipse cx="71" cy="69" rx="8" ry="8" fill="none" />
                                <path d="M 65.32 63.32 L 76.68 74.68" fill="none" />
                                <path d="M 76.68 63.32 L 65.32 74.68" fill="none" />
                                <ellipse cx="71" cy="47" rx="0.5" ry="0.5" />
                                <ellipse cx="71" cy="51" rx="0.5" ry="0.5" />
                                <ellipse cx="71" cy="55" rx="0.5" ry="0.5" />
                            </g>
                        </g>
                    </g>
                );
            case 4:
                return (
                    <g transform="translate(0.5,10.5)">
                        <g fill={textColor} textAnchor="middle" fontSize="12px" fontFamily="consolas">
                            <text x="87" y="16.5">1</text>
                            <text x="87" y="36.5">2</text>
                            <text x="87" y="73">V</text>
                            <text x="123" y="30" fontSize="13px">μ</text>
                            <text x="23" y="32" fontSize="13px">λ</text>
                            <text x="28" y="56">A(t)-M</text>
                            <text x="128" y="56">B(t)-M</text>
                        </g>
                        <g fill={shapeColor} stroke={shapeColor} strokeWidth="2" strokeMiterlimit="10">
                            <path d="M 8 41 L 37.76 41" fill="none" />
                            <path d="M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z" />
                            <rect x="58" y="1" width="40" height="80" rx="6" ry="6" fill="none" />
                            <path d="M 108 41 L 137.76 41" fill="none" />
                            <path d="M 145.76 41 L 137.76 43.67 L 137.76 38.33 Z" />
                            <ellipse cx="71" cy="13" rx="8" ry="8" fill="none" />
                            <path d="M 65.32 7.32 L 76.68 18.68" fill="none" />
                            <path d="M 76.68 7.32 L 65.32 18.68" fill="none" />
                            <ellipse cx="71" cy="33" rx="8" ry="8" fill="none" />
                            <path d="M 65.32 27.32 L 76.68 38.68" fill="none" />
                            <path d="M 76.68 27.32 L 65.32 38.68" fill="none" />
                            <ellipse cx="71" cy="69" rx="8" ry="8" fill="none" />
                            <path d="M 65.32 63.32 L 76.68 74.68" fill="none" />
                            <path d="M 76.68 63.32 L 65.32 74.68" fill="none" />
                            <ellipse cx="71" cy="47" rx="0.5" ry="0.5" />
                            <ellipse cx="71" cy="51" rx="0.5" ry="0.5" />
                            <ellipse cx="71" cy="55" rx="0.5" ry="0.5" />
                            <path d="M 23 35 L 29.2 35 Q 35.4 35 35.4 30 L 35.4 18 Q 35.4 8 41.7 8 L 48 8" fill="none" transform="translate(35.62,0)scale(-1,1)translate(-35.62,0)" />
                            <path d="M 48.5 12.5 L 39.5 3.5 M 48.5 3.5 L 39.5 12.5" fill="none" transform="translate(35.62,0)scale(-1,1)translate(-35.62,0)" />
                        </g>
                    </g>
                );
            case 5:
                return (
                    <g transform="translate(0.5,0.5)">
                        <g fill={textColor} textAnchor="middle" fontSize="12px" fontFamily="consolas">
                            <text x="87" y="16.5">1</text>
                            <text x="87" y="36.5">2</text>
                            <text x="87" y="73">V</text>
                            <text x="123" y="30" fontSize="13px">μ</text>
                            <text x="23" y="32" fontSize="13px">λ</text>
                            <text x="29" y="35" fontSize="10px">k</text>
                            <text x="28" y="56">A(t)</text>
                            <text x="128" y="56">M=B(t)</text>
                            <text x="78" y="92">N=V</text>
                        </g>
                        <g fill={shapeColor} stroke={shapeColor} strokeWidth="2" strokeMiterlimit="10">
                            <path d="M 8 41 L 37.76 41" fill="none" />
                            <path d="M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z" />
                            <rect x="58" y="1" width="40" height="80" rx="6" ry="6" fill="none" />
                            <path d="M 108 41 L 137.76 41" fill="none" />
                            <path d="M 145.76 41 L 137.76 43.67 L 137.76 38.33 Z" />
                            <ellipse cx="71" cy="13" rx="8" ry="8" fill="none" />
                            <path d="M 65.32 7.32 L 76.68 18.68" fill="none" />
                            <path d="M 76.68 7.32 L 65.32 18.68" fill="none" />
                            <ellipse cx="71" cy="33" rx="8" ry="8" fill="none" />
                            <path d="M 65.32 27.32 L 76.68 38.68" fill="none" />
                            <path d="M 76.68 27.32 L 65.32 38.68" fill="none" />
                            <ellipse cx="71" cy="69" rx="8" ry="8" fill="none" />
                            <path d="M 65.32 63.32 L 76.68 74.68" fill="none" />
                            <path d="M 76.68 63.32 L 65.32 74.68" fill="none" />
                            <ellipse cx="71" cy="47" rx="0.5" ry="0.5" />
                            <ellipse cx="71" cy="51" rx="0.5" ry="0.5" />
                            <ellipse cx="71" cy="55" rx="0.5" ry="0.5" />
                        </g>
                    </g>
                );
                default:
                    return <g></g>
        }
    }

    renderDiagram(textColor: string, shapeColor: string): JSX.Element {
        switch (this.props.modelId) {
            case 1:
                return (                
                    <g transform="translate(0.5,0.5) scale(1.2, 1.2)">
                        <g fill={textColor} textAnchor="middle" fontSize="12px" fontFamily="consolas">
                            <text x="20.5" y="54.5">0</text>
                            <text x="101" y="54.5">1</text>
                            <text x="181" y="54.5">2</text>
                            <text x="291" y="54.5">k</text>
                            <text x="371" y="54.5">k+1</text>
                        </g>
                        <g fill={textColor} textAnchor="middle" fontFamily="consolas">
                            <text x="47.5" y="15.5" fontSize="12px">λ</text>
                            <text x="126.5" y="15.5" fontSize="12px">λ</text>
                            <text x="203.5" y="19.5" fontSize="10px">λ</text>
                            <text x="253.5" y="19.5" fontSize="10px">λ</text>
                            <text x="317.5" y="15.5" fontSize="12px">λ</text>
                            <text x="75.5" y="90.5" fontSize="12px">μ</text>
                            <text x="156.5" y="92.5" fontSize="12px">μ</text>
                            <text x="217.5" y="90.5" fontSize="10px">μ</text>
                            <text x="268.5" y="88.5" fontSize="10px">μ</text>
                            <text x="351.5" y="89.5" fontSize="12px">μ</text>
                        </g>
                        <g fill={shapeColor} stroke={shapeColor} strokeWidth="2" strokeMiterlimit="10">
                            <ellipse cx="21" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 41 30 L 53.93 17.07 Q 61 10 67.38 16.38 L 73.76 22.76" fill="none" />
                            <path d="M 79.42 28.42 L 71.88 24.65 L 75.65 20.88 Z" />
                            <ellipse cx="101" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 121 30 L 133.93 17.07 Q 141 10 147.38 16.38 L 153.76 22.76" fill="none" />
                            <path d="M 159.42 28.42 L 151.88 24.65 L 155.65 20.88 Z" />
                            <ellipse cx="181" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 251 30 L 256 25 Q 261 20 262.38 21.38 L 263.76 22.76" fill="none" />
                            <path d="M 269.42 28.42 L 261.88 24.65 L 265.65 20.88 Z" />
                            <ellipse cx="291" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 201 30 L 206 25 Q 211 20 212.71 21.56 L 214.43 23.11" fill="none" />
                            <path d="M 220.35 28.5 L 212.63 25.09 L 216.22 21.14 Z" />
                            <path d="M 311 30 L 323.93 17.07 Q 331 10 337.38 16.38 L 343.76 22.76" fill="none" />
                            <path d="M 349.42 28.42 L 341.88 24.65 L 345.65 20.88 Z" />
                            <ellipse cx="371" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 41 90 L 53.93 77.07 Q 61 70 67.38 76.38 L 73.76 82.76" fill="none" transform="rotate(180,61.24,80.24)" />
                            <path d="M 79.42 88.42 L 71.88 84.65 L 75.65 80.88 Z" transform="rotate(180,61.24,80.24)" />
                            <path d="M 121 90 L 133.93 77.07 Q 141 70 147.38 76.38 L 153.76 82.76" fill="none" transform="rotate(180,141.24,80.24)" />
                            <path d="M 159.42 88.42 L 151.88 84.65 L 155.65 80.88 Z" transform="rotate(180,141.24,80.24)" />
                            <path d="M 251 80 L 256 75 Q 261 70 262.38 71.38 L 263.76 72.76" fill="none" transform="rotate(180,261.24,75.24)" />
                            <path d="M 269.42 78.42 L 261.88 74.65 L 265.65 70.88 Z" transform="rotate(180,261.24,75.24)" />
                            <path d="M 201 80 L 206 75 Q 211 70 212.71 71.56 L 214.43 73.11" fill="none" transform="rotate(180,211.74,75.24)" />
                            <path d="M 220.35 78.5 L 212.63 75.09 L 216.22 71.14 Z" transform="rotate(180,211.74,75.24)" />
                            <path d="M 311 90 L 323.93 77.07 Q 331 70 337.38 76.38 L 343.76 82.76" fill="none" transform="rotate(180,331.24,80.24)" />
                            <path d="M 349.42 88.42 L 341.88 84.65 L 345.65 80.88 Z" transform="rotate(180,331.24,80.24)" />
                            <ellipse cx="227" cy="61" rx="0.5" ry="0.5" />
                            <ellipse cx="237" cy="61" rx="0.5" ry="0.5" />
                            <ellipse cx="247" cy="61" rx="0.5" ry="0.5" />

                            <ellipse cx="407" cy="51" rx="0.5" ry="0.5" />
                            <ellipse cx="412" cy="51" rx="0.5" ry="0.5" />
                            <ellipse cx="417" cy="51" rx="0.5" ry="0.5" />

                            <path d="M 391 30 L 396 25 Q 401 20 402.38 21.38 L 403.76 22.76" fill="none" />
                            <path d="M 409.42 28.42 L 401.88 24.65 L 405.65 20.88 Z" />

                            <path d="M 10 80 L 15 75 Q 20 70 21.71 71.56 L 23.43 73.11" fill="none" transform="rotate(180,211.74,75.24)" />
                            <path d="M 29.35 78.5 L 21.63 75.09 L 25.22 71.14 Z" transform="rotate(180,211.74,75.24)" />
                            
                        </g>
                    </g>
                );
            case 2:
                return (                
                    <g transform="translate(0.5,0.5) scale(1.2, 1.2)">
                        <g fill={textColor} textAnchor="middle" fontSize="12px" fontFamily="consolas">
                            <text x="20.5" y="54.5">0</text>
                            <text x="101" y="54.5">1</text>
                            <text x="181" y="54.5">2</text>
                            <text x="291" y="54.5">k</text>
                            <text x="371" y="54.5">k+1</text>
                        </g>
                        <g fill={textColor} textAnchor="middle" fontFamily="consolas">
                            <text x="47.5" y="15.5" fontSize="12px">λ</text>
                            <text x="126.5" y="15.5" fontSize="12px">λ</text>
                            <text x="203.5" y="19.5" fontSize="10px">λ</text>
                            <text x="253.5" y="19.5" fontSize="10px">λ</text>
                            <text x="317.5" y="15.5" fontSize="12px">λ</text>
                            <text x="75.5" y="90.5" fontSize="12px">μ</text>
                            <text x="156.5" y="92.5" fontSize="12px">2μ</text>
                            <text x="217.5" y="90.5" fontSize="10px">3μ</text>
                            <text x="268.5" y="88.5" fontSize="10px">kμ</text>
                            <text x="361.5" y="89.5" fontSize="12px">μ(k+1)</text>
                        </g>
                        <g fill={shapeColor} stroke={shapeColor} strokeWidth="2" strokeMiterlimit="10">
                            <ellipse cx="21" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 41 30 L 53.93 17.07 Q 61 10 67.38 16.38 L 73.76 22.76" fill="none" />
                            <path d="M 79.42 28.42 L 71.88 24.65 L 75.65 20.88 Z" />
                            <ellipse cx="101" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 121 30 L 133.93 17.07 Q 141 10 147.38 16.38 L 153.76 22.76" fill="none" />
                            <path d="M 159.42 28.42 L 151.88 24.65 L 155.65 20.88 Z" />
                            <ellipse cx="181" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 251 30 L 256 25 Q 261 20 262.38 21.38 L 263.76 22.76" fill="none" />
                            <path d="M 269.42 28.42 L 261.88 24.65 L 265.65 20.88 Z" />
                            <ellipse cx="291" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 201 30 L 206 25 Q 211 20 212.71 21.56 L 214.43 23.11" fill="none" />
                            <path d="M 220.35 28.5 L 212.63 25.09 L 216.22 21.14 Z" />
                            <path d="M 311 30 L 323.93 17.07 Q 331 10 337.38 16.38 L 343.76 22.76" fill="none" />
                            <path d="M 349.42 28.42 L 341.88 24.65 L 345.65 20.88 Z" />
                            <ellipse cx="371" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 41 90 L 53.93 77.07 Q 61 70 67.38 76.38 L 73.76 82.76" fill="none" transform="rotate(180,61.24,80.24)" />
                            <path d="M 79.42 88.42 L 71.88 84.65 L 75.65 80.88 Z" transform="rotate(180,61.24,80.24)" />
                            <path d="M 121 90 L 133.93 77.07 Q 141 70 147.38 76.38 L 153.76 82.76" fill="none" transform="rotate(180,141.24,80.24)" />
                            <path d="M 159.42 88.42 L 151.88 84.65 L 155.65 80.88 Z" transform="rotate(180,141.24,80.24)" />
                            <path d="M 251 80 L 256 75 Q 261 70 262.38 71.38 L 263.76 72.76" fill="none" transform="rotate(180,261.24,75.24)" />
                            <path d="M 269.42 78.42 L 261.88 74.65 L 265.65 70.88 Z" transform="rotate(180,261.24,75.24)" />
                            <path d="M 201 80 L 206 75 Q 211 70 212.71 71.56 L 214.43 73.11" fill="none" transform="rotate(180,211.74,75.24)" />
                            <path d="M 220.35 78.5 L 212.63 75.09 L 216.22 71.14 Z" transform="rotate(180,211.74,75.24)" />
                            <path d="M 311 90 L 323.93 77.07 Q 331 70 337.38 76.38 L 343.76 82.76" fill="none" transform="rotate(180,331.24,80.24)" />
                            <path d="M 349.42 88.42 L 341.88 84.65 L 345.65 80.88 Z" transform="rotate(180,331.24,80.24)" />
                            <ellipse cx="227" cy="61" rx="0.5" ry="0.5" />
                            <ellipse cx="237" cy="61" rx="0.5" ry="0.5" />
                            <ellipse cx="247" cy="61" rx="0.5" ry="0.5" />

                            <ellipse cx="407" cy="51" rx="0.5" ry="0.5" />
                            <ellipse cx="412" cy="51" rx="0.5" ry="0.5" />
                            <ellipse cx="417" cy="51" rx="0.5" ry="0.5" />

                            <path d="M 391 30 L 396 25 Q 401 20 402.38 21.38 L 403.76 22.76" fill="none" />
                            <path d="M 409.42 28.42 L 401.88 24.65 L 405.65 20.88 Z" />

                            <path d="M 10 80 L 15 75 Q 20 70 21.71 71.56 L 23.43 73.11" fill="none" transform="rotate(180,211.74,75.24)" />
                            <path d="M 29.35 78.5 L 21.63 75.09 L 25.22 71.14 Z" transform="rotate(180,211.74,75.24)" />
                            
                        </g>
                    </g>
                );
            case 3:
                return (                
                    <g transform="translate(0.5,0.5) scale(1.2, 1.2)">
                        <g fill={textColor} textAnchor="middle" fontSize="12px" fontFamily="consolas">
                            <text x="20.5" y="54.5">0</text>
                            <text x="101" y="54.5">1</text>
                            <text x="181" y="54.5">2</text>
                            <text x="291" y="54.5">V</text>
                            <text x="371" y="54.5">V+1</text>
                        </g>
                        <g fill={textColor} textAnchor="middle" fontFamily="consolas">
                            <text x="47.5" y="15.5" fontSize="12px">λ</text>
                            <text x="126.5" y="15.5" fontSize="12px">λ</text>
                            <text x="203.5" y="19.5" fontSize="10px">λ</text>
                            <text x="253.5" y="19.5" fontSize="10px">λ</text>
                            <text x="317.5" y="15.5" fontSize="12px">λ</text>
                            <text x="75.5" y="90.5" fontSize="12px">μ</text>
                            <text x="156.5" y="92.5" fontSize="12px">2μ</text>
                            <text x="217.5" y="90.5" fontSize="10px">3μ</text>
                            <text x="268.5" y="88.5" fontSize="10px">μV</text>
                            <text x="349.5" y="89.5" fontSize="12px">μV</text>
                        </g>
                        <g fill={shapeColor} stroke={shapeColor} strokeWidth="2" strokeMiterlimit="10">
                            <ellipse cx="21" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 41 30 L 53.93 17.07 Q 61 10 67.38 16.38 L 73.76 22.76" fill="none" />
                            <path d="M 79.42 28.42 L 71.88 24.65 L 75.65 20.88 Z" />
                            <ellipse cx="101" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 121 30 L 133.93 17.07 Q 141 10 147.38 16.38 L 153.76 22.76" fill="none" />
                            <path d="M 159.42 28.42 L 151.88 24.65 L 155.65 20.88 Z" />
                            <ellipse cx="181" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 251 30 L 256 25 Q 261 20 262.38 21.38 L 263.76 22.76" fill="none" />
                            <path d="M 269.42 28.42 L 261.88 24.65 L 265.65 20.88 Z" />
                            <ellipse cx="291" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 201 30 L 206 25 Q 211 20 212.71 21.56 L 214.43 23.11" fill="none" />
                            <path d="M 220.35 28.5 L 212.63 25.09 L 216.22 21.14 Z" />
                            <path d="M 311 30 L 323.93 17.07 Q 331 10 337.38 16.38 L 343.76 22.76" fill="none" />
                            <path d="M 349.42 28.42 L 341.88 24.65 L 345.65 20.88 Z" />
                            <ellipse cx="371" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 41 90 L 53.93 77.07 Q 61 70 67.38 76.38 L 73.76 82.76" fill="none" transform="rotate(180,61.24,80.24)" />
                            <path d="M 79.42 88.42 L 71.88 84.65 L 75.65 80.88 Z" transform="rotate(180,61.24,80.24)" />
                            <path d="M 121 90 L 133.93 77.07 Q 141 70 147.38 76.38 L 153.76 82.76" fill="none" transform="rotate(180,141.24,80.24)" />
                            <path d="M 159.42 88.42 L 151.88 84.65 L 155.65 80.88 Z" transform="rotate(180,141.24,80.24)" />
                            <path d="M 251 80 L 256 75 Q 261 70 262.38 71.38 L 263.76 72.76" fill="none" transform="rotate(180,261.24,75.24)" />
                            <path d="M 269.42 78.42 L 261.88 74.65 L 265.65 70.88 Z" transform="rotate(180,261.24,75.24)" />
                            <path d="M 201 80 L 206 75 Q 211 70 212.71 71.56 L 214.43 73.11" fill="none" transform="rotate(180,211.74,75.24)" />
                            <path d="M 220.35 78.5 L 212.63 75.09 L 216.22 71.14 Z" transform="rotate(180,211.74,75.24)" />
                            <path d="M 311 90 L 323.93 77.07 Q 331 70 337.38 76.38 L 343.76 82.76" fill="none" transform="rotate(180,331.24,80.24)" />
                            <path d="M 349.42 88.42 L 341.88 84.65 L 345.65 80.88 Z" transform="rotate(180,331.24,80.24)" />
                            <ellipse cx="227" cy="61" rx="0.5" ry="0.5" />
                            <ellipse cx="237" cy="61" rx="0.5" ry="0.5" />
                            <ellipse cx="247" cy="61" rx="0.5" ry="0.5" />

                            <ellipse cx="407" cy="51" rx="0.5" ry="0.5" />
                            <ellipse cx="412" cy="51" rx="0.5" ry="0.5" />
                            <ellipse cx="417" cy="51" rx="0.5" ry="0.5" />

                            <path d="M 391 30 L 396 25 Q 401 20 402.38 21.38 L 403.76 22.76" fill="none" />
                            <path d="M 409.42 28.42 L 401.88 24.65 L 405.65 20.88 Z" />

                            <path d="M 10 80 L 15 75 Q 20 70 21.71 71.56 L 23.43 73.11" fill="none" transform="rotate(180,211.74,75.24)" />
                            <path d="M 29.35 78.5 L 21.63 75.09 L 25.22 71.14 Z" transform="rotate(180,211.74,75.24)" />
                            
                        </g>
                    </g>
                );
            case 4:
                return (                
                    <g transform="translate(0.5,0.5) scale(1.2, 1.2)">
                        <g fill={textColor} textAnchor="middle" fontSize="12px" fontFamily="consolas">
                            <text x="20.5" y="54.5">0</text>
                            <text x="101" y="54.5">1</text>
                            <text x="181" y="54.5">2</text>
                            <text x="291" y="54.5">V-1</text>
                            <text x="371" y="54.5">V</text>
                        </g>
                        <g fill={textColor} textAnchor="middle" fontFamily="consolas">
                            <text x="47.5" y="15.5" fontSize="12px">λ</text>
                            <text x="126.5" y="15.5" fontSize="12px">λ</text>
                            <text x="203.5" y="19.5" fontSize="10px">λ</text>
                            <text x="253.5" y="19.5" fontSize="10px">λ</text>
                            <text x="317.5" y="15.5" fontSize="12px">λ</text>
                            <text x="75.5" y="90.5" fontSize="12px">μ</text>
                            <text x="154.5" y="92.5" fontSize="12px">2μ</text>
                            <text x="217.5" y="90.5" fontSize="10px">3μ</text>
                            <text x="278.5" y="88.5" fontSize="10px">μ(V-1)</text>
                            <text x="349.5" y="89.5" fontSize="12px">μV</text>
                        </g>
                        <g fill={shapeColor} stroke={shapeColor} strokeWidth="2" strokeMiterlimit="10">
                            <ellipse cx="21" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 41 30 L 53.93 17.07 Q 61 10 67.38 16.38 L 73.76 22.76" fill="none" />
                            <path d="M 79.42 28.42 L 71.88 24.65 L 75.65 20.88 Z" />
                            <ellipse cx="101" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 121 30 L 133.93 17.07 Q 141 10 147.38 16.38 L 153.76 22.76" fill="none" />
                            <path d="M 159.42 28.42 L 151.88 24.65 L 155.65 20.88 Z" />
                            <ellipse cx="181" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 251 30 L 256 25 Q 261 20 262.38 21.38 L 263.76 22.76" fill="none" />
                            <path d="M 269.42 28.42 L 261.88 24.65 L 265.65 20.88 Z" />
                            <ellipse cx="291" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 201 30 L 206 25 Q 211 20 212.71 21.56 L 214.43 23.11" fill="none" />
                            <path d="M 220.35 28.5 L 212.63 25.09 L 216.22 21.14 Z" />
                            <path d="M 311 30 L 323.93 17.07 Q 331 10 337.38 16.38 L 343.76 22.76" fill="none" />
                            <path d="M 349.42 28.42 L 341.88 24.65 L 345.65 20.88 Z" />
                            <ellipse cx="371" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 41 90 L 53.93 77.07 Q 61 70 67.38 76.38 L 73.76 82.76" fill="none" transform="rotate(180,61.24,80.24)" />
                            <path d="M 79.42 88.42 L 71.88 84.65 L 75.65 80.88 Z" transform="rotate(180,61.24,80.24)" />
                            <path d="M 121 90 L 133.93 77.07 Q 141 70 147.38 76.38 L 153.76 82.76" fill="none" transform="rotate(180,141.24,80.24)" />
                            <path d="M 159.42 88.42 L 151.88 84.65 L 155.65 80.88 Z" transform="rotate(180,141.24,80.24)" />
                            <path d="M 251 80 L 256 75 Q 261 70 262.38 71.38 L 263.76 72.76" fill="none" transform="rotate(180,261.24,75.24)" />
                            <path d="M 269.42 78.42 L 261.88 74.65 L 265.65 70.88 Z" transform="rotate(180,261.24,75.24)" />
                            <path d="M 201 80 L 206 75 Q 211 70 212.71 71.56 L 214.43 73.11" fill="none" transform="rotate(180,211.74,75.24)" />
                            <path d="M 220.35 78.5 L 212.63 75.09 L 216.22 71.14 Z" transform="rotate(180,211.74,75.24)" />
                            <path d="M 311 90 L 323.93 77.07 Q 331 70 337.38 76.38 L 343.76 82.76" fill="none" transform="rotate(180,331.24,80.24)" />
                            <path d="M 349.42 88.42 L 341.88 84.65 L 345.65 80.88 Z" transform="rotate(180,331.24,80.24)" />
                            <ellipse cx="227" cy="61" rx="0.5" ry="0.5" />
                            <ellipse cx="237" cy="61" rx="0.5" ry="0.5" />
                            <ellipse cx="247" cy="61" rx="0.5" ry="0.5" />
                        </g>
                    </g>
                );
            case 5:
                return (                
                    <g transform="translate(0.5,0.5) scale(1.2, 1.2)">
                        <g fill={textColor} textAnchor="middle" fontSize="12px" fontFamily="consolas">
                            <text x="20.5" y="54.5">0</text>
                            <text x="101" y="54.5">1</text>
                            <text x="181" y="54.5">2</text>
                            <text x="291" y="54.5">V-1</text>
                            <text x="371" y="54.5">V</text>
                        </g>
                        <g fill={textColor} textAnchor="middle" fontFamily="consolas">
                            <text x="44.5" y="12.5" fontSize="12px">αN</text>
                            <text x="115.5" y="12.5" fontSize="12px">α(N-1)</text>
                            <text x="193.5" y="16.5" fontSize="10px">α(N-2)</text>
                            <text x="239.5" y="16.5" fontSize="10px">α(N-V+2)</text>
                            <text x="297.5" y="12.5" fontSize="12px">α(N-V+1)</text>
                            <text x="75.5" y="90.5" fontSize="12px">μ</text>
                            <text x="154.5" y="92.5" fontSize="12px">2μ</text>
                            <text x="217.5" y="90.5" fontSize="10px">3μ</text>
                            <text x="278.5" y="88.5" fontSize="10px">μ(V-1)</text>
                            <text x="349.5" y="89.5" fontSize="12px">μV</text>
                        </g>
                        <g fill={shapeColor} stroke={shapeColor} strokeWidth="2" strokeMiterlimit="10">
                            <ellipse cx="21" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 41 30 L 53.93 17.07 Q 61 10 67.38 16.38 L 73.76 22.76" fill="none" />
                            <path d="M 79.42 28.42 L 71.88 24.65 L 75.65 20.88 Z" />
                            <ellipse cx="101" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 121 30 L 133.93 17.07 Q 141 10 147.38 16.38 L 153.76 22.76" fill="none" />
                            <path d="M 159.42 28.42 L 151.88 24.65 L 155.65 20.88 Z" />
                            <ellipse cx="181" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 251 30 L 256 25 Q 261 20 262.38 21.38 L 263.76 22.76" fill="none" />
                            <path d="M 269.42 28.42 L 261.88 24.65 L 265.65 20.88 Z" />
                            <ellipse cx="291" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 201 30 L 206 25 Q 211 20 212.71 21.56 L 214.43 23.11" fill="none" />
                            <path d="M 220.35 28.5 L 212.63 25.09 L 216.22 21.14 Z" />
                            <path d="M 311 30 L 323.93 17.07 Q 331 10 337.38 16.38 L 343.76 22.76" fill="none" />
                            <path d="M 349.42 28.42 L 341.88 24.65 L 345.65 20.88 Z" />
                            <ellipse cx="371" cy="50" rx="20" ry="20" fill="transparent" />
                            <path d="M 41 90 L 53.93 77.07 Q 61 70 67.38 76.38 L 73.76 82.76" fill="none" transform="rotate(180,61.24,80.24)" />
                            <path d="M 79.42 88.42 L 71.88 84.65 L 75.65 80.88 Z" transform="rotate(180,61.24,80.24)" />
                            <path d="M 121 90 L 133.93 77.07 Q 141 70 147.38 76.38 L 153.76 82.76" fill="none" transform="rotate(180,141.24,80.24)" />
                            <path d="M 159.42 88.42 L 151.88 84.65 L 155.65 80.88 Z" transform="rotate(180,141.24,80.24)" />
                            <path d="M 251 80 L 256 75 Q 261 70 262.38 71.38 L 263.76 72.76" fill="none" transform="rotate(180,261.24,75.24)" />
                            <path d="M 269.42 78.42 L 261.88 74.65 L 265.65 70.88 Z" transform="rotate(180,261.24,75.24)" />
                            <path d="M 201 80 L 206 75 Q 211 70 212.71 71.56 L 214.43 73.11" fill="none" transform="rotate(180,211.74,75.24)" />
                            <path d="M 220.35 78.5 L 212.63 75.09 L 216.22 71.14 Z" transform="rotate(180,211.74,75.24)" />
                            <path d="M 311 90 L 323.93 77.07 Q 331 70 337.38 76.38 L 343.76 82.76" fill="none" transform="rotate(180,331.24,80.24)" />
                            <path d="M 349.42 88.42 L 341.88 84.65 L 345.65 80.88 Z" transform="rotate(180,331.24,80.24)" />
                            <ellipse cx="227" cy="61" rx="0.5" ry="0.5" />
                            <ellipse cx="237" cy="61" rx="0.5" ry="0.5" />
                            <ellipse cx="247" cy="61" rx="0.5" ry="0.5" />
                        </g>
                    </g>
                );
            
            
            default:
                return <g></g>;
        }
    }

    onMouseEnter(event: React.MouseEvent<SVGElement>) {
        const isDiagram = event.currentTarget.id == 'diagram';
        this.setState({
            diagramHovered: isDiagram,
            schemeHovered: !isDiagram
        });
    }

    onMouseLeave(event: React.MouseEvent<SVGElement>) {
        const isDiagram = event.currentTarget.id == 'diagram';
        this.setState({
            diagramHovered: false,
            schemeHovered: false
        });
    }
}