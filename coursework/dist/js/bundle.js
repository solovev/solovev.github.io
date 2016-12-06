/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const React = __webpack_require__(1);
	const ReactDOM = __webpack_require__(2);
	const react_redux_1 = __webpack_require__(3);
	const app_1 = __webpack_require__(4);
	const store_1 = __webpack_require__(17);
	ReactDOM.render(React.createElement(react_redux_1.Provider, {store: store_1.store}, 
	    React.createElement(app_1.default, null)
	), document.getElementById("wrapper"));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ReactRedux;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const React = __webpack_require__(1);
	const react_redux_1 = __webpack_require__(3);
	const controls_1 = __webpack_require__(5);
	const navigation_1 = __webpack_require__(7);
	const characteristics_1 = __webpack_require__(9);
	const upperBlock_1 = __webpack_require__(12);
	const schemes_1 = __webpack_require__(15);
	const formulas_1 = __webpack_require__(20);
	const actions_1 = __webpack_require__(16);
	class App extends React.Component {
	    constructor(props) {
	        super(props);
	        this.state = { selectedExpression: 'pk' };
	    }
	    render() {
	        const { selectedValue, currentModelId, a, m, V, N, y, dispatch } = this.props;
	        return (React.createElement("div", {className: "container", onMouseOver: e => this.onMouseOverSidebar(e)}, 
	            React.createElement("div", {className: "sidebar"}, 
	                React.createElement(navigation_1.Navigation, {setModel: (id) => dispatch(actions_1.setCurrentModelAction(id))}), 
	                React.createElement(characteristics_1.Characteristics, {currentModelId: currentModelId, a: a, m: m, V: V, N: N, y: y}), 
	                React.createElement(formulas_1.Formulas, {modelId: currentModelId + 1, for: this.state.selectedExpression})), 
	            React.createElement("div", {id: "content"}, 
	                React.createElement(upperBlock_1.UpperBlock, {currentModelId: currentModelId, selectedValue: selectedValue, a: a, m: m, V: V, N: N, y: y, setSelectedValue: (value) => dispatch(actions_1.setSelectedValue(value))}), 
	                React.createElement("div", {id: "bottom"}, 
	                    React.createElement(controls_1.Controls, {currentModelId: currentModelId, a: a, setA: (value) => dispatch(actions_1.setA(value)), m: m, setM: (value) => dispatch(actions_1.setM(value)), V: V, setV: (value) => dispatch(actions_1.setV(value)), N: N, setN: (value) => dispatch(actions_1.setN(value)), y: y, setY: (value) => dispatch(actions_1.setY(value))}), 
	                    React.createElement(schemes_1.Schemes, {modelId: currentModelId + 1})))));
	    }
	    onMouseOverSidebar(event) {
	        const target = event.target;
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = react_redux_1.connect((state) => Object.assign({}, state))(App);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const React = __webpack_require__(1);
	const circularRangeInput_1 = __webpack_require__(6);
	class Controls extends React.Component {
	    constructor(props) {
	        super(props);
	    }
	    render() {
	        const { currentModelId, a, m, V, N, y } = this.props;
	        var result = React.createElement("div", null);
	        switch (currentModelId) {
	            case 0:
	            case 1:
	                result = (React.createElement("div", {className: "controls"}, 
	                    React.createElement(circularRangeInput_1.CircularRangeInput, {key: "y", label: "λ", defaultValue: y, min: 1, max: currentModelId == 0 ? m : 100, tmin: 1, tmax: 100, setValue: this.props.setY}), 
	                    React.createElement(circularRangeInput_1.CircularRangeInput, {key: "m", label: "μ", defaultValue: m, min: currentModelId == 0 ? y : 1, max: 100, tmin: 1, tmax: 100, setValue: this.props.setM})));
	                break;
	            case 2:
	            case 3:
	                var cond = y / (m * V);
	                result = (React.createElement("div", {className: "controls"}, 
	                    React.createElement(circularRangeInput_1.CircularRangeInput, {key: "y", label: "λ", defaultValue: y, min: 1, max: m * V, tmin: 1, tmax: 100, setValue: this.props.setY}), 
	                    React.createElement(circularRangeInput_1.CircularRangeInput, {key: "m", label: "μ", defaultValue: m, min: Math.ceil(y / V), max: 100, tmin: 1, tmax: 100, setValue: this.props.setM}), 
	                    React.createElement(circularRangeInput_1.CircularRangeInput, {key: "V", label: "V", defaultValue: V, min: Math.ceil(y / m), max: 100, tmin: 1, tmax: 100, setValue: this.props.setV})));
	                break;
	            case 4:
	                result = (React.createElement("div", {className: "controls"}, 
	                    React.createElement(circularRangeInput_1.CircularRangeInput, {key: "m", label: "μ", defaultValue: m, min: 1, max: 100, tmin: 1, tmax: 100, setValue: this.props.setM}), 
	                    React.createElement(circularRangeInput_1.CircularRangeInput, {key: "a", label: "α", defaultValue: a, min: 0.01, max: 0.99, tmin: 0.01, tmax: 0.99, setValue: this.props.setA}), 
	                    React.createElement(circularRangeInput_1.CircularRangeInput, {key: "V", label: "V", defaultValue: V, min: 1, max: 100, tmin: 1, tmax: 100, setValue: this.props.setV}), 
	                    React.createElement(circularRangeInput_1.CircularRangeInput, {key: "N", label: "N", defaultValue: N, min: 1, max: 100, tmin: 1, tmax: 100, setValue: this.props.setN})));
	                break;
	        }
	        return result;
	    }
	}
	exports.Controls = Controls;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const React = __webpack_require__(1);
	class CircularRangeInput extends React.Component {
	    constructor(props) {
	        super(props);
	        this.refsHolder = {};
	        this.startAngleDegrees = -70;
	        this.startAngle = this.startAngleDegrees * (Math.PI / 180);
	        this.endAngleDegrees = 250;
	        this.endAngle = this.endAngleDegrees * (Math.PI / 180);
	        this.minThresholdAngle = 0;
	        this.maxThresholdAngle = 0;
	        this.size = 150;
	        this.primaryColor = '#d70048';
	        this.commonColor = '#2f2f2f';
	        this.textColor = '#777';
	        this.textFocusColor = 'rgba(255, 255, 255, 0.87)';
	        this.font = 'Raleway';
	        this.commonFont = 'Titillium Web';
	        this.min = 0;
	        this.max = 0;
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
	    componentWillReceiveProps(nextProps) {
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
	            });
	    }
	    componentDidMount() {
	        this.updateCanvas();
	    }
	    componentDidUpdate() {
	        this.updateCanvas();
	    }
	    valueToAngle(value) {
	        var field = this.props.tmax - this.props.tmin;
	        var step = (this.endAngle + Math.abs(this.startAngle)) / field;
	        var angle = step * value;
	        var result = this.startAngle + angle;
	        if (result > this.endAngle)
	            return this.endAngle;
	        return result;
	    }
	    angleToValue(angle) {
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
	        return (React.createElement("canvas", {ref: canvas => this.refsHolder.canvas = canvas, width: this.size, height: this.size, onMouseMove: e => this.handleMove(e), onMouseDown: e => this.handleMouseButton(e), onMouseUp: e => this.handleMouseButton(e), onMouseLeave: _ => this.handleMouseLeave(), className: "pointer"}));
	    }
	    handleMouseLeave() {
	        this.setState({
	            value: this.state.value,
	            active: false
	        });
	    }
	    handleMouseButton(event) {
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
	    handleMove(event) {
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
	    changeValue(x, y) {
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
	CircularRangeInput.defaultProps = {
	    label: '-',
	    min: 0,
	    max: 100,
	    tmin: 0,
	    tmax: 100,
	    defaultValue: 50,
	    setValue: null
	};
	CircularRangeInput.propTypes = {
	    label: React.PropTypes.string.isRequired,
	    min: React.PropTypes.number,
	    max: React.PropTypes.number,
	    defaultValue: React.PropTypes.number.isRequired,
	    setValue: React.PropTypes.func.isRequired
	};
	exports.CircularRangeInput = CircularRangeInput;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const React = __webpack_require__(1);
	const navigationItem_1 = __webpack_require__(8);
	class Navigation extends React.Component {
	    constructor(props) {
	        super(props);
	        this.labels = ['M/M/1', 'M/M/∞', 'M/M/V', 'M/M/V/K', 'M/M/V/K/N'];
	        this.state = { hoveredItemId: 4, selectedItemId: 4 };
	    }
	    render() {
	        var hoverClass = 'hover _' + this.state.hoveredItemId;
	        var selectorClass = 'selector _' + this.state.selectedItemId;
	        var items = [];
	        for (var i = 0; i < 5; i++)
	            items.push(React.createElement(navigationItem_1.NavigationItem, {selected: i == this.state.selectedItemId, hovered: i == this.state.hoveredItemId, label: this.labels[i], index: i}));
	        return (React.createElement("div", {id: "navigation", onMouseMove: e => this.onMouseEvent(e), onMouseDown: e => this.onMouseEvent(e)}, 
	            React.createElement("div", {className: selectorClass}), 
	            React.createElement("div", {className: hoverClass}), 
	            items));
	    }
	    onMouseEvent(event) {
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
	exports.Navigation = Navigation;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const React = __webpack_require__(1);
	class NavigationItem extends React.Component {
	    constructor(props) {
	        super(props);
	        this.state = {};
	    }
	    render() {
	        const { index, label, selected, hovered } = this.props;
	        let style = {};
	        if (selected)
	            style = { 'color': 'rgba(255, 255, 255, 0.87)' };
	        else if (hovered)
	            style = { 'color': '#999' };
	        return (React.createElement("div", {className: selected ? 'item selected' : 'item'}, 
	            React.createElement("div", {className: "label", style: style}, label), 
	            React.createElement("img", {src: './img/scheme' + (index + 1) + (selected ? '-white' : '') + '.svg', alt: 'scheme' + index})));
	    }
	    itemBackground(color) {
	        switch (this.props.index) {
	            case 0:
	                return (React.createElement("svg", {xmlns: "http://www.w3.org/2000/svg", width: "199px", height: "35px", version: "1.1"}, 
	                    React.createElement("defs", null), 
	                    React.createElement("g", {transform: "translate(0.5,0.5)"}, 
	                        React.createElement("path", {d: "M 158 16 L 177.76 16", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 185.76 16 L 177.76 18.67 L 177.76 13.33 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "133", cy: "16", rx: "15", ry: "15", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 122.29 26.71 L 143.71 5.29", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 122.29 5.29 L 143.71 26.71", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 8 16 L 27.76 16", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 35.76 16 L 27.76 18.67 L 27.76 13.33 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("rect", {x: "55", y: "1", width: "9", height: "30", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("rect", {x: "46", y: "1", width: "9", height: "30", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("rect", {x: "73", y: "1", width: "9", height: "30", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 88 16 L 102.76 16", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 110.76 16 L 102.76 18.67 L 102.76 13.33 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("rect", {x: "64", y: "1", width: "9", height: "30", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}))));
	            case 1:
	                return (React.createElement("svg", {xmlns: "http://www.w3.org/2000/svg", width: "219px", height: "44px", version: "1.1"}, 
	                    React.createElement("defs", null), 
	                    React.createElement("g", {transform: "translate(0.5,0.5)"}, 
	                        React.createElement("rect", {x: "108", y: "1", width: "60", height: "40", rx: "6", ry: "6", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 178 21 L 197.76 21", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 205.76 21 L 197.76 23.67 L 197.76 18.33 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "122", cy: "22", rx: "7.5", ry: "7.5", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 116.14 26.86 L 126.86 16.14", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 116.14 16.14 L 126.86 26.86", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "143", cy: "22", rx: "7.5", ry: "7.5", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 137.14 26.86 L 147.86 16.14", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 137.14 16.14 L 147.86 26.86", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "155", cy: "26", rx: "1", ry: "1", fill: "#444", stroke: "none", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "158", cy: "26", rx: "1", ry: "1", fill: "#444", stroke: "none", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "161", cy: "26", rx: "1", ry: "1", fill: "#444", stroke: "none", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 0 21 L 17.76 21", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 25.76 21 L 17.76 23.67 L 17.76 18.33 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("rect", {x: "45", y: "6", width: "9", height: "30", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("rect", {x: "36", y: "6", width: "9", height: "30", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("rect", {x: "63", y: "6", width: "9", height: "30", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 78 21 L 92.76 21", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 100.76 21 L 92.76 23.67 L 92.76 18.33 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("rect", {x: "54", y: "6", width: "9", height: "30", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}))));
	            case 2:
	                return (React.createElement("svg", {xmlns: "http://www.w3.org/2000/svg", width: "219px", height: "44px", version: "1.1"}, 
	                    React.createElement("defs", null), 
	                    React.createElement("g", {transform: "translate(0.5,0.5)"}, 
	                        React.createElement("rect", {x: "108", y: "1", width: "60", height: "40", rx: "6", ry: "6", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 178 21 L 197.76 21", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 205.76 21 L 197.76 23.67 L 197.76 18.33 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "122", cy: "22", rx: "7.5", ry: "7.5", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 116.14 26.86 L 126.86 16.14", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 116.14 16.14 L 126.86 26.86", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "143", cy: "22", rx: "7.5", ry: "7.5", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 137.14 26.86 L 147.86 16.14", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 137.14 16.14 L 147.86 26.86", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "155", cy: "26", rx: "1", ry: "1", fill: "#444", stroke: "none", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "158", cy: "26", rx: "1", ry: "1", fill: "#444", stroke: "none", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "161", cy: "26", rx: "1", ry: "1", fill: "#444", stroke: "none", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 0 21 L 17.76 21", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 25.76 21 L 17.76 23.67 L 17.76 18.33 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("rect", {x: "45", y: "6", width: "9", height: "30", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("rect", {x: "36", y: "6", width: "9", height: "30", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("rect", {x: "63", y: "6", width: "9", height: "30", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 78 21 L 92.76 21", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 100.76 21 L 92.76 23.67 L 92.76 18.33 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("rect", {x: "54", y: "6", width: "9", height: "30", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}))));
	            case 3:
	                return (React.createElement("svg", {xmlns: "http://www.w3.org/2000/svg", width: "219px", height: "62px", version: "1.1"}, 
	                    React.createElement("defs", null), 
	                    React.createElement("g", {transform: "translate(0.5,0.5)"}, 
	                        React.createElement("rect", {x: "48", y: "1", width: "120", height: "40", rx: "6", ry: "6", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 178 21 L 197.76 21", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 205.76 21 L 197.76 23.67 L 197.76 18.33 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "68", cy: "21", rx: "10", ry: "10", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 60.86 28.14 L 75.14 13.86", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 60.86 13.86 L 75.14 28.14", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "98", cy: "21", rx: "10", ry: "10", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 90.86 28.14 L 105.14 13.86", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 90.86 13.86 L 105.14 28.14", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "148", cy: "21", rx: "10", ry: "10", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 140.86 28.14 L 155.14 13.86", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 140.86 13.86 L 155.14 28.14", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "116", cy: "27", rx: "1", ry: "1", fill: "#444", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "123", cy: "27", rx: "1", ry: "1", fill: "#444", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "130", cy: "27", rx: "1", ry: "1", fill: "#444", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 37.91 26.09 L 27.91 26.09 Q 17.91 26.09 17.91 33.42 L 17.91 40.74", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 17.91 48.74 L 15.24 40.74 L 20.57 40.74 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 8 21 L 27.76 21", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 35.76 21 L 27.76 17 L 27.76 21 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 8 21 L 27.76 21", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 35.76 21 L 27.76 17 L 27.76 21 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}))));
	            case 4:
	                return (React.createElement("svg", {width: "219px", height: "45px", version: "1.1"}, 
	                    React.createElement("defs", null), 
	                    React.createElement("g", null, 
	                        React.createElement("path", {d: "M 8 21 L 27.76 21", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 35.76 21 L 27.76 23.67 L 27.76 18.33 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("rect", {x: "48", y: "1", width: "120", height: "40", rx: "6", ry: "6", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 178 21 L 197.76 21", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 205.76 21 L 197.76 23.67 L 197.76 18.33 Z", fill: "#444", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "68", cy: "21", rx: "10", ry: "10", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 60.86 28.14 L 75.14 13.86", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 60.86 13.86 L 75.14 28.14", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "98", cy: "21", rx: "10", ry: "10", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 90.86 28.14 L 105.14 13.86", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 90.86 13.86 L 105.14 28.14", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "148", cy: "21", rx: "10", ry: "10", fill: "none", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 140.86 28.14 L 155.14 13.86", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("path", {d: "M 140.86 13.86 L 155.14 28.14", fill: "none", stroke: "#444", "stroke-width": "2", "stroke-miterlimit": "10", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "116", cy: "27", rx: "1", ry: "1", fill: "#000000", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "123", cy: "27", rx: "1", ry: "1", fill: "#000000", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}), 
	                        React.createElement("ellipse", {cx: "130", cy: "27", rx: "1", ry: "1", fill: "#000000", stroke: "#444", "stroke-width": "2", "pointer-events": "none"}))));
	            default:
	                return React.createElement("svg", null);
	        }
	    }
	}
	exports.NavigationItem = NavigationItem;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const React = __webpack_require__(1);
	const characteristicRange_1 = __webpack_require__(10);
	const math_1 = __webpack_require__(11);
	class Characteristics extends React.Component {
	    constructor(props) {
	        super(props);
	    }
	    render() {
	        const { currentModelId, a, m, V, N, y } = this.props;
	        let result = React.createElement("div", null);
	        switch (currentModelId) {
	            case 0:
	            case 1:
	                {
	                    let d = y / m;
	                    let k = currentModelId == 0 ? d / (1 - d) : d;
	                    let t = currentModelId == 0 ? (1 / m) / (1 - d) : 1 / m;
	                    result = (React.createElement("div", {className: "characteristics"}, 
	                        React.createElement("div", {className: "item text", id: "k"}, 
	                            React.createElement("div", {className: "label inline"}, 
	                                "K", 
	                                React.createElement("sub", null, "ср"), 
	                                " = ", 
	                                k === Infinity ? '∞' : parseFloat(k.toFixed(5)), 
	                                "  ")
	                        ), 
	                        React.createElement("div", {className: "item text", id: "t"}, 
	                            React.createElement("div", {className: "label inline"}, 
	                                "T", 
	                                React.createElement("sub", null, "ср"), 
	                                " = ", 
	                                t === Infinity ? '∞' : parseFloat(t.toFixed(5)), 
	                                "  ")
	                        )));
	                }
	                break;
	            case 2:
	                {
	                    let ro = y / m;
	                    let s = 1 / (m * (V - ro));
	                    let j = y * s;
	                    let u = (Math.pow(ro, V) / math_1.f(V)) * (V / (V - ro));
	                    let sum = 0;
	                    for (let x = 0; x < V - 1; x++) {
	                        sum += Math.pow(ro, x) / math_1.f(x);
	                    }
	                    sum += (Math.pow(ro, V) / math_1.f(V)) * (V / (V - ro));
	                    let Pt = u / sum;
	                    result = (React.createElement("div", {className: "characteristics"}, 
	                        React.createElement("div", {className: "item", id: "pt"}, 
	                            React.createElement("div", {className: "label b-round"}, 
	                                "P", 
	                                React.createElement("sub", null, "t")), 
	                            React.createElement(characteristicRange_1.CharacteristicRange, {value: Pt, width: 155, height: 30, min: 0, max: 1})), 
	                        React.createElement("div", {className: "item text", id: "s"}, 
	                            React.createElement("div", {className: "label inline"}, 
	                                "Ϫ", 
	                                React.createElement("sub", null, "ср"), 
	                                " = ", 
	                                parseFloat(s.toFixed(5)), 
	                                "  ")
	                        ), 
	                        React.createElement("div", {className: "item text", id: "j"}, 
	                            React.createElement("div", {className: "label inline"}, 
	                                "j", 
	                                React.createElement("sub", null, "ср"), 
	                                " = ", 
	                                parseFloat(j.toFixed(5)), 
	                                "  ")
	                        )));
	                }
	                break;
	            case 3:
	                {
	                    let ro = y / m;
	                    let u = Math.pow(ro, V) / math_1.f(V);
	                    let d = 0;
	                    for (let x = 0; x <= V; x++)
	                        d += Math.pow(ro, x) / math_1.f(x);
	                    let Pt = u / d;
	                    result = (React.createElement("div", {className: "characteristics"}, 
	                        React.createElement("div", {className: "item", id: "pt"}, 
	                            React.createElement("div", {className: "label b"}, 
	                                "P", 
	                                React.createElement("sub", null, "t/b")), 
	                            React.createElement(characteristicRange_1.CharacteristicRange, {value: Pt, width: 140, height: 30, min: 0, max: 1}))
	                    ));
	                }
	                break;
	            case 4:
	                {
	                    let dt = 0, db = 0;
	                    let p = a / (1 - a);
	                    for (let i = 0; i < V + 1; i++)
	                        dt += math_1.C(N, i) * Math.pow(p, i);
	                    let Pt = math_1.C(N, V) * Math.pow(p, V) / dt;
	                    let d = 0;
	                    for (let i = 0; i < V + 1; i++)
	                        d += math_1.C(N - 1, i) * Math.pow(a / (1 - a), i);
	                    let Pb = math_1.C(N - 1, V) * Math.pow(a / (1 - a), V) / d;
	                    result = (React.createElement("div", {className: "characteristics"}, 
	                        React.createElement("div", {className: "item", id: "pb"}, 
	                            React.createElement("div", {className: "label b-round"}, 
	                                "P", 
	                                React.createElement("sub", null, "b")), 
	                            React.createElement(characteristicRange_1.CharacteristicRange, {value: Pb, width: 155, height: 30, min: 0, max: 1})), 
	                        React.createElement("div", {className: "item", id: "pt"}, 
	                            React.createElement("div", {className: "label a"}, 
	                                "P", 
	                                React.createElement("sub", null, "t")), 
	                            React.createElement(characteristicRange_1.CharacteristicRange, {value: Pt, width: 155, height: 30, min: 0, max: 1}))));
	                }
	                break;
	        }
	        return result;
	    }
	}
	exports.Characteristics = Characteristics;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const React = __webpack_require__(1);
	class CharacteristicRange extends React.Component {
	    constructor(props) {
	        super(props);
	        this.refsHolder = {};
	        setTimeout(_ => { this.forceUpdate(); }, 250);
	    }
	    componentWillReceiveProps(nextProps) {
	    }
	    componentDidMount() {
	        this.updateCanvas();
	    }
	    componentDidUpdate() {
	        this.updateCanvas();
	    }
	    updateCanvas() {
	        const { value, width, height, min, max } = this.props;
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
	    roundRect(ctx, x, y, width, height, r, fill, stroke) {
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
	        return (React.createElement("canvas", {ref: canvas => this.refsHolder.canvas = canvas, width: width, height: height}));
	    }
	}
	exports.CharacteristicRange = CharacteristicRange;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	function f(i) {
	    if (i == 1 || i == 0)
	        return 1;
	    var ret = 1;
	    for (var j = 1; j <= i; ++j) {
	        ret *= j;
	    }
	    return ret;
	}
	exports.f = f;
	function C(n, k) {
	    return this.f(n) / (this.f(k) * this.f(n - k));
	}
	exports.C = C;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const React = __webpack_require__(1);
	const chart_1 = __webpack_require__(13);
	class UpperBlock extends React.Component {
	    constructor(props) {
	        super(props);
	        this.refsHolder = {};
	        this.stateInfoX = 100;
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
	        let key = React.createElement("div", {id: "key"}, 
	            "P", 
	            React.createElement("sub", null, selectedChartItem));
	        if (currentModelId == 2 && selectedChartItem >= V)
	            key = React.createElement("div", {id: "key"}, 
	                "W", 
	                React.createElement("sub", null, selectedChartItem - V));
	        return (React.createElement("div", {id: "upper"}, 
	            React.createElement("div", {className: "header"}, 
	                React.createElement("div", {id: "state", ref: element => this.refsHolder.stateInfo = element, style: { 'transform': 'translate(' + this.stateInfoX + 'px, 0)' }, className: hiddenStateInfo ? 'hidden' : ''}, 
	                    key, 
	                    React.createElement("div", {id: "value"}, selectedValue)), 
	                React.createElement("div", {className: hiddenOptions ? 'hidden' : '', id: "options"}, 
	                    React.createElement("div", {id: "oLineChart", className: "svg-line-chart", onClick: e => this.onOptionClicked(e)}), 
	                    React.createElement("div", {id: "oScissors", className: "svg-scissors active", onClick: e => this.onOptionClicked(e)}), 
	                    React.createElement("div", {id: "oCurve", className: "svg-curve active", onClick: e => this.onOptionClicked(e)}))), 
	            React.createElement("div", {id: "pk", className: "chart-holder", onMouseEnter: e => this.handleMouseEnterLeave(e), onMouseLeave: e => this.handleMouseEnterLeave(e), onMouseMove: e => this.handleMouseMove(e)}, 
	                React.createElement(chart_1.Chart, {width: 824, height: 260, currentModelId: currentModelId, a: a, m: m, V: V, N: N, y: y, isCurvy: isChartCurvy, isCutted: isChartCutted, showSubcharts: showSubcharts, selectedItem: selectedChartItem, setSelectedValue: setSelectedValue})
	            )));
	    }
	    handleMouseMove(event) {
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
	    onOptionClicked(event) {
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
	    handleMouseEnterLeave(event) {
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
	exports.UpperBlock = UpperBlock;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const React = __webpack_require__(1);
	const d3 = __webpack_require__(14);
	const math_1 = __webpack_require__(11);
	class Chart extends React.Component {
	    constructor(props) {
	        super(props);
	        this.primaryColor = '#212121';
	        this.curve = d3.curveMonotoneX;
	    }
	    componentWillReceiveProps(nextProps) {
	    }
	    render() {
	        const { setSelectedValue, currentModelId, width, height, isCurvy, isCutted, showSubcharts, selectedItem } = this.props;
	        this.curve = isCurvy ? d3.curveMonotoneX : d3.curveLinear;
	        let data = this.calculate();
	        let y = d3.scaleLinear()
	            .domain([0, isCutted ? this.max(data) : 1.0])
	            .range([height - 15, 10]);
	        let subchartsData = [];
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
	        let circles = [];
	        let circleRadius = Math.max(Math.min(4 * 10 / data.length, 4), 2);
	        let circleFill = data.length >= 35 ? '#fff' : '#212121';
	        let circleStroke = data.length >= 35 ? 'none' : '#fff';
	        const circleStrokeWidth = 2;
	        let captions = [];
	        let captionFontSize = Math.min(12 * 50 / data.length, 12);
	        let captionFill = 'rgb(72, 72, 78)';
	        const captionFont = 'consolas';
	        let lines = [];
	        let lineColor = captionFill;
	        let lineWidth = 0.5;
	        let additional = null;
	        let subcharts = null;
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
	            additional = (React.createElement("g", null, 
	                React.createElement("path", {d: pathA, strokeDasharray: strokeDash + ', ' + strokeDash, fill: 'none', stroke: strokeColor, strokeWidth: 3}), 
	                React.createElement("path", {d: pathB, fill: 'none', stroke: strokeColor, strokeWidth: 3})));
	            let ptY = y(pt[1]);
	            subcharts = (React.createElement("line", {x1: 0, x2: width, y1: ptY, y2: ptY, strokeDasharray: '5, 5', stroke: '#eee', strokeWidth: '1'}));
	        }
	        else if (currentModelId == 3) {
	            let pt = subchartsData[0];
	            let ptY = y(pt[1]);
	            subcharts = (React.createElement("line", {x1: 0, x2: width, y1: ptY, y2: ptY, strokeDasharray: '5, 5', stroke: '#eee', strokeWidth: '1'}));
	        }
	        else if (currentModelId == 4) {
	            let pb = subchartsData[0];
	            let pt = subchartsData[1];
	            let ptB = y(pb[1]);
	            let ptY = y(pt[1]);
	            subcharts = (React.createElement("g", null, 
	                React.createElement("line", {x1: 0, x2: width, y1: ptB, y2: ptB, strokeDasharray: '5, 5', stroke: '#eee', strokeWidth: '1'}), 
	                React.createElement("line", {x1: 0, x2: width, y1: ptY, y2: ptY, stroke: '#eee', strokeWidth: '1'})));
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
	            circles.push(React.createElement("circle", {r: circleRadius, cx: _x, cy: _y}));
	            if (data.length <= 70) {
	                if (i == selectedItem)
	                    captions.push(React.createElement("text", {fill: 'rgba(255, 255, 255, 0.87)', x: _x, y: height}, d[0]));
	                else
	                    captions.push(React.createElement("text", {x: _x, y: height}, d[0]));
	                if (_y <= height - 20) {
	                    if (i == selectedItem)
	                        lines.push(React.createElement("line", {stroke: 'white', x1: _x, y1: _y + circleRadius * 2, x2: _x, y2: height - captionFontSize}));
	                    else
	                        lines.push(React.createElement("line", {x1: _x, y1: _y + circleRadius * 2, x2: _x, y2: height - captionFontSize}));
	                }
	            }
	        }
	        captions.pop();
	        captions.shift();
	        lines.shift();
	        return (React.createElement("svg", {width: width, height: height}, 
	            additional, 
	            React.createElement("g", null, 
	                React.createElement("path", {d: areaPath, fill: this.primaryColor, stroke: 'none', strokeWidth: 3})
	            ), 
	            React.createElement("g", {fill: circleFill, stroke: circleStroke, strokeWidth: circleStrokeWidth}, circles), 
	            React.createElement("g", {textAnchor: 'middle', fontFamily: captionFont, fontSize: captionFontSize, fill: captionFill}, captions), 
	            React.createElement("g", {stroke: lineColor, strokeWidth: lineWidth}, lines), 
	            showSubcharts ? subcharts : []));
	    }
	    max(data) {
	        let max = 0;
	        for (let d of data) {
	            if (d[1] > max)
	                max = d[1];
	        }
	        return max;
	    }
	    calculate() {
	        const { currentModelId, a, m, V, N, y } = this.props;
	        switch (currentModelId) {
	            case 0:
	                {
	                    let ro = y / m;
	                    let result = [];
	                    for (let i = 0; i <= V + 5; i++)
	                        result.push([i, (1 - ro) * Math.pow(ro, i)]);
	                    return result;
	                }
	            case 1:
	                {
	                    let ro = y / m;
	                    let result = [];
	                    for (let i = 0; i <= V + 5; i++)
	                        result.push([i, (Math.pow(ro, i) / math_1.f(i)) * Math.pow(Math.E, -ro)]);
	                    return result;
	                }
	            case 2:
	                {
	                    let ro = y / m;
	                    let result = [];
	                    for (let i = 0; i <= V * 2; i++) {
	                        let v = 0;
	                        if (i <= V) {
	                            let u = Math.pow(ro, i) / math_1.f(i);
	                            let s = 0;
	                            for (let j = 0; j < V - 1; j++) {
	                                s += Math.pow(ro, j) / math_1.f(j);
	                            }
	                            let d = s + (Math.pow(ro, V) / math_1.f(V)) * (V / (V - ro));
	                            v = u / d;
	                        }
	                        else {
	                            let j = i - V;
	                            let u = (Math.pow(ro, V) / math_1.f(V)) * Math.pow(ro / V, j);
	                            let s = 0;
	                            for (let x = 0; x < V - 1; x++) {
	                                s += Math.pow(ro, x) / math_1.f(x);
	                            }
	                            let d = s + (Math.pow(ro, V) / math_1.f(V)) * (V / (V - ro));
	                            v = u / d;
	                        }
	                        result.push([i, v]);
	                    }
	                    let dt = 0;
	                    for (let x = 0; x < V - 1; x++) {
	                        dt += Math.pow(ro, x) / math_1.f(x);
	                    }
	                    dt += (Math.pow(ro, V) / math_1.f(V)) * (V / (V - ro));
	                    result.push([0, (Math.pow(ro, V) / math_1.f(V)) * (V / (V - ro)) / dt]);
	                    return result;
	                }
	            case 3:
	                {
	                    let ro = y / m;
	                    let result = [];
	                    let dt = 0;
	                    for (let i = 0; i <= V; i++) {
	                        let u = Math.pow(ro, i) / math_1.f(i);
	                        dt += u;
	                        let d = 0;
	                        for (let x = 0; x <= V; x++) {
	                            d += Math.pow(ro, x) / math_1.f(x);
	                        }
	                        result.push([i, u / d]);
	                    }
	                    result.push([0, (Math.pow(ro, V) / math_1.f(V)) / dt]);
	                    return result;
	                }
	            case 4:
	                {
	                    let result = [];
	                    let dt = 0, db = 0;
	                    for (let i = 0; i <= V; i++) {
	                        let d = 0;
	                        dt += math_1.C(N, i) * Math.pow(a / (1 - a), i);
	                        db += math_1.C(N - 1, i) * Math.pow(a / (1 - a), i);
	                        for (let j = 0; j <= V; j++)
	                            d += math_1.C(N, j) * Math.pow(a / (1 - a), j);
	                        result.push([i, math_1.C(N, i) * Math.pow(a / (1 - a), i) / d]);
	                    }
	                    result.push([0, math_1.C(N, V) * Math.pow(a / (1 - a), V) / dt]);
	                    result.push([0, math_1.C(N - 1, V) * Math.pow(a / (1 - a), V) / db]);
	                    return result;
	                }
	            default:
	                return null;
	        }
	    }
	}
	exports.Chart = Chart;
	class ChartInstance {
	    constructor(parent, props) {
	    }
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = d3;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const React = __webpack_require__(1);
	class Schemes extends React.Component {
	    constructor(props) {
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
	        return (React.createElement("div", {className: "schemes"}, 
	            React.createElement("svg", {width: diagramWidth, height: "123.6px", id: "diagram", onMouseLeave: e => this.onMouseLeave(e), onMouseEnter: e => this.onMouseEnter(e)}, this.renderDiagram(textColor[diagramColorIdx], shapeColor[diagramColorIdx])), 
	            React.createElement("svg", {width: schemeWidth, height: "94px", id: "scheme", onMouseLeave: e => this.onMouseLeave(e), onMouseEnter: e => this.onMouseEnter(e)}, this.renderScheme(textColor[schemeColorIdx], shapeColor[schemeColorIdx]))));
	    }
	    renderScheme(textColor, shapeColor) {
	        switch (this.props.modelId) {
	            case 1:
	                return (React.createElement("g", {transform: "translate(0.5,0.5)"}, 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontSize: "12px", fontFamily: "consolas"}, 
	                        React.createElement("g", {transform: "translate(80, 0)"}, 
	                            React.createElement("text", {x: "123", y: "30", fontSize: "13px"}, "μ")
	                        ), 
	                        React.createElement("text", {x: "161", y: "16"}, "M"), 
	                        React.createElement("text", {x: "161", y: "70"}, "1"), 
	                        React.createElement("text", {x: "23", y: "32", fontSize: "13px"}, "λ"), 
	                        React.createElement("text", {x: "80", y: "73", fontSize: "15px"}, "∞")), 
	                    React.createElement("g", {fill: shapeColor, stroke: shapeColor, strokeWidth: "2", strokeMiterlimit: "10"}, 
	                        React.createElement("path", {d: "M 8 41 L 37.76 41", fill: "none"}), 
	                        React.createElement("path", {d: "M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z"}), 
	                        React.createElement("g", {transform: "translate(87, 0)"}, 
	                            React.createElement("path", {d: "M 24 41 L 37.76 41", fill: "none"}), 
	                            React.createElement("path", {d: "M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z"})), 
	                        React.createElement("rect", {x: "53", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("rect", {x: "64", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("rect", {x: "75", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("rect", {x: "86", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("rect", {x: "97", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("g", {transform: "translate(80, 0)"}, 
	                            React.createElement("path", {d: "M 108 41 L 137.76 41", fill: "none"}), 
	                            React.createElement("path", {d: "M 145.76 41 L 137.76 43.67 L 137.76 38.33 Z"}), 
	                            React.createElement("g", {transform: "translate(10, 27)"}, 
	                                React.createElement("ellipse", {cx: "71", cy: "13", rx: "18", ry: "18", fill: "none"}), 
	                                React.createElement("path", {d: "M 58.32 0.32 L 83.68 25.68", fill: "none"}), 
	                                React.createElement("path", {d: "M 83.68 0.32 L 58.32 26", fill: "none"}))))));
	            case 2:
	                return (React.createElement("g", {transform: "translate(0.5,0.5)"}, 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontSize: "12px", fontFamily: "consolas"}, 
	                        React.createElement("g", {transform: "translate(80, 0)"}, 
	                            React.createElement("text", {x: "87", y: "16.5"}, "1"), 
	                            React.createElement("text", {x: "87", y: "36.5"}, "2"), 
	                            React.createElement("text", {x: "87", y: "56.5"}, "3"), 
	                            React.createElement("text", {x: "123", y: "30", fontSize: "13px"}, "μ"), 
	                            React.createElement("text", {x: "128", y: "56"}, "B(t)-M")), 
	                        React.createElement("text", {x: "157", y: "93"}, "V→∞"), 
	                        React.createElement("text", {x: "23", y: "32", fontSize: "13px"}, "λ"), 
	                        React.createElement("text", {x: "28", y: "56"}, "A(t)-M"), 
	                        React.createElement("text", {x: "80", y: "73"}, "l→∞")), 
	                    React.createElement("g", {fill: shapeColor, stroke: shapeColor, strokeWidth: "2", strokeMiterlimit: "10"}, 
	                        React.createElement("path", {d: "M 8 41 L 37.76 41", fill: "none"}), 
	                        React.createElement("path", {d: "M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z"}), 
	                        React.createElement("g", {transform: "translate(87, 0)"}, 
	                            React.createElement("path", {d: "M 24 41 L 37.76 41", fill: "none"}), 
	                            React.createElement("path", {d: "M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z"})), 
	                        React.createElement("rect", {x: "53", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("rect", {x: "64", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("rect", {x: "75", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("rect", {x: "86", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("rect", {x: "97", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("g", {transform: "translate(80, 0)"}, 
	                            React.createElement("rect", {x: "58", y: "1", width: "40", height: "80", rx: "6", ry: "6", fill: "none"}), 
	                            React.createElement("path", {d: "M 108 41 L 137.76 41", fill: "none"}), 
	                            React.createElement("path", {d: "M 145.76 41 L 137.76 43.67 L 137.76 38.33 Z"}), 
	                            React.createElement("ellipse", {cx: "71", cy: "13", rx: "8", ry: "8", fill: "none"}), 
	                            React.createElement("path", {d: "M 65.32 7.32 L 76.68 18.68", fill: "none"}), 
	                            React.createElement("path", {d: "M 76.68 7.32 L 65.32 18.68", fill: "none"}), 
	                            React.createElement("ellipse", {cx: "71", cy: "33", rx: "8", ry: "8", fill: "none"}), 
	                            React.createElement("path", {d: "M 65.32 27.32 L 76.68 38.68", fill: "none"}), 
	                            React.createElement("path", {d: "M 76.68 27.32 L 65.32 38.68", fill: "none"}), 
	                            React.createElement("g", {transform: "translate(0, 20)"}, 
	                                React.createElement("ellipse", {cx: "71", cy: "33", rx: "8", ry: "8", fill: "none"}), 
	                                React.createElement("path", {d: "M 65.32 27.32 L 76.68 38.68", fill: "none"}), 
	                                React.createElement("path", {d: "M 76.68 27.32 L 65.32 38.68", fill: "none"}), 
	                                React.createElement("ellipse", {cx: "71", cy: "47", rx: "0.5", ry: "0.5"}), 
	                                React.createElement("ellipse", {cx: "71", cy: "51", rx: "0.5", ry: "0.5"}), 
	                                React.createElement("ellipse", {cx: "71", cy: "55", rx: "0.5", ry: "0.5"}))))));
	            case 3:
	                return (React.createElement("g", {transform: "translate(0.5,10.5)"}, 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontSize: "12px", fontFamily: "consolas"}, 
	                        React.createElement("g", {transform: "translate(80, 0)"}, 
	                            React.createElement("text", {x: "87", y: "16.5"}, "1"), 
	                            React.createElement("text", {x: "87", y: "36.5"}, "2"), 
	                            React.createElement("text", {x: "87", y: "73"}, "V"), 
	                            React.createElement("text", {x: "123", y: "30", fontSize: "13px"}, "μ"), 
	                            React.createElement("text", {x: "128", y: "56"}, "B(t)-M")), 
	                        React.createElement("text", {x: "23", y: "32", fontSize: "13px"}, "λ"), 
	                        React.createElement("text", {x: "28", y: "56"}, "A(t)-M"), 
	                        React.createElement("text", {x: "80", y: "73"}, "l→∞")), 
	                    React.createElement("g", {fill: shapeColor, stroke: shapeColor, strokeWidth: "2", strokeMiterlimit: "10"}, 
	                        React.createElement("path", {d: "M 8 41 L 37.76 41", fill: "none"}), 
	                        React.createElement("path", {d: "M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z"}), 
	                        React.createElement("g", {transform: "translate(87, 0)"}, 
	                            React.createElement("path", {d: "M 24 41 L 37.76 41", fill: "none"}), 
	                            React.createElement("path", {d: "M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z"})), 
	                        React.createElement("rect", {x: "53", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("rect", {x: "64", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("rect", {x: "75", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("rect", {x: "86", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("rect", {x: "97", y: "20", width: "10.5", height: "40.5", fill: "none"}), 
	                        React.createElement("g", {transform: "translate(80, 0)"}, 
	                            React.createElement("rect", {x: "58", y: "1", width: "40", height: "80", rx: "6", ry: "6", fill: "none"}), 
	                            React.createElement("path", {d: "M 108 41 L 137.76 41", fill: "none"}), 
	                            React.createElement("path", {d: "M 145.76 41 L 137.76 43.67 L 137.76 38.33 Z"}), 
	                            React.createElement("ellipse", {cx: "71", cy: "13", rx: "8", ry: "8", fill: "none"}), 
	                            React.createElement("path", {d: "M 65.32 7.32 L 76.68 18.68", fill: "none"}), 
	                            React.createElement("path", {d: "M 76.68 7.32 L 65.32 18.68", fill: "none"}), 
	                            React.createElement("ellipse", {cx: "71", cy: "33", rx: "8", ry: "8", fill: "none"}), 
	                            React.createElement("path", {d: "M 65.32 27.32 L 76.68 38.68", fill: "none"}), 
	                            React.createElement("path", {d: "M 76.68 27.32 L 65.32 38.68", fill: "none"}), 
	                            React.createElement("ellipse", {cx: "71", cy: "69", rx: "8", ry: "8", fill: "none"}), 
	                            React.createElement("path", {d: "M 65.32 63.32 L 76.68 74.68", fill: "none"}), 
	                            React.createElement("path", {d: "M 76.68 63.32 L 65.32 74.68", fill: "none"}), 
	                            React.createElement("ellipse", {cx: "71", cy: "47", rx: "0.5", ry: "0.5"}), 
	                            React.createElement("ellipse", {cx: "71", cy: "51", rx: "0.5", ry: "0.5"}), 
	                            React.createElement("ellipse", {cx: "71", cy: "55", rx: "0.5", ry: "0.5"})))));
	            case 4:
	                return (React.createElement("g", {transform: "translate(0.5,10.5)"}, 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontSize: "12px", fontFamily: "consolas"}, 
	                        React.createElement("text", {x: "87", y: "16.5"}, "1"), 
	                        React.createElement("text", {x: "87", y: "36.5"}, "2"), 
	                        React.createElement("text", {x: "87", y: "73"}, "V"), 
	                        React.createElement("text", {x: "123", y: "30", fontSize: "13px"}, "μ"), 
	                        React.createElement("text", {x: "23", y: "32", fontSize: "13px"}, "λ"), 
	                        React.createElement("text", {x: "28", y: "56"}, "A(t)-M"), 
	                        React.createElement("text", {x: "128", y: "56"}, "B(t)-M")), 
	                    React.createElement("g", {fill: shapeColor, stroke: shapeColor, strokeWidth: "2", strokeMiterlimit: "10"}, 
	                        React.createElement("path", {d: "M 8 41 L 37.76 41", fill: "none"}), 
	                        React.createElement("path", {d: "M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z"}), 
	                        React.createElement("rect", {x: "58", y: "1", width: "40", height: "80", rx: "6", ry: "6", fill: "none"}), 
	                        React.createElement("path", {d: "M 108 41 L 137.76 41", fill: "none"}), 
	                        React.createElement("path", {d: "M 145.76 41 L 137.76 43.67 L 137.76 38.33 Z"}), 
	                        React.createElement("ellipse", {cx: "71", cy: "13", rx: "8", ry: "8", fill: "none"}), 
	                        React.createElement("path", {d: "M 65.32 7.32 L 76.68 18.68", fill: "none"}), 
	                        React.createElement("path", {d: "M 76.68 7.32 L 65.32 18.68", fill: "none"}), 
	                        React.createElement("ellipse", {cx: "71", cy: "33", rx: "8", ry: "8", fill: "none"}), 
	                        React.createElement("path", {d: "M 65.32 27.32 L 76.68 38.68", fill: "none"}), 
	                        React.createElement("path", {d: "M 76.68 27.32 L 65.32 38.68", fill: "none"}), 
	                        React.createElement("ellipse", {cx: "71", cy: "69", rx: "8", ry: "8", fill: "none"}), 
	                        React.createElement("path", {d: "M 65.32 63.32 L 76.68 74.68", fill: "none"}), 
	                        React.createElement("path", {d: "M 76.68 63.32 L 65.32 74.68", fill: "none"}), 
	                        React.createElement("ellipse", {cx: "71", cy: "47", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "71", cy: "51", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "71", cy: "55", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("path", {d: "M 23 35 L 29.2 35 Q 35.4 35 35.4 30 L 35.4 18 Q 35.4 8 41.7 8 L 48 8", fill: "none", transform: "translate(35.62,0)scale(-1,1)translate(-35.62,0)"}), 
	                        React.createElement("path", {d: "M 48.5 12.5 L 39.5 3.5 M 48.5 3.5 L 39.5 12.5", fill: "none", transform: "translate(35.62,0)scale(-1,1)translate(-35.62,0)"}))));
	            case 5:
	                return (React.createElement("g", {transform: "translate(0.5,0.5)"}, 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontSize: "12px", fontFamily: "consolas"}, 
	                        React.createElement("text", {x: "87", y: "16.5"}, "1"), 
	                        React.createElement("text", {x: "87", y: "36.5"}, "2"), 
	                        React.createElement("text", {x: "87", y: "73"}, "V"), 
	                        React.createElement("text", {x: "123", y: "30", fontSize: "13px"}, "μ"), 
	                        React.createElement("text", {x: "23", y: "32", fontSize: "13px"}, "λ"), 
	                        React.createElement("text", {x: "29", y: "35", fontSize: "10px"}, "k"), 
	                        React.createElement("text", {x: "28", y: "56"}, "A(t)"), 
	                        React.createElement("text", {x: "128", y: "56"}, "M=B(t)"), 
	                        React.createElement("text", {x: "78", y: "92"}, "N=V")), 
	                    React.createElement("g", {fill: shapeColor, stroke: shapeColor, strokeWidth: "2", strokeMiterlimit: "10"}, 
	                        React.createElement("path", {d: "M 8 41 L 37.76 41", fill: "none"}), 
	                        React.createElement("path", {d: "M 45.76 41 L 37.76 43.67 L 37.76 38.33 Z"}), 
	                        React.createElement("rect", {x: "58", y: "1", width: "40", height: "80", rx: "6", ry: "6", fill: "none"}), 
	                        React.createElement("path", {d: "M 108 41 L 137.76 41", fill: "none"}), 
	                        React.createElement("path", {d: "M 145.76 41 L 137.76 43.67 L 137.76 38.33 Z"}), 
	                        React.createElement("ellipse", {cx: "71", cy: "13", rx: "8", ry: "8", fill: "none"}), 
	                        React.createElement("path", {d: "M 65.32 7.32 L 76.68 18.68", fill: "none"}), 
	                        React.createElement("path", {d: "M 76.68 7.32 L 65.32 18.68", fill: "none"}), 
	                        React.createElement("ellipse", {cx: "71", cy: "33", rx: "8", ry: "8", fill: "none"}), 
	                        React.createElement("path", {d: "M 65.32 27.32 L 76.68 38.68", fill: "none"}), 
	                        React.createElement("path", {d: "M 76.68 27.32 L 65.32 38.68", fill: "none"}), 
	                        React.createElement("ellipse", {cx: "71", cy: "69", rx: "8", ry: "8", fill: "none"}), 
	                        React.createElement("path", {d: "M 65.32 63.32 L 76.68 74.68", fill: "none"}), 
	                        React.createElement("path", {d: "M 76.68 63.32 L 65.32 74.68", fill: "none"}), 
	                        React.createElement("ellipse", {cx: "71", cy: "47", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "71", cy: "51", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "71", cy: "55", rx: "0.5", ry: "0.5"}))));
	            default:
	                return React.createElement("g", null);
	        }
	    }
	    renderDiagram(textColor, shapeColor) {
	        switch (this.props.modelId) {
	            case 1:
	                return (React.createElement("g", {transform: "translate(0.5,0.5) scale(1.2, 1.2)"}, 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontSize: "12px", fontFamily: "consolas"}, 
	                        React.createElement("text", {x: "20.5", y: "54.5"}, "0"), 
	                        React.createElement("text", {x: "101", y: "54.5"}, "1"), 
	                        React.createElement("text", {x: "181", y: "54.5"}, "2"), 
	                        React.createElement("text", {x: "291", y: "54.5"}, "k"), 
	                        React.createElement("text", {x: "371", y: "54.5"}, "k+1")), 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontFamily: "consolas"}, 
	                        React.createElement("text", {x: "47.5", y: "15.5", fontSize: "12px"}, "λ"), 
	                        React.createElement("text", {x: "126.5", y: "15.5", fontSize: "12px"}, "λ"), 
	                        React.createElement("text", {x: "203.5", y: "19.5", fontSize: "10px"}, "λ"), 
	                        React.createElement("text", {x: "253.5", y: "19.5", fontSize: "10px"}, "λ"), 
	                        React.createElement("text", {x: "317.5", y: "15.5", fontSize: "12px"}, "λ"), 
	                        React.createElement("text", {x: "75.5", y: "90.5", fontSize: "12px"}, "μ"), 
	                        React.createElement("text", {x: "156.5", y: "92.5", fontSize: "12px"}, "μ"), 
	                        React.createElement("text", {x: "217.5", y: "90.5", fontSize: "10px"}, "μ"), 
	                        React.createElement("text", {x: "268.5", y: "88.5", fontSize: "10px"}, "μ"), 
	                        React.createElement("text", {x: "351.5", y: "89.5", fontSize: "12px"}, "μ")), 
	                    React.createElement("g", {fill: shapeColor, stroke: shapeColor, strokeWidth: "2", strokeMiterlimit: "10"}, 
	                        React.createElement("ellipse", {cx: "21", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 41 30 L 53.93 17.07 Q 61 10 67.38 16.38 L 73.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 79.42 28.42 L 71.88 24.65 L 75.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "101", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 121 30 L 133.93 17.07 Q 141 10 147.38 16.38 L 153.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 159.42 28.42 L 151.88 24.65 L 155.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "181", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 251 30 L 256 25 Q 261 20 262.38 21.38 L 263.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 269.42 28.42 L 261.88 24.65 L 265.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "291", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 201 30 L 206 25 Q 211 20 212.71 21.56 L 214.43 23.11", fill: "none"}), 
	                        React.createElement("path", {d: "M 220.35 28.5 L 212.63 25.09 L 216.22 21.14 Z"}), 
	                        React.createElement("path", {d: "M 311 30 L 323.93 17.07 Q 331 10 337.38 16.38 L 343.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 349.42 28.42 L 341.88 24.65 L 345.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "371", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 41 90 L 53.93 77.07 Q 61 70 67.38 76.38 L 73.76 82.76", fill: "none", transform: "rotate(180,61.24,80.24)"}), 
	                        React.createElement("path", {d: "M 79.42 88.42 L 71.88 84.65 L 75.65 80.88 Z", transform: "rotate(180,61.24,80.24)"}), 
	                        React.createElement("path", {d: "M 121 90 L 133.93 77.07 Q 141 70 147.38 76.38 L 153.76 82.76", fill: "none", transform: "rotate(180,141.24,80.24)"}), 
	                        React.createElement("path", {d: "M 159.42 88.42 L 151.88 84.65 L 155.65 80.88 Z", transform: "rotate(180,141.24,80.24)"}), 
	                        React.createElement("path", {d: "M 251 80 L 256 75 Q 261 70 262.38 71.38 L 263.76 72.76", fill: "none", transform: "rotate(180,261.24,75.24)"}), 
	                        React.createElement("path", {d: "M 269.42 78.42 L 261.88 74.65 L 265.65 70.88 Z", transform: "rotate(180,261.24,75.24)"}), 
	                        React.createElement("path", {d: "M 201 80 L 206 75 Q 211 70 212.71 71.56 L 214.43 73.11", fill: "none", transform: "rotate(180,211.74,75.24)"}), 
	                        React.createElement("path", {d: "M 220.35 78.5 L 212.63 75.09 L 216.22 71.14 Z", transform: "rotate(180,211.74,75.24)"}), 
	                        React.createElement("path", {d: "M 311 90 L 323.93 77.07 Q 331 70 337.38 76.38 L 343.76 82.76", fill: "none", transform: "rotate(180,331.24,80.24)"}), 
	                        React.createElement("path", {d: "M 349.42 88.42 L 341.88 84.65 L 345.65 80.88 Z", transform: "rotate(180,331.24,80.24)"}), 
	                        React.createElement("ellipse", {cx: "227", cy: "61", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "237", cy: "61", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "247", cy: "61", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "407", cy: "51", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "412", cy: "51", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "417", cy: "51", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("path", {d: "M 391 30 L 396 25 Q 401 20 402.38 21.38 L 403.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 409.42 28.42 L 401.88 24.65 L 405.65 20.88 Z"}), 
	                        React.createElement("path", {d: "M 10 80 L 15 75 Q 20 70 21.71 71.56 L 23.43 73.11", fill: "none", transform: "rotate(180,211.74,75.24)"}), 
	                        React.createElement("path", {d: "M 29.35 78.5 L 21.63 75.09 L 25.22 71.14 Z", transform: "rotate(180,211.74,75.24)"}))));
	            case 2:
	                return (React.createElement("g", {transform: "translate(0.5,0.5) scale(1.2, 1.2)"}, 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontSize: "12px", fontFamily: "consolas"}, 
	                        React.createElement("text", {x: "20.5", y: "54.5"}, "0"), 
	                        React.createElement("text", {x: "101", y: "54.5"}, "1"), 
	                        React.createElement("text", {x: "181", y: "54.5"}, "2"), 
	                        React.createElement("text", {x: "291", y: "54.5"}, "k"), 
	                        React.createElement("text", {x: "371", y: "54.5"}, "k+1")), 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontFamily: "consolas"}, 
	                        React.createElement("text", {x: "47.5", y: "15.5", fontSize: "12px"}, "λ"), 
	                        React.createElement("text", {x: "126.5", y: "15.5", fontSize: "12px"}, "λ"), 
	                        React.createElement("text", {x: "203.5", y: "19.5", fontSize: "10px"}, "λ"), 
	                        React.createElement("text", {x: "253.5", y: "19.5", fontSize: "10px"}, "λ"), 
	                        React.createElement("text", {x: "317.5", y: "15.5", fontSize: "12px"}, "λ"), 
	                        React.createElement("text", {x: "75.5", y: "90.5", fontSize: "12px"}, "μ"), 
	                        React.createElement("text", {x: "156.5", y: "92.5", fontSize: "12px"}, "2μ"), 
	                        React.createElement("text", {x: "217.5", y: "90.5", fontSize: "10px"}, "3μ"), 
	                        React.createElement("text", {x: "268.5", y: "88.5", fontSize: "10px"}, "kμ"), 
	                        React.createElement("text", {x: "361.5", y: "89.5", fontSize: "12px"}, "μ(k+1)")), 
	                    React.createElement("g", {fill: shapeColor, stroke: shapeColor, strokeWidth: "2", strokeMiterlimit: "10"}, 
	                        React.createElement("ellipse", {cx: "21", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 41 30 L 53.93 17.07 Q 61 10 67.38 16.38 L 73.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 79.42 28.42 L 71.88 24.65 L 75.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "101", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 121 30 L 133.93 17.07 Q 141 10 147.38 16.38 L 153.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 159.42 28.42 L 151.88 24.65 L 155.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "181", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 251 30 L 256 25 Q 261 20 262.38 21.38 L 263.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 269.42 28.42 L 261.88 24.65 L 265.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "291", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 201 30 L 206 25 Q 211 20 212.71 21.56 L 214.43 23.11", fill: "none"}), 
	                        React.createElement("path", {d: "M 220.35 28.5 L 212.63 25.09 L 216.22 21.14 Z"}), 
	                        React.createElement("path", {d: "M 311 30 L 323.93 17.07 Q 331 10 337.38 16.38 L 343.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 349.42 28.42 L 341.88 24.65 L 345.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "371", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 41 90 L 53.93 77.07 Q 61 70 67.38 76.38 L 73.76 82.76", fill: "none", transform: "rotate(180,61.24,80.24)"}), 
	                        React.createElement("path", {d: "M 79.42 88.42 L 71.88 84.65 L 75.65 80.88 Z", transform: "rotate(180,61.24,80.24)"}), 
	                        React.createElement("path", {d: "M 121 90 L 133.93 77.07 Q 141 70 147.38 76.38 L 153.76 82.76", fill: "none", transform: "rotate(180,141.24,80.24)"}), 
	                        React.createElement("path", {d: "M 159.42 88.42 L 151.88 84.65 L 155.65 80.88 Z", transform: "rotate(180,141.24,80.24)"}), 
	                        React.createElement("path", {d: "M 251 80 L 256 75 Q 261 70 262.38 71.38 L 263.76 72.76", fill: "none", transform: "rotate(180,261.24,75.24)"}), 
	                        React.createElement("path", {d: "M 269.42 78.42 L 261.88 74.65 L 265.65 70.88 Z", transform: "rotate(180,261.24,75.24)"}), 
	                        React.createElement("path", {d: "M 201 80 L 206 75 Q 211 70 212.71 71.56 L 214.43 73.11", fill: "none", transform: "rotate(180,211.74,75.24)"}), 
	                        React.createElement("path", {d: "M 220.35 78.5 L 212.63 75.09 L 216.22 71.14 Z", transform: "rotate(180,211.74,75.24)"}), 
	                        React.createElement("path", {d: "M 311 90 L 323.93 77.07 Q 331 70 337.38 76.38 L 343.76 82.76", fill: "none", transform: "rotate(180,331.24,80.24)"}), 
	                        React.createElement("path", {d: "M 349.42 88.42 L 341.88 84.65 L 345.65 80.88 Z", transform: "rotate(180,331.24,80.24)"}), 
	                        React.createElement("ellipse", {cx: "227", cy: "61", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "237", cy: "61", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "247", cy: "61", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "407", cy: "51", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "412", cy: "51", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "417", cy: "51", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("path", {d: "M 391 30 L 396 25 Q 401 20 402.38 21.38 L 403.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 409.42 28.42 L 401.88 24.65 L 405.65 20.88 Z"}), 
	                        React.createElement("path", {d: "M 10 80 L 15 75 Q 20 70 21.71 71.56 L 23.43 73.11", fill: "none", transform: "rotate(180,211.74,75.24)"}), 
	                        React.createElement("path", {d: "M 29.35 78.5 L 21.63 75.09 L 25.22 71.14 Z", transform: "rotate(180,211.74,75.24)"}))));
	            case 3:
	                return (React.createElement("g", {transform: "translate(0.5,0.5) scale(1.2, 1.2)"}, 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontSize: "12px", fontFamily: "consolas"}, 
	                        React.createElement("text", {x: "20.5", y: "54.5"}, "0"), 
	                        React.createElement("text", {x: "101", y: "54.5"}, "1"), 
	                        React.createElement("text", {x: "181", y: "54.5"}, "2"), 
	                        React.createElement("text", {x: "291", y: "54.5"}, "V"), 
	                        React.createElement("text", {x: "371", y: "54.5"}, "V+1")), 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontFamily: "consolas"}, 
	                        React.createElement("text", {x: "47.5", y: "15.5", fontSize: "12px"}, "λ"), 
	                        React.createElement("text", {x: "126.5", y: "15.5", fontSize: "12px"}, "λ"), 
	                        React.createElement("text", {x: "203.5", y: "19.5", fontSize: "10px"}, "λ"), 
	                        React.createElement("text", {x: "253.5", y: "19.5", fontSize: "10px"}, "λ"), 
	                        React.createElement("text", {x: "317.5", y: "15.5", fontSize: "12px"}, "λ"), 
	                        React.createElement("text", {x: "75.5", y: "90.5", fontSize: "12px"}, "μ"), 
	                        React.createElement("text", {x: "156.5", y: "92.5", fontSize: "12px"}, "2μ"), 
	                        React.createElement("text", {x: "217.5", y: "90.5", fontSize: "10px"}, "3μ"), 
	                        React.createElement("text", {x: "268.5", y: "88.5", fontSize: "10px"}, "μV"), 
	                        React.createElement("text", {x: "349.5", y: "89.5", fontSize: "12px"}, "μV")), 
	                    React.createElement("g", {fill: shapeColor, stroke: shapeColor, strokeWidth: "2", strokeMiterlimit: "10"}, 
	                        React.createElement("ellipse", {cx: "21", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 41 30 L 53.93 17.07 Q 61 10 67.38 16.38 L 73.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 79.42 28.42 L 71.88 24.65 L 75.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "101", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 121 30 L 133.93 17.07 Q 141 10 147.38 16.38 L 153.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 159.42 28.42 L 151.88 24.65 L 155.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "181", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 251 30 L 256 25 Q 261 20 262.38 21.38 L 263.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 269.42 28.42 L 261.88 24.65 L 265.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "291", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 201 30 L 206 25 Q 211 20 212.71 21.56 L 214.43 23.11", fill: "none"}), 
	                        React.createElement("path", {d: "M 220.35 28.5 L 212.63 25.09 L 216.22 21.14 Z"}), 
	                        React.createElement("path", {d: "M 311 30 L 323.93 17.07 Q 331 10 337.38 16.38 L 343.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 349.42 28.42 L 341.88 24.65 L 345.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "371", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 41 90 L 53.93 77.07 Q 61 70 67.38 76.38 L 73.76 82.76", fill: "none", transform: "rotate(180,61.24,80.24)"}), 
	                        React.createElement("path", {d: "M 79.42 88.42 L 71.88 84.65 L 75.65 80.88 Z", transform: "rotate(180,61.24,80.24)"}), 
	                        React.createElement("path", {d: "M 121 90 L 133.93 77.07 Q 141 70 147.38 76.38 L 153.76 82.76", fill: "none", transform: "rotate(180,141.24,80.24)"}), 
	                        React.createElement("path", {d: "M 159.42 88.42 L 151.88 84.65 L 155.65 80.88 Z", transform: "rotate(180,141.24,80.24)"}), 
	                        React.createElement("path", {d: "M 251 80 L 256 75 Q 261 70 262.38 71.38 L 263.76 72.76", fill: "none", transform: "rotate(180,261.24,75.24)"}), 
	                        React.createElement("path", {d: "M 269.42 78.42 L 261.88 74.65 L 265.65 70.88 Z", transform: "rotate(180,261.24,75.24)"}), 
	                        React.createElement("path", {d: "M 201 80 L 206 75 Q 211 70 212.71 71.56 L 214.43 73.11", fill: "none", transform: "rotate(180,211.74,75.24)"}), 
	                        React.createElement("path", {d: "M 220.35 78.5 L 212.63 75.09 L 216.22 71.14 Z", transform: "rotate(180,211.74,75.24)"}), 
	                        React.createElement("path", {d: "M 311 90 L 323.93 77.07 Q 331 70 337.38 76.38 L 343.76 82.76", fill: "none", transform: "rotate(180,331.24,80.24)"}), 
	                        React.createElement("path", {d: "M 349.42 88.42 L 341.88 84.65 L 345.65 80.88 Z", transform: "rotate(180,331.24,80.24)"}), 
	                        React.createElement("ellipse", {cx: "227", cy: "61", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "237", cy: "61", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "247", cy: "61", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "407", cy: "51", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "412", cy: "51", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "417", cy: "51", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("path", {d: "M 391 30 L 396 25 Q 401 20 402.38 21.38 L 403.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 409.42 28.42 L 401.88 24.65 L 405.65 20.88 Z"}), 
	                        React.createElement("path", {d: "M 10 80 L 15 75 Q 20 70 21.71 71.56 L 23.43 73.11", fill: "none", transform: "rotate(180,211.74,75.24)"}), 
	                        React.createElement("path", {d: "M 29.35 78.5 L 21.63 75.09 L 25.22 71.14 Z", transform: "rotate(180,211.74,75.24)"}))));
	            case 4:
	                return (React.createElement("g", {transform: "translate(0.5,0.5) scale(1.2, 1.2)"}, 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontSize: "12px", fontFamily: "consolas"}, 
	                        React.createElement("text", {x: "20.5", y: "54.5"}, "0"), 
	                        React.createElement("text", {x: "101", y: "54.5"}, "1"), 
	                        React.createElement("text", {x: "181", y: "54.5"}, "2"), 
	                        React.createElement("text", {x: "291", y: "54.5"}, "V-1"), 
	                        React.createElement("text", {x: "371", y: "54.5"}, "V")), 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontFamily: "consolas"}, 
	                        React.createElement("text", {x: "47.5", y: "15.5", fontSize: "12px"}, "λ"), 
	                        React.createElement("text", {x: "126.5", y: "15.5", fontSize: "12px"}, "λ"), 
	                        React.createElement("text", {x: "203.5", y: "19.5", fontSize: "10px"}, "λ"), 
	                        React.createElement("text", {x: "253.5", y: "19.5", fontSize: "10px"}, "λ"), 
	                        React.createElement("text", {x: "317.5", y: "15.5", fontSize: "12px"}, "λ"), 
	                        React.createElement("text", {x: "75.5", y: "90.5", fontSize: "12px"}, "μ"), 
	                        React.createElement("text", {x: "154.5", y: "92.5", fontSize: "12px"}, "2μ"), 
	                        React.createElement("text", {x: "217.5", y: "90.5", fontSize: "10px"}, "3μ"), 
	                        React.createElement("text", {x: "278.5", y: "88.5", fontSize: "10px"}, "μ(V-1)"), 
	                        React.createElement("text", {x: "349.5", y: "89.5", fontSize: "12px"}, "μV")), 
	                    React.createElement("g", {fill: shapeColor, stroke: shapeColor, strokeWidth: "2", strokeMiterlimit: "10"}, 
	                        React.createElement("ellipse", {cx: "21", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 41 30 L 53.93 17.07 Q 61 10 67.38 16.38 L 73.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 79.42 28.42 L 71.88 24.65 L 75.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "101", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 121 30 L 133.93 17.07 Q 141 10 147.38 16.38 L 153.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 159.42 28.42 L 151.88 24.65 L 155.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "181", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 251 30 L 256 25 Q 261 20 262.38 21.38 L 263.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 269.42 28.42 L 261.88 24.65 L 265.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "291", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 201 30 L 206 25 Q 211 20 212.71 21.56 L 214.43 23.11", fill: "none"}), 
	                        React.createElement("path", {d: "M 220.35 28.5 L 212.63 25.09 L 216.22 21.14 Z"}), 
	                        React.createElement("path", {d: "M 311 30 L 323.93 17.07 Q 331 10 337.38 16.38 L 343.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 349.42 28.42 L 341.88 24.65 L 345.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "371", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 41 90 L 53.93 77.07 Q 61 70 67.38 76.38 L 73.76 82.76", fill: "none", transform: "rotate(180,61.24,80.24)"}), 
	                        React.createElement("path", {d: "M 79.42 88.42 L 71.88 84.65 L 75.65 80.88 Z", transform: "rotate(180,61.24,80.24)"}), 
	                        React.createElement("path", {d: "M 121 90 L 133.93 77.07 Q 141 70 147.38 76.38 L 153.76 82.76", fill: "none", transform: "rotate(180,141.24,80.24)"}), 
	                        React.createElement("path", {d: "M 159.42 88.42 L 151.88 84.65 L 155.65 80.88 Z", transform: "rotate(180,141.24,80.24)"}), 
	                        React.createElement("path", {d: "M 251 80 L 256 75 Q 261 70 262.38 71.38 L 263.76 72.76", fill: "none", transform: "rotate(180,261.24,75.24)"}), 
	                        React.createElement("path", {d: "M 269.42 78.42 L 261.88 74.65 L 265.65 70.88 Z", transform: "rotate(180,261.24,75.24)"}), 
	                        React.createElement("path", {d: "M 201 80 L 206 75 Q 211 70 212.71 71.56 L 214.43 73.11", fill: "none", transform: "rotate(180,211.74,75.24)"}), 
	                        React.createElement("path", {d: "M 220.35 78.5 L 212.63 75.09 L 216.22 71.14 Z", transform: "rotate(180,211.74,75.24)"}), 
	                        React.createElement("path", {d: "M 311 90 L 323.93 77.07 Q 331 70 337.38 76.38 L 343.76 82.76", fill: "none", transform: "rotate(180,331.24,80.24)"}), 
	                        React.createElement("path", {d: "M 349.42 88.42 L 341.88 84.65 L 345.65 80.88 Z", transform: "rotate(180,331.24,80.24)"}), 
	                        React.createElement("ellipse", {cx: "227", cy: "61", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "237", cy: "61", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "247", cy: "61", rx: "0.5", ry: "0.5"}))));
	            case 5:
	                return (React.createElement("g", {transform: "translate(0.5,0.5) scale(1.2, 1.2)"}, 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontSize: "12px", fontFamily: "consolas"}, 
	                        React.createElement("text", {x: "20.5", y: "54.5"}, "0"), 
	                        React.createElement("text", {x: "101", y: "54.5"}, "1"), 
	                        React.createElement("text", {x: "181", y: "54.5"}, "2"), 
	                        React.createElement("text", {x: "291", y: "54.5"}, "V-1"), 
	                        React.createElement("text", {x: "371", y: "54.5"}, "V")), 
	                    React.createElement("g", {fill: textColor, textAnchor: "middle", fontFamily: "consolas"}, 
	                        React.createElement("text", {x: "44.5", y: "12.5", fontSize: "12px"}, "αN"), 
	                        React.createElement("text", {x: "115.5", y: "12.5", fontSize: "12px"}, "α(N-1)"), 
	                        React.createElement("text", {x: "193.5", y: "16.5", fontSize: "10px"}, "α(N-2)"), 
	                        React.createElement("text", {x: "239.5", y: "16.5", fontSize: "10px"}, "α(N-V+2)"), 
	                        React.createElement("text", {x: "297.5", y: "12.5", fontSize: "12px"}, "α(N-V+1)"), 
	                        React.createElement("text", {x: "75.5", y: "90.5", fontSize: "12px"}, "μ"), 
	                        React.createElement("text", {x: "154.5", y: "92.5", fontSize: "12px"}, "2μ"), 
	                        React.createElement("text", {x: "217.5", y: "90.5", fontSize: "10px"}, "3μ"), 
	                        React.createElement("text", {x: "278.5", y: "88.5", fontSize: "10px"}, "μ(V-1)"), 
	                        React.createElement("text", {x: "349.5", y: "89.5", fontSize: "12px"}, "μV")), 
	                    React.createElement("g", {fill: shapeColor, stroke: shapeColor, strokeWidth: "2", strokeMiterlimit: "10"}, 
	                        React.createElement("ellipse", {cx: "21", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 41 30 L 53.93 17.07 Q 61 10 67.38 16.38 L 73.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 79.42 28.42 L 71.88 24.65 L 75.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "101", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 121 30 L 133.93 17.07 Q 141 10 147.38 16.38 L 153.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 159.42 28.42 L 151.88 24.65 L 155.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "181", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 251 30 L 256 25 Q 261 20 262.38 21.38 L 263.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 269.42 28.42 L 261.88 24.65 L 265.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "291", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 201 30 L 206 25 Q 211 20 212.71 21.56 L 214.43 23.11", fill: "none"}), 
	                        React.createElement("path", {d: "M 220.35 28.5 L 212.63 25.09 L 216.22 21.14 Z"}), 
	                        React.createElement("path", {d: "M 311 30 L 323.93 17.07 Q 331 10 337.38 16.38 L 343.76 22.76", fill: "none"}), 
	                        React.createElement("path", {d: "M 349.42 28.42 L 341.88 24.65 L 345.65 20.88 Z"}), 
	                        React.createElement("ellipse", {cx: "371", cy: "50", rx: "20", ry: "20", fill: "transparent"}), 
	                        React.createElement("path", {d: "M 41 90 L 53.93 77.07 Q 61 70 67.38 76.38 L 73.76 82.76", fill: "none", transform: "rotate(180,61.24,80.24)"}), 
	                        React.createElement("path", {d: "M 79.42 88.42 L 71.88 84.65 L 75.65 80.88 Z", transform: "rotate(180,61.24,80.24)"}), 
	                        React.createElement("path", {d: "M 121 90 L 133.93 77.07 Q 141 70 147.38 76.38 L 153.76 82.76", fill: "none", transform: "rotate(180,141.24,80.24)"}), 
	                        React.createElement("path", {d: "M 159.42 88.42 L 151.88 84.65 L 155.65 80.88 Z", transform: "rotate(180,141.24,80.24)"}), 
	                        React.createElement("path", {d: "M 251 80 L 256 75 Q 261 70 262.38 71.38 L 263.76 72.76", fill: "none", transform: "rotate(180,261.24,75.24)"}), 
	                        React.createElement("path", {d: "M 269.42 78.42 L 261.88 74.65 L 265.65 70.88 Z", transform: "rotate(180,261.24,75.24)"}), 
	                        React.createElement("path", {d: "M 201 80 L 206 75 Q 211 70 212.71 71.56 L 214.43 73.11", fill: "none", transform: "rotate(180,211.74,75.24)"}), 
	                        React.createElement("path", {d: "M 220.35 78.5 L 212.63 75.09 L 216.22 71.14 Z", transform: "rotate(180,211.74,75.24)"}), 
	                        React.createElement("path", {d: "M 311 90 L 323.93 77.07 Q 331 70 337.38 76.38 L 343.76 82.76", fill: "none", transform: "rotate(180,331.24,80.24)"}), 
	                        React.createElement("path", {d: "M 349.42 88.42 L 341.88 84.65 L 345.65 80.88 Z", transform: "rotate(180,331.24,80.24)"}), 
	                        React.createElement("ellipse", {cx: "227", cy: "61", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "237", cy: "61", rx: "0.5", ry: "0.5"}), 
	                        React.createElement("ellipse", {cx: "247", cy: "61", rx: "0.5", ry: "0.5"}))));
	            default:
	                return React.createElement("g", null);
	        }
	    }
	    onMouseEnter(event) {
	        const isDiagram = event.currentTarget.id == 'diagram';
	        this.setState({
	            diagramHovered: isDiagram,
	            schemeHovered: !isDiagram
	        });
	    }
	    onMouseLeave(event) {
	        const isDiagram = event.currentTarget.id == 'diagram';
	        this.setState({
	            diagramHovered: false,
	            schemeHovered: false
	        });
	    }
	}
	exports.Schemes = Schemes;


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	exports.SET_CURRENT_MODEL = 'SET_CURRENT_MODEL';
	exports.SET_Y = 'SET_Y';
	exports.SET_M = 'SET_M';
	exports.SET_A = 'SET_A';
	exports.SET_V = 'SET_V';
	exports.SET_N = 'SET_N';
	exports.SET_SELECTED_VALUE = 'SET_SELECTED_VALUE';
	function setCurrentModelAction(id) {
	    return {
	        type: exports.SET_CURRENT_MODEL,
	        payload: id
	    };
	}
	exports.setCurrentModelAction = setCurrentModelAction;
	function setY(value) {
	    return {
	        type: exports.SET_Y,
	        payload: value
	    };
	}
	exports.setY = setY;
	function setM(value) {
	    return {
	        type: exports.SET_M,
	        payload: value
	    };
	}
	exports.setM = setM;
	function setA(value) {
	    return {
	        type: exports.SET_A,
	        payload: value
	    };
	}
	exports.setA = setA;
	function setV(value) {
	    return {
	        type: exports.SET_V,
	        payload: value
	    };
	}
	exports.setV = setV;
	function setN(value) {
	    return {
	        type: exports.SET_N,
	        payload: value
	    };
	}
	exports.setN = setN;
	function setSelectedValue(value) {
	    return {
	        type: exports.SET_SELECTED_VALUE,
	        payload: value
	    };
	}
	exports.setSelectedValue = setSelectedValue;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const redux_1 = __webpack_require__(18);
	const reducer_1 = __webpack_require__(19);
	exports.store = redux_1.createStore(reducer_1.reducer);


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = Redux;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const actions_1 = __webpack_require__(16);
	const initialState = {
	    currentModelId: 4, a: 0.3, m: 20, V: 10, N: 50, y: 1, selectedValue: -1
	};
	function reducer(state = initialState, action) {
	    switch (action.type) {
	        case actions_1.SET_CURRENT_MODEL:
	            return Object.assign({}, initialState, { currentModelId: action.payload });
	        case actions_1.SET_Y:
	            return Object.assign({}, state, { y: action.payload });
	        case actions_1.SET_M:
	            return Object.assign({}, state, { m: action.payload });
	        case actions_1.SET_A:
	            return Object.assign({}, state, { a: action.payload });
	        case actions_1.SET_N:
	            return Object.assign({}, state, { N: action.payload });
	        case actions_1.SET_V:
	            return Object.assign({}, state, { V: action.payload });
	        case actions_1.SET_SELECTED_VALUE:
	            return Object.assign({}, state, { selectedValue: action.payload });
	        default:
	            return state;
	    }
	}
	exports.reducer = reducer;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const React = __webpack_require__(1);
	class Formulas extends React.Component {
	    constructor(props) {
	        super(props);
	        this.state = { for: this.props.for, hovered: false };
	    }
	    render() {
	        return (React.createElement("div", {className: "formula", onMouseEnter: _ => this.onMouseEvent(), onMouseLeave: _ => this.onMouseEvent()}, this.renderFormula(this.state.hovered ? '#777' : '#555')));
	    }
	    componentWillReceiveProps(newProps) {
	        this.setState({ hovered: this.state.hovered, for: this.props.modelId != newProps.modelId ? 'pk' : newProps.for });
	    }
	    renderFormula(color) {
	        const formula = `${this.props.modelId}_${this.state.for}`;
	        switch (formula) {
	            case '1_t':
	                return (React.createElement("svg", {height: '39.4048pt', viewBox: '0 0 61.5601 39.4048', width: '61.5601pt'}, 
	                    React.createElement("defs", null, 
	                        React.createElement("path", {d: 'M6.12 -7.524H7.176C7.32 -7.524 7.464 -7.512 7.608 -7.512H9.18L9.336 -8.268H2.172L2.016 -7.512H3.6C3.744 -7.512 3.888 -7.524 4.032 -7.524H5.088L3.492 0H4.524L6.12 -7.524Z', id: 'g0-84'}), 
	                        React.createElement("path", {d: 'M3.528 -8.112H3.3C3.108 -7.92 2.532 -7.356 1.236 -7.332C1.068 -7.332 1.056 -7.32 1.056 -7.104V-6.624C1.788 -6.624 2.34 -6.804 2.592 -6.912V-0.696H1.128V0H4.992V-0.696H3.528V-8.112Z', id: 'g1-49'}), 
	                        React.createElement("path", {d: 'M8.1 -3.924C8.268 -3.924 8.484 -3.924 8.484 -4.14C8.484 -4.368 8.28 -4.368 8.1 -4.368H1.032C0.864 -4.368 0.648 -4.368 0.648 -4.152C0.648 -3.924 0.852 -3.924 1.032 -3.924H8.1ZM8.1 -1.62C8.268 -1.62 8.484 -1.62 8.484 -1.836C8.484 -2.064 8.28 -2.064 8.1 -2.064H1.032C0.864 -2.064 0.648 -2.064 0.648 -1.848C0.648 -1.62 0.852 -1.62 1.032 -1.62H8.1Z', id: 'g1-61'}), 
	                        React.createElement("path", {d: 'M2.568 -5.416H2.392C1.872 -4.936 1.216 -4.904 0.736 -4.888V-4.384C1.048 -4.392 1.448 -4.408 1.848 -4.568V-0.504H0.784V0H3.632V-0.504H2.568V-5.416Z', id: 'g2-49'}), 
	                        React.createElement("path", {d: 'M3.008 -2.296C3.304 -1.568 3.792 -0.264 3.88 -0.12C4.016 0.08 4.176 0.08 4.368 0.08C4.6 0.08 4.664 0.08 4.664 -0.016C4.664 -0.056 4.648 -0.08 4.616 -0.104C4.52 -0.216 4.48 -0.296 4.424 -0.448L2.624 -5.016C2.568 -5.168 2.416 -5.552 1.592 -5.552C1.512 -5.552 1.392 -5.552 1.392 -5.44C1.392 -5.344 1.472 -5.336 1.512 -5.328C1.672 -5.304 1.824 -5.288 2.008 -4.824L2.584 -3.384L2.896 -2.576L0.608 -0.456C0.52 -0.376 0.44 -0.28 0.44 -0.168C0.44 -0.008 0.576 0.096 0.712 0.096C0.824 0.096 0.936 0.008 1.008 -0.072L3.008 -2.296Z', id: 'g3-21'}), 
	                        React.createElement("path", {d: 'M1.936 -2.824C1.976 -2.976 2.04 -3.24 2.04 -3.28C2.04 -3.448 1.912 -3.528 1.776 -3.528C1.504 -3.528 1.44 -3.264 1.408 -3.152L0.296 1.288C0.264 1.416 0.264 1.456 0.264 1.472C0.264 1.672 0.424 1.72 0.52 1.72C0.56 1.72 0.744 1.712 0.848 1.504C0.872 1.44 1.104 0.488 1.264 -0.152C1.4 -0.048 1.672 0.08 2.08 0.08C2.736 0.08 3.168 -0.456 3.192 -0.488C3.336 0.064 3.88 0.08 3.976 0.08C4.344 0.08 4.528 -0.224 4.592 -0.36C4.752 -0.648 4.864 -1.112 4.864 -1.144C4.864 -1.192 4.832 -1.248 4.736 -1.248S4.624 -1.2 4.576 -1C4.464 -0.56 4.312 -0.144 4 -0.144C3.816 -0.144 3.744 -0.296 3.744 -0.52C3.744 -0.656 3.832 -1 3.888 -1.232L4.096 -2.048C4.144 -2.256 4.184 -2.424 4.248 -2.664C4.288 -2.84 4.368 -3.152 4.368 -3.2C4.368 -3.4 4.208 -3.448 4.112 -3.448C3.832 -3.448 3.784 -3.248 3.696 -2.888L3.528 -2.224L3.28 -1.224L3.2 -0.904C3.184 -0.856 2.968 -0.552 2.784 -0.4C2.648 -0.296 2.416 -0.144 2.12 -0.144C1.744 -0.144 1.488 -0.344 1.488 -0.84C1.488 -1.048 1.552 -1.288 1.6 -1.48L1.936 -2.824Z', id: 'g3-22'}), 
	                        React.createElement("path", {d: 'M7.908 -2.76C8.112 -2.76 8.328 -2.76 8.328 -3S8.112 -3.24 7.908 -3.24H1.416C1.212 -3.24 0.996 -3.24 0.996 -3S1.212 -2.76 1.416 -2.76H7.908Z', id: 'g4-0'})), 
	                    React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                        React.createElement("rect", {height: '0.47998', width: '9.62187', x: '56.6248', y: '64.0951'}), 
	                        React.createElement("use", {x: '56.6248', href: '#g0-84', y: '74.3484'}), 
	                        React.createElement("use", {x: '69.58', href: '#g1-61', y: '74.3484'}), 
	                        React.createElement("use", {x: '95.1545', href: '#g2-49', y: '59.25'}), 
	                        React.createElement("rect", {height: '0.47998', width: '5.11348', x: '94.7228', y: '60.7348'}), 
	                        React.createElement("use", {x: '94.7228', href: '#g3-22', y: '68.1129'}), 
	                        React.createElement("rect", {height: '0.47998', width: '28.055', x: '83.252', y: '71.1084'}), 
	                        React.createElement("use", {x: '83.252', href: '#g1-49', y: '83.3086'}), 
	                        React.createElement("use", {x: '91.7936', href: '#g4-0', y: '83.3086'}), 
	                        React.createElement("use", {x: '105.071', href: '#g3-21', y: '78.5838'}), 
	                        React.createElement("rect", {height: '0.47998', width: '5.11348', x: '104.994', y: '80.0686'}), 
	                        React.createElement("use", {x: '104.994', href: '#g3-22', y: '87.4467'}))));
	            case '1_k':
	                return (React.createElement("svg", {height: '39.7488pt', viewBox: '0 0 58.2756 39.7488', width: '58.2756pt'}, 
	                    React.createElement("defs", null, 
	                        React.createElement("path", {d: 'M3.96 -3.276L6.36 -5.328H5.268L2.436 -2.916L3.588 -8.328H2.712L0.936 0H1.776L2.148 -1.728L3.252 -2.676L4.512 0H5.496L3.96 -3.276Z', id: 'g0-107'}), 
	                        React.createElement("path", {d: 'M3.528 -8.112H3.3C3.108 -7.92 2.532 -7.356 1.236 -7.332C1.068 -7.332 1.056 -7.32 1.056 -7.104V-6.624C1.788 -6.624 2.34 -6.804 2.592 -6.912V-0.696H1.128V0H4.992V-0.696H3.528V-8.112Z', id: 'g1-49'}), 
	                        React.createElement("path", {d: 'M8.1 -3.924C8.268 -3.924 8.484 -3.924 8.484 -4.14C8.484 -4.368 8.28 -4.368 8.1 -4.368H1.032C0.864 -4.368 0.648 -4.368 0.648 -4.152C0.648 -3.924 0.852 -3.924 1.032 -3.924H8.1ZM8.1 -1.62C8.268 -1.62 8.484 -1.62 8.484 -1.836C8.484 -2.064 8.28 -2.064 8.1 -2.064H1.032C0.864 -2.064 0.648 -2.064 0.648 -1.848C0.648 -1.62 0.852 -1.62 1.032 -1.62H8.1Z', id: 'g1-61'}), 
	                        React.createElement("path", {d: 'M3.008 -2.296C3.304 -1.568 3.792 -0.264 3.88 -0.12C4.016 0.08 4.176 0.08 4.368 0.08C4.6 0.08 4.664 0.08 4.664 -0.016C4.664 -0.056 4.648 -0.08 4.616 -0.104C4.52 -0.216 4.48 -0.296 4.424 -0.448L2.624 -5.016C2.568 -5.168 2.416 -5.552 1.592 -5.552C1.512 -5.552 1.392 -5.552 1.392 -5.44C1.392 -5.344 1.472 -5.336 1.512 -5.328C1.672 -5.304 1.824 -5.288 2.008 -4.824L2.584 -3.384L2.896 -2.576L0.608 -0.456C0.52 -0.376 0.44 -0.28 0.44 -0.168C0.44 -0.008 0.576 0.096 0.712 0.096C0.824 0.096 0.936 0.008 1.008 -0.072L3.008 -2.296Z', id: 'g2-21'}), 
	                        React.createElement("path", {d: 'M1.936 -2.824C1.976 -2.976 2.04 -3.24 2.04 -3.28C2.04 -3.448 1.912 -3.528 1.776 -3.528C1.504 -3.528 1.44 -3.264 1.408 -3.152L0.296 1.288C0.264 1.416 0.264 1.456 0.264 1.472C0.264 1.672 0.424 1.72 0.52 1.72C0.56 1.72 0.744 1.712 0.848 1.504C0.872 1.44 1.104 0.488 1.264 -0.152C1.4 -0.048 1.672 0.08 2.08 0.08C2.736 0.08 3.168 -0.456 3.192 -0.488C3.336 0.064 3.88 0.08 3.976 0.08C4.344 0.08 4.528 -0.224 4.592 -0.36C4.752 -0.648 4.864 -1.112 4.864 -1.144C4.864 -1.192 4.832 -1.248 4.736 -1.248S4.624 -1.2 4.576 -1C4.464 -0.56 4.312 -0.144 4 -0.144C3.816 -0.144 3.744 -0.296 3.744 -0.52C3.744 -0.656 3.832 -1 3.888 -1.232L4.096 -2.048C4.144 -2.256 4.184 -2.424 4.248 -2.664C4.288 -2.84 4.368 -3.152 4.368 -3.2C4.368 -3.4 4.208 -3.448 4.112 -3.448C3.832 -3.448 3.784 -3.248 3.696 -2.888L3.528 -2.224L3.28 -1.224L3.2 -0.904C3.184 -0.856 2.968 -0.552 2.784 -0.4C2.648 -0.296 2.416 -0.144 2.12 -0.144C1.744 -0.144 1.488 -0.344 1.488 -0.84C1.488 -1.048 1.552 -1.288 1.6 -1.48L1.936 -2.824Z', id: 'g2-22'}), 
	                        React.createElement("path", {d: 'M7.908 -2.76C8.112 -2.76 8.328 -2.76 8.328 -3S8.112 -3.24 7.908 -3.24H1.416C1.212 -3.24 0.996 -3.24 0.996 -3S1.212 -2.76 1.416 -2.76H7.908Z', id: 'g3-0'})), 
	                    React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                        React.createElement("rect", {height: '0.47998', width: '6.70436', x: '56.6248', y: '64.4007'}), 
	                        React.createElement("use", {x: '56.6248', href: '#g0-107', y: '74.6539'}), 
	                        React.createElement("use", {x: '66.6625', href: '#g1-61', y: '74.6539'}), 
	                        React.createElement("use", {x: '91.8829', href: '#g2-21', y: '59.5556'}), 
	                        React.createElement("rect", {height: '0.47998', width: '5.11348', x: '91.8053', y: '61.0403'}), 
	                        React.createElement("use", {x: '91.8053', href: '#g2-22', y: '68.4184'}), 
	                        React.createElement("rect", {height: '0.47998', width: '28.055', x: '80.3345', y: '71.4139'}), 
	                        React.createElement("use", {x: '80.3345', href: '#g1-49', y: '83.6142'}), 
	                        React.createElement("use", {x: '88.8761', href: '#g3-0', y: '83.6142'}), 
	                        React.createElement("use", {x: '102.154', href: '#g2-21', y: '78.8894'}), 
	                        React.createElement("rect", {height: '0.47998', width: '5.11348', x: '102.076', y: '80.3742'}), 
	                        React.createElement("use", {x: '102.076', href: '#g2-22', y: '87.7523'}))));
	            case '1_pk':
	                return (React.createElement("svg", {height: '30.4142pt', viewBox: '0 0 102.63 30.4142', width: '102.63pt'}, 
	                    React.createElement("defs", null, 
	                        React.createElement("path", {d: 'M2.856 -3.468H4.764C6.6 -3.468 8.124 -4.944 8.124 -6.348C8.124 -7.38 7.284 -8.328 5.796 -8.328H2.868L1.092 0H2.124L2.856 -3.468ZM3.732 -7.656H5.388C6.6 -7.656 7.164 -7.044 7.164 -6.264C7.164 -5.34 6.348 -4.164 4.644 -4.164H2.988L3.732 -7.656Z', id: 'g0-80'}), 
	                        React.createElement("path", {d: 'M2.848 -2.176L4.568 -3.552H3.8L1.728 -1.896L2.512 -5.552H1.888L0.704 0H1.296L1.536 -1.12L2.352 -1.776L3.296 0H4L2.848 -2.176Z', id: 'g1-107'}), 
	                        React.createElement("path", {d: 'M3.192 -9C1.392 -7.392 0.936 -4.956 0.936 -3C0.936 -0.888 1.452 1.464 3.192 3.012H3.912C3.444 2.58 2.712 1.644 2.292 0.288C1.968 -0.78 1.848 -1.896 1.848 -2.988C1.848 -6.528 3.108 -8.256 3.912 -9H3.192Z', id: 'g2-40'}), 
	                        React.createElement("path", {d: 'M1.368 3.012C3.168 1.404 3.624 -1.032 3.624 -2.988C3.624 -5.1 3.108 -7.452 1.368 -9H0.648C1.116 -8.568 1.848 -7.632 2.268 -6.276C2.592 -5.208 2.712 -4.092 2.712 -3C2.712 0.54 1.452 2.268 0.648 3.012H1.368Z', id: 'g2-41'}), 
	                        React.createElement("path", {d: 'M3.528 -8.112H3.3C3.108 -7.92 2.532 -7.356 1.236 -7.332C1.068 -7.332 1.056 -7.32 1.056 -7.104V-6.624C1.788 -6.624 2.34 -6.804 2.592 -6.912V-0.696H1.128V0H4.992V-0.696H3.528V-8.112Z', id: 'g2-49'}), 
	                        React.createElement("path", {d: 'M8.1 -3.924C8.268 -3.924 8.484 -3.924 8.484 -4.14C8.484 -4.368 8.28 -4.368 8.1 -4.368H1.032C0.864 -4.368 0.648 -4.368 0.648 -4.152C0.648 -3.924 0.852 -3.924 1.032 -3.924H8.1ZM8.1 -1.62C8.268 -1.62 8.484 -1.62 8.484 -1.836C8.484 -2.064 8.28 -2.064 8.1 -2.064H1.032C0.864 -2.064 0.648 -2.064 0.648 -1.848C0.648 -1.62 0.852 -1.62 1.032 -1.62H8.1Z', id: 'g2-61'}), 
	                        React.createElement("path", {d: 'M7.908 -2.76C8.112 -2.76 8.328 -2.76 8.328 -3S8.112 -3.24 7.908 -3.24H1.416C1.212 -3.24 0.996 -3.24 0.996 -3S1.212 -2.76 1.416 -2.76H7.908Z', id: 'g3-0'}), 
	                        React.createElement("path", {d: 'M3.708 -7.476C3.408 -8.328 2.46 -8.328 2.304 -8.328C2.232 -8.328 2.1 -8.328 2.1 -8.208C2.1 -8.112 2.172 -8.1 2.232 -8.088C2.412 -8.064 2.556 -8.04 2.748 -7.692C2.868 -7.464 4.104 -3.876 4.104 -3.852C4.104 -3.84 4.092 -3.828 3.996 -3.732L0.876 -0.576C0.732 -0.432 0.636 -0.336 0.636 -0.18C0.636 -0.012 0.78 0.132 0.972 0.132C1.02 0.132 1.152 0.108 1.224 0.036C1.416 -0.144 3.132 -2.244 4.224 -3.54C4.536 -2.604 4.92 -1.5 5.292 -0.492C5.352 -0.312 5.412 -0.144 5.58 0.012C5.7 0.12 5.724 0.12 6.06 0.12H6.288C6.336 0.12 6.42 0.12 6.42 0.024C6.42 -0.024 6.408 -0.036 6.36 -0.084C6.252 -0.216 6.168 -0.432 6.12 -0.576L3.708 -7.476Z', id: 'g4-21'}), 
	                        React.createElement("path", {d: 'M1.728 -0.264C2.028 0.012 2.472 0.12 2.88 0.12C3.648 0.12 4.176 -0.396 4.452 -0.768C4.572 -0.132 5.076 0.12 5.496 0.12C5.856 0.12 6.144 -0.096 6.36 -0.528C6.552 -0.936 6.72 -1.668 6.72 -1.716C6.72 -1.776 6.672 -1.824 6.6 -1.824C6.492 -1.824 6.48 -1.764 6.432 -1.584C6.252 -0.876 6.024 -0.12 5.532 -0.12C5.184 -0.12 5.16 -0.432 5.16 -0.672C5.16 -0.948 5.268 -1.38 5.352 -1.74L5.688 -3.036C5.736 -3.264 5.868 -3.804 5.928 -4.02C6 -4.308 6.132 -4.824 6.132 -4.872C6.132 -5.052 5.988 -5.172 5.808 -5.172C5.7 -5.172 5.448 -5.124 5.352 -4.764L4.512 -1.428C4.452 -1.188 4.452 -1.164 4.296 -0.972C4.152 -0.768 3.684 -0.12 2.928 -0.12C2.256 -0.12 2.04 -0.612 2.04 -1.176C2.04 -1.524 2.148 -1.944 2.196 -2.148L2.736 -4.308C2.796 -4.536 2.892 -4.92 2.892 -4.992C2.892 -5.184 2.736 -5.292 2.58 -5.292C2.472 -5.292 2.208 -5.256 2.112 -4.872L0.372 2.076C0.36 2.136 0.336 2.208 0.336 2.28C0.336 2.46 0.48 2.58 0.66 2.58C1.008 2.58 1.08 2.304 1.164 1.968L1.728 -0.264Z', id: 'g4-22'})), 
	                    React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                        React.createElement("use", {x: '56.6248', href: '#g0-80', y: '70.4514'}), 
	                        React.createElement("use", {x: '64.097', href: '#g1-107', y: '72.2514'}), 
	                        React.createElement("use", {x: '72.7444', href: '#g2-61', y: '70.4514'}), 
	                        React.createElement("use", {x: '85.2164', href: '#g2-40', y: '70.4514'}), 
	                        React.createElement("use", {x: '89.7858', href: '#g2-49', y: '70.4514'}), 
	                        React.createElement("use", {x: '98.3274', href: '#g3-0', y: '70.4514'}), 
	                        React.createElement("use", {x: '111.635', href: '#g4-21', y: '62.3333'}), 
	                        React.createElement("rect", {height: '0.47998', width: '7.06938', x: '111.527', y: '67.2114'}), 
	                        React.createElement("use", {x: '111.527', href: '#g4-22', y: '78.6828'}), 
	                        React.createElement("use", {x: '119.797', href: '#g2-41', y: '70.4514'}), 
	                        React.createElement("use", {x: '124.366', href: '#g2-40', y: '70.4514'}), 
	                        React.createElement("use", {x: '130.243', href: '#g4-21', y: '62.3333'}), 
	                        React.createElement("rect", {height: '0.47998', width: '7.06938', x: '130.136', y: '67.2114'}), 
	                        React.createElement("use", {x: '130.136', href: '#g4-22', y: '78.6828'}), 
	                        React.createElement("use", {x: '138.405', href: '#g2-41', y: '70.4514'}), 
	                        React.createElement("use", {x: '142.974', href: '#g1-107', y: '65.4967'}))));
	            case '2_t':
	                return (React.createElement("svg", {height: '29.8826pt', viewBox: '0 0 37.9349 29.8826', width: '37.9349pt'}, 
	                    React.createElement("defs", null, 
	                        React.createElement("path", {d: 'M6.12 -7.524H7.176C7.32 -7.524 7.464 -7.512 7.608 -7.512H9.18L9.336 -8.268H2.172L2.016 -7.512H3.6C3.744 -7.512 3.888 -7.524 4.032 -7.524H5.088L3.492 0H4.524L6.12 -7.524Z', id: 'g0-84'}), 
	                        React.createElement("path", {d: 'M3.528 -8.112H3.3C3.108 -7.92 2.532 -7.356 1.236 -7.332C1.068 -7.332 1.056 -7.32 1.056 -7.104V-6.624C1.788 -6.624 2.34 -6.804 2.592 -6.912V-0.696H1.128V0H4.992V-0.696H3.528V-8.112Z', id: 'g1-49'}), 
	                        React.createElement("path", {d: 'M8.1 -3.924C8.268 -3.924 8.484 -3.924 8.484 -4.14C8.484 -4.368 8.28 -4.368 8.1 -4.368H1.032C0.864 -4.368 0.648 -4.368 0.648 -4.152C0.648 -3.924 0.852 -3.924 1.032 -3.924H8.1ZM8.1 -1.62C8.268 -1.62 8.484 -1.62 8.484 -1.836C8.484 -2.064 8.28 -2.064 8.1 -2.064H1.032C0.864 -2.064 0.648 -2.064 0.648 -1.848C0.648 -1.62 0.852 -1.62 1.032 -1.62H8.1Z', id: 'g1-61'}), 
	                        React.createElement("path", {d: 'M1.728 -0.264C2.028 0.012 2.472 0.12 2.88 0.12C3.648 0.12 4.176 -0.396 4.452 -0.768C4.572 -0.132 5.076 0.12 5.496 0.12C5.856 0.12 6.144 -0.096 6.36 -0.528C6.552 -0.936 6.72 -1.668 6.72 -1.716C6.72 -1.776 6.672 -1.824 6.6 -1.824C6.492 -1.824 6.48 -1.764 6.432 -1.584C6.252 -0.876 6.024 -0.12 5.532 -0.12C5.184 -0.12 5.16 -0.432 5.16 -0.672C5.16 -0.948 5.268 -1.38 5.352 -1.74L5.688 -3.036C5.736 -3.264 5.868 -3.804 5.928 -4.02C6 -4.308 6.132 -4.824 6.132 -4.872C6.132 -5.052 5.988 -5.172 5.808 -5.172C5.7 -5.172 5.448 -5.124 5.352 -4.764L4.512 -1.428C4.452 -1.188 4.452 -1.164 4.296 -0.972C4.152 -0.768 3.684 -0.12 2.928 -0.12C2.256 -0.12 2.04 -0.612 2.04 -1.176C2.04 -1.524 2.148 -1.944 2.196 -2.148L2.736 -4.308C2.796 -4.536 2.892 -4.92 2.892 -4.992C2.892 -5.184 2.736 -5.292 2.58 -5.292C2.472 -5.292 2.208 -5.256 2.112 -4.872L0.372 2.076C0.36 2.136 0.336 2.208 0.336 2.28C0.336 2.46 0.48 2.58 0.66 2.58C1.008 2.58 1.08 2.304 1.164 1.968L1.728 -0.264Z', id: 'g2-22'})), 
	                    React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                        React.createElement("rect", {height: '0.47998', width: '9.62187', x: '56.6248', y: '59.726'}), 
	                        React.createElement("use", {x: '56.6248', href: '#g0-84', y: '69.9792'}), 
	                        React.createElement("use", {x: '69.58', href: '#g1-61', y: '69.9792'}), 
	                        React.createElement("use", {x: '83.8493', href: '#g1-49', y: '61.8611'}), 
	                        React.createElement("rect", {height: '0.47998', width: '7.06938', x: '83.252', y: '66.7392'}), 
	                        React.createElement("use", {x: '83.252', href: '#g2-22', y: '78.2106'}))));
	            case '2_k':
	                return (React.createElement("svg", {height: '30.4142pt', viewBox: '0 0 37.8372 30.4142', width: '37.8372pt'}, 
	                    React.createElement("defs", null, 
	                        React.createElement("path", {d: 'M5.364 -5.028L9.204 -8.328H8.076L2.928 -3.9L3.876 -8.328H2.868L1.092 0H2.1L2.676 -2.712L4.572 -4.344L6.48 0H7.584L5.364 -5.028Z', id: 'g0-75'}), 
	                        React.createElement("path", {d: 'M8.1 -3.924C8.268 -3.924 8.484 -3.924 8.484 -4.14C8.484 -4.368 8.28 -4.368 8.1 -4.368H1.032C0.864 -4.368 0.648 -4.368 0.648 -4.152C0.648 -3.924 0.852 -3.924 1.032 -3.924H8.1ZM8.1 -1.62C8.268 -1.62 8.484 -1.62 8.484 -1.836C8.484 -2.064 8.28 -2.064 8.1 -2.064H1.032C0.864 -2.064 0.648 -2.064 0.648 -1.848C0.648 -1.62 0.852 -1.62 1.032 -1.62H8.1Z', id: 'g1-61'}), 
	                        React.createElement("path", {d: 'M3.708 -7.476C3.408 -8.328 2.46 -8.328 2.304 -8.328C2.232 -8.328 2.1 -8.328 2.1 -8.208C2.1 -8.112 2.172 -8.1 2.232 -8.088C2.412 -8.064 2.556 -8.04 2.748 -7.692C2.868 -7.464 4.104 -3.876 4.104 -3.852C4.104 -3.84 4.092 -3.828 3.996 -3.732L0.876 -0.576C0.732 -0.432 0.636 -0.336 0.636 -0.18C0.636 -0.012 0.78 0.132 0.972 0.132C1.02 0.132 1.152 0.108 1.224 0.036C1.416 -0.144 3.132 -2.244 4.224 -3.54C4.536 -2.604 4.92 -1.5 5.292 -0.492C5.352 -0.312 5.412 -0.144 5.58 0.012C5.7 0.12 5.724 0.12 6.06 0.12H6.288C6.336 0.12 6.42 0.12 6.42 0.024C6.42 -0.024 6.408 -0.036 6.36 -0.084C6.252 -0.216 6.168 -0.432 6.12 -0.576L3.708 -7.476Z', id: 'g2-21'}), 
	                        React.createElement("path", {d: 'M1.728 -0.264C2.028 0.012 2.472 0.12 2.88 0.12C3.648 0.12 4.176 -0.396 4.452 -0.768C4.572 -0.132 5.076 0.12 5.496 0.12C5.856 0.12 6.144 -0.096 6.36 -0.528C6.552 -0.936 6.72 -1.668 6.72 -1.716C6.72 -1.776 6.672 -1.824 6.6 -1.824C6.492 -1.824 6.48 -1.764 6.432 -1.584C6.252 -0.876 6.024 -0.12 5.532 -0.12C5.184 -0.12 5.16 -0.432 5.16 -0.672C5.16 -0.948 5.268 -1.38 5.352 -1.74L5.688 -3.036C5.736 -3.264 5.868 -3.804 5.928 -4.02C6 -4.308 6.132 -4.824 6.132 -4.872C6.132 -5.052 5.988 -5.172 5.808 -5.172C5.7 -5.172 5.448 -5.124 5.352 -4.764L4.512 -1.428C4.452 -1.188 4.452 -1.164 4.296 -0.972C4.152 -0.768 3.684 -0.12 2.928 -0.12C2.256 -0.12 2.04 -0.612 2.04 -1.176C2.04 -1.524 2.148 -1.944 2.196 -2.148L2.736 -4.308C2.796 -4.536 2.892 -4.92 2.892 -4.992C2.892 -5.184 2.736 -5.292 2.58 -5.292C2.472 -5.292 2.208 -5.256 2.112 -4.872L0.372 2.076C0.36 2.136 0.336 2.208 0.336 2.28C0.336 2.46 0.48 2.58 0.66 2.58C1.008 2.58 1.08 2.304 1.164 1.968L1.728 -0.264Z', id: 'g2-22'})), 
	                    React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                        React.createElement("rect", {height: '0.47998', width: '9.53506', x: '56.6248', y: '60.1982'}), 
	                        React.createElement("use", {x: '56.6248', href: '#g0-75', y: '70.4514'}), 
	                        React.createElement("use", {x: '69.4932', href: '#g1-61', y: '70.4514'}), 
	                        React.createElement("use", {x: '83.2729', href: '#g2-21', y: '62.3333'}), 
	                        React.createElement("rect", {height: '0.47998', width: '7.06938', x: '83.1652', y: '67.2114'}), 
	                        React.createElement("use", {x: '83.1652', href: '#g2-22', y: '78.6828'}))));
	            case '2_pk':
	                return (React.createElement("svg", {height: '32.5185pt', viewBox: '0 0 89.0767 32.5185', width: '89.0767pt'}, 
	                    React.createElement("defs", null, 
	                        React.createElement("path", {d: 'M2.856 -3.468H4.764C6.6 -3.468 8.124 -4.944 8.124 -6.348C8.124 -7.38 7.284 -8.328 5.796 -8.328H2.868L1.092 0H2.124L2.856 -3.468ZM3.732 -7.656H5.388C6.6 -7.656 7.164 -7.044 7.164 -6.264C7.164 -5.34 6.348 -4.164 4.644 -4.164H2.988L3.732 -7.656Z', id: 'g0-80'}), 
	                        React.createElement("path", {d: 'M5.46 -2.7C5.484 -2.808 5.58 -3.3 5.58 -3.708C5.58 -5.112 4.716 -5.508 3.936 -5.508C2.4 -5.508 0.9 -3.78 0.9 -2.052C0.9 -0.744 1.752 0.12 2.916 0.12C3.972 0.12 4.884 -0.468 4.92 -0.54C4.932 -0.588 4.992 -1.032 5.016 -1.284C4.296 -0.756 3.564 -0.6 3.084 -0.6C2.232 -0.6 1.74 -1.308 1.74 -2.16C1.74 -2.232 1.74 -2.352 1.764 -2.544C1.8 -2.688 1.812 -2.7 2.016 -2.7H5.46ZM2.016 -3.348C2.4 -4.212 3.12 -4.788 3.792 -4.788C4.344 -4.788 4.896 -4.476 4.896 -3.492C4.896 -3.432 4.896 -3.396 4.884 -3.348H2.016Z', id: 'g0-101'}), 
	                        React.createElement("path", {d: 'M3.96 -3.276L6.36 -5.328H5.268L2.436 -2.916L3.588 -8.328H2.712L0.936 0H1.776L2.148 -1.728L3.252 -2.676L4.512 0H5.496L3.96 -3.276Z', id: 'g0-107'}), 
	                        React.createElement("path", {d: 'M2.848 -2.176L4.568 -3.552H3.8L1.728 -1.896L2.512 -5.552H1.888L0.704 0H1.296L1.536 -1.12L2.352 -1.776L3.296 0H4L2.848 -2.176Z', id: 'g1-107'}), 
	                        React.createElement("path", {d: 'M2.352 -8.328H1.38L1.476 -2.076H2.256L2.352 -8.328ZM1.38 0H2.352V-0.972H1.38V0Z', id: 'g2-33'}), 
	                        React.createElement("path", {d: 'M3.192 -9C1.392 -7.392 0.936 -4.956 0.936 -3C0.936 -0.888 1.452 1.464 3.192 3.012H3.912C3.444 2.58 2.712 1.644 2.292 0.288C1.968 -0.78 1.848 -1.896 1.848 -2.988C1.848 -6.528 3.108 -8.256 3.912 -9H3.192Z', id: 'g2-40'}), 
	                        React.createElement("path", {d: 'M1.368 3.012C3.168 1.404 3.624 -1.032 3.624 -2.988C3.624 -5.1 3.108 -7.452 1.368 -9H0.648C1.116 -8.568 1.848 -7.632 2.268 -6.276C2.592 -5.208 2.712 -4.092 2.712 -3C2.712 0.54 1.452 2.268 0.648 3.012H1.368Z', id: 'g2-41'}), 
	                        React.createElement("path", {d: 'M8.1 -3.924C8.268 -3.924 8.484 -3.924 8.484 -4.14C8.484 -4.368 8.28 -4.368 8.1 -4.368H1.032C0.864 -4.368 0.648 -4.368 0.648 -4.152C0.648 -3.924 0.852 -3.924 1.032 -3.924H8.1ZM8.1 -1.62C8.268 -1.62 8.484 -1.62 8.484 -1.836C8.484 -2.064 8.28 -2.064 8.1 -2.064H1.032C0.864 -2.064 0.648 -2.064 0.648 -1.848C0.648 -1.62 0.852 -1.62 1.032 -1.62H8.1Z', id: 'g2-61'}), 
	                        React.createElement("path", {d: 'M3.008 -2.296C3.304 -1.568 3.792 -0.264 3.88 -0.12C4.016 0.08 4.176 0.08 4.368 0.08C4.6 0.08 4.664 0.08 4.664 -0.016C4.664 -0.056 4.648 -0.08 4.616 -0.104C4.52 -0.216 4.48 -0.296 4.424 -0.448L2.624 -5.016C2.568 -5.168 2.416 -5.552 1.592 -5.552C1.512 -5.552 1.392 -5.552 1.392 -5.44C1.392 -5.344 1.472 -5.336 1.512 -5.328C1.672 -5.304 1.824 -5.288 2.008 -4.824L2.584 -3.384L2.896 -2.576L0.608 -0.456C0.52 -0.376 0.44 -0.28 0.44 -0.168C0.44 -0.008 0.576 0.096 0.712 0.096C0.824 0.096 0.936 0.008 1.008 -0.072L3.008 -2.296Z', id: 'g3-21'}), 
	                        React.createElement("path", {d: 'M1.936 -2.824C1.976 -2.976 2.04 -3.24 2.04 -3.28C2.04 -3.448 1.912 -3.528 1.776 -3.528C1.504 -3.528 1.44 -3.264 1.408 -3.152L0.296 1.288C0.264 1.416 0.264 1.456 0.264 1.472C0.264 1.672 0.424 1.72 0.52 1.72C0.56 1.72 0.744 1.712 0.848 1.504C0.872 1.44 1.104 0.488 1.264 -0.152C1.4 -0.048 1.672 0.08 2.08 0.08C2.736 0.08 3.168 -0.456 3.192 -0.488C3.336 0.064 3.88 0.08 3.976 0.08C4.344 0.08 4.528 -0.224 4.592 -0.36C4.752 -0.648 4.864 -1.112 4.864 -1.144C4.864 -1.192 4.832 -1.248 4.736 -1.248S4.624 -1.2 4.576 -1C4.464 -0.56 4.312 -0.144 4 -0.144C3.816 -0.144 3.744 -0.296 3.744 -0.52C3.744 -0.656 3.832 -1 3.888 -1.232L4.096 -2.048C4.144 -2.256 4.184 -2.424 4.248 -2.664C4.288 -2.84 4.368 -3.152 4.368 -3.2C4.368 -3.4 4.208 -3.448 4.112 -3.448C3.832 -3.448 3.784 -3.248 3.696 -2.888L3.528 -2.224L3.28 -1.224L3.2 -0.904C3.184 -0.856 2.968 -0.552 2.784 -0.4C2.648 -0.296 2.416 -0.144 2.12 -0.144C1.744 -0.144 1.488 -0.344 1.488 -0.84C1.488 -1.048 1.552 -1.288 1.6 -1.48L1.936 -2.824Z', id: 'g3-22'}), 
	                        React.createElement("path", {d: 'M2.44 -6C2.304 -6 2.288 -6 2.192 -5.912C1.184 -5.032 0.672 -3.608 0.672 -2C0.672 -0.488 1.128 0.968 2.184 1.896C2.288 2 2.304 2 2.44 2H2.824C2.8 1.984 2.024 1.32 1.656 0.072C1.464 -0.552 1.368 -1.208 1.368 -2C1.368 -4.768 2.664 -5.864 2.824 -6H2.44Z', id: 'g4-40'}), 
	                        React.createElement("path", {d: 'M0.856 2C0.992 2 1.008 2 1.104 1.912C2.112 1.032 2.624 -0.392 2.624 -2C2.624 -3.512 2.168 -4.968 1.112 -5.896C1.008 -6 0.992 -6 0.856 -6H0.472C0.496 -5.984 1.272 -5.32 1.64 -4.072C1.832 -3.448 1.928 -2.792 1.928 -2C1.928 0.768 0.632 1.864 0.472 2H0.856Z', id: 'g4-41'}), 
	                        React.createElement("path", {d: 'M5.592 -1.816C5.72 -1.816 5.896 -1.816 5.896 -2S5.72 -2.184 5.592 -2.184H1.008C0.88 -2.184 0.704 -2.184 0.704 -2S0.88 -1.816 1.008 -1.816H5.592Z', id: 'g5-0'}), 
	                        React.createElement("path", {d: 'M2.598 -1.716L3.312 -0.156C3.354 -0.072 3.426 -0.018 3.432 -0.018C3.54 0.06 3.588 0.06 3.696 0.06H3.816C3.924 0.06 3.996 0.06 3.996 -0.024C3.996 -0.06 3.978 -0.084 3.954 -0.102C3.888 -0.156 3.846 -0.24 3.81 -0.318L2.232 -3.774C2.166 -3.924 2.052 -4.164 1.392 -4.164C1.308 -4.164 1.206 -4.164 1.206 -4.062C1.206 -4.002 1.254 -3.972 1.29 -3.966C1.482 -3.948 1.59 -3.918 1.776 -3.528L2.496 -1.944L0.678 -0.372C0.594 -0.3 0.54 -0.252 0.54 -0.144C0.54 0.006 0.66 0.072 0.756 0.072C0.858 0.072 0.924 0 0.972 -0.048L2.598 -1.716Z', id: 'g6-21'}), 
	                        React.createElement("path", {d: 'M2.802 -0.846C2.772 -0.732 2.772 -0.72 2.664 -0.582C2.532 -0.42 2.25 -0.138 1.878 -0.138C1.35 -0.138 1.35 -0.552 1.35 -0.672C1.35 -0.828 1.368 -0.906 1.416 -1.104C1.47 -1.302 1.482 -1.35 1.536 -1.572S1.602 -1.842 1.656 -2.04C1.686 -2.178 1.746 -2.412 1.746 -2.442C1.746 -2.586 1.632 -2.646 1.536 -2.646C1.314 -2.646 1.26 -2.436 1.242 -2.358L0.402 1.008C0.39 1.056 0.384 1.074 0.384 1.092C0.384 1.164 0.438 1.29 0.6 1.29C0.81 1.29 0.864 1.11 0.894 0.984C0.924 0.888 1.008 0.516 1.176 -0.12C1.422 0.06 1.788 0.06 1.854 0.06C2.31 0.06 2.586 -0.21 2.754 -0.378C2.868 0.012 3.276 0.06 3.408 0.06C3.624 0.06 3.78 -0.06 3.894 -0.246C4.044 -0.486 4.128 -0.834 4.128 -0.864C4.128 -0.876 4.122 -0.948 4.014 -0.948C3.924 -0.948 3.912 -0.906 3.888 -0.81C3.792 -0.444 3.666 -0.138 3.432 -0.138C3.228 -0.138 3.21 -0.354 3.21 -0.444C3.21 -0.522 3.228 -0.588 3.276 -0.786C3.336 -1.014 3.336 -1.026 3.39 -1.248L3.624 -2.166C3.642 -2.238 3.672 -2.358 3.672 -2.388C3.672 -2.46 3.618 -2.586 3.456 -2.586C3.354 -2.586 3.252 -2.52 3.21 -2.436C3.186 -2.394 3.144 -2.208 3.114 -2.094L2.802 -0.846Z', id: 'g6-22'})), 
	                    React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                        React.createElement("use", {x: '56.6248', href: '#g0-80', y: '74.6539'}), 
	                        React.createElement("use", {x: '64.097', href: '#g1-107', y: '76.4539'}), 
	                        React.createElement("use", {x: '72.7444', href: '#g2-61', y: '74.6539'}), 
	                        React.createElement("use", {x: '86.4164', href: '#g2-40', y: '64.2803'}), 
	                        React.createElement("use", {x: '92.2634', href: '#g3-21', y: '59.5556'}), 
	                        React.createElement("rect", {height: '0.47998', width: '5.11348', x: '92.1858', y: '61.0403'}), 
	                        React.createElement("use", {x: '92.1858', href: '#g3-22', y: '68.4184'}), 
	                        React.createElement("use", {x: '98.4993', href: '#g2-41', y: '64.2803'}), 
	                        React.createElement("use", {x: '103.069', href: '#g1-107', y: '59.9256'}), 
	                        React.createElement("rect", {height: '0.47998', width: '21.9664', x: '86.4164', y: '71.4139'}), 
	                        React.createElement("use", {x: '92.1794', href: '#g0-107', y: '82.8853'}), 
	                        React.createElement("use", {x: '98.8838', href: '#g2-33', y: '82.8853'}), 
	                        React.createElement("use", {x: '109.583', href: '#g0-101', y: '74.6539'}), 
	                        React.createElement("use", {x: '115.627', href: '#g4-40', y: '69.0583'}), 
	                        React.createElement("use", {x: '118.933', href: '#g5-0', y: '69.0583'}), 
	                        React.createElement("use", {x: '126.785', href: '#g6-21', y: '65.7876'}), 
	                        React.createElement("rect", {height: '0.360001', width: '4.5', x: '126.744', y: '66.8783'}), 
	                        React.createElement("use", {x: '126.744', href: '#g6-22', y: '72.1956'}), 
	                        React.createElement("use", {x: '132.444', href: '#g4-41', y: '69.0583'}))));
	            case '3_j':
	                return (React.createElement("svg", {height: '12.744pt', version: '1.1', viewBox: '0 0 35.5302 12.744', width: '35.5302pt'}, 
	                    React.createElement("defs", null, 
	                        React.createElement("path", {d: 'M3.60255 -7.446H2.628L2.41995 -6.47145H3.3945L3.60255 -7.446ZM1.0293 0.75555C0.9855 0.95265 0.9417 1.1388 0.68985 1.3359C0.49275 1.47825 0.2628 1.54395 0.0219 1.54395C-0.29565 1.54395 -0.55845 1.43445 -0.75555 1.2045L-1.06215 1.87245C-0.62415 2.17905 -0.12045 2.24475 0.16425 2.24475C0.95265 2.24475 1.67535 1.56585 1.8615 0.7008L3.0441 -4.8618H2.22285L1.0293 0.75555Z', id: 'g0-106'}), 
	                        React.createElement("path", {d: 'M7.52265 -3.6135C7.6869 -3.6135 7.89495 -3.6135 7.89495 -3.8325S7.6869 -4.0515 7.5336 -4.0515H0.97455C0.82125 -4.0515 0.6132 -4.0515 0.6132 -3.8325S0.82125 -3.6135 0.9855 -3.6135H7.52265ZM7.5336 -1.4235C7.6869 -1.4235 7.89495 -1.4235 7.89495 -1.6425S7.6869 -1.8615 7.52265 -1.8615H0.9855C0.82125 -1.8615 0.6132 -1.8615 0.6132 -1.6425S0.82125 -1.4235 0.97455 -1.4235H7.5336Z', id: 'g1-61'}), 
	                        React.createElement("path", {d: 'M3.90915 -3.1974C4.3581 -2.04765 4.8837 -0.3723 5.0589 -0.12045C5.2341 0.12045 5.3436 0.12045 5.63925 0.12045H5.88015C5.98965 0.1095 6.0006 0.0438 6.0006 0.01095S5.9787 -0.0438 5.94585 -0.0876C5.83635 -0.20805 5.77065 -0.3723 5.694 -0.5913L3.4602 -6.82185C3.23025 -7.45695 2.63895 -7.5993 2.1243 -7.5993C2.06955 -7.5993 1.9272 -7.5993 1.9272 -7.47885C1.9272 -7.39125 2.0148 -7.36935 2.02575 -7.36935C2.3871 -7.30365 2.46375 -7.23795 2.7375 -6.49335L3.79965 -3.51495L0.77745 -0.51465C0.64605 -0.38325 0.58035 -0.31755 0.58035 -0.1752C0.58035 0.01095 0.73365 0.14235 0.90885 0.14235S1.1826 0.0219 1.2702 -0.0876L3.90915 -3.1974Z', id: 'g2-21'}), 
	                        React.createElement("path", {d: 'M5.6721 -4.08435C5.81445 -4.08435 6.20865 -4.08435 6.20865 -4.45665C6.20865 -4.71945 5.9787 -4.71945 5.7816 -4.71945H3.285C1.63155 -4.71945 0.4161 -2.9127 0.4161 -1.60965C0.4161 -0.64605 1.06215 0.12045 2.0586 0.12045C3.3507 0.12045 4.80705 -1.2045 4.80705 -2.8908C4.80705 -3.07695 4.80705 -3.60255 4.4676 -4.08435H5.6721ZM2.06955 -0.12045C1.533 -0.12045 1.095 -0.51465 1.095 -1.30305C1.095 -1.63155 1.2264 -2.52945 1.60965 -3.1755C2.06955 -3.93105 2.72655 -4.08435 3.09885 -4.08435C4.01865 -4.08435 4.10625 -3.36165 4.10625 -3.0222C4.10625 -2.50755 3.88725 -1.60965 3.51495 -1.0512C3.0879 -0.40515 2.4966 -0.12045 2.06955 -0.12045Z', id: 'g2-27'})), 
	                    React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -64.1942)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                        React.createElement("rect", {height: '0.437988', width: '3.92329', x: '56.6248', y: '56.809'}), 
	                        React.createElement("use", {x: '56.6248', href: '#g0-106', y: '66'}), 
	                        React.createElement("use", {x: '63.5897', href: '#g1-61', y: '66'}), 
	                        React.createElement("use", {x: '75.148', href: '#g2-21', y: '66'}), 
	                        React.createElement("rect", {height: '0.437988', width: '6.64984', x: '81.5356', y: '59.5335'}), 
	                        React.createElement("use", {x: '81.5356', href: '#g2-27', y: '66'}))));
	            case '3_s':
	                return (React.createElement("svg", {height: '27.9584pt', viewBox: '0 0 74.4134 27.9584', width: '74.4134pt'}, 
	                    React.createElement("defs", null, 
	                        React.createElement("path", {d: 'M2.52945 -3.84345C2.5842 -4.0734 2.6937 -4.4895 2.6937 -4.54425C2.6937 -4.7304 2.5623 -4.8399 2.37615 -4.8399C2.3433 -4.8399 2.0367 -4.82895 1.93815 -4.4457L0.36135 1.89435C0.3285 2.02575 0.3285 2.04765 0.3285 2.06955C0.3285 2.2338 0.44895 2.3652 0.6351 2.3652C0.86505 2.3652 0.99645 2.1681 1.01835 2.13525C1.06215 2.0367 1.2045 1.4673 1.6206 -0.219C1.971 0.07665 2.46375 0.12045 2.68275 0.12045C3.44925 0.12045 3.8763 -0.3723 4.1391 -0.6789C4.23765 -0.18615 4.6428 0.12045 5.1246 0.12045C5.50785 0.12045 5.7597 -0.1314 5.9349 -0.4818C6.12105 -0.876 6.2634 -1.54395 6.2634 -1.56585C6.2634 -1.67535 6.16485 -1.67535 6.132 -1.67535C6.0225 -1.67535 6.01155 -1.63155 5.9787 -1.47825C5.79255 -0.7665 5.59545 -0.12045 5.1465 -0.12045C4.85085 -0.12045 4.818 -0.40515 4.818 -0.62415C4.818 -0.86505 4.9494 -1.3797 5.037 -1.76295L5.3436 -2.94555C5.37645 -3.1098 5.48595 -3.5259 5.52975 -3.69015C5.5845 -3.942 5.694 -4.3581 5.694 -4.4238C5.694 -4.6209 5.5407 -4.71945 5.37645 -4.71945C5.3217 -4.71945 5.037 -4.7085 4.9494 -4.3362L4.43475 -2.28855C4.30335 -1.74105 4.1829 -1.28115 4.15005 -1.17165C4.1391 -1.1169 3.6135 -0.12045 2.72655 -0.12045C2.17905 -0.12045 1.91625 -0.4818 1.91625 -1.0731C1.91625 -1.39065 1.9929 -1.69725 2.06955 -2.00385L2.52945 -3.84345Z', id: 'g0-22'}), 
	                        React.createElement("path", {d: 'M5.6721 -4.08435C5.81445 -4.08435 6.20865 -4.08435 6.20865 -4.45665C6.20865 -4.71945 5.9787 -4.71945 5.7816 -4.71945H3.285C1.63155 -4.71945 0.4161 -2.9127 0.4161 -1.60965C0.4161 -0.64605 1.06215 0.12045 2.0586 0.12045C3.3507 0.12045 4.80705 -1.2045 4.80705 -2.8908C4.80705 -3.07695 4.80705 -3.60255 4.4676 -4.08435H5.6721ZM2.06955 -0.12045C1.533 -0.12045 1.095 -0.51465 1.095 -1.30305C1.095 -1.63155 1.2264 -2.52945 1.60965 -3.1755C2.06955 -3.93105 2.72655 -4.08435 3.09885 -4.08435C4.01865 -4.08435 4.10625 -3.36165 4.10625 -3.0222C4.10625 -2.50755 3.88725 -1.60965 3.51495 -1.0512C3.0879 -0.40515 2.4966 -0.12045 2.06955 -0.12045Z', id: 'g0-27'}), 
	                        React.createElement("path", {d: 'M2.96745 -8.2125C2.61705 -7.884 1.8834 -7.21605 1.3797 -5.8692C0.9417 -4.69755 0.86505 -3.53685 0.86505 -2.7375C0.86505 0.79935 2.44185 2.2557 2.96745 2.7375H3.6354C3.1098 2.2119 1.71915 0.79935 1.71915 -2.7375C1.71915 -3.3507 1.752 -4.63185 2.20095 -5.92395C2.6499 -7.19415 3.27405 -7.85115 3.6354 -8.2125H2.96745Z', id: 'g1-40'}), 
	                        React.createElement("path", {d: 'M1.28115 2.7375C1.63155 2.409 2.3652 1.74105 2.8689 0.3942C3.3069 -0.77745 3.38355 -1.93815 3.38355 -2.7375C3.38355 -6.27435 1.80675 -7.7307 1.28115 -8.2125H0.6132C1.1388 -7.6869 2.52945 -6.27435 2.52945 -2.7375C2.52945 -2.1243 2.4966 -0.84315 2.04765 0.44895C1.5987 1.71915 0.97455 2.37615 0.6132 2.7375H1.28115Z', id: 'g1-41'}), 
	                        React.createElement("path", {d: 'M3.27405 -7.4241H3.05505C2.409 -6.75615 1.50015 -6.7233 0.97455 -6.7014V-6.0663C1.3359 -6.07725 1.8615 -6.09915 2.409 -6.3291V-0.6351H1.04025V0H4.6428V-0.6351H3.27405V-7.4241Z', id: 'g1-49'}), 
	                        React.createElement("path", {d: 'M7.52265 -3.6135C7.6869 -3.6135 7.89495 -3.6135 7.89495 -3.8325S7.6869 -4.0515 7.5336 -4.0515H0.97455C0.82125 -4.0515 0.6132 -4.0515 0.6132 -3.8325S0.82125 -3.6135 0.9855 -3.6135H7.52265ZM7.5336 -1.4235C7.6869 -1.4235 7.89495 -1.4235 7.89495 -1.6425S7.6869 -1.8615 7.52265 -1.8615H0.9855C0.82125 -1.8615 0.6132 -1.8615 0.6132 -1.6425S0.82125 -1.4235 0.97455 -1.4235H7.5336Z', id: 'g1-61'}), 
	                        React.createElement("path", {d: 'M8.76 -7.5993H7.9059L5.6721 -3.88725C4.06245 -1.2045 3.942 -0.8979 3.8982 -0.7884H3.88725C3.88725 -1.0293 3.88725 -1.08405 3.7449 -2.0367C3.6792 -2.4747 3.6135 -2.92365 3.53685 -3.36165L2.7813 -7.5993H1.76295L3.14265 0H4.15005L8.76 -7.5993Z', id: 'g2-86'}), 
	                        React.createElement("path", {d: 'M1.8615 -0.5037C2.02575 -0.31755 2.41995 0.12045 3.1974 0.12045C4.4895 0.12045 5.85825 -1.39065 5.85825 -3.20835C5.85825 -4.1391 5.44215 -4.98225 4.5771 -4.98225C3.8982 -4.98225 3.1536 -4.7085 2.63895 -4.32525L2.74845 -4.8618H1.9272L0.44895 2.1243H1.30305L1.8615 -0.5037ZM2.4966 -3.4821C2.5404 -3.66825 2.55135 -3.6792 2.68275 -3.8106C3.16455 -4.2267 3.60255 -4.28145 3.82155 -4.28145C4.50045 -4.28145 4.9713 -3.723 4.9713 -2.90175C4.9713 -1.6644 3.93105 -0.5475 2.92365 -0.5475C2.17905 -0.5475 2.02575 -1.2264 2.02575 -1.2702C2.02575 -1.28115 2.0586 -1.4016 2.0586 -1.4235L2.4966 -3.4821Z', id: 'g2-112'}), 
	                        React.createElement("path", {d: 'M7.21605 -2.5185C7.4022 -2.5185 7.5993 -2.5185 7.5993 -2.7375S7.4022 -2.9565 7.21605 -2.9565H1.2921C1.10595 -2.9565 0.90885 -2.9565 0.90885 -2.7375S1.10595 -2.5185 1.2921 -2.5185H7.21605Z', id: 'g3-0'})), 
	                    React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                        React.createElement("rect", {height: '0.437988', width: '6.64984', x: '56.6248', y: '62.1196'}), 
	                        React.createElement("use", {x: '56.6248', href: '#g0-27', y: '68.5861'}), 
	                        React.createElement("use", {x: '66.3163', href: '#g1-61', y: '68.5861'}), 
	                        React.createElement("use", {x: '98.1619', href: '#g1-49', y: '61.1783'}), 
	                        React.createElement("rect", {height: '0.437988', width: '43.6497', x: '79.0746', y: '65.6296'}), 
	                        React.createElement("use", {x: '79.0746', href: '#g0-22', y: '76.0972'}), 
	                        React.createElement("use", {x: '85.6725', href: '#g1-40', y: '76.0972'}), 
	                        React.createElement("use", {x: '89.9308', href: '#g2-86', y: '76.0972'}), 
	                        React.createElement("use", {x: '101.433', href: '#g3-0', y: '76.0972'}), 
	                        React.createElement("use", {x: '112.383', href: '#g2-112', y: '76.0972'}), 
	                        React.createElement("use", {x: '118.466', href: '#g1-41', y: '76.0972'}))));
	            case '3_pt':
	                return (React.createElement("svg", {height: '41.7253pt', viewBox: '0 0 140.912 41.7253', width: '140.912pt'}, 
	                    React.createElement("defs", null, 
	                        React.createElement("path", {d: 'M2.6937 -3.16455H4.5333C6.0444 -3.16455 7.5555 -4.41285 7.5555 -5.7816C7.5555 -6.789 6.7233 -7.5993 5.39835 -7.5993H2.6718L1.0512 0H2.02575L2.6937 -3.16455ZM3.4821 -6.9861H5.02605C6.01155 -6.9861 6.66855 -6.5262 6.66855 -5.70495C6.66855 -4.82895 5.85825 -3.79965 4.34715 -3.79965H2.8032L3.4821 -6.9861Z', id: 'g0-80'}), 
	                        React.createElement("path", {d: 'M6.72 -5.552H6.024L4.424 -2.992L3.536 -1.52C3.104 -0.8 3.056 -0.68 3.04 -0.632H3.032C3.032 -1.056 2.8 -2.24 2.648 -3L2.144 -5.552H1.296L2.424 0H3.232L6.72 -5.552Z', id: 'g1-86'}), 
	                        React.createElement("path", {d: 'M1.456 -0.376C1.632 -0.176 1.984 0.08 2.512 0.08C3.504 0.08 4.536 -1 4.536 -2.328C4.536 -2.888 4.288 -3.632 3.544 -3.632C3 -3.632 2.48 -3.464 2.024 -3.168L2.104 -3.552H1.432L0.352 1.552H1.048L1.456 -0.376ZM1.936 -2.648C2.016 -2.728 2.392 -3.08 2.912 -3.08C3.384 -3.08 3.808 -2.744 3.808 -2.08C3.808 -1.192 3.008 -0.448 2.272 -0.448C1.872 -0.448 1.664 -0.696 1.576 -0.944L1.936 -2.648Z', id: 'g1-112'}), 
	                        React.createElement("path", {d: 'M2.152 -3.048H3.336L3.44 -3.552H2.256L2.472 -4.568H1.856L1.64 -3.552H0.912L0.808 -3.048H1.512L1.096 -1.112C1.072 -0.976 1.024 -0.744 1.024 -0.568C1.024 -0.184 1.16 0.08 1.56 0.08C1.912 0.08 2.344 0.008 2.88 -0.216L2.84 -0.72C2.6 -0.576 2.328 -0.472 2.032 -0.472C1.848 -0.472 1.712 -0.56 1.712 -0.864C1.712 -0.96 1.736 -1.064 1.736 -1.072L2.152 -3.048Z', id: 'g1-116'}), 
	                        React.createElement("path", {d: 'M2.608 -1.832L4.528 -3.552H3.816L2.408 -2.24L1.52 -3.552H0.8L2.032 -1.832L0 0H0.712L2.248 -1.504L3.192 0H3.912L2.608 -1.832Z', id: 'g1-120'}), 
	                        React.createElement("path", {d: 'M2.96745 -8.2125C2.61705 -7.884 1.8834 -7.21605 1.3797 -5.8692C0.9417 -4.69755 0.86505 -3.53685 0.86505 -2.7375C0.86505 0.79935 2.44185 2.2557 2.96745 2.7375H3.6354C3.1098 2.2119 1.71915 0.79935 1.71915 -2.7375C1.71915 -3.3507 1.752 -4.63185 2.20095 -5.92395C2.6499 -7.19415 3.27405 -7.85115 3.6354 -8.2125H2.96745Z', id: 'g2-40'}), 
	                        React.createElement("path", {d: 'M1.28115 2.7375C1.63155 2.409 2.3652 1.74105 2.8689 0.3942C3.3069 -0.77745 3.38355 -1.93815 3.38355 -2.7375C3.38355 -6.27435 1.80675 -7.7307 1.28115 -8.2125H0.6132C1.1388 -7.6869 2.52945 -6.27435 2.52945 -2.7375C2.52945 -2.1243 2.4966 -0.84315 2.04765 0.44895C1.5987 1.71915 0.97455 2.37615 0.6132 2.7375H1.28115Z', id: 'g2-41'}), 
	                        React.createElement("path", {d: 'M4.47855 -2.5185H7.5336C7.6869 -2.5185 7.89495 -2.5185 7.89495 -2.7375S7.6869 -2.9565 7.5336 -2.9565H4.47855V-6.0225C4.47855 -6.1758 4.47855 -6.38385 4.25955 -6.38385S4.04055 -6.1758 4.04055 -6.0225V-2.9565H0.97455C0.82125 -2.9565 0.6132 -2.9565 0.6132 -2.7375S0.82125 -2.5185 0.97455 -2.5185H4.04055V0.5475C4.04055 0.7008 4.04055 0.90885 4.25955 0.90885S4.47855 0.7008 4.47855 0.5475V-2.5185Z', id: 'g2-43'}), 
	                        React.createElement("path", {d: 'M7.52265 -3.6135C7.6869 -3.6135 7.89495 -3.6135 7.89495 -3.8325S7.6869 -4.0515 7.5336 -4.0515H0.97455C0.82125 -4.0515 0.6132 -4.0515 0.6132 -3.8325S0.82125 -3.6135 0.9855 -3.6135H7.52265ZM7.5336 -1.4235C7.6869 -1.4235 7.89495 -1.4235 7.89495 -1.6425S7.6869 -1.8615 7.52265 -1.8615H0.9855C0.82125 -1.8615 0.6132 -1.8615 0.6132 -1.6425S0.82125 -1.4235 0.97455 -1.4235H7.5336Z', id: 'g2-61'}), 
	                        React.createElement("use", {id: 'g3-86', transform: 'scale(0.75)', href: '#g1-86'}), 
	                        React.createElement("use", {id: 'g3-120', transform: 'scale(0.75)', href: '#g1-120'}), 
	                        React.createElement("path", {d: 'M1.704 -5.552H0.984L1.056 -1.44H1.632L1.704 -5.552ZM0.984 0H1.704V-0.72H0.984V0Z', id: 'g4-33'}), 
	                        React.createElement("path", {d: 'M3.904 -2.6C3.904 -2.984 3.904 -3.92 3.528 -4.576C3.12 -5.296 2.504 -5.416 2.12 -5.416C1.76 -5.416 1.136 -5.304 0.736 -4.616C0.352 -3.976 0.336 -3.104 0.336 -2.6C0.336 -2.008 0.368 -1.28 0.704 -0.672C1.056 -0.024 1.648 0.168 2.12 0.168C2.92 0.168 3.36 -0.296 3.6 -0.8C3.88 -1.368 3.904 -2.104 3.904 -2.6ZM2.12 -0.36C1.784 -0.36 1.4 -0.552 1.2 -1.128C1.04 -1.616 1.032 -2.12 1.032 -2.704C1.032 -3.44 1.032 -4.888 2.12 -4.888S3.208 -3.44 3.208 -2.704C3.208 -2.176 3.208 -1.576 3.016 -1.064C2.792 -0.488 2.384 -0.36 2.12 -0.36Z', id: 'g4-48'}), 
	                        React.createElement("path", {d: 'M2.568 -5.416H2.392C1.872 -4.936 1.216 -4.904 0.736 -4.888V-4.384C1.048 -4.392 1.448 -4.408 1.848 -4.568V-0.504H0.784V0H3.632V-0.504H2.568V-5.416Z', id: 'g4-49'}), 
	                        React.createElement("path", {d: 'M5.84 -2.688C5.952 -2.688 6.128 -2.688 6.128 -2.872S5.952 -3.056 5.84 -3.056H0.76C0.648 -3.056 0.472 -3.056 0.472 -2.872S0.648 -2.688 0.76 -2.688H5.84ZM5.84 -0.944C5.952 -0.944 6.128 -0.944 6.128 -1.128S5.952 -1.312 5.84 -1.312H0.76C0.648 -1.312 0.472 -1.312 0.472 -1.128S0.648 -0.944 0.76 -0.944H5.84Z', id: 'g4-61'}), 
	                        React.createElement("path", {d: 'M5.592 -1.816C5.72 -1.816 5.896 -1.816 5.896 -2S5.72 -2.184 5.592 -2.184H1.008C0.88 -2.184 0.704 -2.184 0.704 -2S0.88 -1.816 1.008 -1.816H5.592Z', id: 'g5-0'}), 
	                        React.createElement("path", {d: 'M4.60995 5.8473L0.7227 10.6543C0.6351 10.7638 0.62415 10.7857 0.62415 10.8295C0.62415 10.95 0.7227 10.95 0.9198 10.95H9.99735L10.939 8.22345H10.6653C10.3915 9.0447 9.6579 9.71265 8.72715 10.0302C8.55195 10.0849 7.7964 10.3477 6.18675 10.3477H1.533L5.33265 5.6502C5.4093 5.55165 5.4312 5.5188 5.4312 5.475S5.42025 5.42025 5.35455 5.3217L1.7958 0.438H6.132C7.3803 0.438 9.8988 0.51465 10.6653 2.5623H10.939L9.99735 0H0.9198C0.62415 0 0.6132 0.01095 0.6132 0.3504L4.60995 5.8473Z', id: 'g6-80'})), 
	                    React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                        React.createElement("use", {x: '56.6248', href: '#g0-80', y: '75.542'}), 
	                        React.createElement("use", {x: '63.6207', href: '#g1-116', y: '77.1845'}), 
	                        React.createElement("use", {x: '70.7986', href: '#g2-61', y: '75.542'}), 
	                        React.createElement("use", {x: '117.112', href: '#g1-112', y: '60.99'}), 
	                        React.createElement("use", {x: '121.824', href: '#g3-86', y: '58.1667'}), 
	                        React.createElement("rect", {height: '0.437988', width: '10.4369', x: '117.112', y: '62.9835'}), 
	                        React.createElement("use", {x: '117.5', href: '#g1-86', y: '69.716'}), 
	                        React.createElement("use", {x: '124.466', href: '#g4-33', y: '69.716'}), 
	                        React.createElement("use", {x: '135.611', href: '#g1-86', y: '61.6287'}), 
	                        React.createElement("rect", {height: '0.437988', width: '18.2895', x: '129.949', y: '62.9835'}), 
	                        React.createElement("use", {x: '129.949', href: '#g1-86', y: '69.716'}), 
	                        React.createElement("use", {x: '136.914', href: '#g5-0', y: '69.716'}), 
	                        React.createElement("use", {x: '143.525', href: '#g1-112', y: '69.716'}), 
	                        React.createElement("rect", {height: '0.437988', width: '98.2359', x: '83.5569', y: '72.5855'}), 
	                        React.createElement("use", {x: '83.5569', href: '#g6-80', y: '77.5194'}), 
	                        React.createElement("use", {x: '95.1153', href: '#g1-86', y: '80.6861'}), 
	                        React.createElement("use", {x: '102.081', href: '#g5-0', y: '80.6861'}), 
	                        React.createElement("use", {x: '108.692', href: '#g4-49', y: '80.6861'}), 
	                        React.createElement("use", {x: '95.1153', href: '#g1-120', y: '88.9695'}), 
	                        React.createElement("use", {x: '99.7642', href: '#g4-61', y: '88.9695'}), 
	                        React.createElement("use", {x: '106.375', href: '#g4-48', y: '88.9695'}), 
	                        React.createElement("use", {x: '116.467', href: '#g1-112', y: '80.7819'}), 
	                        React.createElement("use", {x: '121.18', href: '#g3-120', y: '78.5042'}), 
	                        React.createElement("rect", {height: '0.437988', width: '8.6993', x: '116.467', y: '82.7755'}), 
	                        React.createElement("use", {x: '117.145', href: '#g1-120', y: '89.5079'}), 
	                        React.createElement("use", {x: '121.794', href: '#g4-33', y: '89.5079'}), 
	                        React.createElement("use", {x: '128.8', href: '#g2-43', y: '85.7319'}), 
	                        React.createElement("use", {x: '140.95', href: '#g1-112', y: '80.7819'}), 
	                        React.createElement("use", {x: '145.662', href: '#g3-86', y: '78.5042'}), 
	                        React.createElement("rect", {height: '0.437988', width: '10.4369', x: '140.95', y: '82.7755'}), 
	                        React.createElement("use", {x: '141.338', href: '#g1-86', y: '89.5079'}), 
	                        React.createElement("use", {x: '148.304', href: '#g4-33', y: '89.5079'}), 
	                        React.createElement("use", {x: '152.587', href: '#g2-40', y: '85.7319'}), 
	                        React.createElement("use", {x: '163.707', href: '#g1-86', y: '81.4206'}), 
	                        React.createElement("rect", {height: '0.437988', width: '18.2895', x: '158.045', y: '82.7755'}), 
	                        React.createElement("use", {x: '158.045', href: '#g1-86', y: '89.5079'}), 
	                        React.createElement("use", {x: '165.011', href: '#g5-0', y: '89.5079'}), 
	                        React.createElement("use", {x: '171.622', href: '#g1-112', y: '89.5079'}), 
	                        React.createElement("use", {x: '177.535', href: '#g2-41', y: '85.7319'}))));
	            case '3_pk':
	                return (React.createElement("div", null, 
	                    React.createElement("svg", {height: '32.4227pt', viewBox: '0 0 223.544 42.4227', width: '183.544pt'}, 
	                        React.createElement("defs", null, 
	                            React.createElement("path", {d: 'M2.856 -3.468H4.764C6.6 -3.468 8.124 -4.944 8.124 -6.348C8.124 -7.38 7.284 -8.328 5.796 -8.328H2.868L1.092 0H2.124L2.856 -3.468ZM3.732 -7.656H5.388C6.6 -7.656 7.164 -7.044 7.164 -6.264C7.164 -5.34 6.348 -4.164 4.644 -4.164H2.988L3.732 -7.656Z', id: 'g0-80'}), 
	                            React.createElement("path", {d: 'M9.36 -8.328H8.436L6.12 -4.38C4.332 -1.344 4.176 -0.972 4.14 -0.888H4.128C4.128 -1.584 3.84 -3.312 3.708 -4.116L3.012 -8.328H1.932L3.336 0H4.416L9.36 -8.328Z', id: 'g0-86'}), 
	                            React.createElement("path", {d: 'M12.624 -8.328H11.748L10.128 -5.04C9.672 -4.128 8.412 -1.56 8.208 -0.924H8.196C8.22 -1.104 8.22 -1.404 8.22 -1.416C8.22 -1.656 8.196 -2.556 8.088 -4.284L7.824 -8.328H6.816L5.208 -5.052C4.752 -4.116 3.564 -1.692 3.324 -0.936L3.312 -0.948C3.324 -1.056 3.324 -1.332 3.324 -1.632C3.324 -2.604 3.24 -3.84 3.204 -4.464L2.952 -8.328H1.932L2.52 0H3.516L5.448 -3.948L6.276 -5.676C6.48 -6.096 6.924 -7.032 7.068 -7.452C7.068 -7.452 7.044 -7.14 7.044 -6.984C7.044 -6.192 7.116 -5.1 7.176 -4.164L7.452 0H8.496L12.624 -8.328Z', id: 'g0-87'}), 
	                            React.createElement("path", {d: 'M3.624 -8.148H2.592L2.376 -7.116H3.408L3.624 -8.148ZM0.936 0H1.824L2.952 -5.328H2.064L0.936 0Z', id: 'g0-105'}), 
	                            React.createElement("path", {d: 'M3.876 -8.148H2.844L2.628 -7.116H3.66L3.876 -8.148ZM1.08 0.84C0.9 1.68 0.108 1.692 -0.012 1.692C-0.336 1.692 -0.636 1.572 -0.84 1.32L-1.176 2.04C-0.864 2.268 -0.36 2.448 0.144 2.448C0.996 2.448 1.776 1.716 1.98 0.768L3.276 -5.328H2.388L1.08 0.84Z', id: 'g0-106'}), 
	                            React.createElement("path", {d: 'M3.96 -3.276L6.36 -5.328H5.268L2.436 -2.916L3.588 -8.328H2.712L0.936 0H1.776L2.148 -1.728L3.252 -2.676L4.512 0H5.496L3.96 -3.276Z', id: 'g0-107'}), 
	                            React.createElement("path", {d: 'M2.576 -5.488H1.768L1.592 -4.68H2.4L2.576 -5.488ZM0.672 0H1.344L2.096 -3.552H1.424L0.672 0Z', id: 'g1-105'}), 
	                            React.createElement("path", {d: 'M2.752 -5.488H1.944L1.768 -4.68H2.576L2.752 -5.488ZM0.792 0.552C0.68 1.072 0.12 1.072 0.04 1.072C-0.264 1.072 -0.456 0.944 -0.552 0.832L-0.76 1.256C-0.792 1.32 -0.8 1.336 -0.8 1.344C-0.8 1.392 -0.36 1.632 0.16 1.632C0.776 1.632 1.336 1.136 1.472 0.512L2.336 -3.552H1.664L0.792 0.552Z', id: 'g1-106'}), 
	                            React.createElement("path", {d: 'M2.848 -2.176L4.568 -3.552H3.8L1.728 -1.896L2.512 -5.552H1.888L0.704 0H1.296L1.536 -1.12L2.352 -1.776L3.296 0H4L2.848 -2.176Z', id: 'g1-107'}), 
	                            React.createElement("path", {d: 'M3.192 -9C1.392 -7.392 0.936 -4.956 0.936 -3C0.936 -0.888 1.452 1.464 3.192 3.012H3.912C3.444 2.58 2.712 1.644 2.292 0.288C1.968 -0.78 1.848 -1.896 1.848 -2.988C1.848 -6.528 3.108 -8.256 3.912 -9H3.192Z', id: 'g2-40'}), 
	                            React.createElement("path", {d: 'M1.368 3.012C3.168 1.404 3.624 -1.032 3.624 -2.988C3.624 -5.1 3.108 -7.452 1.368 -9H0.648C1.116 -8.568 1.848 -7.632 2.268 -6.276C2.592 -5.208 2.712 -4.092 2.712 -3C2.712 0.54 1.452 2.268 0.648 3.012H1.368Z', id: 'g2-41'}), 
	                            React.createElement("path", {d: 'M2.112 -0.012V-0.972H1.14V0H1.44L1.14 1.5H1.62L2.112 -0.012Z', id: 'g2-44'}), 
	                            React.createElement("path", {d: 'M2.112 -0.972H1.14V0H2.112V-0.972Z', id: 'g2-46'}), 
	                            React.createElement("path", {d: 'M5.376 -3.912C5.376 -4.716 5.34 -5.64 5.028 -6.492C4.512 -7.836 3.576 -8.112 2.94 -8.112C2.16 -8.112 1.404 -7.716 0.96 -6.768C0.564 -5.916 0.492 -4.944 0.492 -3.912C0.492 -2.604 0.6 -1.86 0.984 -1.02C1.344 -0.228 2.112 0.252 2.928 0.252C3.72 0.252 4.476 -0.18 4.884 -1.008C5.292 -1.86 5.376 -2.736 5.376 -3.912ZM2.94 -0.468C1.404 -0.468 1.404 -2.928 1.404 -4.056C1.404 -4.836 1.404 -5.568 1.62 -6.252C1.908 -7.104 2.436 -7.392 2.928 -7.392C4.464 -7.392 4.464 -5.16 4.464 -4.056C4.464 -3.288 4.464 -2.496 4.248 -1.752C3.924 -0.6 3.252 -0.468 2.94 -0.468Z', id: 'g2-48'}), 
	                            React.createElement("path", {d: 'M8.1 -3.924C8.268 -3.924 8.484 -3.924 8.484 -4.14C8.484 -4.368 8.28 -4.368 8.1 -4.368H1.032C0.864 -4.368 0.648 -4.368 0.648 -4.152C0.648 -3.924 0.852 -3.924 1.032 -3.924H8.1ZM8.1 -1.62C8.268 -1.62 8.484 -1.62 8.484 -1.836C8.484 -2.064 8.28 -2.064 8.1 -2.064H1.032C0.864 -2.064 0.648 -2.064 0.648 -1.848C0.648 -1.62 0.852 -1.62 1.032 -1.62H8.1Z', id: 'g2-61'}), 
	                            React.createElement("path", {d: 'M3.132 3V2.28H2.04V-8.28H3.132V-9H1.188V3H3.132Z', id: 'g2-91'}), 
	                            React.createElement("path", {d: 'M2.196 -9H0.252V-8.28H1.344V2.28H0.252V3H2.196V-9Z', id: 'g2-93'}), 
	                            React.createElement("path", {d: 'M4.992 17.868C4.992 17.304 4.992 16.416 4.236 15.444C3.768 14.844 3.084 14.292 2.256 13.92C4.596 12.792 4.992 11.064 4.992 10.38V3.468C4.992 2.724 4.992 1.188 7.32 0.036C7.416 -0.012 7.416 -0.036 7.416 -0.216C7.416 -0.468 7.416 -0.48 7.152 -0.48C6.984 -0.48 6.96 -0.48 6.648 -0.336C5.46 0.252 4.284 1.2 4.032 2.664C3.996 2.904 3.996 3.012 3.996 3.816V9.36C3.996 9.732 3.996 10.356 3.984 10.488C3.876 11.748 3.144 12.84 1.776 13.596C1.584 13.704 1.572 13.716 1.572 13.908C1.572 14.112 1.584 14.124 1.752 14.22C2.556 14.664 3.708 15.528 3.948 17.028C3.996 17.304 3.996 17.328 3.996 17.46V24.588C3.996 26.328 5.196 27.468 6.684 28.176C6.948 28.308 6.972 28.308 7.152 28.308C7.404 28.308 7.416 28.308 7.416 28.044C7.416 27.852 7.404 27.84 7.308 27.78C6.816 27.54 5.268 26.76 5.016 25.032C4.992 24.864 4.992 24.732 4.992 24.012V17.868Z', id: 'g3-26'}), 
	                            React.createElement("path", {d: 'M7.908 -2.76C8.112 -2.76 8.328 -2.76 8.328 -3S8.112 -3.24 7.908 -3.24H1.416C1.212 -3.24 0.996 -3.24 0.996 -3S1.212 -2.76 1.416 -2.76H7.908Z', id: 'g4-0'}), 
	                            React.createElement("path", {d: 'M6.576 -2.76C6.78 -2.76 6.996 -2.76 6.996 -3S6.78 -3.24 6.576 -3.24H1.488C1.632 -4.848 3.012 -6 4.704 -6H6.576C6.78 -6 6.996 -6 6.996 -6.24S6.78 -6.48 6.576 -6.48H4.68C2.628 -6.48 0.996 -4.92 0.996 -3S2.628 0.48 4.68 0.48H6.576C6.78 0.48 6.996 0.48 6.996 0.24S6.78 0 6.576 0H4.704C3.012 0 1.632 -1.152 1.488 -2.76H6.576Z', id: 'g4-50'})), 
	                        React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.1328)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                            React.createElement("g", null, 
	                                React.createElement("use", {x: '56.6248', href: '#g0-80', y: '71.5'}), 
	                                React.createElement("use", {x: '64.097', href: '#g1-107', y: '73.3'}), 
	                                React.createElement("use", {x: '72.7444', href: '#g2-61', y: '71.5'}), 
	                                React.createElement("use", {x: '85.2164', href: '#g3-26', y: '54.5798'}), 
	                                React.createElement("use", {x: '94.5345', href: '#g0-80', y: '64.1499'}), 
	                                React.createElement("use", {x: '102.007', href: '#g1-105', y: '65.9499'}), 
	                                React.createElement("use", {x: '105.325', href: '#g2-44', y: '64.1499'}), 
	                                React.createElement("use", {x: '118.588', href: '#g0-105', y: '64.1499'}), 
	                                React.createElement("use", {x: '125.873', href: '#g2-61', y: '64.1499'}), 
	                                React.createElement("use", {x: '138.345', href: '#g0-107', y: '64.1499'}), 
	                                React.createElement("use", {x: '148.382', href: '#g4-50', y: '64.1499'}), 
	                                React.createElement("use", {x: '159.716', href: '#g2-91', y: '64.1499'}), 
	                                React.createElement("use", {x: '163.111', href: '#g2-48', y: '64.1499'}), 
	                                React.createElement("use", {x: '168.986', href: '#g2-44', y: '64.1499'}), 
	                                React.createElement("use", {x: '174.25', href: '#g0-86', y: '64.1499'}), 
	                                React.createElement("use", {x: '183.948', href: '#g2-93', y: '64.1499'}), 
	                                React.createElement("use", {x: '94.2165', href: '#g0-87', y: '78.6499'}), 
	                                React.createElement("use", {x: '105.244', href: '#g1-106', y: '80.4499'}), 
	                                React.createElement("use", {x: '108.743', href: '#g2-44', y: '78.6499'}), 
	                                React.createElement("use", {x: '120.006', href: '#g0-106', y: '78.6499'}), 
	                                React.createElement("use", {x: '127.561', href: '#g2-61', y: '78.6499'}), 
	                                React.createElement("use", {x: '140.034', href: '#g0-107', y: '78.6499'}), 
	                                React.createElement("use", {x: '149.405', href: '#g4-0', y: '78.6499'}), 
	                                React.createElement("use", {x: '161.405', href: '#g0-86', y: '78.6499'}), 
	                                React.createElement("use", {x: '174.436', href: '#g4-50', y: '78.6499'}), 
	                                React.createElement("use", {x: '185.769', href: '#g2-40', y: '78.6499'}), 
	                                React.createElement("use", {x: '190.339', href: '#g0-86', y: '78.6499'}), 
	                                React.createElement("use", {x: '200.037', href: '#g2-44', y: '78.6499'}), 
	                                React.createElement("use", {x: '205.301', href: '#g2-46', y: '78.6499'}), 
	                                React.createElement("use", {x: '208.565', href: '#g2-46', y: '78.6499'}), 
	                                React.createElement("use", {x: '211.829', href: '#g2-46', y: '78.6499'}), 
	                                React.createElement("use", {x: '215.092', href: '#g2-41', y: '78.6499'}))
	                        )), 
	                    React.createElement("svg", {height: '39.9121pt', viewBox: '0 0 149.99 49.9121', width: '139.99pt'}, 
	                        React.createElement("defs", null, 
	                            React.createElement("path", {d: 'M2.6937 -3.16455H4.5333C6.0444 -3.16455 7.5555 -4.41285 7.5555 -5.7816C7.5555 -6.789 6.7233 -7.5993 5.39835 -7.5993H2.6718L1.0512 0H2.02575L2.6937 -3.16455ZM3.4821 -6.9861H5.02605C6.01155 -6.9861 6.66855 -6.5262 6.66855 -5.70495C6.66855 -4.82895 5.85825 -3.79965 4.34715 -3.79965H2.8032L3.4821 -6.9861Z', id: 'g0-80'}), 
	                            React.createElement("path", {d: 'M6.72 -5.552H6.024L4.424 -2.992L3.536 -1.52C3.104 -0.8 3.056 -0.68 3.04 -0.632H3.032C3.032 -1.056 2.8 -2.24 2.648 -3L2.144 -5.552H1.296L2.424 0H3.232L6.72 -5.552Z', id: 'g1-86'}), 
	                            React.createElement("path", {d: 'M2.576 -5.488H1.768L1.592 -4.68H2.4L2.576 -5.488ZM0.672 0H1.344L2.096 -3.552H1.424L0.672 0Z', id: 'g1-105'}), 
	                            React.createElement("path", {d: 'M1.456 -0.376C1.632 -0.176 1.984 0.08 2.512 0.08C3.504 0.08 4.536 -1 4.536 -2.328C4.536 -2.888 4.288 -3.632 3.544 -3.632C3 -3.632 2.48 -3.464 2.024 -3.168L2.104 -3.552H1.432L0.352 1.552H1.048L1.456 -0.376ZM1.936 -2.648C2.016 -2.728 2.392 -3.08 2.912 -3.08C3.384 -3.08 3.808 -2.744 3.808 -2.08C3.808 -1.192 3.008 -0.448 2.272 -0.448C1.872 -0.448 1.664 -0.696 1.576 -0.944L1.936 -2.648Z', id: 'g1-112'}), 
	                            React.createElement("path", {d: 'M2.608 -1.832L4.528 -3.552H3.816L2.408 -2.24L1.52 -3.552H0.8L2.032 -1.832L0 0H0.712L2.248 -1.504L3.192 0H3.912L2.608 -1.832Z', id: 'g1-120'}), 
	                            React.createElement("path", {d: 'M2.96745 -8.2125C2.61705 -7.884 1.8834 -7.21605 1.3797 -5.8692C0.9417 -4.69755 0.86505 -3.53685 0.86505 -2.7375C0.86505 0.79935 2.44185 2.2557 2.96745 2.7375H3.6354C3.1098 2.2119 1.71915 0.79935 1.71915 -2.7375C1.71915 -3.3507 1.752 -4.63185 2.20095 -5.92395C2.6499 -7.19415 3.27405 -7.85115 3.6354 -8.2125H2.96745Z', id: 'g2-40'}), 
	                            React.createElement("path", {d: 'M1.28115 2.7375C1.63155 2.409 2.3652 1.74105 2.8689 0.3942C3.3069 -0.77745 3.38355 -1.93815 3.38355 -2.7375C3.38355 -6.27435 1.80675 -7.7307 1.28115 -8.2125H0.6132C1.1388 -7.6869 2.52945 -6.27435 2.52945 -2.7375C2.52945 -2.1243 2.4966 -0.84315 2.04765 0.44895C1.5987 1.71915 0.97455 2.37615 0.6132 2.7375H1.28115Z', id: 'g2-41'}), 
	                            React.createElement("path", {d: 'M4.47855 -2.5185H7.5336C7.6869 -2.5185 7.89495 -2.5185 7.89495 -2.7375S7.6869 -2.9565 7.5336 -2.9565H4.47855V-6.0225C4.47855 -6.1758 4.47855 -6.38385 4.25955 -6.38385S4.04055 -6.1758 4.04055 -6.0225V-2.9565H0.97455C0.82125 -2.9565 0.6132 -2.9565 0.6132 -2.7375S0.82125 -2.5185 0.97455 -2.5185H4.04055V0.5475C4.04055 0.7008 4.04055 0.90885 4.25955 0.90885S4.47855 0.7008 4.47855 0.5475V-2.5185Z', id: 'g2-43'}), 
	                            React.createElement("path", {d: 'M7.52265 -3.6135C7.6869 -3.6135 7.89495 -3.6135 7.89495 -3.8325S7.6869 -4.0515 7.5336 -4.0515H0.97455C0.82125 -4.0515 0.6132 -4.0515 0.6132 -3.8325S0.82125 -3.6135 0.9855 -3.6135H7.52265ZM7.5336 -1.4235C7.6869 -1.4235 7.89495 -1.4235 7.89495 -1.6425S7.6869 -1.8615 7.52265 -1.8615H0.9855C0.82125 -1.8615 0.6132 -1.8615 0.6132 -1.6425S0.82125 -1.4235 0.97455 -1.4235H7.5336Z', id: 'g2-61'}), 
	                            React.createElement("use", {id: 'g3-86', transform: 'scale(0.75)', href: '#g1-86'}), 
	                            React.createElement("use", {id: 'g3-105', transform: 'scale(0.75)', href: '#g1-105'}), 
	                            React.createElement("use", {id: 'g3-120', transform: 'scale(0.75)', href: '#g1-120'}), 
	                            React.createElement("path", {d: 'M1.704 -5.552H0.984L1.056 -1.44H1.632L1.704 -5.552ZM0.984 0H1.704V-0.72H0.984V0Z', id: 'g4-33'}), 
	                            React.createElement("path", {d: 'M3.904 -2.6C3.904 -2.984 3.904 -3.92 3.528 -4.576C3.12 -5.296 2.504 -5.416 2.12 -5.416C1.76 -5.416 1.136 -5.304 0.736 -4.616C0.352 -3.976 0.336 -3.104 0.336 -2.6C0.336 -2.008 0.368 -1.28 0.704 -0.672C1.056 -0.024 1.648 0.168 2.12 0.168C2.92 0.168 3.36 -0.296 3.6 -0.8C3.88 -1.368 3.904 -2.104 3.904 -2.6ZM2.12 -0.36C1.784 -0.36 1.4 -0.552 1.2 -1.128C1.04 -1.616 1.032 -2.12 1.032 -2.704C1.032 -3.44 1.032 -4.888 2.12 -4.888S3.208 -3.44 3.208 -2.704C3.208 -2.176 3.208 -1.576 3.016 -1.064C2.792 -0.488 2.384 -0.36 2.12 -0.36Z', id: 'g4-48'}), 
	                            React.createElement("path", {d: 'M2.568 -5.416H2.392C1.872 -4.936 1.216 -4.904 0.736 -4.888V-4.384C1.048 -4.392 1.448 -4.408 1.848 -4.568V-0.504H0.784V0H3.632V-0.504H2.568V-5.416Z', id: 'g4-49'}), 
	                            React.createElement("path", {d: 'M5.84 -2.688C5.952 -2.688 6.128 -2.688 6.128 -2.872S5.952 -3.056 5.84 -3.056H0.76C0.648 -3.056 0.472 -3.056 0.472 -2.872S0.648 -2.688 0.76 -2.688H5.84ZM5.84 -0.944C5.952 -0.944 6.128 -0.944 6.128 -1.128S5.952 -1.312 5.84 -1.312H0.76C0.648 -1.312 0.472 -1.312 0.472 -1.128S0.648 -0.944 0.76 -0.944H5.84Z', id: 'g4-61'}), 
	                            React.createElement("path", {d: 'M4.60995 5.8473L0.7227 10.6543C0.6351 10.7638 0.62415 10.7857 0.62415 10.8295C0.62415 10.95 0.7227 10.95 0.9198 10.95H9.99735L10.939 8.22345H10.6653C10.3915 9.0447 9.6579 9.71265 8.72715 10.0302C8.55195 10.0849 7.7964 10.3477 6.18675 10.3477H1.533L5.33265 5.6502C5.4093 5.55165 5.4312 5.5188 5.4312 5.475S5.42025 5.42025 5.35455 5.3217L1.7958 0.438H6.132C7.3803 0.438 9.8988 0.51465 10.6653 2.5623H10.939L9.99735 0H0.9198C0.62415 0 0.6132 0.01095 0.6132 0.3504L4.60995 5.8473Z', id: 'g5-80'}), 
	                            React.createElement("path", {d: 'M5.592 -1.816C5.72 -1.816 5.896 -1.816 5.896 -2S5.72 -2.184 5.592 -2.184H1.008C0.88 -2.184 0.704 -2.184 0.704 -2S0.88 -1.816 1.008 -1.816H5.592Z', id: 'g6-0'})), 
	                        React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                            React.createElement("use", {x: '56.6248', href: '#g0-80', y: '73.9314'}), 
	                            React.createElement("use", {x: '63.6207', href: '#g1-105', y: '75.6419'}), 
	                            React.createElement("use", {x: '69.9804', href: '#g2-61', y: '73.9314'}), 
	                            React.createElement("use", {x: '128.194', href: '#g1-112', y: '60.935'}), 
	                            React.createElement("use", {x: '132.906', href: '#g3-105', y: '58.1116'}), 
	                            React.createElement("rect", {height: '0.437988', width: '7.3262', x: '128.194', y: '62.9285'}), 
	                            React.createElement("use", {x: '129.1', href: '#g1-105', y: '69.661'}), 
	                            React.createElement("use", {x: '131.918', href: '#g4-33', y: '69.661'}), 
	                            React.createElement("rect", {height: '0.437988', width: '98.2359', x: '82.7387', y: '70.9749'}), 
	                            React.createElement("use", {x: '82.7387', href: '#g5-80', y: '75.9088'}), 
	                            React.createElement("use", {x: '94.297', href: '#g1-86', y: '79.0755'}), 
	                            React.createElement("use", {x: '101.263', href: '#g6-0', y: '79.0755'}), 
	                            React.createElement("use", {x: '107.874', href: '#g4-49', y: '79.0755'}), 
	                            React.createElement("use", {x: '94.297', href: '#g1-120', y: '87.3589'}), 
	                            React.createElement("use", {x: '98.9459', href: '#g4-61', y: '87.3589'}), 
	                            React.createElement("use", {x: '105.557', href: '#g4-48', y: '87.3589'}), 
	                            React.createElement("use", {x: '115.649', href: '#g1-112', y: '79.1713'}), 
	                            React.createElement("use", {x: '120.362', href: '#g3-120', y: '76.8936'}), 
	                            React.createElement("rect", {height: '0.437988', width: '8.6993', x: '115.649', y: '81.1649'}), 
	                            React.createElement("use", {x: '116.327', href: '#g1-120', y: '87.8974'}), 
	                            React.createElement("use", {x: '120.976', href: '#g4-33', y: '87.8974'}), 
	                            React.createElement("use", {x: '127.981', href: '#g2-43', y: '84.1214'}), 
	                            React.createElement("use", {x: '140.131', href: '#g1-112', y: '79.1713'}), 
	                            React.createElement("use", {x: '144.844', href: '#g3-86', y: '76.8936'}), 
	                            React.createElement("rect", {height: '0.437988', width: '10.4369', x: '140.131', y: '81.1649'}), 
	                            React.createElement("use", {x: '140.52', href: '#g1-86', y: '87.8974'}), 
	                            React.createElement("use", {x: '147.486', href: '#g4-33', y: '87.8974'}), 
	                            React.createElement("use", {x: '151.768', href: '#g2-40', y: '84.1214'}), 
	                            React.createElement("use", {x: '162.889', href: '#g1-86', y: '79.81'}), 
	                            React.createElement("rect", {height: '0.437988', width: '18.2895', x: '157.227', y: '81.1649'}), 
	                            React.createElement("use", {x: '157.227', href: '#g1-86', y: '87.8974'}), 
	                            React.createElement("use", {x: '164.192', href: '#g6-0', y: '87.8974'}), 
	                            React.createElement("use", {x: '170.804', href: '#g1-112', y: '87.8974'}), 
	                            React.createElement("use", {x: '176.716', href: '#g2-41', y: '84.1214'}))), 
	                    React.createElement("svg", {height: '39.9741pt', viewBox: '0 0 149.99 49.9741', width: '139.99pt'}, 
	                        React.createElement("defs", null, 
	                            React.createElement("path", {d: 'M11.7931 -7.5993H10.9938L8.979 -3.5697C8.77095 -3.16455 7.884 -1.3797 7.6869 -0.8103H7.67595C7.6869 -0.8979 7.6869 -0.9198 7.6869 -1.2045C7.6869 -1.32495 7.6869 -1.971 7.5555 -3.723L7.25985 -7.5993H6.3729C6.3072 -7.45695 5.66115 -6.18675 5.6502 -6.1758L3.9201 -2.6499C3.4383 -1.6644 3.16455 -1.0293 3.1098 -0.8322H3.09885C3.1098 -0.90885 3.1098 -1.23735 3.1098 -1.34685C3.1098 -2.17905 3.05505 -3.01125 2.98935 -3.84345L2.70465 -7.5993H1.76295L2.37615 0H3.2631L4.98225 -3.42735C5.13555 -3.73395 6.3948 -6.2415 6.55905 -6.7671H6.57V-6.42765C6.57 -5.96775 6.6357 -4.76325 6.69045 -4.0734L6.99705 0H7.9497L11.7931 -7.5993Z', id: 'g10-80'})
	                        ), 
	                        React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                            React.createElement("use", {x: '56.6248', href: '#g10-80', y: '73.9865', transform: 'translate(-3, 0)'}), 
	                            React.createElement("use", {x: '63.6207', href: '#g1-105', y: '75.697'}), 
	                            React.createElement("use", {x: '69.9804', href: '#g2-61', y: '73.9865'}), 
	                            React.createElement("use", {x: '115.948', href: '#g1-112', y: '60.99'}), 
	                            React.createElement("use", {x: '120.66', href: '#g3-86', y: '58.1667'}), 
	                            React.createElement("rect", {height: '0.437988', width: '10.4369', x: '115.948', y: '62.9835'}), 
	                            React.createElement("use", {x: '116.336', href: '#g1-86', y: '69.716'}), 
	                            React.createElement("use", {x: '123.302', href: '#g4-33', y: '69.716'}), 
	                            React.createElement("use", {x: '127.585', href: '#g2-40', y: '65.94'}), 
	                            React.createElement("use", {x: '134.169', href: '#g1-112', y: '60.99'}), 
	                            React.createElement("rect", {height: '0.437988', width: '6.96567', x: '133.043', y: '62.9835'}), 
	                            React.createElement("use", {x: '133.043', href: '#g1-86', y: '69.716'}), 
	                            React.createElement("use", {x: '141.209', href: '#g2-41', y: '65.94'}), 
	                            React.createElement("use", {x: '145.467', href: '#g1-106', y: '61.9664'}), 
	                            React.createElement("rect", {height: '0.437988', width: '98.2359', x: '82.7387', y: '71.03'}), 
	                            React.createElement("use", {x: '82.7387', href: '#g5-80', y: '75.9638'}), 
	                            React.createElement("use", {x: '94.297', href: '#g1-86', y: '79.1305'}), 
	                            React.createElement("use", {x: '101.263', href: '#g6-0', y: '79.1305'}), 
	                            React.createElement("use", {x: '107.874', href: '#g4-49', y: '79.1305'}), 
	                            React.createElement("use", {x: '94.297', href: '#g1-120', y: '87.414'}), 
	                            React.createElement("use", {x: '98.9459', href: '#g4-61', y: '87.414'}), 
	                            React.createElement("use", {x: '105.557', href: '#g4-48', y: '87.414'}), 
	                            React.createElement("use", {x: '115.649', href: '#g1-112', y: '79.2264'}), 
	                            React.createElement("use", {x: '120.362', href: '#g3-120', y: '76.9486'}), 
	                            React.createElement("rect", {height: '0.437988', width: '8.6993', x: '115.649', y: '81.2199'}), 
	                            React.createElement("use", {x: '116.327', href: '#g1-120', y: '87.9524'}), 
	                            React.createElement("use", {x: '120.976', href: '#g4-33', y: '87.9524'}), 
	                            React.createElement("use", {x: '127.981', href: '#g2-43', y: '84.1764'}), 
	                            React.createElement("use", {x: '140.131', href: '#g1-112', y: '79.2264'}), 
	                            React.createElement("use", {x: '144.844', href: '#g3-86', y: '76.9486'}), 
	                            React.createElement("rect", {height: '0.437988', width: '10.4369', x: '140.131', y: '81.2199'}), 
	                            React.createElement("use", {x: '140.52', href: '#g1-86', y: '87.9524'}), 
	                            React.createElement("use", {x: '147.486', href: '#g4-33', y: '87.9524'}), 
	                            React.createElement("use", {x: '151.768', href: '#g2-40', y: '84.1764'}), 
	                            React.createElement("use", {x: '162.889', href: '#g1-86', y: '79.865'}), 
	                            React.createElement("rect", {height: '0.437988', width: '18.2895', x: '157.227', y: '81.2199'}), 
	                            React.createElement("use", {x: '157.227', href: '#g1-86', y: '87.9524'}), 
	                            React.createElement("use", {x: '164.192', href: '#g6-0', y: '87.9524'}), 
	                            React.createElement("use", {x: '170.804', href: '#g1-112', y: '87.9524'}), 
	                            React.createElement("use", {x: '176.716', href: '#g2-41', y: '84.1764'})))));
	            case '4_pk':
	                return (React.createElement("svg", {height: '39.1093pt', viewBox: '0 0 82.1089 39.1093', width: '82.1089pt'}, 
	                    React.createElement("defs", null, 
	                        React.createElement("path", {d: 'M2.856 -3.468H4.764C6.6 -3.468 8.124 -4.944 8.124 -6.348C8.124 -7.38 7.284 -8.328 5.796 -8.328H2.868L1.092 0H2.124L2.856 -3.468ZM3.732 -7.656H5.388C6.6 -7.656 7.164 -7.044 7.164 -6.264C7.164 -5.34 6.348 -4.164 4.644 -4.164H2.988L3.732 -7.656Z', id: 'g0-80'}), 
	                        React.createElement("path", {d: 'M2.08 -2.28H3.488C4.648 -2.28 5.816 -3.2 5.816 -4.2C5.816 -4.968 5.128 -5.552 4.128 -5.552H1.968L0.784 0H1.592L2.08 -2.28ZM2.648 -5.08H3.824C4.632 -5.08 5.088 -4.704 5.088 -4.144C5.088 -3.552 4.52 -2.776 3.336 -2.776H2.16L2.648 -5.08Z', id: 'g1-80'}), 
	                        React.createElement("path", {d: 'M6.72 -5.552H6.024L4.424 -2.992L3.536 -1.52C3.104 -0.8 3.056 -0.68 3.04 -0.632H3.032C3.032 -1.056 2.8 -2.24 2.648 -3L2.144 -5.552H1.296L2.424 0H3.232L6.72 -5.552Z', id: 'g1-86'}), 
	                        React.createElement("path", {d: 'M2.848 -2.176L4.568 -3.552H3.8L1.728 -1.896L2.512 -5.552H1.888L0.704 0H1.296L1.536 -1.12L2.352 -1.776L3.296 0H4L2.848 -2.176Z', id: 'g1-107'}), 
	                        React.createElement("path", {d: 'M2.608 -1.832L4.528 -3.552H3.816L2.408 -2.24L1.52 -3.552H0.8L2.032 -1.832L0 0H0.712L2.248 -1.504L3.192 0H3.912L2.608 -1.832Z', id: 'g1-120'}), 
	                        React.createElement("path", {d: 'M8.1 -3.924C8.268 -3.924 8.484 -3.924 8.484 -4.14C8.484 -4.368 8.28 -4.368 8.1 -4.368H1.032C0.864 -4.368 0.648 -4.368 0.648 -4.152C0.648 -3.924 0.852 -3.924 1.032 -3.924H8.1ZM8.1 -1.62C8.268 -1.62 8.484 -1.62 8.484 -1.836C8.484 -2.064 8.28 -2.064 8.1 -2.064H1.032C0.864 -2.064 0.648 -2.064 0.648 -1.848C0.648 -1.62 0.852 -1.62 1.032 -1.62H8.1Z', id: 'g2-61'}), 
	                        React.createElement("use", {id: 'g3-107', transform: 'scale(0.75)', href: '#g1-107'}), 
	                        React.createElement("use", {id: 'g3-120', transform: 'scale(0.75)', href: '#g1-120'}), 
	                        React.createElement("path", {d: 'M1.704 -5.552H0.984L1.056 -1.44H1.632L1.704 -5.552ZM0.984 0H1.704V-0.72H0.984V0Z', id: 'g4-33'}), 
	                        React.createElement("path", {d: 'M3.904 -2.6C3.904 -2.984 3.904 -3.92 3.528 -4.576C3.12 -5.296 2.504 -5.416 2.12 -5.416C1.76 -5.416 1.136 -5.304 0.736 -4.616C0.352 -3.976 0.336 -3.104 0.336 -2.6C0.336 -2.008 0.368 -1.28 0.704 -0.672C1.056 -0.024 1.648 0.168 2.12 0.168C2.92 0.168 3.36 -0.296 3.6 -0.8C3.88 -1.368 3.904 -2.104 3.904 -2.6ZM2.12 -0.36C1.784 -0.36 1.4 -0.552 1.2 -1.128C1.04 -1.616 1.032 -2.12 1.032 -2.704C1.032 -3.44 1.032 -4.888 2.12 -4.888S3.208 -3.44 3.208 -2.704C3.208 -2.176 3.208 -1.576 3.016 -1.064C2.792 -0.488 2.384 -0.36 2.12 -0.36Z', id: 'g4-48'}), 
	                        React.createElement("path", {d: 'M5.84 -2.688C5.952 -2.688 6.128 -2.688 6.128 -2.872S5.952 -3.056 5.84 -3.056H0.76C0.648 -3.056 0.472 -3.056 0.472 -2.872S0.648 -2.688 0.76 -2.688H5.84ZM5.84 -0.944C5.952 -0.944 6.128 -0.944 6.128 -1.128S5.952 -1.312 5.84 -1.312H0.76C0.648 -1.312 0.472 -1.312 0.472 -1.128S0.648 -0.944 0.76 -0.944H5.84Z', id: 'g4-61'}), 
	                        React.createElement("path", {d: 'M5.052 6.408L0.792 11.676C0.696 11.796 0.684 11.82 0.684 11.868C0.684 12 0.792 12 1.008 12H10.956L11.988 9.012H11.688C11.388 9.912 10.584 10.644 9.564 10.992C9.372 11.052 8.544 11.34 6.78 11.34H1.68L5.844 6.192C5.928 6.084 5.952 6.048 5.952 6S5.94 5.94 5.868 5.832L1.968 0.48H6.72C8.088 0.48 10.848 0.564 11.688 2.808H11.988L10.956 0H1.008C0.684 0 0.672 0.012 0.672 0.384L5.052 6.408Z', id: 'g5-80'})), 
	                    React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                        React.createElement("use", {x: '56.6248', href: '#g0-80', y: '74.5328'}), 
	                        React.createElement("use", {x: '64.097', href: '#g1-107', y: '76.3328'}), 
	                        React.createElement("use", {x: '72.7444', href: '#g2-61', y: '74.5328'}), 
	                        React.createElement("use", {x: '102.893', href: '#g1-80', y: '60.99'}), 
	                        React.createElement("use", {x: '108.973', href: '#g3-107', y: '58.1667'}), 
	                        React.createElement("rect", {height: '0.47998', width: '10.1908', x: '102.893', y: '62.4748'}), 
	                        React.createElement("use", {x: '104.234', href: '#g1-107', y: '69.8529'}), 
	                        React.createElement("use", {x: '109.048', href: '#g4-33', y: '69.8529'}), 
	                        React.createElement("rect", {height: '0.47998', width: '43.1436', x: '86.4164', y: '71.2928'}), 
	                        React.createElement("use", {x: '86.4164', href: '#g5-80', y: '75.6016'}), 
	                        React.createElement("use", {x: '99.0831', href: '#g1-86', y: '78.7683'}), 
	                        React.createElement("use", {x: '99.0831', href: '#g1-120', y: '88.1018'}), 
	                        React.createElement("use", {x: '103.732', href: '#g4-61', y: '88.1018'}), 
	                        React.createElement("use", {x: '110.343', href: '#g4-48', y: '88.1018'}), 
	                        React.createElement("use", {x: '118.293', href: '#g1-80', y: '79.8769'}), 
	                        React.createElement("use", {x: '124.373', href: '#g3-120', y: '77.5991'}), 
	                        React.createElement("rect", {height: '0.47998', width: '10.0668', x: '118.293', y: '81.3617'}), 
	                        React.createElement("use", {x: '119.655', href: '#g1-120', y: '88.7398'}), 
	                        React.createElement("use", {x: '124.304', href: '#g4-33', y: '88.7398'}))));
	            case '4_pt':
	                return (React.createElement("svg", {height: '39.1093pt', viewBox: '0 0 112.777 39.1093', width: '112.777pt'}, 
	                    React.createElement("defs", null, 
	                        React.createElement("path", {d: 'M2.856 -3.468H4.764C6.6 -3.468 8.124 -4.944 8.124 -6.348C8.124 -7.38 7.284 -8.328 5.796 -8.328H2.868L1.092 0H2.124L2.856 -3.468ZM3.732 -7.656H5.388C6.6 -7.656 7.164 -7.044 7.164 -6.264C7.164 -5.34 6.348 -4.164 4.644 -4.164H2.988L3.732 -7.656Z', id: 'g0-80'}), 
	                        React.createElement("path", {d: 'M2.08 -2.28H3.488C4.648 -2.28 5.816 -3.2 5.816 -4.2C5.816 -4.968 5.128 -5.552 4.128 -5.552H1.968L0.784 0H1.592L2.08 -2.28ZM2.648 -5.08H3.824C4.632 -5.08 5.088 -4.704 5.088 -4.144C5.088 -3.552 4.52 -2.776 3.336 -2.776H2.16L2.648 -5.08Z', id: 'g1-80'}), 
	                        React.createElement("path", {d: 'M6.72 -5.552H6.024L4.424 -2.992L3.536 -1.52C3.104 -0.8 3.056 -0.68 3.04 -0.632H3.032C3.032 -1.056 2.8 -2.24 2.648 -3L2.144 -5.552H1.296L2.424 0H3.232L6.72 -5.552Z', id: 'g1-86'}), 
	                        React.createElement("path", {d: 'M2.528 -5.552H1.864L0.68 0H1.376L1.456 -0.376C1.816 0.016 2.256 0.08 2.504 0.08C3.536 0.08 4.536 -1.04 4.536 -2.312C4.536 -2.864 4.288 -3.632 3.512 -3.632C3.192 -3.632 2.64 -3.56 2.032 -3.184L2.528 -5.552ZM1.92 -2.544C1.952 -2.672 1.96 -2.68 2.048 -2.768C2.136 -2.84 2.472 -3.104 2.92 -3.104C3.36 -3.104 3.824 -2.864 3.824 -2.176C3.824 -1.28 3.192 -0.448 2.272 -0.448C1.96 -0.448 1.712 -0.592 1.576 -0.952L1.92 -2.544Z', id: 'g1-98'}), 
	                        React.createElement("path", {d: 'M2.152 -3.048H3.336L3.44 -3.552H2.256L2.472 -4.568H1.856L1.64 -3.552H0.912L0.808 -3.048H1.512L1.096 -1.112C1.072 -0.976 1.024 -0.744 1.024 -0.568C1.024 -0.184 1.16 0.08 1.56 0.08C1.912 0.08 2.344 0.008 2.88 -0.216L2.84 -0.72C2.6 -0.576 2.328 -0.472 2.032 -0.472C1.848 -0.472 1.712 -0.56 1.712 -0.864C1.712 -0.96 1.736 -1.064 1.736 -1.072L2.152 -3.048Z', id: 'g1-116'}), 
	                        React.createElement("path", {d: 'M2.608 -1.832L4.528 -3.552H3.816L2.408 -2.24L1.52 -3.552H0.8L2.032 -1.832L0 0H0.712L2.248 -1.504L3.192 0H3.912L2.608 -1.832Z', id: 'g1-120'}), 
	                        React.createElement("path", {d: 'M8.1 -3.924C8.268 -3.924 8.484 -3.924 8.484 -4.14C8.484 -4.368 8.28 -4.368 8.1 -4.368H1.032C0.864 -4.368 0.648 -4.368 0.648 -4.152C0.648 -3.924 0.852 -3.924 1.032 -3.924H8.1ZM8.1 -1.62C8.268 -1.62 8.484 -1.62 8.484 -1.836C8.484 -2.064 8.28 -2.064 8.1 -2.064H1.032C0.864 -2.064 0.648 -2.064 0.648 -1.848C0.648 -1.62 0.852 -1.62 1.032 -1.62H8.1Z', id: 'g2-61'}), 
	                        React.createElement("use", {id: 'g3-86', transform: 'scale(0.75)', href: '#g1-86'}), 
	                        React.createElement("use", {id: 'g3-120', transform: 'scale(0.75)', href: '#g1-120'}), 
	                        React.createElement("path", {d: 'M1.704 -5.552H0.984L1.056 -1.44H1.632L1.704 -5.552ZM0.984 0H1.704V-0.72H0.984V0Z', id: 'g4-33'}), 
	                        React.createElement("path", {d: 'M3.904 -2.6C3.904 -2.984 3.904 -3.92 3.528 -4.576C3.12 -5.296 2.504 -5.416 2.12 -5.416C1.76 -5.416 1.136 -5.304 0.736 -4.616C0.352 -3.976 0.336 -3.104 0.336 -2.6C0.336 -2.008 0.368 -1.28 0.704 -0.672C1.056 -0.024 1.648 0.168 2.12 0.168C2.92 0.168 3.36 -0.296 3.6 -0.8C3.88 -1.368 3.904 -2.104 3.904 -2.6ZM2.12 -0.36C1.784 -0.36 1.4 -0.552 1.2 -1.128C1.04 -1.616 1.032 -2.12 1.032 -2.704C1.032 -3.44 1.032 -4.888 2.12 -4.888S3.208 -3.44 3.208 -2.704C3.208 -2.176 3.208 -1.576 3.016 -1.064C2.792 -0.488 2.384 -0.36 2.12 -0.36Z', id: 'g4-48'}), 
	                        React.createElement("path", {d: 'M5.84 -2.688C5.952 -2.688 6.128 -2.688 6.128 -2.872S5.952 -3.056 5.84 -3.056H0.76C0.648 -3.056 0.472 -3.056 0.472 -2.872S0.648 -2.688 0.76 -2.688H5.84ZM5.84 -0.944C5.952 -0.944 6.128 -0.944 6.128 -1.128S5.952 -1.312 5.84 -1.312H0.76C0.648 -1.312 0.472 -1.312 0.472 -1.128S0.648 -0.944 0.76 -0.944H5.84Z', id: 'g4-61'}), 
	                        React.createElement("path", {d: 'M5.052 6.408L0.792 11.676C0.696 11.796 0.684 11.82 0.684 11.868C0.684 12 0.792 12 1.008 12H10.956L11.988 9.012H11.688C11.388 9.912 10.584 10.644 9.564 10.992C9.372 11.052 8.544 11.34 6.78 11.34H1.68L5.844 6.192C5.928 6.084 5.952 6.048 5.952 6S5.94 5.94 5.868 5.832L1.968 0.48H6.72C8.088 0.48 10.848 0.564 11.688 2.808H11.988L10.956 0H1.008C0.684 0 0.672 0.012 0.672 0.384L5.052 6.408Z', id: 'g5-80'})), 
	                    React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                        React.createElement("use", {x: '56.6248', href: '#g0-80', y: '74.5328'}), 
	                        React.createElement("use", {x: '64.097', href: '#g1-116', y: '76.3328'}), 
	                        React.createElement("use", {x: '71.5666', href: '#g2-61', y: '74.5328'}), 
	                        React.createElement("use", {x: '84.0387', href: '#g0-80', y: '74.5328'}), 
	                        React.createElement("use", {x: '91.5108', href: '#g1-98', y: '76.3328'}), 
	                        React.createElement("use", {x: '99.9859', href: '#g2-61', y: '74.5328'}), 
	                        React.createElement("use", {x: '129.328', href: '#g1-80', y: '60.99'}), 
	                        React.createElement("use", {x: '135.408', href: '#g3-86', y: '58.1667'}), 
	                        React.createElement("rect", {height: '0.47998', width: '11.8044', x: '129.328', y: '62.4748'}), 
	                        React.createElement("use", {x: '130.4', href: '#g1-86', y: '69.8529'}), 
	                        React.createElement("use", {x: '137.365', href: '#g4-33', y: '69.8529'}), 
	                        React.createElement("rect", {height: '0.47998', width: '43.1436', x: '113.658', y: '71.2928'}), 
	                        React.createElement("use", {x: '113.658', href: '#g5-80', y: '75.6016'}), 
	                        React.createElement("use", {x: '126.325', href: '#g1-86', y: '78.7683'}), 
	                        React.createElement("use", {x: '126.325', href: '#g1-120', y: '88.1018'}), 
	                        React.createElement("use", {x: '130.974', href: '#g4-61', y: '88.1018'}), 
	                        React.createElement("use", {x: '137.585', href: '#g4-48', y: '88.1018'}), 
	                        React.createElement("use", {x: '145.535', href: '#g1-80', y: '79.8769'}), 
	                        React.createElement("use", {x: '151.615', href: '#g3-120', y: '77.5991'}), 
	                        React.createElement("rect", {height: '0.47998', width: '10.0668', x: '145.535', y: '81.3617'}), 
	                        React.createElement("use", {x: '146.897', href: '#g1-120', y: '88.7398'}), 
	                        React.createElement("use", {x: '151.545', href: '#g4-33', y: '88.7398'}))));
	            case '5_pk':
	                return (React.createElement("svg", {height: '38.9542pt', viewBox: '0 0 120.251 38.9542', width: '120.251pt'}, 
	                    React.createElement("defs", null, 
	                        React.createElement("path", {d: 'M8.496 -8.052C7.716 -8.376 7.08 -8.472 6.384 -8.472C3.732 -8.472 1.56 -5.676 1.56 -3.156C1.56 -1.308 2.784 0.108 4.428 0.108C5.724 0.108 6.192 -0.024 7.02 -0.552L7.128 -1.38C6.312 -0.852 5.808 -0.636 4.788 -0.636C3.3 -0.636 2.604 -1.872 2.604 -3.228C2.604 -5.304 4.224 -7.716 6.252 -7.716C7.056 -7.716 7.56 -7.5 8.112 -7.068L8.496 -8.052Z', id: 'g0-67'}), 
	                        React.createElement("path", {d: 'M2.856 -3.468H4.764C6.6 -3.468 8.124 -4.944 8.124 -6.348C8.124 -7.38 7.284 -8.328 5.796 -8.328H2.868L1.092 0H2.124L2.856 -3.468ZM3.732 -7.656H5.388C6.6 -7.656 7.164 -7.044 7.164 -6.264C7.164 -5.34 6.348 -4.164 4.644 -4.164H2.988L3.732 -7.656Z', id: 'g0-80'}), 
	                        React.createElement("path", {d: 'M6.376 -5.552H5.704L4.648 -0.632H4.64L3.072 -5.552H1.984L0.8 0H1.472L2.52 -4.92H2.528L4.104 0H5.192L6.376 -5.552Z', id: 'g1-78'}), 
	                        React.createElement("path", {d: 'M6.72 -5.552H6.024L4.424 -2.992L3.536 -1.52C3.104 -0.8 3.056 -0.68 3.04 -0.632H3.032C3.032 -1.056 2.8 -2.24 2.648 -3L2.144 -5.552H1.296L2.424 0H3.232L6.72 -5.552Z', id: 'g1-86'}), 
	                        React.createElement("path", {d: 'M3.912 -2.352C3.928 -2.432 3.936 -2.464 3.936 -2.608C3.936 -3.136 3.576 -3.672 2.768 -3.672C2.28 -3.672 1.872 -3.568 1.36 -3.328L1.288 -2.744C1.72 -3.008 2.152 -3.16 2.664 -3.16C3.072 -3.16 3.232 -2.856 3.232 -2.544C3.232 -2.472 3.232 -2.456 3.136 -1.976C2.576 -1.96 0.536 -1.888 0.536 -0.72C0.536 -0.488 0.64 0.08 1.32 0.08C1.48 0.08 2.2 0.064 2.8 -0.304L2.736 0H3.408L3.912 -2.352ZM3.032 -1.528C2.928 -0.96 2.904 -0.864 2.72 -0.704C2.48 -0.512 2.112 -0.448 1.872 -0.448C1.496 -0.448 1.192 -0.592 1.192 -0.872C1.192 -1.16 1.464 -1.304 1.968 -1.416C2.392 -1.504 2.848 -1.52 3.032 -1.528Z', id: 'g1-97'}), 
	                        React.createElement("path", {d: 'M2.848 -2.176L4.568 -3.552H3.8L1.728 -1.896L2.512 -5.552H1.888L0.704 0H1.296L1.536 -1.12L2.352 -1.776L3.296 0H4L2.848 -2.176Z', id: 'g1-107'}), 
	                        React.createElement("path", {d: 'M2.608 -1.832L4.528 -3.552H3.816L2.408 -2.24L1.52 -3.552H0.8L2.032 -1.832L0 0H0.712L2.248 -1.504L3.192 0H3.912L2.608 -1.832Z', id: 'g1-120'}), 
	                        React.createElement("path", {d: 'M3.192 -9C1.392 -7.392 0.936 -4.956 0.936 -3C0.936 -0.888 1.452 1.464 3.192 3.012H3.912C3.444 2.58 2.712 1.644 2.292 0.288C1.968 -0.78 1.848 -1.896 1.848 -2.988C1.848 -6.528 3.108 -8.256 3.912 -9H3.192Z', id: 'g2-40'}), 
	                        React.createElement("path", {d: 'M1.368 3.012C3.168 1.404 3.624 -1.032 3.624 -2.988C3.624 -5.1 3.108 -7.452 1.368 -9H0.648C1.116 -8.568 1.848 -7.632 2.268 -6.276C2.592 -5.208 2.712 -4.092 2.712 -3C2.712 0.54 1.452 2.268 0.648 3.012H1.368Z', id: 'g2-41'}), 
	                        React.createElement("path", {d: 'M8.1 -3.924C8.268 -3.924 8.484 -3.924 8.484 -4.14C8.484 -4.368 8.28 -4.368 8.1 -4.368H1.032C0.864 -4.368 0.648 -4.368 0.648 -4.152C0.648 -3.924 0.852 -3.924 1.032 -3.924H8.1ZM8.1 -1.62C8.268 -1.62 8.484 -1.62 8.484 -1.836C8.484 -2.064 8.28 -2.064 8.1 -2.064H1.032C0.864 -2.064 0.648 -2.064 0.648 -1.848C0.648 -1.62 0.852 -1.62 1.032 -1.62H8.1Z', id: 'g2-61'}), 
	                        React.createElement("path", {d: 'M3.904 -2.6C3.904 -2.984 3.904 -3.92 3.528 -4.576C3.12 -5.296 2.504 -5.416 2.12 -5.416C1.76 -5.416 1.136 -5.304 0.736 -4.616C0.352 -3.976 0.336 -3.104 0.336 -2.6C0.336 -2.008 0.368 -1.28 0.704 -0.672C1.056 -0.024 1.648 0.168 2.12 0.168C2.92 0.168 3.36 -0.296 3.6 -0.8C3.88 -1.368 3.904 -2.104 3.904 -2.6ZM2.12 -0.36C1.784 -0.36 1.4 -0.552 1.2 -1.128C1.04 -1.616 1.032 -2.12 1.032 -2.704C1.032 -3.44 1.032 -4.888 2.12 -4.888S3.208 -3.44 3.208 -2.704C3.208 -2.176 3.208 -1.576 3.016 -1.064C2.792 -0.488 2.384 -0.36 2.12 -0.36Z', id: 'g3-48'}), 
	                        React.createElement("path", {d: 'M2.568 -5.416H2.392C1.872 -4.936 1.216 -4.904 0.736 -4.888V-4.384C1.048 -4.392 1.448 -4.408 1.848 -4.568V-0.504H0.784V0H3.632V-0.504H2.568V-5.416Z', id: 'g3-49'}), 
	                        React.createElement("path", {d: 'M5.84 -2.688C5.952 -2.688 6.128 -2.688 6.128 -2.872S5.952 -3.056 5.84 -3.056H0.76C0.648 -3.056 0.472 -3.056 0.472 -2.872S0.648 -2.688 0.76 -2.688H5.84ZM5.84 -0.944C5.952 -0.944 6.128 -0.944 6.128 -1.128S5.952 -1.312 5.84 -1.312H0.76C0.648 -1.312 0.472 -1.312 0.472 -1.128S0.648 -0.944 0.76 -0.944H5.84Z', id: 'g3-61'}), 
	                        React.createElement("path", {d: 'M5.592 -1.816C5.72 -1.816 5.896 -1.816 5.896 -2S5.72 -2.184 5.592 -2.184H1.008C0.88 -2.184 0.704 -2.184 0.704 -2S0.88 -1.816 1.008 -1.816H5.592Z', id: 'g4-0'}), 
	                        React.createElement("path", {d: 'M5.052 6.408L0.792 11.676C0.696 11.796 0.684 11.82 0.684 11.868C0.684 12 0.792 12 1.008 12H10.956L11.988 9.012H11.688C11.388 9.912 10.584 10.644 9.564 10.992C9.372 11.052 8.544 11.34 6.78 11.34H1.68L5.844 6.192C5.928 6.084 5.952 6.048 5.952 6S5.94 5.94 5.868 5.832L1.968 0.48H6.72C8.088 0.48 10.848 0.564 11.688 2.808H11.988L10.956 0H1.008C0.684 0 0.672 0.012 0.672 0.384L5.052 6.408Z', id: 'g5-80'})), 
	                    React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                        React.createElement("use", {x: '56.6248', href: '#g0-80', y: '73.5617'}), 
	                        React.createElement("use", {x: '64.097', href: '#g1-107', y: '75.3616'}), 
	                        React.createElement("use", {x: '72.7444', href: '#g2-61', y: '73.5617'}), 
	                        React.createElement("use", {x: '101.672', href: '#g0-67', y: '63.9103'}), 
	                        React.createElement("use", {x: '110.624', href: '#g1-107', y: '59.5556'}), 
	                        React.createElement("use", {x: '109.179', href: '#g1-78', y: '67.031'}), 
	                        React.createElement("use", {x: '116.318', href: '#g2-40', y: '63.9103'}), 
	                        React.createElement("use", {x: '127.518', href: '#g1-97', y: '59.1855'}), 
	                        React.createElement("rect", {height: '0.47998', width: '15.014', x: '122.088', y: '60.6703'}), 
	                        React.createElement("use", {x: '122.088', href: '#g3-49', y: '68.0484'}), 
	                        React.createElement("use", {x: '126.338', href: '#g4-0', y: '68.0484'}), 
	                        React.createElement("use", {x: '132.949', href: '#g1-97', y: '68.0484'}), 
	                        React.createElement("use", {x: '138.302', href: '#g2-41', y: '63.9103'}), 
	                        React.createElement("use", {x: '142.871', href: '#g1-107', y: '59.5556'}), 
	                        React.createElement("rect", {height: '0.47998', width: '77.0246', x: '86.4164', y: '70.3217'}), 
	                        React.createElement("use", {x: '86.4164', href: '#g5-80', y: '74.6305'}), 
	                        React.createElement("use", {x: '99.0831', href: '#g1-86', y: '77.7971'}), 
	                        React.createElement("use", {x: '99.0831', href: '#g1-120', y: '87.1306'}), 
	                        React.createElement("use", {x: '103.732', href: '#g3-61', y: '87.1306'}), 
	                        React.createElement("use", {x: '110.343', href: '#g3-48', y: '87.1306'}), 
	                        React.createElement("use", {x: '117.093', href: '#g0-67', y: '83.6306'}), 
	                        React.createElement("use", {x: '126.045', href: '#g1-120', y: '79.4972'}), 
	                        React.createElement("use", {x: '124.6', href: '#g1-78', y: '86.9727'}), 
	                        React.createElement("use", {x: '131.739', href: '#g2-40', y: '83.6306'}), 
	                        React.createElement("use", {x: '142.939', href: '#g1-97', y: '78.9058'}), 
	                        React.createElement("rect", {height: '0.47998', width: '15.014', x: '137.509', y: '80.3906'}), 
	                        React.createElement("use", {x: '137.509', href: '#g3-49', y: '87.7686'}), 
	                        React.createElement("use", {x: '141.759', href: '#g4-0', y: '87.7686'}), 
	                        React.createElement("use", {x: '148.37', href: '#g1-97', y: '87.7686'}), 
	                        React.createElement("use", {x: '153.723', href: '#g2-41', y: '83.6306'}), 
	                        React.createElement("use", {x: '158.292', href: '#g1-120', y: '80.1639'}))));
	            case '5_pt':
	                return (React.createElement("svg", {height: '38.9542pt', viewBox: '0 0 118.925 38.9542', width: '118.925pt'}, 
	                    React.createElement("defs", null, 
	                        React.createElement("path", {d: 'M8.496 -8.052C7.716 -8.376 7.08 -8.472 6.384 -8.472C3.732 -8.472 1.56 -5.676 1.56 -3.156C1.56 -1.308 2.784 0.108 4.428 0.108C5.724 0.108 6.192 -0.024 7.02 -0.552L7.128 -1.38C6.312 -0.852 5.808 -0.636 4.788 -0.636C3.3 -0.636 2.604 -1.872 2.604 -3.228C2.604 -5.304 4.224 -7.716 6.252 -7.716C7.056 -7.716 7.56 -7.5 8.112 -7.068L8.496 -8.052Z', id: 'g0-67'}), 
	                        React.createElement("path", {d: 'M2.856 -3.468H4.764C6.6 -3.468 8.124 -4.944 8.124 -6.348C8.124 -7.38 7.284 -8.328 5.796 -8.328H2.868L1.092 0H2.124L2.856 -3.468ZM3.732 -7.656H5.388C6.6 -7.656 7.164 -7.044 7.164 -6.264C7.164 -5.34 6.348 -4.164 4.644 -4.164H2.988L3.732 -7.656Z', id: 'g0-80'}), 
	                        React.createElement("path", {d: 'M6.376 -5.552H5.704L4.648 -0.632H4.64L3.072 -5.552H1.984L0.8 0H1.472L2.52 -4.92H2.528L4.104 0H5.192L6.376 -5.552Z', id: 'g1-78'}), 
	                        React.createElement("path", {d: 'M6.72 -5.552H6.024L4.424 -2.992L3.536 -1.52C3.104 -0.8 3.056 -0.68 3.04 -0.632H3.032C3.032 -1.056 2.8 -2.24 2.648 -3L2.144 -5.552H1.296L2.424 0H3.232L6.72 -5.552Z', id: 'g1-86'}), 
	                        React.createElement("path", {d: 'M3.912 -2.352C3.928 -2.432 3.936 -2.464 3.936 -2.608C3.936 -3.136 3.576 -3.672 2.768 -3.672C2.28 -3.672 1.872 -3.568 1.36 -3.328L1.288 -2.744C1.72 -3.008 2.152 -3.16 2.664 -3.16C3.072 -3.16 3.232 -2.856 3.232 -2.544C3.232 -2.472 3.232 -2.456 3.136 -1.976C2.576 -1.96 0.536 -1.888 0.536 -0.72C0.536 -0.488 0.64 0.08 1.32 0.08C1.48 0.08 2.2 0.064 2.8 -0.304L2.736 0H3.408L3.912 -2.352ZM3.032 -1.528C2.928 -0.96 2.904 -0.864 2.72 -0.704C2.48 -0.512 2.112 -0.448 1.872 -0.448C1.496 -0.448 1.192 -0.592 1.192 -0.872C1.192 -1.16 1.464 -1.304 1.968 -1.416C2.392 -1.504 2.848 -1.52 3.032 -1.528Z', id: 'g1-97'}), 
	                        React.createElement("path", {d: 'M2.152 -3.048H3.336L3.44 -3.552H2.256L2.472 -4.568H1.856L1.64 -3.552H0.912L0.808 -3.048H1.512L1.096 -1.112C1.072 -0.976 1.024 -0.744 1.024 -0.568C1.024 -0.184 1.16 0.08 1.56 0.08C1.912 0.08 2.344 0.008 2.88 -0.216L2.84 -0.72C2.6 -0.576 2.328 -0.472 2.032 -0.472C1.848 -0.472 1.712 -0.56 1.712 -0.864C1.712 -0.96 1.736 -1.064 1.736 -1.072L2.152 -3.048Z', id: 'g1-116'}), 
	                        React.createElement("path", {d: 'M2.608 -1.832L4.528 -3.552H3.816L2.408 -2.24L1.52 -3.552H0.8L2.032 -1.832L0 0H0.712L2.248 -1.504L3.192 0H3.912L2.608 -1.832Z', id: 'g1-120'}), 
	                        React.createElement("path", {d: 'M3.192 -9C1.392 -7.392 0.936 -4.956 0.936 -3C0.936 -0.888 1.452 1.464 3.192 3.012H3.912C3.444 2.58 2.712 1.644 2.292 0.288C1.968 -0.78 1.848 -1.896 1.848 -2.988C1.848 -6.528 3.108 -8.256 3.912 -9H3.192Z', id: 'g2-40'}), 
	                        React.createElement("path", {d: 'M1.368 3.012C3.168 1.404 3.624 -1.032 3.624 -2.988C3.624 -5.1 3.108 -7.452 1.368 -9H0.648C1.116 -8.568 1.848 -7.632 2.268 -6.276C2.592 -5.208 2.712 -4.092 2.712 -3C2.712 0.54 1.452 2.268 0.648 3.012H1.368Z', id: 'g2-41'}), 
	                        React.createElement("path", {d: 'M8.1 -3.924C8.268 -3.924 8.484 -3.924 8.484 -4.14C8.484 -4.368 8.28 -4.368 8.1 -4.368H1.032C0.864 -4.368 0.648 -4.368 0.648 -4.152C0.648 -3.924 0.852 -3.924 1.032 -3.924H8.1ZM8.1 -1.62C8.268 -1.62 8.484 -1.62 8.484 -1.836C8.484 -2.064 8.28 -2.064 8.1 -2.064H1.032C0.864 -2.064 0.648 -2.064 0.648 -1.848C0.648 -1.62 0.852 -1.62 1.032 -1.62H8.1Z', id: 'g2-61'}), 
	                        React.createElement("path", {d: 'M3.904 -2.6C3.904 -2.984 3.904 -3.92 3.528 -4.576C3.12 -5.296 2.504 -5.416 2.12 -5.416C1.76 -5.416 1.136 -5.304 0.736 -4.616C0.352 -3.976 0.336 -3.104 0.336 -2.6C0.336 -2.008 0.368 -1.28 0.704 -0.672C1.056 -0.024 1.648 0.168 2.12 0.168C2.92 0.168 3.36 -0.296 3.6 -0.8C3.88 -1.368 3.904 -2.104 3.904 -2.6ZM2.12 -0.36C1.784 -0.36 1.4 -0.552 1.2 -1.128C1.04 -1.616 1.032 -2.12 1.032 -2.704C1.032 -3.44 1.032 -4.888 2.12 -4.888S3.208 -3.44 3.208 -2.704C3.208 -2.176 3.208 -1.576 3.016 -1.064C2.792 -0.488 2.384 -0.36 2.12 -0.36Z', id: 'g3-48'}), 
	                        React.createElement("path", {d: 'M2.568 -5.416H2.392C1.872 -4.936 1.216 -4.904 0.736 -4.888V-4.384C1.048 -4.392 1.448 -4.408 1.848 -4.568V-0.504H0.784V0H3.632V-0.504H2.568V-5.416Z', id: 'g3-49'}), 
	                        React.createElement("path", {d: 'M5.84 -2.688C5.952 -2.688 6.128 -2.688 6.128 -2.872S5.952 -3.056 5.84 -3.056H0.76C0.648 -3.056 0.472 -3.056 0.472 -2.872S0.648 -2.688 0.76 -2.688H5.84ZM5.84 -0.944C5.952 -0.944 6.128 -0.944 6.128 -1.128S5.952 -1.312 5.84 -1.312H0.76C0.648 -1.312 0.472 -1.312 0.472 -1.128S0.648 -0.944 0.76 -0.944H5.84Z', id: 'g3-61'}), 
	                        React.createElement("path", {d: 'M5.592 -1.816C5.72 -1.816 5.896 -1.816 5.896 -2S5.72 -2.184 5.592 -2.184H1.008C0.88 -2.184 0.704 -2.184 0.704 -2S0.88 -1.816 1.008 -1.816H5.592Z', id: 'g4-0'}), 
	                        React.createElement("path", {d: 'M5.052 6.408L0.792 11.676C0.696 11.796 0.684 11.82 0.684 11.868C0.684 12 0.792 12 1.008 12H10.956L11.988 9.012H11.688C11.388 9.912 10.584 10.644 9.564 10.992C9.372 11.052 8.544 11.34 6.78 11.34H1.68L5.844 6.192C5.928 6.084 5.952 6.048 5.952 6S5.94 5.94 5.868 5.832L1.968 0.48H6.72C8.088 0.48 10.848 0.564 11.688 2.808H11.988L10.956 0H1.008C0.684 0 0.672 0.012 0.672 0.384L5.052 6.408Z', id: 'g5-80'})), 
	                    React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                        React.createElement("use", {x: '56.6248', href: '#g0-80', y: '73.5617'}), 
	                        React.createElement("use", {x: '64.097', href: '#g1-116', y: '75.3616'}), 
	                        React.createElement("use", {x: '71.5666', href: '#g2-61', y: '73.5617'}), 
	                        React.createElement("use", {x: '98.533', href: '#g0-67', y: '63.9103'}), 
	                        React.createElement("use", {x: '107.485', href: '#g1-86', y: '59.5556'}), 
	                        React.createElement("use", {x: '106.04', href: '#g1-78', y: '67.031'}), 
	                        React.createElement("use", {x: '114.95', href: '#g2-40', y: '63.9103'}), 
	                        React.createElement("use", {x: '126.15', href: '#g1-97', y: '59.1855'}), 
	                        React.createElement("rect", {height: '0.47998', width: '15.014', x: '120.72', y: '60.6703'}), 
	                        React.createElement("use", {x: '120.72', href: '#g3-49', y: '68.0484'}), 
	                        React.createElement("use", {x: '124.97', href: '#g4-0', y: '68.0484'}), 
	                        React.createElement("use", {x: '131.581', href: '#g1-97', y: '68.0484'}), 
	                        React.createElement("use", {x: '136.934', href: '#g2-41', y: '63.9103'}), 
	                        React.createElement("use", {x: '141.503', href: '#g1-86', y: '59.5556'}), 
	                        React.createElement("rect", {height: '0.47998', width: '77.0246', x: '85.2387', y: '70.3217'}), 
	                        React.createElement("use", {x: '85.2387', href: '#g5-80', y: '74.6305'}), 
	                        React.createElement("use", {x: '97.9054', href: '#g1-86', y: '77.7971'}), 
	                        React.createElement("use", {x: '97.9054', href: '#g1-120', y: '87.1306'}), 
	                        React.createElement("use", {x: '102.554', href: '#g3-61', y: '87.1306'}), 
	                        React.createElement("use", {x: '109.165', href: '#g3-48', y: '87.1306'}), 
	                        React.createElement("use", {x: '115.915', href: '#g0-67', y: '83.6306'}), 
	                        React.createElement("use", {x: '124.867', href: '#g1-120', y: '79.4972'}), 
	                        React.createElement("use", {x: '123.422', href: '#g1-78', y: '86.9727'}), 
	                        React.createElement("use", {x: '130.562', href: '#g2-40', y: '83.6306'}), 
	                        React.createElement("use", {x: '141.762', href: '#g1-97', y: '78.9058'}), 
	                        React.createElement("rect", {height: '0.47998', width: '15.014', x: '136.331', y: '80.3906'}), 
	                        React.createElement("use", {x: '136.331', href: '#g3-49', y: '87.7686'}), 
	                        React.createElement("use", {x: '140.581', href: '#g4-0', y: '87.7686'}), 
	                        React.createElement("use", {x: '147.192', href: '#g1-97', y: '87.7686'}), 
	                        React.createElement("use", {x: '152.545', href: '#g2-41', y: '83.6306'}), 
	                        React.createElement("use", {x: '157.114', href: '#g1-120', y: '80.1639'}))));
	            case '5_pb':
	                return (React.createElement("svg", {height: '38.9542pt', viewBox: '0 0 132.285 38.9542', width: '132.285pt'}, 
	                    React.createElement("defs", null, 
	                        React.createElement("path", {d: 'M8.496 -8.052C7.716 -8.376 7.08 -8.472 6.384 -8.472C3.732 -8.472 1.56 -5.676 1.56 -3.156C1.56 -1.308 2.784 0.108 4.428 0.108C5.724 0.108 6.192 -0.024 7.02 -0.552L7.128 -1.38C6.312 -0.852 5.808 -0.636 4.788 -0.636C3.3 -0.636 2.604 -1.872 2.604 -3.228C2.604 -5.304 4.224 -7.716 6.252 -7.716C7.056 -7.716 7.56 -7.5 8.112 -7.068L8.496 -8.052Z', id: 'g0-67'}), 
	                        React.createElement("path", {d: 'M2.856 -3.468H4.764C6.6 -3.468 8.124 -4.944 8.124 -6.348C8.124 -7.38 7.284 -8.328 5.796 -8.328H2.868L1.092 0H2.124L2.856 -3.468ZM3.732 -7.656H5.388C6.6 -7.656 7.164 -7.044 7.164 -6.264C7.164 -5.34 6.348 -4.164 4.644 -4.164H2.988L3.732 -7.656Z', id: 'g0-80'}), 
	                        React.createElement("path", {d: 'M6.376 -5.552H5.704L4.648 -0.632H4.64L3.072 -5.552H1.984L0.8 0H1.472L2.52 -4.92H2.528L4.104 0H5.192L6.376 -5.552Z', id: 'g1-78'}), 
	                        React.createElement("path", {d: 'M6.72 -5.552H6.024L4.424 -2.992L3.536 -1.52C3.104 -0.8 3.056 -0.68 3.04 -0.632H3.032C3.032 -1.056 2.8 -2.24 2.648 -3L2.144 -5.552H1.296L2.424 0H3.232L6.72 -5.552Z', id: 'g1-86'}), 
	                        React.createElement("path", {d: 'M3.912 -2.352C3.928 -2.432 3.936 -2.464 3.936 -2.608C3.936 -3.136 3.576 -3.672 2.768 -3.672C2.28 -3.672 1.872 -3.568 1.36 -3.328L1.288 -2.744C1.72 -3.008 2.152 -3.16 2.664 -3.16C3.072 -3.16 3.232 -2.856 3.232 -2.544C3.232 -2.472 3.232 -2.456 3.136 -1.976C2.576 -1.96 0.536 -1.888 0.536 -0.72C0.536 -0.488 0.64 0.08 1.32 0.08C1.48 0.08 2.2 0.064 2.8 -0.304L2.736 0H3.408L3.912 -2.352ZM3.032 -1.528C2.928 -0.96 2.904 -0.864 2.72 -0.704C2.48 -0.512 2.112 -0.448 1.872 -0.448C1.496 -0.448 1.192 -0.592 1.192 -0.872C1.192 -1.16 1.464 -1.304 1.968 -1.416C2.392 -1.504 2.848 -1.52 3.032 -1.528Z', id: 'g1-97'}), 
	                        React.createElement("path", {d: 'M2.528 -5.552H1.864L0.68 0H1.376L1.456 -0.376C1.816 0.016 2.256 0.08 2.504 0.08C3.536 0.08 4.536 -1.04 4.536 -2.312C4.536 -2.864 4.288 -3.632 3.512 -3.632C3.192 -3.632 2.64 -3.56 2.032 -3.184L2.528 -5.552ZM1.92 -2.544C1.952 -2.672 1.96 -2.68 2.048 -2.768C2.136 -2.84 2.472 -3.104 2.92 -3.104C3.36 -3.104 3.824 -2.864 3.824 -2.176C3.824 -1.28 3.192 -0.448 2.272 -0.448C1.96 -0.448 1.712 -0.592 1.576 -0.952L1.92 -2.544Z', id: 'g1-98'}), 
	                        React.createElement("path", {d: 'M2.608 -1.832L4.528 -3.552H3.816L2.408 -2.24L1.52 -3.552H0.8L2.032 -1.832L0 0H0.712L2.248 -1.504L3.192 0H3.912L2.608 -1.832Z', id: 'g1-120'}), 
	                        React.createElement("path", {d: 'M3.192 -9C1.392 -7.392 0.936 -4.956 0.936 -3C0.936 -0.888 1.452 1.464 3.192 3.012H3.912C3.444 2.58 2.712 1.644 2.292 0.288C1.968 -0.78 1.848 -1.896 1.848 -2.988C1.848 -6.528 3.108 -8.256 3.912 -9H3.192Z', id: 'g2-40'}), 
	                        React.createElement("path", {d: 'M1.368 3.012C3.168 1.404 3.624 -1.032 3.624 -2.988C3.624 -5.1 3.108 -7.452 1.368 -9H0.648C1.116 -8.568 1.848 -7.632 2.268 -6.276C2.592 -5.208 2.712 -4.092 2.712 -3C2.712 0.54 1.452 2.268 0.648 3.012H1.368Z', id: 'g2-41'}), 
	                        React.createElement("path", {d: 'M8.1 -3.924C8.268 -3.924 8.484 -3.924 8.484 -4.14C8.484 -4.368 8.28 -4.368 8.1 -4.368H1.032C0.864 -4.368 0.648 -4.368 0.648 -4.152C0.648 -3.924 0.852 -3.924 1.032 -3.924H8.1ZM8.1 -1.62C8.268 -1.62 8.484 -1.62 8.484 -1.836C8.484 -2.064 8.28 -2.064 8.1 -2.064H1.032C0.864 -2.064 0.648 -2.064 0.648 -1.848C0.648 -1.62 0.852 -1.62 1.032 -1.62H8.1Z', id: 'g2-61'}), 
	                        React.createElement("path", {d: 'M5.592 -1.816C5.72 -1.816 5.896 -1.816 5.896 -2S5.72 -2.184 5.592 -2.184H1.008C0.88 -2.184 0.704 -2.184 0.704 -2S0.88 -1.816 1.008 -1.816H5.592Z', id: 'g3-0'}), 
	                        React.createElement("path", {d: 'M3.904 -2.6C3.904 -2.984 3.904 -3.92 3.528 -4.576C3.12 -5.296 2.504 -5.416 2.12 -5.416C1.76 -5.416 1.136 -5.304 0.736 -4.616C0.352 -3.976 0.336 -3.104 0.336 -2.6C0.336 -2.008 0.368 -1.28 0.704 -0.672C1.056 -0.024 1.648 0.168 2.12 0.168C2.92 0.168 3.36 -0.296 3.6 -0.8C3.88 -1.368 3.904 -2.104 3.904 -2.6ZM2.12 -0.36C1.784 -0.36 1.4 -0.552 1.2 -1.128C1.04 -1.616 1.032 -2.12 1.032 -2.704C1.032 -3.44 1.032 -4.888 2.12 -4.888S3.208 -3.44 3.208 -2.704C3.208 -2.176 3.208 -1.576 3.016 -1.064C2.792 -0.488 2.384 -0.36 2.12 -0.36Z', id: 'g4-48'}), 
	                        React.createElement("path", {d: 'M2.568 -5.416H2.392C1.872 -4.936 1.216 -4.904 0.736 -4.888V-4.384C1.048 -4.392 1.448 -4.408 1.848 -4.568V-0.504H0.784V0H3.632V-0.504H2.568V-5.416Z', id: 'g4-49'}), 
	                        React.createElement("path", {d: 'M5.84 -2.688C5.952 -2.688 6.128 -2.688 6.128 -2.872S5.952 -3.056 5.84 -3.056H0.76C0.648 -3.056 0.472 -3.056 0.472 -2.872S0.648 -2.688 0.76 -2.688H5.84ZM5.84 -0.944C5.952 -0.944 6.128 -0.944 6.128 -1.128S5.952 -1.312 5.84 -1.312H0.76C0.648 -1.312 0.472 -1.312 0.472 -1.128S0.648 -0.944 0.76 -0.944H5.84Z', id: 'g4-61'}), 
	                        React.createElement("path", {d: 'M5.052 6.408L0.792 11.676C0.696 11.796 0.684 11.82 0.684 11.868C0.684 12 0.792 12 1.008 12H10.956L11.988 9.012H11.688C11.388 9.912 10.584 10.644 9.564 10.992C9.372 11.052 8.544 11.34 6.78 11.34H1.68L5.844 6.192C5.928 6.084 5.952 6.048 5.952 6S5.94 5.94 5.868 5.832L1.968 0.48H6.72C8.088 0.48 10.848 0.564 11.688 2.808H11.988L10.956 0H1.008C0.684 0 0.672 0.012 0.672 0.384L5.052 6.408Z', id: 'g5-80'})), 
	                    React.createElement("g", {transform: 'matrix(1.12578 0 0 1.12578 -63.986 -61.02)', fill: color, strokeWidth: '0.2', stroke: color}, 
	                        React.createElement("use", {x: '56.6248', href: '#g0-80', y: '73.5617'}), 
	                        React.createElement("use", {x: '64.097', href: '#g1-98', y: '75.3616'}), 
	                        React.createElement("use", {x: '72.5721', href: '#g2-61', y: '73.5617'}), 
	                        React.createElement("use", {x: '100.424', href: '#g0-67', y: '63.9103'}), 
	                        React.createElement("use", {x: '109.376', href: '#g1-86', y: '59.5556'}), 
	                        React.createElement("use", {x: '107.931', href: '#g1-78', y: '67.031'}), 
	                        React.createElement("use", {x: '114.57', href: '#g3-0', y: '67.031'}), 
	                        React.createElement("use", {x: '121.181', href: '#g4-49', y: '67.031'}), 
	                        React.createElement("use", {x: '125.932', href: '#g2-40', y: '63.9103'}), 
	                        React.createElement("use", {x: '137.132', href: '#g1-97', y: '59.1855'}), 
	                        React.createElement("rect", {height: '0.47998', width: '15.014', x: '131.701', y: '60.6703'}), 
	                        React.createElement("use", {x: '131.701', href: '#g4-49', y: '68.0484'}), 
	                        React.createElement("use", {x: '135.951', href: '#g3-0', y: '68.0484'}), 
	                        React.createElement("use", {x: '142.562', href: '#g1-97', y: '68.0484'}), 
	                        React.createElement("use", {x: '147.915', href: '#g2-41', y: '63.9103'}), 
	                        React.createElement("use", {x: '152.484', href: '#g1-86', y: '59.5556'}), 
	                        React.createElement("rect", {height: '0.47998', width: '87.8858', x: '86.2441', y: '70.3217'}), 
	                        React.createElement("use", {x: '86.2441', href: '#g5-80', y: '74.6305'}), 
	                        React.createElement("use", {x: '98.9108', href: '#g1-86', y: '77.7971'}), 
	                        React.createElement("use", {x: '98.9108', href: '#g1-120', y: '87.1306'}), 
	                        React.createElement("use", {x: '103.56', href: '#g4-61', y: '87.1306'}), 
	                        React.createElement("use", {x: '110.171', href: '#g4-48', y: '87.1306'}), 
	                        React.createElement("use", {x: '116.921', href: '#g0-67', y: '83.6306'}), 
	                        React.createElement("use", {x: '125.873', href: '#g1-120', y: '79.4972'}), 
	                        React.createElement("use", {x: '124.428', href: '#g1-78', y: '86.9727'}), 
	                        React.createElement("use", {x: '131.067', href: '#g3-0', y: '86.9727'}), 
	                        React.createElement("use", {x: '137.678', href: '#g4-49', y: '86.9727'}), 
	                        React.createElement("use", {x: '142.428', href: '#g2-40', y: '83.6306'}), 
	                        React.createElement("use", {x: '153.628', href: '#g1-97', y: '78.9058'}), 
	                        React.createElement("rect", {height: '0.47998', width: '15.014', x: '148.198', y: '80.3906'}), 
	                        React.createElement("use", {x: '148.198', href: '#g4-49', y: '87.7686'}), 
	                        React.createElement("use", {x: '152.448', href: '#g3-0', y: '87.7686'}), 
	                        React.createElement("use", {x: '159.059', href: '#g1-97', y: '87.7686'}), 
	                        React.createElement("use", {x: '164.412', href: '#g2-41', y: '83.6306'}), 
	                        React.createElement("use", {x: '168.981', href: '#g1-120', y: '80.1639'}))));
	            default:
	                return React.createElement("svg", null);
	        }
	    }
	    onMouseEvent() {
	        this.setState({ hovered: !this.state.hovered, for: this.state.for });
	    }
	}
	exports.Formulas = Formulas;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map