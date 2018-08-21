/*import React from 'react';
import {connect} from 'react-redux';

function Summary({value}) {
    return (
        <div>Total Count: {value}</div>
    );
}
function mapState(state) {
    let sum = 0
    for (const key in state) {
        if (state.hasOwnProperty(key)) {
            sum += state[key];
        }
    }
    return {value: sum};
}

export default connect(mapState)(Summary)*/



import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux';

const mapState = (state) => {
    let sum = 0;
    for (const key in state) {
        if (state.hasOwnProperty(key)) {
            sum += state[key];
        }
    }
    return {value: sum};
};

class Summary extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        let {value} = this.props;
        return(
            <Fragment>
                Total Count: {value}
            </Fragment>
        )
    }
}

export default connect(mapState)(Summary)