import React from 'react';

export default class Welcome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'Welcome.name',
            date:new Date().getTime(),
            list:[{n:1,m:'test1'},{n:2,m:'test2'},{n:3,m:'test3'},{n:4,m:'test4'}],
            input:'',
        };
        this.interval = null;

        // 绑定this 便于触发
        this.changeipt = this.changeipt.bind(this);
        this.submitbtn = this.submitbtn.bind(this);
    }

    // 在完成首次渲染之前调用
    componentDidMount(){
        console.log('componentDidMount');
        if(!this.interval){
            this.interval = setInterval(() => {
                this.setState({
                    date:new Date().getTime()
                })
            },500)
        }
    }

    // 真实的DOM被渲染出来后调用
    componentWillUnmount(){
        console.log('componentWillUnmount');
        clearInterval(this.interval)
    }

    changeipt(e){
        this.setState({input:e.target.value})
    }
    submitbtn(){
        console.log(this.state.input);
    }
    render(){
        return(
            <div>
                {/*<h1>{this.state.name}</h1>*/}
                <h2>{this.props.name}</h2>
                <h3>{this.state.date}</h3>
                {/*子组件向父组件传值，通过父组件props传递过来的处理函数在子组件内部调用，作用直接指向父组件里面定义的处理函数*/}
                <h4 onClick={this.props.handler.bind(this,'Welcome')}>props.click</h4>
                {
                    this.state.list.length > 0 && <p>{this.state.list.length ? '不是空' : '空'}</p>
                }
                {
                    this.state.list.map((v,k) => {
                        return(<p key={k}>{v.n}</p>)
                    })
                }
                <input type="text" value={this.state.input} onChange={this.changeipt}/>{this.state.input.toUpperCase()}
                <button onClick={this.submitbtn}>submit</button>
            </div>
        )
    }
}