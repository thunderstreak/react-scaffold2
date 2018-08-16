import React from 'react';

// 返回一个class方法ComposedComponent是我们希望增强的组建(在我们这个案例中，它是CartItem),通过使用export var IntervalEnhance，我们可以把整个方法作为IntervalEnhance(指向上面代码中的CartItem)导出。
export const IntervalEnhance = ComposedComponent => class extends React.Component {
    // 帮助调试。在React DevTools中，这个组建将被命名为ComponentEnhancedWithIntervalHOC。
    static displayName = 'ComponentEnhancedWithIntervalHOC';
    constructor(props){
        super(props);
        this.state = {
            seconds : 0,
            name : this.displayName
        }
    }

    static nametst(){
        console.log('nametst');
    }

    componentDidMount(){
        this.interval = setInterval(this.tick.bind(this),1000);
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }

    tick(){
        this.setState({seconds:this.state.seconds + 1})
    }
    render(){
        // 增加所有的state和props并且转换成CartItem组建。同时，通过这行代码的设置，在CartItem中我们将可以正常访问this.state.seconds属性。
        return <ComposedComponent {...this.props} {...this.state}/>
    }
};