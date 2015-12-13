import {observable, ObservableObject, ObservableCollection} from 'ts-observable';
import {Drawing} from './drawing';

export class Canvas extends ObservableObject{
	private _elements:ObservableCollection<Drawing>;
	
	public get elements():ObservableCollection<Drawing>{
		return this._elements;
	}
	
	constructor(){
		super();
		this._elements = new ObservableCollection<Drawing>();
	}
}