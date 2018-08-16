import React from 'react';

export default class BoilingVerdict extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            this.props.celsius > 100 ? (<p>开</p>) : (<p>关</p>)
        )
    }
}