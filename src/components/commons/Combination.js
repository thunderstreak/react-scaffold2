import React from 'react';
import PropTypes from 'prop-types';
export default class Combination extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className={this.props.color}>
                {this.props.title}
                {this.props.top}
                {this.props.children}
                {this.props.bottom}
            </div>
        )
    }
}

Combination.propTypes = {
    title:PropTypes.string.isRequired,
    top:PropTypes.element.isRequired,
    bottom:PropTypes.element.isRequired,
    children:PropTypes.element
};