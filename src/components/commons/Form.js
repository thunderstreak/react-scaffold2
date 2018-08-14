import React from 'react';

export default class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msg:'form',
            textareaval:'',
            selected:'txt4',
            options:[{text:'txt1'},{text:'txt2'},{text:'txt3'},{text:'txt4'}]
        };

        this.submitform = this.submitform.bind(this);
        this.changeTextarea = this.changeTextarea.bind(this);
    }
    changeTextarea(e){
        this.setState({textareaval:e.target.value});
    }
    submitform(e){
        e.preventDefault();
        console.log(this.state.textareaval);
    }
    changeSelect(e){
        this.setState({selected:e.target.value});
    }
    render(){
        return(
            <form onSubmit={this.submitform}>
                <textarea style={{display:'block'}} name="" id="" cols="30" rows="10" value={this.state.textareaval} onChange={this.changeTextarea}/>{this.state.textareaval}
                <select name="" id="" value={this.state.selected} onChange={this.changeSelect.bind(this)}>
                    {
                        this.state.options.map((v,i) => {
                            return(
                                <option key={i} value={v.text}>{v.text}</option>
                            )
                        })
                    }
                </select>
                <input type="submit" value={'submit'}/>
            </form>
        )
    }
}