import React, { Component,Fragment } from 'react'
import ReactDOM from 'react-dom';

export default class Dialog extends Component {
    constructor(props){
        super(props);
        this.el = document.createElement('div');
        this.el.className = 'modal';
        this.el.addEventListener('click',(e)=>{
            props.handleHide();
        });
        this.modalRoot = document.body;
    }

    componentDidMount(){
        this.modalRoot.appendChild(this.el);
    }
    componentWillUnmount(){
        this.modalRoot.removeChild(this.el);
    }

    render(){
        return ReactDOM.createPortal(this.props.children,this.el)
    }
}
