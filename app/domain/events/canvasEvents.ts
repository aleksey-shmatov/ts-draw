import EventEmitter = require('eventemitter3');


export class MouseInfo{
	public x:number;
	public y:number;
}

export class CanvasEvents extends EventEmitter{
	public static get MouseMove():string{return 'mousemove';};
	public static get MouseUp():string{return 'mouseup';};
	public static get MouseDown():string{return 'mousedown';};
	public static get MouseLeave():string{return 'mouseleave';};
}

export var dispatcher = new CanvasEvents();