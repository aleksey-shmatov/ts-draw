import React from 'react';

export interface SimplePathProperties {
	data: string;
	fill?: number;
	stroke?: number;
	strokeWidth?: number;
}

const colorToString = (i:number) => {
    const c = (i & 0x00FFFFFF).toString(16).toUpperCase();
    return `#${"00000".substring(0, 6 - c.length)}${c}`;
}

export const SimplePath = (props: SimplePathProperties) => {
    const data = props.data;
    const fill = props.fill ? colorToString(props.fill): 'none';
    const stroke = props.stroke ? colorToString(props.stroke): '#000000';
    const strokeWidth = props.strokeWidth ? props.strokeWidth : 1;
    return <path d={data} fill={fill} stroke={stroke} strokeWidth={strokeWidth}></path>;
}
