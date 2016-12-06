import * as React from "react";
import { NavigationItem } from "./navigationItem";

interface NavigationProps {
    setModel: (id: number) => void;
}

interface NavigationState {
    hoveredItemId: number;
    selectedItemId: number;
}

export class Navigation extends React.Component<NavigationProps, NavigationState> {
    labels = ['M/M/1', 'M/M/∞', 'M/M/V', 'M/M/V/K', 'M/M/V/K/N'];
    constructor(props: NavigationProps) {
        super(props);

        this.state = { hoveredItemId: 4, selectedItemId: 4 };
    }

    render() {
        var hoverClass = 'hover _' + this.state.hoveredItemId;
        var selectorClass = 'selector _' + this.state.selectedItemId;

        var items: any = [];
        for (var i = 0; i < 5; i++)
            items.push(
                <NavigationItem 
                    selected={i == this.state.selectedItemId}
                    hovered={i == this.state.hoveredItemId}
                    label={this.labels[i]}
                    index={i}
                />
            );

        return (
            <div id="navigation" onMouseMove={e => this.onMouseEvent(e)} onMouseDown={e => this.onMouseEvent(e)}>
                <div className={selectorClass}></div>
                <div className={hoverClass}></div>
                {items}
            </div>
        );
    }

    onMouseEvent(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        var y = event.clientY - event.currentTarget.offsetTop;

        var id = Math.floor(y / 70);

        if (event.type == 'mousedown')
            this.props.setModel(id);

        this.setState({
            hoveredItemId: id,
            selectedItemId: event.type == 'mousedown' ? id : this.state.selectedItemId
        });
    }
}