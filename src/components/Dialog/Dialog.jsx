import React, { Component } from 'react'
import ReactDOM from 'react-dom';

export default class Dialog extends Component {
    constructor(props){
        super(props);
        console.log(props.show);
        this.el = document.createElement('div');
        this.el.className = 'modal';
        this.el.addEventListener('click',() => {
            props.handleHide();
            // this.removeDialog();
        });
        this.modalRoot = document.body;
        // props.show && this.appendDialog();
    }

    componentDidMount(){
        this.appendDialog();
    }
    componentWillUnmount(){
        this.removeDialog();
    }
    appendDialog(){
        this.modalRoot.appendChild(this.el);
    }
    removeDialog(){
        this.modalRoot.removeChild(this.el);
    }
    shouldComponentUpdate(nextProps, nextState){
        // console.log(nextProps, nextState);
        return nextProps
    }

    render(){
        return ReactDOM.createPortal(this.props.children,this.el);
    }
}
