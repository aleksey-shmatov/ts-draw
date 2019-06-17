import { Tool } from './Tool';
import { PathTool } from '../tools/PathTool';

export enum ToolType {
    Path
};

export class ToolsManager {
    private _toolsDictionary: {[key: string]: Tool};
    private _currentTool: ToolType;
    private _currentToolImpl: Tool;

    public get currentTool(): ToolType {
        return this._currentTool;
    }

    public get currentToolImpl(): Tool {
        return this._currentToolImpl;
    }

    public constructor() {
        this._toolsDictionary = {};
        this._toolsDictionary[ToolType.Path] = new PathTool();
        this._currentTool = ToolType.Path;
        this._currentToolImpl = this._toolsDictionary[this._currentTool];
        this._currentToolImpl.activate();
    }

}

export const toolsManager: ToolsManager = new ToolsManager();
