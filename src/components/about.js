import React,{Component,Fragment} from 'react';
import {Button} from 'antd-mobile';
import Calculator from './commons/Calculator';


export default class About extends Component{
    constructor(props){
        super(props);
        this.state = {
            msg:'abouts',
            clicks:0,
        }
    }
    handleClick(e){
        // this.setState(prevState => ({
        //     clicks: prevState.clicks + 1
        // }));
        this.setState({clicks:this.state.clicks += 1});
        console.log(this.state.clicks);
    }
    render(){
        return(
            <Fragment>
                <Calculator/>
                <h2>{this.state.msg}</h2>
                <Button loading onClick={this.handleClick.bind(this)}>k</Button>
            </Fragment>
        )
    }
}