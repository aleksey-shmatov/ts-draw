import React = require('react');
import { NotifyPropertyChanged } from 'ts-observable';

export interface ModelRendererProps {
    model: NotifyPropertyChanged;
}

export class ObservableRenderer<T extends ModelRendererProps, S> extends React.Component<T, S> {
    componentDidMount() {
        var model: NotifyPropertyChanged = this.props.model;
        model.propertyChanged.listen(this.onPropertyChange, this);
    }

    onPropertyChange(info: any) {
        this.forceUpdate();
    }

    componentWillUnmount() {
        var model: NotifyPropertyChanged = this.props.model;
        model.propertyChanged.unlisten(this.onPropertyChange);
    }
}
