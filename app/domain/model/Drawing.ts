import {observable, ObservableObject, ObservableCollection} from 'ts-observable';
import {Point} from './point';

export class Drawing extends ObservableObject {
	private _points: ObservableCollection<Point>;

	public get points(): ObservableCollection<Point> {
		return this._points;
	}

	constructor() {
		super();
		this._points = new ObservableCollection<Point>();
	}
}