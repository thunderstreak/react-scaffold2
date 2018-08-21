import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './ThemeSwitch'
import Test from './test'
import { connect } from 'react-redux'

/*
* 装饰器
* */
const mapStateToProps = (state) => ({ themeColor: state.themeColor});
@connect(mapStateToProps)
export default class Content extends Component {
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
        console.log(this.themeEl);
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

/*
* 不用装饰器的写法
* */
// const mapStateToProps = (state) => ({ themeColor: state.themeColor});
// export default connect(mapStateToProps)(Content)