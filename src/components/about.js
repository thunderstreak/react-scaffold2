import React from 'react';
import {Button} from 'antd-mobile';

export default class About extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msg:'abouts'
        }
    }
    render(){
        return(
            <div>
                <h2>{this.state.msg}</h2>
                <Button loading>k</Button>
            </div>
        )
    }
}