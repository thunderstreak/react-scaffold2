import React, {Component,Fragment} from 'react'
import {increment, decrement} from 'SRC/redux/actions'
import {connect} from 'react-redux';

const mapState = (state, ownProps) => {
    return {
        value: state[ownProps.caption]
    }
};

const mapDispatch = (dispatch, ownProps) => {
    return {
        'Increment': () => {
            dispatch(increment(ownProps.caption))
        },
        'Decrement': () => {
            dispatch(decrement(ownProps.caption))
        }
    }
};

@connect(mapState,mapDispatch)
export default class Counter extends Component{
    constructor(props){
        super(props)
    }

    render(){
        let {caption, Increment, Decrement, value} = this.props;
        const buttonStyle = {
            margin: "20px"
        };
        return(
            <Fragment>
                <button style={buttonStyle} onClick={Increment}>+</button>
                <button style={buttonStyle} onClick={Decrement}>-</button>
                <span>{caption} count :{value}</span>
            </Fragment>
        )
    }
}