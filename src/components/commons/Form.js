import React from 'react';

export default class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msg:'form',
            textareaval:'',
            selected:'txt4',
            options:[{text:'txt1'},{text:'txt2'},{text:'txt3'},{text:'txt4'}],

            isCheckbox:true,
        };

    }

    // 获取表单数据
    getFromData(target){
        let data = {};
        target.querySelectorAll("[name]").forEach((v) => {
            data[v.name] = v.value;
        });
        console.log(data);
    }

    // 表单提交
    submitform(e){
        e.preventDefault();
        console.log(e.target.name);
        this.getFromData(e.target)
    }

    // 处理所有input输入
    handlerChange(e){
        let {name,value,type,checked} = e.target;
        this.setState({
            [name]:type === 'checkbox' ? checked : value
        })
    }
    render(){
        let [textareaval,selected,isCheckbox] = [this.state.textareaval,this.state.selected,this.state.isCheckbox];
        return(
            <form name="form" onSubmit={this.submitform.bind(this)}>
                <textarea style={{display:'block'}} name="textareaval" id="" cols="30" rows="10" value={textareaval} onChange={this.handlerChange.bind(this)}/>{textareaval}
                <select name="selected" id="" value={selected} onChange={this.handlerChange.bind(this)}>
                    {
                        this.state.options.map((v,i) => {
                            return(
                                <option key={i} value={v.text}>{v.text}</option>
                            )
                        })
                    }
                </select>
                <div>
                    <input type="checkbox" name="isCheckbox" checked={isCheckbox} onChange={this.handlerChange.bind(this)}/>
                </div>
                <input type="submit" value={'submit'}/>
            </form>
        )
    }
}