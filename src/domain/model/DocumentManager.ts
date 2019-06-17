import { UndoRedo } from 'ts-undoredo';
import { Canvas } from '../model/Canvas';

export class DocumentManager {

    private _undoredo: UndoRedo;
    private _canvas: Canvas;

    public get canvas(): Canvas {
        return this._canvas;
    }

    public get undoRedo(): UndoRedo {
        return this._undoredo;
    }

    public constructor() {
        this._undoredo = new UndoRedo();
        this._canvas = new Canvas();
    }
}

export const documentManager = new DocumentManager();
