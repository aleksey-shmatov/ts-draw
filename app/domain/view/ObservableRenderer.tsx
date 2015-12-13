import React = require('react');
import {INotifyPropertyChanged, INotifyCollectionChanged} from 'ts-observable';

export interface IModelRendererProps {
    model: INotifyPropertyChanged;
}

export class ObservableRenderer<T extends IModelRendererProps, S> extends React.Component<T, S> {
    componentDidMount() {
        var model: INotifyPropertyChanged = this.props.model;
        model.propertyChanged.listen(this.onPropertyChange, this);
    }

    onPropertyChange(info) {
        this.forceUpdate();
    }

    componentWillUnmount() {
        var model: INotifyPropertyChanged = this.props.model;
        model.propertyChanged.unlisten(this.onPropertyChange);
    }

    render() {
        throw new Error("Render needs to be implemented in child classes");
        return null;
    }
}
