import React, { Component } from 'react'
import Counter from './counter'
import Summary from './summary'


export default class ControlPanel extends Component {
    render() {
        const style = {
            margin: "20px"
        };
        return (
            <div style={style}>
                <Counter caption="First" />
                <Counter caption="Second"/>
                <Counter caption="Third" />
                <hr/>
                <Summary/>
            </div>
        )
    }
}