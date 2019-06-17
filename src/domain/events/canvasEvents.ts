import EventEmitter from 'eventemitter3';

export class MouseInfo {
    public x: number = 0;
    public y: number = 0;
}

export class CanvasEvents extends EventEmitter {
    public static MouseMove = 'mousemove';
    public static MouseUp = 'mouseup';
    public static MouseDown = 'mousedown';
    public static MouseLeave = 'mouseleave';
}

export const dispatcher = new CanvasEvents();
