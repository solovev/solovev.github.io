import * as React from "react";

interface NavigationItemProps {
    label: string;
    selected: boolean;
    hovered: boolean;
    index: number;
}

interface NavigationItemState { }

export class NavigationItem extends React.Component<NavigationItemProps, NavigationItemState> {
    constructor(props: NavigationItemProps) {
        super(props);

        this.state = {};
    }

    render() {
        const { index, label, selected, hovered } = this.props;

        let style = {};
        if (selected)
            style = {'color': 'rgba(255, 255, 255, 0.87)'};
        else if (hovered)
            style = {'color': '#999'};

        return (
            <div className={selected ? 'item selected' : 'item'}>
                <div 
                    className="label"
                    style={style}>
                    {label}
                </div>
                <img src={'./img/scheme' + (index + 1) + (selected ? '-white' : '') + '.svg'} alt={'scheme' + index}/>
            </div>
        );
    }

    itemBackground(color: string): JSX.Element {
        switch (this.props.index)
        {
            case 0:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="199px" height="35px" version="1.1">
                        <defs/>
                        <g transform="translate(0.5,0.5)">
                            <path d="M 158 16 L 177.76 16" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 185.76 16 L 177.76 18.67 L 177.76 13.33 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10"
                                pointer-events="none" />
                            <ellipse cx="133" cy="16" rx="15" ry="15" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 122.29 26.71 L 143.71 5.29" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 122.29 5.29 L 143.71 26.71" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 8 16 L 27.76 16" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 35.76 16 L 27.76 18.67 L 27.76 13.33 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10"
                                pointer-events="none" />
                            <rect x="55" y="1" width="9" height="30" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <rect x="46" y="1" width="9" height="30" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <rect x="73" y="1" width="9" height="30" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 88 16 L 102.76 16" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 110.76 16 L 102.76 18.67 L 102.76 13.33 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10"
                                pointer-events="none" />
                            <rect x="64" y="1" width="9" height="30" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                        </g>
                    </svg>
                    );
            case 1:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="219px" height="44px" version="1.1">
                        <defs/>
                        <g transform="translate(0.5,0.5)">
                            <rect x="108" y="1" width="60" height="40" rx="6" ry="6" fill="none" stroke="#444" stroke-width="2" pointer-events="none"
                            />
                            <path d="M 178 21 L 197.76 21" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 205.76 21 L 197.76 23.67 L 197.76 18.33 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10"
                                pointer-events="none" />
                            <ellipse cx="122" cy="22" rx="7.5" ry="7.5" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 116.14 26.86 L 126.86 16.14" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 116.14 16.14 L 126.86 26.86" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <ellipse cx="143" cy="22" rx="7.5" ry="7.5" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 137.14 26.86 L 147.86 16.14" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 137.14 16.14 L 147.86 26.86" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <ellipse cx="155" cy="26" rx="1" ry="1" fill="#444" stroke="none" pointer-events="none" />
                            <ellipse cx="158" cy="26" rx="1" ry="1" fill="#444" stroke="none" pointer-events="none" />
                            <ellipse cx="161" cy="26" rx="1" ry="1" fill="#444" stroke="none" pointer-events="none" />
                            <path d="M 0 21 L 17.76 21" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 25.76 21 L 17.76 23.67 L 17.76 18.33 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10"
                                pointer-events="none" />
                            <rect x="45" y="6" width="9" height="30" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <rect x="36" y="6" width="9" height="30" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <rect x="63" y="6" width="9" height="30" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 78 21 L 92.76 21" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 100.76 21 L 92.76 23.67 L 92.76 18.33 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10"
                                pointer-events="none" />
                            <rect x="54" y="6" width="9" height="30" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                        </g>
                    </svg>
                );
            case 2:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="219px" height="44px" version="1.1">
                        <defs/>
                        <g transform="translate(0.5,0.5)">
                            <rect x="108" y="1" width="60" height="40" rx="6" ry="6" fill="none" stroke="#444" stroke-width="2" pointer-events="none"
                            />
                            <path d="M 178 21 L 197.76 21" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 205.76 21 L 197.76 23.67 L 197.76 18.33 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10"
                                pointer-events="none" />
                            <ellipse cx="122" cy="22" rx="7.5" ry="7.5" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 116.14 26.86 L 126.86 16.14" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 116.14 16.14 L 126.86 26.86" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <ellipse cx="143" cy="22" rx="7.5" ry="7.5" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 137.14 26.86 L 147.86 16.14" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 137.14 16.14 L 147.86 26.86" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <ellipse cx="155" cy="26" rx="1" ry="1" fill="#444" stroke="none" pointer-events="none" />
                            <ellipse cx="158" cy="26" rx="1" ry="1" fill="#444" stroke="none" pointer-events="none" />
                            <ellipse cx="161" cy="26" rx="1" ry="1" fill="#444" stroke="none" pointer-events="none" />
                            <path d="M 0 21 L 17.76 21" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 25.76 21 L 17.76 23.67 L 17.76 18.33 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10"
                                pointer-events="none" />
                            <rect x="45" y="6" width="9" height="30" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <rect x="36" y="6" width="9" height="30" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <rect x="63" y="6" width="9" height="30" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 78 21 L 92.76 21" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 100.76 21 L 92.76 23.67 L 92.76 18.33 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10"
                                pointer-events="none" />
                            <rect x="54" y="6" width="9" height="30" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                        </g>
                    </svg>
                );
            case 3:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" width="219px" height="62px" version="1.1">
                        <defs/>
                        <g transform="translate(0.5,0.5)">
                            <rect x="48" y="1" width="120" height="40" rx="6" ry="6" fill="none" stroke="#444" stroke-width="2" pointer-events="none"
                            />
                            <path d="M 178 21 L 197.76 21" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 205.76 21 L 197.76 23.67 L 197.76 18.33 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10"
                                pointer-events="none" />
                            <ellipse cx="68" cy="21" rx="10" ry="10" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 60.86 28.14 L 75.14 13.86" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 60.86 13.86 L 75.14 28.14" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <ellipse cx="98" cy="21" rx="10" ry="10" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 90.86 28.14 L 105.14 13.86" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 90.86 13.86 L 105.14 28.14" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <ellipse cx="148" cy="21" rx="10" ry="10" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 140.86 28.14 L 155.14 13.86" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 140.86 13.86 L 155.14 28.14" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <ellipse cx="116" cy="27" rx="1" ry="1" fill="#444" stroke="#444" stroke-width="2" pointer-events="none" />
                            <ellipse cx="123" cy="27" rx="1" ry="1" fill="#444" stroke="#444" stroke-width="2" pointer-events="none" />
                            <ellipse cx="130" cy="27" rx="1" ry="1" fill="#444" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 37.91 26.09 L 27.91 26.09 Q 17.91 26.09 17.91 33.42 L 17.91 40.74" fill="none" stroke="#444" stroke-width="2"
                                stroke-miterlimit="10" pointer-events="none" />
                            <path d="M 17.91 48.74 L 15.24 40.74 L 20.57 40.74 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10"
                                pointer-events="none" />
                            <path d="M 8 21 L 27.76 21" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 35.76 21 L 27.76 17 L 27.76 21 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 8 21 L 27.76 21" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 35.76 21 L 27.76 17 L 27.76 21 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                        </g>
                    </svg>
                );
            case 4:
                return (
                    <svg width="219px" height="45px" version="1.1">
                        <defs/>
                        <g>
                            <path d="M 8 21 L 27.76 21" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none" />
                            <path d="M 35.76 21 L 27.76 23.67 L 27.76 18.33 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10"
                                pointer-events="none" />
                            <rect x="48" y="1" width="120" height="40" rx="6" ry="6" fill="none" stroke="#444" stroke-width="2" pointer-events="none"
                            />
                            <path d="M 178 21 L 197.76 21" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 205.76 21 L 197.76 23.67 L 197.76 18.33 Z" fill="#444" stroke="#444" stroke-width="2" stroke-miterlimit="10"
                                pointer-events="none" />
                            <ellipse cx="68" cy="21" rx="10" ry="10" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 60.86 28.14 L 75.14 13.86" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 60.86 13.86 L 75.14 28.14" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <ellipse cx="98" cy="21" rx="10" ry="10" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 90.86 28.14 L 105.14 13.86" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 90.86 13.86 L 105.14 28.14" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <ellipse cx="148" cy="21" rx="10" ry="10" fill="none" stroke="#444" stroke-width="2" pointer-events="none" />
                            <path d="M 140.86 28.14 L 155.14 13.86" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <path d="M 140.86 13.86 L 155.14 28.14" fill="none" stroke="#444" stroke-width="2" stroke-miterlimit="10" pointer-events="none"
                            />
                            <ellipse cx="116" cy="27" rx="1" ry="1" fill="#000000" stroke="#444" stroke-width="2" pointer-events="none" />
                            <ellipse cx="123" cy="27" rx="1" ry="1" fill="#000000" stroke="#444" stroke-width="2" pointer-events="none" />
                            <ellipse cx="130" cy="27" rx="1" ry="1" fill="#000000" stroke="#444" stroke-width="2" pointer-events="none" />
                        </g>
                    </svg>
                );
            default:
                return <svg></svg>;
        }
    }
}