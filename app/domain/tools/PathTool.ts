import {ITool} from './ITool';
import {MouseInfo, CanvasEvents, dispatcher} from '../events/canvasEvents';
import {documentManager} from '../model/DocumentManager';
import {Drawing} from '../model/Drawing';
import {Point} from '../model/Point';

export class PathTool implements ITool{
	private currentDrawing:Drawing;

	activate(){
		dispatcher.on(CanvasEvents.MouseDown, this.onMouseDown, this);
		dispatcher.on(CanvasEvents.MouseUp, this.onMouseUp, this);
		dispatcher.on(CanvasEvents.MouseLeave, this.onMouseLeave, this);
		dispatcher.on(CanvasEvents.MouseMove, this.onMouseMove, this);
	}

	private onMouseDown(info:MouseInfo){
		var canvas = documentManager.canvas;
		documentManager.undoRedo.beginChange(canvas);
		this.currentDrawing = new Drawing();
		this.currentDrawing.points.addItem(new Point(info.x, info.y));
		canvas.elements.addItem(this.currentDrawing);
	}

	private onMouseUp(info:MouseInfo){
		if(this.currentDrawing){
			documentManager.undoRedo.endChange('Draw path');
			this.currentDrawing = null;
		}
	}

	private onMouseLeave(info:MouseInfo){
		if(this.currentDrawing){
			documentManager.undoRedo.endChange('Draw path');
			this.currentDrawing = null;
		}
	}

	private onMouseMove(info:MouseInfo){
		if(this.currentDrawing){
			var points = this.currentDrawing.points;
			var lastPoint = points.getItemAt(points.numElements - 1);
			var distance = Math.max(Math.abs(info.x - lastPoint.x), Math.abs(info.y - lastPoint.y));
			if(distance > 4)
				points.addItem(new Point(info.x, info.y));
		}
	}

	deactivate(){
		dispatcher.off(CanvasEvents.MouseDown, this.onMouseDown);
		dispatcher.off(CanvasEvents.MouseUp, this.onMouseUp);
		dispatcher.off(CanvasEvents.MouseLeave, this.onMouseLeave);
		dispatcher.off(CanvasEvents.MouseMove, this.onMouseMove);
	}
}
