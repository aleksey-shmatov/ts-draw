import React = require('react');
import {ObservableRenderer, IModelRendererProps} from './ObservableRenderer';
import {SimplePath} from '../../components/SimplePath';
import {Drawing} from '../model/Drawing';
import {Point} from '../model/Point';
import {PathUtils} from '../util/PathUtils';

export interface PathProperties {
	key?: number,
	model: Drawing
}

export class PathRenderer extends ObservableRenderer<PathProperties, {}> {

	componentDidMount() {
		super.componentDidMount();
		var model: Drawing = this.props.model;
		model.points.collectionChanged.listen(this.onPropertyChange, this);
    }

    componentWillUnmount() {
		super.componentWillUnmount();
		var model: Drawing = this.props.model;
		model.points.collectionChanged.unlisten(this.onPropertyChange);
    }

	render() {
		var drawing: Drawing = this.props.model;
		var points: Array<Point> = drawing.points.source;
		//TODO - cache string path data for performance?
		var data = PathUtils.buildCurvedPath(points);
		return <SimplePath data={data} stroke={0x000000} strokeWidth={2}></SimplePath>;
	}
}
