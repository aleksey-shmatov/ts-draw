import React = require('react');
import {ObservableRenderer, IModelRendererProps} from './ObservableRenderer';
import {Canvas} from '../model/canvas';
import {MouseInfo, CanvasEvents, dispatcher} from '../events/canvasEvents'
import {PathRenderer} from './PathRenderer';

export interface CanvasProperties {
	model: Canvas;
}

export class CanvasRenderer extends ObservableRenderer<CanvasProperties, {}> {

	private id: number = 0;

	componentDidMount() {
		super.componentDidMount();
		var model: Canvas = this.props.model;
		model.elements.collectionChanged.listen(this.onPropertyChange, this);
    }

    componentWillUnmount() {
		super.componentWillUnmount();
		var model: Canvas = this.props.model;
		model.elements.collectionChanged.unlisten(this.onPropertyChange);
    }

	handleMouse(event: any) {
		var info: MouseInfo = new MouseInfo();
		var target: any = event.currentTarget;
		info.x = event.pageX - target.offsetLeft;
		info.y = event.pageY - target.offsetTop;
		dispatcher.emit(event.type, info);
	}

	render() {
		var canvas: Canvas = this.props.model as Canvas;
		var elements = canvas.elements.source;
		return (
			<svg width={600} height={400}
				onMouseDown={this.handleMouse}
				onMouseMove={this.handleMouse}
				onMouseUp={this.handleMouse}
				onMouseLeave={this.handleMouse}>
				{elements.map((element) => {
					var key = this.id++;
					return <PathRenderer key={key} model={element}></PathRenderer>;
				}) }
				</svg>);
	}
}