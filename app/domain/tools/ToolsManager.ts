import {ITool} from '../tools/ITool';
import {PathTool} from '../tools/PathTool';

export enum Tool{
	Path
}

export class ToolsManager{
	private _toolsDictionary:Object;
	private _currentTool:Tool;
  private _currentToolImpl:ITool;

	public get currentTool():Tool{
		return this._currentTool;
	}

	public get currentToolImpl():ITool{
		return this._currentToolImpl;
	}

	constructor(){
		this._toolsDictionary = {};
		this._toolsDictionary[Tool.Path] = new PathTool();
		this.changeTool(Tool.Path);
	}

	private changeTool(newTool:Tool) {
		if(newTool != this._currentTool){
			if(this._currentToolImpl)
				this._currentToolImpl.deactivate();
			this._currentTool = newTool;
			this._currentToolImpl = this._toolsDictionary[newTool];
			if(this._currentToolImpl)
				this._currentToolImpl.activate();
		}
	}

}

export var toolsManager:ToolsManager = new ToolsManager();
