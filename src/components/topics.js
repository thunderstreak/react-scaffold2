import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Welcome from './commons/Welcome';
import Form from './commons/Form';
import img1 from '../images/1.png';


/*const Topic = ({match}) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);*/

export default class Topics extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            msg:'abouts'
        };

        // this.Topic = this.Topic.bind(this);
    }
    TopicA (val) {
        console.log(val);
        this.setState({
            msg:'ttxa'
        })
    }
    TopicB (val,e) {
        console.log(val,e);
        e.preventDefault();
        this.setState({
            msg:'ttxb'
        })
    }
    handler (val) {
        console.log(val,'Welcome-handler');
    }
    render(){
        return(
            <div>
                <Welcome name={this.state.msg} handler={this.handler}/>
                <Form/>
                <h2>Topics</h2>
                <img className="img1" src={img1} onClick={() => this.TopicA('ttxa')}/>
                <a className="img1" href="https://reactjs.org" onClick={this.TopicB.bind(this,'ttxb')}>href</a>
                {/*{this.state.msg}*/}
                {/*<ul>
                    <li>
                        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/components`}>Components</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/props-v-state`}>Props v. State-{match.url}</Link>
                    </li>
                </ul>

                <Route path={`${match.url}/:topicId`} component={this.Topic}/>
                <Route exact path={match.url} render={() => (
                    <h3>Please select a topic.</h3>
                )}/>*/}
            </div>
        )
    }

}