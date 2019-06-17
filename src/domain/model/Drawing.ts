import { PropertyChangeEvent, NotifyPropertyChanged, ObservableCollection } from 'ts-observable';
import { Point } from './point';

export class Drawing implements NotifyPropertyChanged {
    public propertyChanged = new PropertyChangeEvent();
    private _points = new ObservableCollection<Point>();

    public readonly id: number;

    public get points(): ObservableCollection<Point> {
        return this._points;
    }

    public constructor(id: number) {
        this.id = id;
    }
}