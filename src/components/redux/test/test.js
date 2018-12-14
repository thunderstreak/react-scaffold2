import React from 'react';

export default class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            color:''
        };
    }

    setInputValue(color,event){
        this.state.color = color || 10;
    }

    static getDerivedStateFromProps(nextProps, prevState){
        prevState = nextProps;
        return prevState
    }

    render(){
        return(
            <div>
                <input type="text" ref={ipt => this.ipt = ipt} value={this.state.color} onChange={this.setInputValue.bind(this)}/>
            </div>
        )
    }
}