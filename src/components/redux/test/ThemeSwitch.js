import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ThemeSwitch extends Component {
    static propTypes = {
        themeColor: PropTypes.string,
        onSwitchColor: PropTypes.func
    };

    constructor () {
        super();
        this.state = { themeColor: '' };
        // console.log(this.state);
    }

    // dispatch action 去改变颜色
    handleSwitchColor (color) {
        if (this.props.onSwitchColor) {
            this.props.onSwitchColor(color)
        }
    }

    render () {
        let { themeColor } = this.props;
        return (
            <Fragment>
                <button style={{ color: themeColor }} onClick={this.handleSwitchColor.bind(this,'red')}>Red</button>
                <button style={{ color: themeColor }} onClick={this.handleSwitchColor.bind(this,'blue')}>Blue</button>
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (color) => {
            dispatch({ type: 'CHANGE_COLOR', themeColor: color })
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)