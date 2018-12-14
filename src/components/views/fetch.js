import React,{Component,Fragment} from 'react'
import Dialog from "SRC/components/Dialog/Dialog";

const pic = src => <img src={src} alt=""/>;
export default class Fetch extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'Fetch',
            data:'',
            show:false,
        }
    }

    UNSAFE_componentWillMount(){
        fetch('https://www.apiopen.top/journalismApi').then(res => res.json()).then((res)=>{
            // this.setState({data:res.data});
        })
    }
    componentDidMount(){
        console.log(this.props);
    }

    componentDidUpdate(){
        // console.log(this.state.data);
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(nextState);
        return nextState
    }

    handleShow(){
        this.setState({show:true});

    }
    handleHide(){
        this.setState({show:false});
        console.log(this.state.show);
    }
    picClick(e){
        console.log(this.Dialog);
    }
    linkClick(e){
        e.preventDefault();
        console.log(e.target.href);
        let {href} = e.target;
        let options = {
            method:'GET',
            mode: "no-cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        };
        fetch(href,options).then((res) => {
            console.log(res);
        })
    }
    render(){
        const modal = this.state.show ? (
            <Dialog handleHide={this.handleHide.bind(this)}>
                <button onClick={this.handleHide.bind(this)}>Hide modal</button>
            </Dialog>
        ) : null;

        // if(!this.state.data){
        //     return null;
        // }
        let data = this.state.data;

        return(
            <Fragment>
                <button onClick={this.handleShow.bind(this)}>show</button>
                -
                <button onClick={this.handleHide.bind(this)}>hide</button>

                {modal}
                
                <ul className={'fetch-ul'}>
                    {Object.keys(data).map((v,k) => {
                        return (
                            <li key={k} className={'fetch-ul-li'}>
                                <span className={'fetch-ul-li-title'}>{data[v][0].category}</span>
                                {data[v].map((v,k) => {
                                    return v.link && v.title && (
                                        <div key={k} className={'fetch-ul-li-content'}>
                                            {v.picInfo.length && v.picInfo.map((v,k) => {
                                                return (
                                                    <div key={k} className={'fetch-ul-li-content-img'}>
                                                        <img onClick={this.picClick.bind(this)} src={v.url}/>
                                                    </div>
                                                )
                                            })}
                                            <a className={'fetch-ul-li-content-link'} href={v.link} onClick={this.linkClick.bind(this)}>{v.title}</a>
                                        </div>
                                    )
                                })}
                            </li>
                        )
                    })}
                </ul>
            </Fragment>
        )
    }
}