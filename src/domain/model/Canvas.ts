import { NotifyPropertyChanged, ObservableCollection, PropertyChangeEvent } from 'ts-observable';
import { Drawing } from './drawing';

export class Canvas implements NotifyPropertyChanged {
    public propertyChanged = new PropertyChangeEvent();
    private _elements = new ObservableCollection<Drawing>();

    public get elements(): ObservableCollection<Drawing> {
        return this._elements;
    }
}