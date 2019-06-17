import React = require('react');
import { ObservableRenderer, ModelRendererProps } from './ObservableRenderer';
import { Canvas } from '../model/Canvas';
import { Drawing } from '../model/Drawing';
import { MouseInfo, CanvasEvents, dispatcher } from '../events/canvasEvents'
import { PathRenderer } from './PathRenderer';

export interface CanvasProperties {
    model: Canvas;
}

export class CanvasRenderer extends ObservableRenderer<CanvasProperties, {}> {
    componentDidMount() {
        super.componentDidMount();
        const model: Canvas = this.props.model;
        model.elements.collectionChanged.listen(this.onPropertyChange, this);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        const model: Canvas = this.props.model;
        model.elements.collectionChanged.unlisten(this.onPropertyChange);
    }

    handleMouse(event: any) {
        const info: MouseInfo = new MouseInfo();
        const target: any = event.currentTarget;
        info.x = event.pageX - target.parentNode.offsetLeft;
        info.y = event.pageY - target.parentNode.offsetTop;
        dispatcher.emit(event.type, info);
    }

    render() {
        const canvas: Canvas = this.props.model as Canvas;
        const elements = canvas.elements.source;
        return (
            <svg width={600} height={400}
                onMouseDown={this.handleMouse}
                onMouseMove={this.handleMouse}
                onMouseUp={this.handleMouse}
                onMouseLeave={this.handleMouse}>
                {elements.map((element: Drawing) => {
                    return <PathRenderer key={element.id} model={element}></PathRenderer>;
                })}
            </svg>);
    }
}