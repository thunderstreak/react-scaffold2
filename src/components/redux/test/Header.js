import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Header extends Component {
    static propTypes = {
        themeColor: PropTypes.string
    };
    constructor(props){
        super(props);
        this.state = {
            name:'Header'
        };
        console.log(props);
    }
    render () {
        return (
            <h1 style={{ color : this.props.themeColor }}>this is header</h1>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        themeColor: state.themeColor
    }
};

export default connect(mapStateToProps)(Header)