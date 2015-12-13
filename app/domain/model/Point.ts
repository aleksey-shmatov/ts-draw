export class Point{
	private _x:number;
	private _y:number;
	
	public get x():number{
		return this._x;
	}
	
	public get y():number{
		return this._y;
	}
	
	constructor(x:number = 0, y:number = 0){
		this._x = x;
		this._y = y;
	}
}