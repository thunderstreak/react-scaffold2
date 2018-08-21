import React,{Component,Fragment} from 'react'
import lib from 'TOOLS/lib'

export default class Lifecycle extends Component{
    // 组件实例被创建和插入DOM中时被调用
    constructor(props){
        super(props);
        this.state = {
            name :'lifecycle'
        }
    }
    // 组件实例化后和接受新属性时将会调用，返回一个新的state对象表示更新，或者返回null表示不更新
    static getDerivedStateFromProps(nextProps, prevState){
        console.log(nextProps, prevState);
        return null
    }
    // 在最新的渲染输出提交给DOM前将会立即调用。它让你的组件能在当前的值可能要改变前获得它们。这一生命周期返回的任何值将会 作为参数被传递给 componentDidUpdate
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log(prevProps, prevState);
        return 10
    }
    // 会在更新发生后立即被调用。该方法并不会在初始化渲染时调用。当组件被更新时，使用该方法是操作DOM的一次机会。这也是一个适合发送请求的地方，要是你对比了当前属性和之前属
    componentDidUpdate(prevProps, prevState, snapshot){
        console.log(snapshot);
    }
    
    // 在组件被装配后立即调用,在该方法里设置状态将会触发重渲。适合实现网络请求
    componentDidMount(){
        this.input.focus();
        console.log(1);
        // fetch('https://www.apiopen.top/journalismApi').then((res)=>{
        //     console.log(res.body);
        // })
    }
    // 在组件被卸载和销毁之前立刻调用。可以在该方法里处理任何必要的清理工作，例如解绑定时器，取消网络请求，清理任何在componentDidMount环节创建的DOM元素。
    componentWillUnmount(){
        console.log(1);
    }
    // 让React知道当前状态或属性的改变是否不影响组件的输出。默认行为是在每一次状态的改变重渲，在大部分情况下你应该依赖于默认行为。
    shouldComponentUpdate(nextProps, nextState){

    }
    // 错误边界
    componentDidCatch(error, info){
        console.log(error,info);
    }

    render(){
        return(
            <React.Fragment>
                {this.state.name}-{this.props.name}
                <input type="text" ref={(input) => this.input = input}/>
            </React.Fragment>
        )
    }
}

Lifecycle.defaultProps = {
    name:'Lifceycle'
};

// Lifecycle.forceUpdate();