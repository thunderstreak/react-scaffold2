import React,{Component,Fragment} from 'react';
import Mouse from './Mouse';
import MouseIMG from './MouseIMG';
export default class MouseTracker extends Component{
    constructor(props){
        super(props);
    }

    renderMouseIMG(mouse){
        return <MouseIMG mouse={mouse}/>
    }

    render(){
        return(
            <Fragment>
                {/*<Mouse render={
                mouse => (<MouseIMG mouse={mouse}/>)
                } />*/}
                <Mouse render={this.renderMouseIMG}/>
            </Fragment>
        )
    }
}