import React, { Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({themeColor: state.themeColor});
const mapDispatchToProps = (dispatch) => ({
    onSwitchColor: (color) => {
        dispatch({ type: 'CHANGE_COLOR', themeColor: color })
    }
});

@connect(mapStateToProps,mapDispatchToProps)
export default class ThemeSwitch extends Component {
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

// export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)