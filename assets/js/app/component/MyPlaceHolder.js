import React, {Component} from "react";

import Color from "../style/Color";
import Size from "../style/Size";


export default class MyPlaceHolder extends Component {

    render() {
    	let height = this.props.height;
    	if (height === undefined){
    		height = Size.PlaceHolderDefaultHeight;
	    }

	    let color = this.props.color;
    	if(color === undefined){
    		color = Color.PlaceHolderDefaultColor;
	    }

        return (
            <div style={{
                height: height,
                backgroundColor:color,
            }}></div>
        );
    }
}
