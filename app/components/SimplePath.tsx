import React = require('react');

export interface SimplePathProperties {
	data: string;
	fill?: number;
	stroke?: number;
	strokeWidth?: number;
}

export class SimplePath extends React.Component<SimplePathProperties, {}> {
	colorToString(i:number){
    	var c = (i & 0x00FFFFFF).toString(16).toUpperCase();
    	return "#" + "00000".substring(0, 6 - c.length) + c;
	}
	
	render() {
		var data:string = this.props.data;
		var fill:string = 'none';
		if(this.props.fill != undefined && this.props.fill != null)
			fill = this.colorToString(this.props.fill);
		var stroke:string = 'none';
		if(this.props.stroke != undefined && this.props.stroke != null)
			stroke = this.colorToString(this.props.stroke);
		var strokeWidth = 0;
		if(this.props.strokeWidth)
			strokeWidth = this.props.strokeWidth;
		return <path d={data} fill={fill} stroke={stroke} strokeWidth={strokeWidth}></path>;
	}
}
