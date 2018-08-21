import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch'
import Test from './test'
import { connect } from 'react-redux'

class Content extends Component {
    static propTypes = {
        themeColor: PropTypes.string
    };
    constructor(props){
        super(props);
        this.state = {
            name:'Content'
        }
    }
    componentDidMount(){
        this.testEl.setInputValue('red');
        // console.log(this);
    }

    render () {
        let {themeColor} = this.props;
        return (
            <Fragment>
                <p style={{ color : themeColor }}>this is content</p>
                <Test ref={testEl => this.testEl = testEl} color={themeColor}/>
                <ThemeSwitch ref={themeEl => this.themeEl = themeEl}/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
};

export default connect(mapStateToProps)(Content)