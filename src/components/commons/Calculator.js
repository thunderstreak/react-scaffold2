import React from 'react';
import BoilingVerdict from './BoilingVerdict';
import Temperature from './Temperature';
import Combination from './Combination';
import CombinationTop from './CombinationTop';
import CombinationBottom from './CombinationBottom';
export default class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            temperature:'',
            scale:'c'
        };
        this.ref = React.createRef();
    }

    handleTemperatureChange(temperature,scale){
        this.setState({scale,temperature})
    }

    // 转换摄氏
    toCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }
    // 转换华氏
    toFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }
    // 转换
    tryConvert(temperature, convert) {
        const input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return '';
        }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    }

    componentDidMount(){
        // console.log(this.ref);
    }
    componentWillMount(){

    }
    render(){
        const {scale,temperature} = this.state;
        const celsius = scale === 'f' ? this.tryConvert(temperature,this.toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? this.tryConvert(temperature,this.toFahrenheit) : temperature;

        return(
            <div >
                <Temperature scale={'c'} temperature={celsius} onTemperatureChange={this.handleTemperatureChange.bind(this)} />
                <Temperature scale="f" temperature={fahrenheit} onTemperatureChange={this.handleTemperatureChange.bind(this)} />
                <BoilingVerdict ref={this.ref} celsius={parseFloat(celsius)} />
                {/*组件可以作为props参数传递*/}
                <Combination title={'title'} color={'blue'} top={<CombinationTop/>} bottom={<CombinationBottom/>}>
                    <h1>内部children元素获取父组件的props={this.props.color}</h1>
                </Combination>
            </div>
        )
    }
}