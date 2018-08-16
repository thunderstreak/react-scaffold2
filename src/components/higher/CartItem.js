import React from 'react';
import {IntervalEnhance} from './IntervalEnhance';
class CartItem extends React.Component{
    constructor(props){
        super(props);
        CartItem.test();
    }
    static test(){
        console.log('static-test');
    }
    render(){
        return(
            <article className="row large-4">
                <p className="large-12 column">
                    <strong>Time elapsed for interval: </strong>
                    {this.props.seconds} s
                    {this.props.name}
                </p>
            </article>
        )
    }
}

export default IntervalEnhance(CartItem);