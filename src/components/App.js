import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {Popover, NavBar, Icon} from 'antd-mobile';

import Entry from './entry';
import Home from './home';
import About from './about';
import Topics from './topics';

import createStore from '../stores/store';
import themeReducer from '../stores/reducer';

const store = createStore(themeReducer);


/*const Topic = ({match}) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);

const Topics = ({match}) => (
    <div>
        <h2>Topics</h2>
        <img className="img1" src={img1}/>
        {/!* <img src={img3}/> *!/}
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State-{match.url}
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
);*/
const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt=""/>;

class App extends React.Component {
    /*constructor(props){
        super(props);
        this.state = {
            msg: 'App',
            visible: false,
            selected: ''
        };
    }*/
    state = {
        visible: false,
        selected: ''
    };
    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.prop.value
        })
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        })
    };

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => history.go(-1)}
                    rightContent={[
                        <Popover
                             key="1"
                             mask
                             overlayClassName="fortest"
                             overlayStyle={{color: 'currentColor'}}
                             visible={this.state.visible}
                             overlay={[
                                 (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Scan</Item>),
                                 (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{whiteSpace: 'nowrap'}}>My Qrcode</Item>),
                                 (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                                     <span style={{marginRight: 5}}>Help</span>
                                 </Item>),
                             ]}
                             align={{
                                 overflow: {adjustY: 0, adjustX: 0},
                                 offset: [-10, 0],
                             }}
                             onVisibleChange={this.handleVisibleChange}
                             onSelect={this.onSelect}
                        >
                            <div style={{
                                height: '100%',
                                padding: '0 15px',
                                marginRight: '-15px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                                <Icon type="ellipsis"/>
                            </div>
                        </Popover>
                    ]}
                >NavBar</NavBar>
                <Router>
                    <div>
                        <Route exact path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/topics" component={Topics}/>
                        <Route path="/entry" component={Entry}/>
                    </div>
                </Router>
            </div>
        )
    }
}


export default App

/*
const App = () => (
    <div>
        <h1 className="app">Hello, App</h1>
        <img className="img1" src={img1}/>
        <img src={require("../images/3.jpg")} />
    </div>
);

export default App;


import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'

import router from '../routers/router.js';

const App = () => (<Router routes={router}/>);

export default App;
*/
