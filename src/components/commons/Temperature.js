import React from 'react';
import PropTypes from 'prop-types';

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};
export default class Temperature extends React.Component {
    constructor(props){
        super(props);
        this.ref = React.createRef();
    }

    handlerChange(e){
        // 通过props上的方法传递参数到父组件
        this.props.onTemperatureChange(e.target.value,this.props.scale);
    }
    
    // 非受控
    refChange(){
        console.log(this.input.value);
    }
    
    focusInput(e){
        this.ref.current.focus();
    }

    componentDidMount(){
        // console.log(this.ref);
    }

    render(){
        const {scale,temperature} = this.props;
        return(
            <fieldset>
                <legend onClick={this.focusInput.bind(this)}>在{scaleNames[scale]}:中输入温度数值</legend>
                <input ref={this.ref} type="text" value={temperature} onChange={this.handlerChange.bind(this)}/>
                <input type="text" ref={(input) => this.input = input} onChange={this.refChange.bind(this)}/>
            </fieldset>
        )
    }
}

// 检查props属性类型
Temperature.propTypes = {
    scale               : PropTypes.string.isRequired,
    temperature         : PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    onTemperatureChange : PropTypes.func.isRequired
};